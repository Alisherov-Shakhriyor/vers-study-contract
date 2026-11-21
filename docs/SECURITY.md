# VERS STUDY — Xavfsizlik va Ma'lumotlar Maxfiyligi (Security & Privacy)

Ushbu hujjat **VERS STUDY** platformasining ma'lumotlar xavfsizligi, shaxsiy daxlsizlik va kelajakdagi korporativ arxitektura tamoyillarini bayon qiladi.

---

## 1. Joriy MVP Arxitekturasi va Xavfsizlik choralari

### A. Telegram Maxfiy Kalitlari Himoyasi
- Telegram Bot API tokeni hech qachon brauzer kodlarida (HTML/JS) saqlanmaydi yoki uzatilmaydi.
- Foydalanuvchidan PDF qabul qilib botga yuborish faqat serverless proxy funksiya (`/api/send-contract.js`) orqali amalga oshiriladi.
- Bot tokeni faqat Vercel/Netlify serverida xavfsiz muhit o'zgaruvchilari (`TELEGRAM_BOT_TOKEN`) sifatida saqlanadi.

### B. XSS (Cross-Site Scripting) Himoyasi
- Shartnoma ma'lumotlarini qabul qilish va URL dan o'qishda `ContractValidator.sanitize()` orqali barcha HTML teglari (`<`, `>`, `&`, `"`, `'`) filtrlanadi.
- DOM ga xom (raw) ma'lumotlar to'g'ridan-to'g'ri kiritilmaydi.

### C. URL-safe Base64 Kodlash
- Ma'lumotlar URL da buzilmasligi uchun URL-safe Base64 (`-` va `_`) ishlatiladi.
- O'zbek tilining maxsus belgilari (`O‘`, `G‘`, `o‘`, `g‘`, `Sh`, `Ch`) to'liq UTF-8 formatida saqlanadi.

---

## 2. Muhim Cheklovlar va Yuridik Eslatma

1. **Vizual Elektron Imzo:** Platformada chiziladigan imzo fuqaroning shartnoma shartlariga o'z roziligini bildiruvchi vizual elektron imzo hisoblanadi. Bu davlat ro'yxatidan o'tgan E-IMZO (ERI kaliti) o'rnini to'liq bosmaydi.
2. **Haqiqiy Pasport / JSHSHIR Ma'lumotlari:** MVP rejimida ochiq URL parametrlariga fuqaroning maxfiy biometrik yoki shaxsiy identifikatsiya ma'lumotlarini (JSHSHIR, pasport nusxasi) kiritmaslik tavsiya etiladi.

---

## 3. Kelajakdagi Ishlab Chiqarish (Production) Arxitekturasi

Tizim keng miqyosda ishga tushirilganda quyidagi arxitekturaga o'tish rejalashtirilgan:
1. **Opaque URL ID:** URL da ma'lumotlarni Base64 sifatida uzatish o'rniga, serverda unikal tasodifiy token (`https://versstudy.uz/contract/c7f19b28a`) generatsiya qilish.
2. **Muddati cheklangan havolalar (Expiring Links):** Havola 24 soat yoki 7 kun davomida faol bo'lib, imzolangach yopiladi.
3. **SMS OTP Tasdiqlash:** Mijoz telefon raqamiga bir martalik SMS-kod yuborish orqali shaxsni tasdiqlash.
4. **Audit Log:** Imzolangan har bir hujjatning IP-manzili, brauzer axboroti va aniq vaqt shtampi server bazasida qayd etiladi.
