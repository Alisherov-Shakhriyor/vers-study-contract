/**
 * Decoder Module for VERS STUDY Contracts
 * Decodes URL-safe Base64 contract data from URL parameters
 */

const ContractDecoder = {
  /**
   * URL-safe Base64 stringni UTF-8 stringga aylantirish
   * @param {string} base64UrlSafe 
   * @returns {string}
   */
  fromUrlSafeBase64(base64UrlSafe) {
    if (!base64UrlSafe || typeof base64UrlSafe !== 'string') {
      throw new Error("Bo'sh yoki noto'g'ri Base64 string.");
    }
    // URL-safe belgilarni standart Base64 ga qaytarish
    let base64 = base64UrlSafe.replace(/-/g, '+').replace(/_/g, '/');
    // Padding qo'shish
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }

    const binaryStr = atob(base64);
    // UTF-8 bytes to string
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
  },

  /**
   * Joriy URL dan yoki berilgan URL/string dan contract data ni o'qish
   * @param {string} [urlString] - ixtiyoriy, berilmasa window.location ishlatiladi
   * @returns {{ success: boolean, data?: Object, error?: string }}
   */
  decodeFromUrl(urlString) {
    try {
      let queryStr = "";
      if (urlString) {
        const urlObj = new URL(urlString, window.location.origin);
        queryStr = urlObj.search;
      } else if (typeof window !== 'undefined' && window.location) {
        queryStr = window.location.search;
      }

      const params = new URLSearchParams(queryStr);
      const encodedData = params.get('data');

      if (!encodedData) {
        return {
          success: false,
          error: "Havolada shartnoma ma'lumotlari parametri (data) topilmadi. Iltimos, administrator taqdim etgan to'liq havolani oching."
        };
      }

      const jsonStr = this.fromUrlSafeBase64(encodedData);
      const data = JSON.parse(jsonStr);

      return {
        success: true,
        data: data
      };
    } catch (err) {
      console.error("Contract decode error:", err);
      return {
        success: false,
        error: "Shartnoma havolasi buzilgan yoki noto'g'ri formatda kodlangan. Iltimos, yangi havola oling."
      };
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContractDecoder;
} else {
  window.ContractDecoder = ContractDecoder;
}
