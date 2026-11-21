/**
 * Validator Module for VERS STUDY Contracts
 * Validates contract data structure and sanitizes inputs
 */

const ContractValidator = {
  /**
   * Stringlarni XSS xavfidan tozalash (HTML entity encoding)
   */
  sanitize(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  /**
   * Shartnoma ma'lumotlar obyektini to'liq tekshirish va tozalash
   * @param {Object} rawData 
   * @returns {{ isValid: boolean, errors: string[], data: Object }}
   */
  validate(rawData) {
    const errors = [];
    if (!rawData || typeof rawData !== 'object') {
      return { isValid: false, errors: ["Shartnoma ma'lumotlari kiritilmagan yoki noto'g'ri formatda."], data: null };
    }

    const data = {};

    // 1. Shartnoma raqami
    data.contractNumber = typeof rawData.contractNumber === 'string' && rawData.contractNumber.trim()
      ? this.sanitize(rawData.contractNumber.trim())
      : 'VS-2026-001';

    // 2. Sana tekshiruvi (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    data.contractDate = dateRegex.test(rawData.contractDate) ? rawData.contractDate : new Date().toISOString().split('T')[0];
    data.courseStartDate = dateRegex.test(rawData.courseStartDate) ? rawData.courseStartDate : data.contractDate;
    data.courseEndDate = dateRegex.test(rawData.courseEndDate) ? rawData.courseEndDate : '2026-04-15';

    // 3. Admin ismi
    data.adminFullName = typeof rawData.adminFullName === 'string' && rawData.adminFullName.trim()
      ? this.sanitize(rawData.adminFullName.trim())
      : "Xalilov Jasur Bahodirovich";

    // 4. Mijoz turi
    data.customerType = (rawData.customerType === 'minor') ? 'minor' : 'adult';

    // 5. Mijoz / Buyurtmachi ismi
    if (!rawData.customerFullName || typeof rawData.customerFullName !== 'string' || rawData.customerFullName.trim().length < 3) {
      errors.push("Buyurtmachining to'liq F.I.Sh. kiritilishi shart (kamida 3 ta belgi).");
    } else {
      data.customerFullName = this.sanitize(rawData.customerFullName.trim());
    }

    // 6. Voyaga yetmagan holat
    if (data.customerType === 'minor') {
      if (!rawData.studentFullName || typeof rawData.studentFullName !== 'string' || rawData.studentFullName.trim().length < 3) {
        errors.push("Voyaga yetmagan o'quvchining F.I.Sh. kiritilishi shart.");
      } else {
        data.studentFullName = this.sanitize(rawData.studentFullName.trim());
      }
      data.studentBirthDate = rawData.studentBirthDate || "—";
      data.guardianFullName = data.customerFullName; // Buyurtmachi qonuniy vakil
      data.guardianRelation = rawData.guardianRelation ? this.sanitize(rawData.guardianRelation.trim()) : "Ota-onasi / Qonuniy vakili";
      data.guardianPhone = rawData.guardianPhone ? this.sanitize(rawData.guardianPhone.trim()) : (rawData.customerPhone || "—");
    } else {
      data.studentFullName = data.customerFullName;
    }

    // 7. Aloqa va shaxsiy ma'lumotlar
    data.birthDate = rawData.birthDate || "—";
    data.passportDetails = rawData.passportDetails ? this.sanitize(rawData.passportDetails.trim()) : "—";
    data.customerPhone = rawData.customerPhone ? this.sanitize(rawData.customerPhone.trim()) : "—";
    data.customerAddress = rawData.customerAddress ? this.sanitize(rawData.customerAddress.trim()) : "Toshkent shahri";

    // 8. Kurs ma'lumotlari
    data.courseName = rawData.courseName ? this.sanitize(rawData.courseName.trim()) : "General English";
    data.courseLevel = rawData.courseLevel ? this.sanitize(rawData.courseLevel.trim()) : "Elementary";
    data.educationFormat = rawData.educationFormat === 'Online' ? 'Online' : 'Offline';
    data.courseDuration = rawData.courseDuration ? this.sanitize(rawData.courseDuration.trim()) : "3 oy";
    data.totalLessons = Number(rawData.totalLessons) > 0 ? Number(rawData.totalLessons) : 36;
    data.lessonDuration = Number(rawData.lessonDuration) > 0 ? Number(rawData.lessonDuration) : 90;
    data.weeklyLessons = Number(rawData.weeklyLessons) > 0 ? Number(rawData.weeklyLessons) : 3;

    // 9. To'lov ma'lumotlari
    const totalAmount = Number(rawData.totalAmount);
    if (isNaN(totalAmount) || totalAmount <= 0) {
      errors.push("Shartnoma to'lov summasi musbat son bo'lishi shart.");
    } else {
      data.totalAmount = totalAmount;
    }
    data.paymentType = rawData.paymentType === 'full' ? 'full' : 'monthly';

    // 10. Qo'shimcha shartlar
    data.notes = rawData.notes ? this.sanitize(rawData.notes.trim()) : "";

    return {
      isValid: errors.length === 0,
      errors: errors,
      data: data
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContractValidator;
} else {
  window.ContractValidator = ContractValidator;
}
