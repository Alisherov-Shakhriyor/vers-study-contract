/**
 * PDF Generator Engine for VERS STUDY Contracts
 * Renders crisp, multi-page A4 documents with exact Unicode Uzbek support, headers & pagination
 */

const ContractPdfGenerator = {
  /**
   * Shartnoma hujjatidan professional PDF generatsiya qilish
   * @param {HTMLElement} element - Shartnoma HTML konteyneri (#contractDocument)
   * @param {string} contractNumber - Masalan 'VS-2026-001'
   * @param {Object} options - Qo'shimcha parametrlar
   * @returns {Promise<{ success: boolean, blob?: Blob, filename?: string, error?: string }>}
   */
  async generatePdf(element, contractNumber = 'VS-2026-001', options = {}) {
    if (!element) {
      return { success: false, error: "Shartnoma elementi topilmadi." };
    }

    const cleanContractNo = (contractNumber || 'VS-2026-001').replace(/[^a-zA-Z0-9-_]/g, '_');
    const filename = `VersStudy_Contract_${cleanContractNo}.pdf`;

    try {
      // 1. html2pdf kutubxonasi mavjudligini tekshirish
      if (typeof window.html2pdf !== 'function') {
        throw new Error("PDF yaratish kutubxonasi (html2pdf) yuklanmagan. Iltimos, internet aloqasini tekshiring.");
      }

      // 2. Maxsus PDF parametrlari (A4, 2x scale, optimal marginsi)
      const opt = {
        margin: [12, 12, 14, 12], // mm [top, left, bottom, right]
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2, // 2x Retina quality crisp text
          useCORS: true,
          letterRendering: true,
          logging: false,
          scrollY: 0
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        },
        pagebreak: {
          mode: ['avoid-all', 'css', 'legacy'],
          avoid: ['.parties-grid', '.party-card', '.doc-header', '.table-wrap', '.doc-conclusion']
        }
      };

      // 3. Generatsiya qilish va Blob olish
      const worker = window.html2pdf().set(opt).from(element);
      const pdfBlob = await worker.outputPdf('blob');

      return {
        success: true,
        blob: pdfBlob,
        filename: filename
      };
    } catch (err) {
      console.error("PDF generation failed:", err);
      return {
        success: false,
        error: err.message || "PDF yaratishda kutilmagan xatolik yuz berdi."
      };
    }
  },

  /**
   * Blob ni mijoz qurilmasiga fayl sifatida yuklab olish
   * @param {Blob} blob 
   * @param {string} filename 
   */
  downloadBlob(blob, filename) {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'VersStudy_Shartnoma.pdf';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1500);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContractPdfGenerator;
} else {
  window.ContractPdfGenerator = ContractPdfGenerator;
}
