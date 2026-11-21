/**
 * Telegram Client Module for VERS STUDY Contracts
 * Sends the signed PDF to the administrator via secure serverless proxy
 */

const TelegramClient = {
  /**
   * Blob ni Base64 stringga aylantirish
   * @param {Blob} blob 
   * @returns {Promise<string>}
   */
  blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  },

  /**
   * Serverless funksiya orqali Telegramga yuborish
   * @param {Blob} pdfBlob 
   * @param {Object} metadata 
   * @returns {Promise<{ success: boolean, message?: string, error?: string }>}
   */
  async sendContractPdf(pdfBlob, metadata = {}) {
    if (!pdfBlob) {
      return { success: false, error: "PDF hujjati mavjud emas." };
    }

    try {
      const pdfBase64 = await this.blobToBase64(pdfBlob);
      const payload = {
        pdfBase64: pdfBase64,
        filename: metadata.filename || `VersStudy_Contract_${metadata.contractNumber || 'VS-2026-001'}.pdf`,
        contractNumber: metadata.contractNumber,
        customerName: metadata.customerName,
        customerPhone: metadata.customerPhone,
        courseName: metadata.courseName,
        contractDate: metadata.contractDate,
        signedDate: metadata.signedDate,
        signedTime: metadata.signedTime,
        totalAmount: metadata.totalAmount
      };

      // 1. Vercel endpoint orqali sinab ko'rish
      let response = await fetch('/api/send-contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);

      // 2. Agar 404 yoki xato bo'lsa Netlify endpoint orqali sinab ko'rish
      if (!response || response.status === 404) {
        response = await fetch('/.netlify/functions/send-contract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => null);
      }

      if (!response) {
        return {
          success: false,
          error: "Serverga ulanib bo'lmadi. Internet aloqasini tekshiring."
        };
      }

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        return {
          success: false,
          error: resData.error || `Server xatoligi (${response.status})`
        };
      }

      return {
        success: true,
        message: resData.message || "Shartnoma administratorga muvaffaqiyatli yetkazildi!"
      };

    } catch (err) {
      console.error("Telegram send error:", err);
      return {
        success: false,
        error: err.message || "Telegramga yuborishda kutilmagan xatolik yuz berdi."
      };
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TelegramClient;
} else {
  window.TelegramClient = TelegramClient;
}
