/**
 * Generator Controller for Admin URL Generator (index.html)
 * Handles input validation, dynamic conditional fields, URL generation, copying, and quick-fill demo data
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contractGeneratorForm');
  const customerTypeSelect = document.getElementById('customerType');
  const minorFields = document.getElementById('minorFieldsSection');
  const paymentTypeSelect = document.getElementById('paymentType');
  const totalAmountInput = document.getElementById('totalAmount');
  const monthlyCalcHint = document.getElementById('monthlyCalcHint');
  
  const generatedUrlArea = document.getElementById('generatedUrlSection');
  const generatedUrlInput = document.getElementById('generatedUrlInput');
  const btnCopyUrl = document.getElementById('btnCopyUrl');
  const btnOpenUrl = document.getElementById('btnOpenUrl');
  const btnQuickFillAdult = document.getElementById('btnQuickFillAdult');
  const btnQuickFillMinor = document.getElementById('btnQuickFillMinor');
  const btnReset = document.getElementById('btnResetForm');

  // Preview Modal
  const previewModal = document.getElementById('previewModal');
  const btnPreview = document.getElementById('btnPreviewContract');
  const btnClosePreview = document.getElementById('btnClosePreview');
  const previewContainer = document.getElementById('previewContainer');

  // Bugungi sanani standart qo'yish
  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('contractDate');
  const startInput = document.getElementById('courseStartDate');
  const endInput = document.getElementById('courseEndDate');

  if (dateInput && !dateInput.value) dateInput.value = today;
  if (startInput && !startInput.value) startInput.value = today;
  if (endInput && !endInput.value) {
    const end = new Date();
    end.setMonth(end.getMonth() + 3);
    endInput.value = end.toISOString().split('T')[0];
  }

  // 1. Voyaga yetmagan tanlanganda maxsus maydonlarni ochish/yopish
  if (customerTypeSelect && minorFields) {
    customerTypeSelect.addEventListener('change', () => {
      if (customerTypeSelect.value === 'minor') {
        minorFields.style.display = 'block';
      } else {
        minorFields.style.display = 'none';
      }
    });
  }

  // 2. To'lov turi va oylik hisob-kitob maslahati
  function updatePaymentHint() {
    const total = Number(totalAmountInput.value) || 0;
    const isMonthly = paymentTypeSelect.value === 'monthly';
    if (isMonthly) {
      const monthly = Math.round(total / 3);
      monthlyCalcHint.textContent = `3 oyga teng taqsimlanganda: ~${monthly.toLocaleString('uz-UZ')} so'm / oy`;
      monthlyCalcHint.style.display = 'block';
    } else {
      monthlyCalcHint.textContent = `Bir martalik to'liq oldindan to'lov: ${total.toLocaleString('uz-UZ')} so'm`;
      monthlyCalcHint.style.display = 'block';
    }
  }

  if (paymentTypeSelect && totalAmountInput) {
    paymentTypeSelect.addEventListener('change', updatePaymentHint);
    totalAmountInput.addEventListener('input', updatePaymentHint);
    updatePaymentHint();
  }

  // 3. Formani to'plash va obyekt yasash
  function getFormData() {
    const formData = new FormData(form);
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value.trim();
    }

    // Number conversions
    data.totalAmount = Number(data.totalAmount) || 3600000;
    data.totalLessons = Number(data.totalLessons) || 36;
    data.lessonDuration = Number(data.lessonDuration) || 90;
    data.weeklyLessons = Number(data.weeklyLessons) || 3;

    return data;
  }

  // 4. URL generatsiya qilish
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const rawData = getFormData();

    // Validatsiya
    const validation = window.ContractValidator.validate(rawData);
    if (!validation.isValid) {
      alert("Xatolik:\n• " + validation.errors.join("\n• "));
      return;
    }

    // Contract havolasini yaratish
    const contractUrl = window.ContractEncoder.generateUrl(
      window.location.origin + window.location.pathname.replace('index.html', '').replace(/\/$/, '') + '/contract.html',
      validation.data
    );

    generatedUrlInput.value = contractUrl;
    generatedUrlArea.style.display = 'block';
    generatedUrlArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // 5. Havolani nusxalash
  if (btnCopyUrl) {
    btnCopyUrl.addEventListener('click', async () => {
      if (!generatedUrlInput.value) return;
      try {
        await navigator.clipboard.writeText(generatedUrlInput.value);
        const originalText = btnCopyUrl.innerHTML;
        btnCopyUrl.innerHTML = '<span>✓</span> Nusxalandi!';
        btnCopyUrl.classList.add('btn-copied');
        setTimeout(() => {
          btnCopyUrl.innerHTML = originalText;
          btnCopyUrl.classList.remove('btn-copied');
        }, 2200);
      } catch (err) {
        // Fallback
        generatedUrlInput.select();
        document.execCommand('copy');
        alert("Havola nusxalandi!");
      }
    });
  }

  // 6. Havolani ochish
  if (btnOpenUrl) {
    btnOpenUrl.addEventListener('click', () => {
      if (generatedUrlInput.value) {
        window.open(generatedUrlInput.value, '_blank');
      }
    });
  }

  // 7. Shartnomani oldindan ko'rish (Preview Modal)
  if (btnPreview && previewModal) {
    btnPreview.addEventListener('click', () => {
      const rawData = getFormData();
      const validation = window.ContractValidator.validate(rawData);
      if (!validation.isValid) {
        alert("Avval barcha majburiy maydonlarni to'ldiring:\n• " + validation.errors.join("\n• "));
        return;
      }

      previewContainer.innerHTML = window.ContractTemplate.renderHTML(validation.data, {
        adminSig: 'assets/images/admin-signature.png',
        customerSig: null
      });

      previewModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (btnClosePreview) {
    btnClosePreview.addEventListener('click', () => {
      previewModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (previewModal) {
    previewModal.addEventListener('click', (e) => {
      if (e.target === previewModal) {
        previewModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 8. Quick Fill Demo (Adult)
  if (btnQuickFillAdult) {
    btnQuickFillAdult.addEventListener('click', () => {
      customerTypeSelect.value = 'adult';
      minorFields.style.display = 'none';

      document.getElementById('contractNumber').value = 'VS-2026-042';
      document.getElementById('adminFullName').value = 'Xalilov Jasur Bahodirovich';
      document.getElementById('customerFullName').value = 'Alisherov Shaxriyor Baxtiyorovich';
      document.getElementById('birthDate').value = '2001-08-14';
      document.getElementById('passportDetails').value = 'AB 7654321, JSHSHIR: 31408011234567';
      document.getElementById('customerPhone').value = '+998 (90) 123-45-67';
      document.getElementById('customerAddress').value = 'Toshkent shahri, Yunusobod tumani, 12-mavze, 4-uy';
      
      document.getElementById('courseName').value = 'General English';
      document.getElementById('courseLevel').value = 'Intermediate';
      document.getElementById('educationFormat').value = 'Offline';
      document.getElementById('courseDuration').value = '3 oy';
      document.getElementById('totalLessons').value = '36';
      document.getElementById('totalAmount').value = '3600000';
      paymentTypeSelect.value = 'monthly';
      
      updatePaymentHint();
      alert("Kattalar uchun namunaviy ma'lumotlar to'ldirildi!");
    });
  }

  // 9. Quick Fill Demo (Minor)
  if (btnQuickFillMinor) {
    btnQuickFillMinor.addEventListener('click', () => {
      customerTypeSelect.value = 'minor';
      minorFields.style.display = 'block';

      document.getElementById('contractNumber').value = 'VS-2026-088';
      document.getElementById('adminFullName').value = 'Xalilov Jasur Bahodirovich';
      document.getElementById('customerFullName').value = 'Karimov Davron Rustamovich';
      document.getElementById('birthDate').value = '1985-04-12';
      document.getElementById('passportDetails').value = 'AA 1234567';
      document.getElementById('customerPhone').value = '+998 (93) 555-44-33';
      document.getElementById('customerAddress').value = 'Toshkent shahri, Shayxontohur tumani, Navoiy ko‘chasi, 18-uy';

      // Minor specific
      document.getElementById('studentFullName').value = 'Karimova Madina Davron qizi';
      document.getElementById('studentBirthDate').value = '2012-09-22';
      document.getElementById('guardianRelation').value = 'Otasi (Qonuniy vakili)';
      document.getElementById('guardianPhone').value = '+998 (93) 555-44-33';

      document.getElementById('courseName').value = 'General English';
      document.getElementById('courseLevel').value = 'Elementary';
      document.getElementById('educationFormat').value = 'Offline';
      document.getElementById('courseDuration').value = '3 oy';
      document.getElementById('totalLessons').value = '36';
      document.getElementById('totalAmount').value = '3600000';
      paymentTypeSelect.value = 'full';

      updatePaymentHint();
      alert("Voyaga yetmagan o'quvchi va ota-onasi uchun namunaviy ma'lumotlar to'ldirildi!");
    });
  }

  // 10. Formani tozalash
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (confirm("Haqiqatan ham formadagi barcha ma'lumotlarni tozalab, boshlang'ich holatga qaytarmoqchimisiz?")) {
        form.reset();
        customerTypeSelect.value = 'adult';
        minorFields.style.display = 'none';
        generatedUrlArea.style.display = 'none';
        updatePaymentHint();
      }
    });
  }
});
