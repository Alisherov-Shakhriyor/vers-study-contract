/**
 * Netlify Function: Telegram Bot PDF Delivery
 * Endpoint: /.netlify/functions/send-contract
 */

exports.handler = async function (event, context) {
  // CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: "Faqat POST qabul qilinadi." })
    };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: "Telegram bot konfiguratsiyasi topilmadi."
      })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const metadata = {
      contractNumber: body.contractNumber || 'VS-2026-001',
      customerName: body.customerName || 'Mijoz',
      courseName: body.courseName || 'General English',
      contractDate: body.contractDate || '—',
      signedDate: body.signedDate || '—',
      signedTime: body.signedTime || '—',
      totalAmount: body.totalAmount ? Number(body.totalAmount).toLocaleString('uz-UZ') + " so'm" : '—',
      customerPhone: body.customerPhone || '—'
    };

    const filename = body.filename || `VersStudy_Contract_${metadata.contractNumber}.pdf`;

    if (!body.pdfBase64) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: "PDF ma'lumotlari topilmadi." })
      };
    }

    const base64Data = body.pdfBase64.replace(/^data:application\/pdf;base64,/, '');
    const pdfBuffer = Buffer.from(base64Data, 'base64');

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

    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('caption', caption);
    formData.append('parse_mode', 'Markdown');
    
    const fileBlob = new Blob([pdfBuffer], { type: 'application/pdf' });
    formData.append('document', fileBlob, filename);

    const telegramApiUrl = `https://api.telegram.org/bot${token}/sendDocument`;
    const tgResponse = await fetch(telegramApiUrl, {
      method: 'POST',
      body: formData
    });

    const tgData = await tgResponse.json();

    if (!tgData.ok) {
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          success: false,
          error: `Telegram xatoligi: ${tgData.description || 'Noma\'lum'}`
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "PDF muvaffaqiyatli Telegramga yuborildi!",
        messageId: tgData.result?.message_id
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
