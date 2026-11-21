# VERS STUDY — Loyihani Joylashtirish (Deployment) Qo‘llanmasi

Ushbu qo‘llanma **VERS STUDY** onlayn shartnoma platformasini Vercel va GitHub orqali to‘liq ishga tushirish jarayonini tushuntiradi.

---

## 1. Mahalliy Muhitda Ishga Tushirish (Local Testing)

Loyihani o‘z kompyuteringizda sinab ko‘rish uchun:

```bash
# Repozitoriy papkasiga o'tish
cd "c:\Users\Shaxa_history\Desktop\vers imzo"

# Kerakli paketlarni o'rnatish
npm install

# Mahalliy serverni ishga tushirish (port 3000)
npx serve . -p 3000
```

Brauzerda oching:
- Admin Generator: `http://localhost:3000/index.html`
- Mijoz Shartnomasi: `http://localhost:3000/contract.html`

---

## 2. GitHub Repozitoriyasiga Joylash (Push to GitHub)

Loyiha GitHub hisobingizga to‘liq yuklanadi:

```bash
# Git initsializatsiya
git init
git add .
git commit -m "feat: complete Vers Study online contract platform"

# GitHub repozitoriyasi yaratish va push qilish
gh repo create vers-study-contract --public --source=. --remote=origin --push
```

---

## 3. Vercel Platformasiga Deploy Qilish (Tavsiya etilgan)

Loyiha Vercel Serverless Functions (`/api/send-contract.js`) arxitekturasida yaratilgan:

1. [Vercel](https://vercel.com) ga kiring va GitHub hisobingiz bilan bog‘lang.
2. **Add New Project** tugmasini bosing va `vers-study-contract` repozitoriyasini tanlang.
3. **Environment Variables** bo‘limiga quyidagilarni kiriting:
   - `TELEGRAM_BOT_TOKEN` = `8671174914:AAGzkBXRwQzCcAe35WB5qkKvF12K3NW1hVE`
   - `TELEGRAM_CHAT_ID` = `8986332691`
4. **Deploy** tugmasini bosing.
5. Tayyor havola: `https://vers-study-contract.vercel.app`

---

## 4. Netlify Platformasiga Deploy Qilish (Muqobil variant)

Loyiha shuningdek `netlify.toml` va `netlify/functions/send-contract.js` ni ham o‘z ichiga oladi:

1. [Netlify Dashboard](https://app.netlify.com) ga kiring.
2. GitHub repozitoriyasini ulang.
3. Build sozlamalari:
   - Publish directory: `.`
   - Functions directory: `netlify/functions`
4. Environment Variables ga `TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID` ni kiriting.
5. Deploy qiling.

---

## 5. Ishlashini Tekshirish (Verification Checklist)

- [x] Admin Generator ochiladi va formani to‘ldirish mumkin.
- [x] "URL yaratish" tugmasi bosilganda URL-safe Base64 havola hosil bo‘ladi.
- [x] Mijoz havolani ochganda shartnoma 14 ta bo‘limi bilan to‘liq chiqadi.
- [x] Mobil telefonda sensorli (touch) ekran orqali imzo chiziladi va sahifa surilmaydi (`touch-action: none`).
- [x] "Imzoni tasdiqlash" bosilganda mijoz imzosi shartnomaga tushadi va A4 PDF yaratiladi.
- [x] PDF avtomatik yuklab olinadi va Telegram bot orqali adminga yuboriladi.
