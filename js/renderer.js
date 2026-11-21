/**
 * Renderer & App Controller for Customer Contract Page (contract.html)
 * Coordinates decoding, validation, UI rendering, signature modal, PDF generation, and delivery
 */

class ContractApp {
  constructor() {
    this.contractData = null;
    this.signaturePad = null;
    this.signatures = {
      adminSig: 'assets/images/admin-signature.png',
      customerSig: null,
      signedDate: null,
      signedTime: null
    };
    this.generatedPdfBlob = null;
    this.generatedFilename = null;

    this.init();
  }

  async init() {
    // 1. URL dan shartnoma ma'lumotlarini o'qish
    const decodeResult = window.ContractDecoder.decodeFromUrl();
    if (!decodeResult.success) {
      this.showError("Havola xatosi", decodeResult.error);
      return;
    }

    // 2. Ma'lumotlarni tekshirish va tozalash
    const validation = window.ContractValidator.validate(decodeResult.data);
    if (!validation.isValid) {
      this.showError("Shartnoma ma'lumotlarida xatolik", validation.errors.join("<br>"));
      return;
    }

    this.contractData = validation.data;

    // 3. Shartnomani ekranga chizish
    this.renderContract();

    // 4. Hodisalarni ulash
    this.bindEvents();
    this.setupReadingProgress();

    // Sahifani ko'rsatish
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
  }

  renderContract() {
    const container = document.getElementById('contractRenderArea');
    if (!container) return;

    container.innerHTML = window.ContractTemplate.renderHTML(this.contractData, this.signatures);

    // Dynamic Title
    document.title = `Shartnoma № ${this.contractData.contractNumber} — VERS STUDY`;
  }

