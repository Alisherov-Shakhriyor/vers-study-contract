/**
 * Encoder Module for VERS STUDY Contracts
 * Encodes contract metadata into a URL-safe Base64 string
 */

const ContractEncoder = {
  /**
   * UTF-8 stringni URL-safe Base64 ga aylantirish
   * @param {string} str 
   * @returns {string}
   */
  toUrlSafeBase64(str) {
    // UTF-8 to Base64
    const utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
    });
    const base64 = btoa(utf8Bytes);
    // URL-safe replacement
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  },

  /**
   * Shartnoma obyektini ixchamlashtirib, URL-safe data string yasash
   * @param {Object} contractData 
   * @returns {string}
   */
  encode(contractData) {
    if (!contractData || typeof contractData !== 'object') {
      throw new Error("Shartnoma ma'lumotlari obyekt bo'lishi kerak.");
    }
    const jsonStr = JSON.stringify(contractData);
    return this.toUrlSafeBase64(jsonStr);
  },

  /**
   * To'liq shartnoma havolasini shakllantirish
   * @param {string} baseUrl - Masalan https://vers-study.vercel.app/contract.html
   * @param {Object} contractData 
   * @returns {string}
   */
  generateUrl(baseUrl, contractData) {
    const encoded = this.encode(contractData);
    const cleanBase = baseUrl.split('?')[0];
    return `${cleanBase}?data=${encoded}`;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContractEncoder;
} else {
  window.ContractEncoder = ContractEncoder;
}
