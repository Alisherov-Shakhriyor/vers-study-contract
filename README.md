# VERS STUDY — ONLINE CONTRACT PLATFORM

> **"Bilim. Rivojlanish. Natija."**  
> Zamonaviy ta'lim xizmatlarini ko‘rsatish bo‘yicha shaxsiy shartnoma generatsiyasi, elektron qo‘l imzo va A4 PDF avtomatlashtirish tizimi.

---

## 🌟 Asosiy Imkoniyatlar

1. **Admin URL Generator (`index.html`):**
   - Administrator mijoz ma'lumotlarini (ism-familiya, kurs, sana, narx, to'lov turi) kiritadi.
   - Voyaga yetgan (Adult) va Voyaga yetmagan (Minor - ota-onasi qonuniy vakil sifatida) toifalarini qo'llab-quvvatlaydi.
   - Bir tugma bilan URL-safe Base64 shaxsiy havola (URL) yaratadi.
   - Havolani klipbordga nusxalash va yangi oynada ochish.
   - Demo ma'lumotlarni tezkor to'ldirish (Quick Fill Demo).

2. **Mijoz Shartnoma Sahifasi (`contract.html`):**
   - URL orqali ma'lumotlarni o'qiydi va shartnomaning **to'liq 14 ta bo'limini** ekranga chiqaradi.
   - O'zbekiston Respublikasi qonunchiligiga (Fuqarolik kodeksi 703–707 moddalar) to'liq mos yuridik matn.
   - O'qish jarayoni indikatori (Reading progress bar).
   - Administratorning rasmiy tasdiqlangan imzosi va muhri joylashtirilgan.
   - Pastki qismda qulay "Shartnomani imzolash" tugmasi.

3. **Mobil va Sensorli Ekranlarga Moslashtirilgan Imzo Paneli (`js/signature.js`):**
   - 95% mijozlar telefondan kirishini inobatga olgan holda **Mobile-First** tamoyilida yaratilgan.
   - `touch-action: none` — barmoq bilan chizganda sahifa surilib ketmaydi!
   - High-DPI (Retina) silliq kalligrafik chiziqlar (to'q ko'k siyoh rangi).
   - Imzoni tozalash va qayta chizish. Bo'sh imzo qo'yilishining oldi olingan.

4. **Multi-Page A4 PDF Generatsiyasi (`js/pdf-generator.js`):**
   - html2pdf.js orqali shartnomaning barcha 14 ta bo'limi, jadvallar, formulalar, admin muhri va mijoz imzosi bilan to'liq A4 PDF hujjati shakllanadi.
   - O'zbek lotin harflari (`O‘`, `G‘`, `o‘`, `g‘`, `Sh`, `Ch`) va unikal belgilar xatosiz aks etadi.
   - Mijoz qurilmasiga avtomatik yuklab beriladi (`VersStudy_Contract_VS-2026-001.pdf`).

5. **Xavfsiz Telegram Bot Yetkazib Berish (`api/send-contract.js` & `@versstudy_contract_bot`):**
   - Imzolangan PDF bir vaqtning o'zida administratorning Telegram chatiga xavfsiz serverless funksiya orqali yuboriladi.
   - Bot tokeni hech qachon mijoz kodlarida ko'rinmaydi.
   - Agar Telegramda uzilish bo'lsa ham mijoz PDF ni bemalol yuklab oladi (jarayon to'xtab qolmaydi).

---

## 📁 Loyiha Strukturasi

```text
VERS STUDY/
├── index.html                    # Admin URL Generator sahifasi
├── contract.html                 # Mijoz shartnoma va imzolash sahifasi
├── package.json                  # Loyiha konfiguratsiyasi
├── vercel.json                   # Vercel serverless routing
├── netlify.toml                  # Netlify sozlamalari
├── .env                          # Telegram Bot maxfiy kalitlari (Gitga kirmaydi)
├── .env.example                  # Kalitlar namunasi
├── .gitignore                    # Maxfiy fayllarni chetlatish
│
├── css/
│   ├── global.css                # Dizayn tokenlari, ranglar, umumiy uslub
│   ├── generator.css             # Admin formasi stili
│   ├── contract.css              # Shartnoma A4 formati va print stili
│   ├── signature.css             # Imzo paneli va modal
│   └── responsive.css            # Mobil ekranlar moslashuvi (320px–430px)
│
├── js/
│   ├── generator.js              # Admin formasi logikasi
│   ├── encoder.js                # URL-safe Base64 enkoder
│   ├── decoder.js                # URL dekoder va parametrlar
│   ├── validator.js              # Shartnoma ma'lumotlarini tekshirish & XSS tozalash
│   ├── renderer.js               # Shartnoma controller va interfeys
│   ├── signature.js              # SignaturePad (Canvas & Touch)
│   ├── pdf-generator.js          # A4 PDF yaratish va yuklab olish
│   └── telegram-client.js        # Serverless API bilan aloqa
│
├── templates/
│   └── contract-001.js           # 14 bo'limdan iborat to'liq shartnoma shabloni
│
├── assets/
│   ├── logo.svg                  # VERS STUDY rasmiy vektorial logotipi
│   └── images/
│       ├── admin-signature.svg   # Vektorli rasmiy muhr va admin imzosi
│       └── admin-signature.png   # Yuqori aniqlikdagi shaffof PNG imzo va muhr
│
├── api/
│   └── send-contract.js          # Vercel Serverless Function (Telegramga PDF yuborish)
│
├── netlify/
│   └── functions/
│       └── send-contract.js      # Netlify Serverless Function
│
└── docs/
    ├── TELEGRAM_SETUP.md         # Telegram bot sozlash qo'llanmasi
    ├── DEPLOYMENT.md             # Vercel & GitHub deploy qo'llanmasi
    ├── SECURITY.md               # Xavfsizlik va maxfiylik
    └── CONTRACT_REVIEW.md        # O'zbekiston Respublikasi qonunchiligi tahlili
```

---

## 🚀 Ishga Tushirish

Mahalliy serverda ishga tushirish:
```bash
npm install
npx serve . -p 3000
```
Brauzerda: `http://localhost:3000`

---

## 🤖 Telegram Bot Ma'lumotlari

- **Bot:** [@versstudy_contract_bot](https://t.me/versstudy_contract_bot)
- **Vercel / Netlify Environment Variables:**
  - `TELEGRAM_BOT_TOKEN`: `8671174914:AAGzkBXRwQzCcAe35WB5qkKvF12K3NW1hVE`
  - `TELEGRAM_CHAT_ID`: `8986332691`

Batafsil ma'lumot [docs/TELEGRAM_SETUP.md](docs/TELEGRAM_SETUP.md) da.