  bindEvents() {
    // Modal elementlari
    const modal = document.getElementById('signatureModal');
    const btnOpenSign = document.getElementById('btnFloatingSign');
    const btnCloseModal = document.getElementById('btnCloseSigModal');
    const btnClearSig = document.getElementById('btnClearSig');
    const btnConfirmSig = document.getElementById('btnConfirmSig');

    if (btnOpenSign) {
      btnOpenSign.addEventListener('click', () => this.openSignatureModal());
    }
    if (btnCloseModal) {
      btnCloseModal.addEventListener('click', () => this.closeSignatureModal());
    }

    // Canvasni initsializatsiya qilish
    const canvas = document.getElementById('signatureCanvas');
    if (canvas && window.SignaturePad) {
      this.signaturePad = new window.SignaturePad(canvas, {
        penColor: '#0F2B66',
        lineWidth: 2.8
      });
    }

    if (btnClearSig) {
      btnClearSig.addEventListener('click', () => {
        if (this.signaturePad) this.signaturePad.clear();
      });
    }

    if (btnConfirmSig) {
      btnConfirmSig.addEventListener('click', () => this.handleSignatureConfirm());
    }

    // Modal tashqarisiga bosilganda yopish
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeSignatureModal();
      });
    }

    // Final screen buttons
    const btnDownloadFinal = document.getElementById('btnDownloadFinalPdf');
    if (btnDownloadFinal) {
      btnDownloadFinal.addEventListener('click', () => {
        if (this.generatedPdfBlob) {
          window.ContractPdfGenerator.downloadBlob(this.generatedPdfBlob, this.generatedFilename);
        }
      });
    }

    const btnRetryTelegram = document.getElementById('btnRetryTelegram');
    if (btnRetryTelegram) {
      btnRetryTelegram.addEventListener('click', () => this.sendToTelegram());
    }
  }

  setupReadingProgress() {
    const progressBar = document.getElementById('readingProgressBar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight > 0) {
        const scrolled = (window.scrollY / docHeight) * 100;
        progressBar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
      }
    });
  }

  openSignatureModal() {
    const modal = document.getElementById('signatureModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Canvas o'lchamini qayta hisoblash
      setTimeout(() => {
        if (this.signaturePad) {
          this.signaturePad.resizeCanvas();
        }
      }, 50);
    }
  }

  closeSignatureModal() {
    const modal = document.getElementById('signatureModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  async handleSignatureConfirm() {
    if (!this.signaturePad || this.signaturePad.isEmpty()) {
      alert("Iltimos, avval ajratilgan maydonga qo'l imzoingizni chizing!");
      return;
    }

    const sigDataUrl = this.signaturePad.toDataURL();
    const timestamp = window.SignaturePad.getTimestamp();

    this.signatures.customerSig = sigDataUrl;
    this.signatures.signedDate = timestamp.date;
    this.signatures.signedTime = timestamp.time;

    // Modalni yopish
    this.closeSignatureModal();

    // Shartnomani yangi imzo bilan qayta chizish
    this.renderContract();

    // Floating imzolash tugmasini yashirish yoki "Imzolandi" ga o'tkazish
    const btnFloat = document.getElementById('btnFloatingSign');
    if (btnFloat) {
      btnFloat.style.display = 'none';
    }

    // Yakuniy PDF yaratish va Telegramga uzatish jarayonini boshlash
    await this.processFinalSubmission();
  }

  async processFinalSubmission() {
    const processingModal = document.getElementById('processingModal');
    const procStatusText = document.getElementById('procStatusText');
    if (processingModal) processingModal.classList.add('active');

    try {
      // 1-bosqich: PDF generatsiyasi
      if (procStatusText) procStatusText.textContent = "Shartnoma A4 PDF hujjati shakllantirilmoqda...";
      const contractEl = document.getElementById('contractRenderArea');
      
      const pdfResult = await window.ContractPdfGenerator.generatePdf(
        contractEl,
        this.contractData.contractNumber
      );

      if (!pdfResult.success) {
        throw new Error(pdfResult.error || "PDF generatsiyasida xatolik yuz berdi.");
      }

      this.generatedPdfBlob = pdfResult.blob;
      this.generatedFilename = pdfResult.filename;

      // Avtomatik mijoz qurilmasiga PDF yuklab berish
      window.ContractPdfGenerator.downloadBlob(this.generatedPdfBlob, this.generatedFilename);

      // 2-bosqich: Telegramga yuborish
      if (procStatusText) procStatusText.textContent = "Shartnoma ma'muriyat Telegram tizimiga yuborilmoqda...";

      const tgResult = await window.TelegramClient.sendContractPdf(this.generatedPdfBlob, {
        filename: this.generatedFilename,
        contractNumber: this.contractData.contractNumber,
        customerName: this.contractData.customerFullName,
        customerPhone: this.contractData.customerPhone,
        courseName: `${this.contractData.courseName} (${this.contractData.courseLevel})`,
        contractDate: this.contractData.contractDate,
        signedDate: this.signatures.signedDate,
        signedTime: this.signatures.signedTime,
        totalAmount: this.contractData.totalAmount
      });

      if (processingModal) processingModal.classList.remove('active');

      // 3-bosqich: Muvaffaqiyatli yakunlash ekranini ko'rsatish
      this.showSuccessScreen(tgResult);

    } catch (err) {
      console.error("Submission error:", err);
      if (processingModal) processingModal.classList.remove('active');
      
      // Xatolik bo'lsa ham PDF yaratilgan bo'lsa mijozga ko'rsatamiz
      if (this.generatedPdfBlob) {
        this.showSuccessScreen({
          success: false,
          error: err.message
        });
      } else {
        alert("Xatolik: " + err.message);
      }
    }
  }

  showSuccessScreen(tgResult = {}) {
    const successScreen = document.getElementById('successScreen');
    const mainContent = document.getElementById('mainContent');

    if (mainContent) mainContent.style.display = 'none';
    if (successScreen) {
      successScreen.style.display = 'block';

      // Qiymatlarni joylash
      document.getElementById('resContractNo').textContent = this.contractData.contractNumber;
      document.getElementById('resCustomerName').textContent = this.contractData.customerFullName;
      document.getElementById('resContractDate').textContent = this.contractData.contractDate;
      document.getElementById('resSignedTime').textContent = `${this.signatures.signedDate} ${this.signatures.signedTime}`;

      // Telegram holati
      const tgStatusBox = document.getElementById('telegramStatusBox');
      if (tgStatusBox) {
        if (tgResult.success) {
          tgStatusBox.className = 'status-alert status-success';
          tgStatusBox.innerHTML = `
            <div class="status-icon">✓</div>
            <div class="status-text">
              <strong>Telegram orqali yetkazildi:</strong> Shartnoma nusxasi markaz administratorining Telegram botiga muvaffaqiyatli topshirildi.
            </div>
          `;
        } else {
          tgStatusBox.className = 'status-alert status-warning';
          tgStatusBox.innerHTML = `
            <div class="status-icon">⚠️</div>
            <div class="status-text">
              <strong>Telegramga yuborishda ogohlantirish:</strong> ${tgResult.error || "Server aloqasi cheklangan"}.
              <br><small>Xavotir olmang, shartnomangiz imzolangan va PDF qurilmangizga yuklab olindi. Zarur bo'lsa qayta yuborishingiz mumkin.</small>
            </div>
            <button type="button" class="btn-retry-tg" id="btnRetryTelegram">Qayta yuborish</button>
          `;
          const btnRetry = document.getElementById('btnRetryTelegram');
          if (btnRetry) btnRetry.addEventListener('click', () => this.sendToTelegram());
        }
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  async sendToTelegram() {
    if (!this.generatedPdfBlob) return;
    const btn = document.getElementById('btnRetryTelegram');
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Yuborilmoqda...";
    }

    const tgResult = await window.TelegramClient.sendContractPdf(this.generatedPdfBlob, {
      filename: this.generatedFilename,
      contractNumber: this.contractData.contractNumber,
      customerName: this.contractData.customerFullName,
      customerPhone: this.contractData.customerPhone,
      courseName: `${this.contractData.courseName} (${this.contractData.courseLevel})`,
      contractDate: this.contractData.contractDate,
      signedDate: this.signatures.signedDate,
      signedTime: this.signatures.signedTime,
      totalAmount: this.contractData.totalAmount
    });

    if (btn) {
      btn.disabled = false;
      btn.textContent = "Qayta yuborish";
    }

    const tgStatusBox = document.getElementById('telegramStatusBox');
    if (tgResult.success && tgStatusBox) {
      tgStatusBox.className = 'status-alert status-success';
      tgStatusBox.innerHTML = `
        <div class="status-icon">✓</div>
        <div class="status-text">
          <strong>Telegram orqali yetkazildi:</strong> Shartnoma muvaffaqiyatli yetkazildi!
        </div>
      `;
    } else {
      alert("Xatolik: " + (tgResult.error || "Yetkazib bo'lmadi"));
    }
  }

  showError(title, message) {
    document.getElementById('loadingState').style.display = 'none';
    const errorState = document.getElementById('errorState');
    if (errorState) {
      errorState.style.display = 'block';
      document.getElementById('errorTitle').textContent = title;
      document.getElementById('errorMessage').innerHTML = message;
    }
  }
}

// Boshlash
window.addEventListener('DOMContentLoaded', () => {
  window.ContractApp = new ContractApp();
});
