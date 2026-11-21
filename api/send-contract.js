/**
 * Vercel Serverless Function: Telegram Bot PDF Delivery
 * Endpoint: /api/send-contract
 * Securely forwards the signed contract PDF to the admin Telegram chat
 */

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: "Faqat POST so'rovlari qabul qilinadi."
    });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Telegram credentials missing in environment variables.");
    return res.status(500).json({
      success: false,
      error: "Telegram bot konfiguratsiyasi topilmadi (TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID o'rnatilmagan)."
    });
  }

  try {
    let pdfBuffer;
    let filename = 'VersStudy_Shartnoma.pdf';
    let metadata = {};

    // 1. JSON payload (Base64) tekshirish
    if (req.body && (req.body.pdfBase64 || typeof req.body === 'object')) {
      const body = req.body;
      metadata = {
        contractNumber: body.contractNumber || 'VS-2026-001',
        customerName: body.customerName || 'Mijoz',
        courseName: body.courseName || 'General English',
        contractDate: body.contractDate || '—',
        signedDate: body.signedDate || '—',
        signedTime: body.signedTime || '—',
        totalAmount: body.totalAmount ? Number(body.totalAmount).toLocaleString('uz-UZ') + " so'm" : '—',
        customerPhone: body.customerPhone || '—'
      };

      filename = body.filename || `VersStudy_Contract_${metadata.contractNumber}.pdf`;

      if (body.pdfBase64) {
        // Data URL bo'lsa tozalash: "data:application/pdf;base64,..."
        const base64Data = body.pdfBase64.replace(/^data:application\/pdf;base64,/, '');
        pdfBuffer = Buffer.from(base64Data, 'base64');
      }
    }

    if (!pdfBuffer || pdfBuffer.length === 0) {
      return res.status(400).json({
        success: false,
        error: "PDF ma'lumotlari bo'sh yoki topilmadi."
      });
    }

    // 2. Telegram xabari matni (Caption)
    const caption = [
      `🎓 *YANGI IMZOLANGAN SHARTNOMA*`,
      ``,
      `📌 *Shartnoma №:* \`${metadata.contractNumber}\``,
      `👤 *Buyurtmachi:* ${metadata.customerName}`,
      `📞 *Telefon:* ${metadata.customerPhone}`,
      `📚 *Kurs:* ${metadata.courseName}`,
      `💰 *Summa:* ${metadata.totalAmount}`,
      `📅 *Tuzilgan sana:* ${metadata.contractDate}`,
      `✍️ *Imzolangan vaqt:* ${metadata.signedDate} ${metadata.signedTime}`,
      ``,
      `🏛️ *VERS STUDY — EDUCATION CENTER*`
    ].join('\n');

    // 3. Telegram Bot API ga sendDocument yuborish
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('caption', caption);
    formData.append('parse_mode', 'Markdown');
    
    // PDF blob biriktirish
    const fileBlob = new Blob([pdfBuffer], { type: 'application/pdf' });
    formData.append('document', fileBlob, filename);

    const telegramApiUrl = `https://api.telegram.org/bot${token}/sendDocument`;
    const tgResponse = await fetch(telegramApiUrl, {
      method: 'POST',
      body: formData
    });

    const tgData = await tgResponse.json();

    if (!tgData.ok) {
      console.error("Telegram API error response:", tgData);
      return res.status(502).json({
        success: false,
        error: `Telegramga yuborishda xatolik: ${tgData.description || 'Noma\'lum xatolik'}`
      });
    }

    return res.status(200).json({
      success: true,
      message: "Shartnoma PDF muvaffaqiyatli Telegram botga yuborildi!",
      messageId: tgData.result?.message_id
    });

  } catch (err) {
    console.error("Server error handling contract send:", err);
    return res.status(500).json({
      success: false,
      error: `Server xatoligi: ${err.message}`
    });
  }
}
