# VERS STUDY — Telegram Bot Integratsiyasi Qo‘llanmasi

Ushbu hujjat imzolangan shartnoma PDF fayllarini avtomatik tarzda administratorning Telegram chatiga xavfsiz serverless funksiya orqali yetkazib berish tizimini sozlashni tushuntiradi.

---

## 1. Joriy Konfiguratsiya (Tayyor Holat)

Ushbu loyiha uchun maxsus rasmiy bot va administrator chati to'liq yaratilgan va sozlangan:

- **Bot Username:** [@versstudy_contract_bot](https://t.me/versstudy_contract_bot)
- **Bot Nomi:** Vers Study Contract Bot
- **Bot Tokeni:** `8671174914:AAGzkBXRwQzCcAe35WB5qkKvF12K3NW1hVE`
- **Admin Chat ID:** `8986332691` (Telegram foydalanuvchisi: `@shamshodbek0887`)

> [!IMPORTANT]
> **Xavfsizlik qoidasi:** Bot tokeni va Chat ID hech qachon mijoz HTML yoki JavaScript kodlariga ochiq yozilmaydi. Ular faqat serverless backend (Vercel / Netlify environment variables) da saqlanadi.

---

## 2. Yangi Bot Yaratish yoki Tokenni Yangilash (Zarurat bo‘lsa)

Agar kelgusida boshqa bot yaratmoqchi bo‘lsangiz:

1. Telegramda [@BotFather](https://t.me/BotFather) botini oching.
2. `/newbot` buyrug‘ini yuboring.
3. Botingiz uchun nom tanlang (masalan: `Vers Study Shartnoma Bot`).
4. Botingiz uchun unikal username tanlang (oxiri `bot` bilan tugashi shart, masalan: `versstudy_contract_bot`).
5. BotFather sizga API tokenni taqdim etadi (masalan: `8671174914:AAGzkBXRwQzCcAe35WB5qkKvF12K3NW1hVE`).
6. Botga kiring va bir marta **/start** tugmasini bosing!

---

## 3. Administrator Chat ID sini Aniqlash

Admin o‘z Telegram ID sini bilish uchun:
- [@userinfobot](https://t.me/userinfobot) ga `/start` yuboring.
- Bot sizning raqamli `Id` ingizni chiqarib beradi (masalan: `8986332691`).

---

## 4. Vercel Platformasida Environment Variables Sozlash

Vercel ga loyihani joylashtirganda:

1. [Vercel Dashboard](https://vercel.com/dashboard) ga kiring.
2. Loyihangizni tanlang -> **Settings** -> **Environment Variables** bo‘limiga o‘ting.
3. Quyidagi 2 ta o‘zgaruvchini qo‘shing:
   - `TELEGRAM_BOT_TOKEN`: `8671174914:AAGzkBXRwQzCcAe35WB5qkKvF12K3NW1hVE`
   - `TELEGRAM_CHAT_ID`: `8986332691`
4. **Save** tugmasini bosing va loyihani qayta deploy qiling.

---

## 5. Yetkazib Berish Xabari Formati

Mijoz shartnomani imzolagan zahoti administratordan Telegram bot quyidagi ko‘rinishda xabar va PDF faylni qabul qiladi:

```text
🎓 YANGI IMZOLANGAN SHARTNOMA

📌 Shartnoma №: VS-2026-001
👤 Buyurtmachi: Alisherov Shaxriyor Baxtiyorovich
📞 Telefon: +998 (90) 123-45-67
📚 Kurs: General English (Intermediate)
💰 Summa: 3 600 000 so'm
📅 Tuzilgan sana: 2026-01-15
✍️ Imzolangan vaqt: 2026-11-21 12:05:32

🏛️ VERS STUDY — EDUCATION CENTER
[Fayl: VersStudy_Contract_VS-2026-001.pdf]
```
