/**
 * VERS STUDY — TA'LIM XIZMATLARINI KO'RSATISH SHARTNOMASI
 * Model Contract Template (14 Bo'lim)
 * O'zbekiston Respublikasi qonunchiligiga muvofiq namunaviy shartnoma
 */

const ContractTemplate = {
  id: 'contract-001',
  version: '1.0.0',
  title: "TA'LIM XIZMATLARINI KO‘RSATISH SHARTNOMASI",
  organization: {
    name: "Vers Study",
    brand: "VERS STUDY — EDUCATION CENTER",
    slogan: "Bilim. Rivojlanish. Natija.",
    legalName: "«VERS STUDY» MCHJ Ta'lim Markazi",
    address: "Toshkent shahri, Chilonzor tumani, Bunyodkor shoh ko‘chasi, 42-uy",
    inn: "309876543",
    phone: "+998 (71) 200-00-55",
    bank: "ATB «Kapitalbank» Toshkent filiali",
    mfo: "00974",
    account: "20208000900000123001"
  },

  /**
   * Shartnoma matnini ma'lumotlar bilan boyitib generatsiya qilish
   * @param {Object} data - Validatsiya qilingan shartnoma ma'lumotlari
   * @param {Object} signatures - Admin va Mijoz imzolash holati { adminSig, customerSig, signedDate, signedTime }
   */
  renderHTML(data, signatures = {}) {
    const isMinor = data.customerType === 'minor';
    const adminFullName = data.adminFullName || "Xalilov Jasur Bahodirovich";
    const customerFullName = data.customerFullName || "—";
    const studentFullName = isMinor ? (data.studentFullName || customerFullName) : customerFullName;
    const guardianFullName = isMinor ? (data.guardianFullName || customerFullName) : "";
    const guardianRelation = isMinor ? (data.guardianRelation || "Ota-onasi / Qonuniy vakili") : "";
    const guardianPhone = isMinor ? (data.guardianPhone || data.customerPhone || "—") : "";
    const studentBirthDate = isMinor ? (data.studentBirthDate || "—") : (data.birthDate || "—");

    const contractNumber = data.contractNumber || "VS-2026-001";
    const contractDate = data.contractDate || "2026-01-15";
    const courseName = data.courseName || "General English";
    const courseLevel = data.courseLevel || "Elementary";
    const courseDuration = data.courseDuration || "3 oy";
    const totalLessons = data.totalLessons || 36;
    const lessonDuration = data.lessonDuration || 90;
    const weeklyLessons = data.weeklyLessons || 3;
    const educationFormat = data.educationFormat || "Offline";
    const courseStartDate = data.courseStartDate || contractDate;
    const courseEndDate = data.courseEndDate || "2026-04-15";
    
    // To'lov hisob-kitobi
    const totalAmount = Number(data.totalAmount || 3600000);
    const formattedTotalAmount = totalAmount.toLocaleString('uz-UZ');
    const paymentType = data.paymentType === 'full' ? 'full' : 'monthly';
    const monthlyAmount = Math.round(totalAmount / 3);
    const formattedMonthlyAmount = monthlyAmount.toLocaleString('uz-UZ');
    const perLessonAmount = Math.round(totalAmount / totalLessons);
    const formattedPerLessonAmount = perLessonAmount.toLocaleString('uz-UZ');

    const customerPhone = data.customerPhone || "—";
    const customerAddress = data.customerAddress || "Toshkent shahri";
    const birthDate = data.birthDate || "—";
    const passportDetails = data.passportDetails || "—";

    const adminSigImg = signatures.adminSig || 'assets/images/admin-signature.png';
    const customerSigImg = signatures.customerSig || null;
    const signedDate = signatures.signedDate || "";
    const signedTime = signatures.signedTime || "";

    return `
      <div class="contract-doc" id="contractDocument">
        <!-- HEADER -->
        <header class="doc-header">
          <div class="doc-header-top">
            <div class="brand-badge">
              <span class="brand-title">VERS STUDY</span>
              <span class="brand-sub">EDUCATION CENTER</span>
            </div>
            <div class="doc-meta">
              <div><strong>Shartnoma №:</strong> <span class="highlight-val">${contractNumber}</span></div>
              <div><strong>Tuzilgan sana:</strong> <span>${contractDate}</span></div>
              <div><strong>Tuzilgan joy:</strong> <span>Toshkent shahri</span></div>
            </div>
          </div>
          
          <h1 class="doc-title">TA'LIM XIZMATLARINI KO‘RSATISH SHARTNOMASI</h1>
          
          <p class="doc-intro">
            Bir tomondan, keyingi o‘rinlarda <strong>«Ijrochi»</strong> deb yuritiluvchi <strong>«Vers Study» o‘quv markazi</strong>, uning vakili <strong>${adminFullName}</strong> nomidan, ikkinchi tomondan, keyingi o‘rinlarda <strong>«Buyurtmachi»</strong> deb yuritiluvchi <strong>${customerFullName}</strong> ${isMinor ? `(voyaga yetmagan o‘quvchi <strong>${studentFullName}</strong> ning qonuniy vakili)` : "yoki uning qonuniy vakili"}, birgalikda <strong>«Tomonlar»</strong> deb atalib, quyidagi shartlarda ushbu shartnomani tuzdilar.
          </p>
        </header>

        <!-- 1-BO‘LIM -->
        <section class="doc-section">
          <h2 class="section-title">1-BO‘LIM. UMUMIY QOIDALAR</h2>
          <p><strong>1.1.</strong> Ushbu shartnoma O‘zbekiston Respublikasi qonunchiligiga muvofiq ta'lim xizmatlarini ko‘rsatish yuzasidan Tomonlarning huquq va majburiyatlarini belgilaydi.</p>
          <p><strong>1.2.</strong> Ijrochi Buyurtmachiga ingliz tili bo‘yicha ta'lim xizmatlarini ko‘rsatish, Buyurtmachi esa ushbu xizmatlar uchun belgilangan tartibda haq to‘lash majburiyatini oladi.</p>
          <p><strong>1.3.</strong> Shartnoma quyidagi tushunchalarni o‘z ichiga oladi:</p>
          <ul class="doc-list">
            <li><strong>O‘quvchi</strong> — ta'lim xizmatidan bevosita foydalanuvchi shaxs.</li>
            <li><strong>Buyurtmachi</strong> — shartnomani tuzuvchi va xizmat uchun haq to‘lovchi shaxs.</li>
            <li><strong>Qonuniy vakil</strong> — voyaga yetmagan o‘quvchining ota-onasi yoki qonunchilikka muvofiq vakili.</li>
            <li><strong>Kurs</strong> — Ijrochi tomonidan tashkil etiladigan ingliz tili mashg‘ulotlari majmuasi.</li>
            <li><strong>Dars</strong> — belgilangan jadval asosida o‘tkaziladigan bitta mashg‘ulot.</li>
            <li><strong>O‘quv davri</strong> — shartnomada ko‘rsatilgan ta'lim xizmatlari muddati.</li>
          </ul>
          <p><strong>1.4.</strong> Voyaga yetmagan o‘quvchi uchun shartnomani uning qonuniy vakili tegishli vakolatlari doirasida tuzadi va imzolaydi.</p>
          <p><strong>1.5.</strong> Voyaga yetmagan o‘quvchining ta'lim olishi davomida uning yoshi, manfaatlari va qonuniy huquqlari hisobga olinadi.</p>
          <p><strong>1.6.</strong> Ushbu shartnoma Tomonlar imzolagan kundan boshlab kuchga kiradi, agar shartnomada boshqa boshlanish sanasi ko‘rsatilmagan bo‘lsa.</p>
        </section>

        <!-- 2-BO‘LIM -->
        <section class="doc-section">
          <h2 class="section-title">2-BO‘LIM. SHARTNOMA PREDMETI VA TA'LIM XIZMATLARI</h2>
          <p><strong>2.1.</strong> Ijrochi Buyurtmachiga quyidagi ta'lim xizmatlarini taqdim etadi:</p>
          <div class="table-wrap">
            <table class="doc-table">
              <tbody>
                <tr><td>Kurs nomi:</td><td><strong>${courseName}</strong></td></tr>
                <tr><td>Boshlang‘ich daraja:</td><td><strong>${courseLevel}</strong></td></tr>
                <tr><td>Ta'lim davomiyligi:</td><td><strong>${courseDuration}</strong></td></tr>
                <tr><td>Umumiy darslar soni:</td><td><strong>${totalLessons} ta mashg‘ulot</strong></td></tr>
                <tr><td>Bir dars davomiyligi:</td><td><strong>${lessonDuration} daqiqa</strong></td></tr>
                <tr><td>Haftalik mashg‘ulotlar:</td><td><strong>${weeklyLessons} marta</strong></td></tr>
                <tr><td>Ta'lim shakli:</td><td><strong>${educationFormat}</strong></td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>2.2.</strong> Kurs davomida quyidagi yo‘nalishlar o‘rgatiladi:</p>
          <ul class="doc-list-grid">
            <li>• <strong>Grammar</strong> — grammatika</li>
            <li>• <strong>Vocabulary</strong> — lug‘at boyligi</li>
            <li>• <strong>Listening</strong> — tinglab tushunish</li>
            <li>• <strong>Speaking</strong> — og‘zaki nutq</li>
            <li>• <strong>Reading</strong> — matnni o‘qib tushunish</li>
            <li>• <strong>Writing</strong> — yozma nutq</li>
          </ul>
          <p><strong>2.3.</strong> Ta'lim mashg‘ulotlari tasdiqlangan o‘quv dasturi va dars jadvali asosida tashkil etiladi.</p>
          <p><strong>2.4.</strong> Ijrochi o‘quv jarayonini tashkil qilish, o‘qituvchilarni biriktirish va zarur o‘quv materiallarini taqdim etishni zimmasiga oladi.</p>
          <p><strong>2.5.</strong> O‘quvchining yakuniy bilim darajasi uning mashg‘ulotlardagi ishtiroki, topshiriqlarni bajarishi va o‘zlashtirishiga bog‘liq. Ijrochi muayyan IELTS balli, sertifikat yoki kafolatlangan natijani alohida yozma majburiyat olmagan bo‘lsa, kafolatlamaydi.</p>
          <p><strong>2.6.</strong> Kurs davomida qo‘shimcha xizmatlar taklif qilinishi mumkin. Bunday xizmatlar uchun alohida kelishuv va to‘lov talab qilinsa, Buyurtmachining oldindan roziligi olinadi.</p>
        </section>

        <!-- 3-BO‘LIM -->
        <section class="doc-section">
          <h2 class="section-title">3-BO‘LIM. TA'LIM MUDDATI VA DARSLAR JADVALI</h2>
          <p><strong>3.1.</strong> Ta'lim muddati <strong>${courseDuration}</strong> etib belgilanadi.</p>
          <p><strong>3.2.</strong> Kursning boshlanish sanasi: <strong>${courseStartDate}</strong>.</p>
          <p><strong>3.3.</strong> Kursning yakunlanish sanasi: <strong>${courseEndDate}</strong>.</p>
          <p><strong>3.4.</strong> Dars kunlari va vaqti Tomonlar o‘rtasida kelishilgan jadval asosida belgilanadi.</p>
          <p><strong>3.5.</strong> Ijrochi zarur tashkiliy sabablar mavjud bo‘lganda dars jadvaliga o‘zgartirish kiritishi mumkin. Bunda Buyurtmachiga oldindan xabar beriladi.</p>
          <p><strong>3.6.</strong> Ijrochi tomonidan bekor qilingan dars boshqa vaqtga ko‘chiriladi yoki Tomonlar kelishuviga ko‘ra uning qiymati qayta hisoblanadi.</p>
          <p><strong>3.7.</strong> O‘quvchining uzrli sabablarga ko‘ra darslarda qatnasha olmasligi haqida imkon qadar oldindan xabar berilishi lozim.</p>
          <p><strong>3.8.</strong> Dars jadvali o‘zgarganda o‘quvchining boshqa guruhga o‘tkazilishi faqat tegishli guruhda joy va imkoniyat mavjud bo‘lganda amalga oshiriladi.</p>
        </section>

        <!-- 4-BO‘LIM -->
        <section class="doc-section">
          <h2 class="section-title">4-BO‘LIM. XIZMATLAR NARXI VA TO‘LOV TARTIBI</h2>
          <p><strong>4.1.</strong> Ushbu shartnoma bo‘yicha ta'lim xizmatlarining umumiy qiymati <strong>${formattedTotalAmount} (${numberToWordsUzbek(totalAmount)}) so‘mni</strong> tashkil etadi.</p>
          <p><strong>4.2.</strong> Buyurtmachi to‘lovni quyidagi usullardan biri orqali amalga oshirishi mumkin:</p>
          <div class="payment-highlight-box">
            ${paymentType === 'full' 
              ? `<div class="payment-chosen"><strong>Tanlangan to‘lov usuli:</strong> a) To‘liq oldindan to‘lash — <strong>${formattedTotalAmount} so‘m</strong>.</div>`
              : `<div class="payment-chosen"><strong>Tanlangan to‘lov usuli:</strong> b) Oylik to‘lov — har oy uchun <strong>${formattedMonthlyAmount} so‘mdan</strong> (Jami: ${formattedTotalAmount} so‘m).</div>`
            }
          </div>
          <p><strong>4.3.</strong> Oylik to‘lov usuli tanlangan taqdirda, to‘lov tegishli oyning boshlanishidan oldin yoki Tomonlar kelishgan sanada amalga oshiriladi.</p>
          <p><strong>4.4.</strong> To‘lov naqd pul, bank kartasi yoki Ijrochi tomonidan rasman taqdim etilgan boshqa to‘lov usullari orqali qabul qilinishi mumkin.</p>
          <p><strong>4.5.</strong> To‘lov amalga oshirilganligini tasdiqlovchi chek yoki boshqa to‘lov hujjati Buyurtmachida saqlanishi tavsiya etiladi.</p>
          <p><strong>4.6.</strong> Ijrochi to‘lov amalga oshirilganligi to‘g‘risida Buyurtmachiga tegishli tasdiqni taqdim etadi.</p>
          <p><strong>4.7.</strong> Qo‘shimcha xizmatlar yoki kurs narxidagi o‘zgarishlar Buyurtmachining roziligisiz ushbu shartnoma qiymatiga kiritilmaydi.</p>
          <p><strong>4.8.</strong> To‘lov muddati kechiktirilgan taqdirda, Ijrochi Buyurtmachiga qarzdorlik haqida xabar beradi va to‘lovni amalga oshirish uchun oqilona muddat taqdim etadi.</p>
          <p><strong>4.9.</strong> To‘lov kechikishi davom etgan hollarda, Ijrochi qonunchilik va shartnoma doirasida xizmat ko‘rsatishni vaqtincha to‘xtatish masalasini ko‘rib chiqishi mumkin. Bunda ko‘rsatilmagan xizmatlar uchun asossiz haq undirilmaydi.</p>
        </section>

        <!-- 5-BO‘LIM -->
        <section class="doc-section">
          <h2 class="section-title">5-BO‘LIM. IJROCHINING MAJBURIYATLARI</h2>
          <p><strong>5.1.</strong> Ijrochi quyidagi majburiyatlarni oladi:</p>
          <ol class="doc-ol">
            <li>Shartnomada belgilangan ta'lim xizmatlarini tashkil etish.</li>
            <li>O‘quv jarayonini tasdiqlangan dastur asosida olib borish.</li>
            <li>Malakali va tegishli bilimga ega o‘qituvchilarni jalb qilish.</li>
            <li>Dars jadvali va ta'lim shartlari haqida Buyurtmachiga ma'lumot berish.</li>
            <li>O‘quvchiga hurmat bilan munosabatda bo‘lish.</li>
            <li>O‘quvchining shaxsiy ma'lumotlarini qonunchilik talablariga muvofiq himoya qilish.</li>
            <li>Dars bekor qilinganda yoki o‘zgartirilganda oldindan xabar berish.</li>
            <li>Ta'lim xizmatlari sifatiga oid murojaatlarni ko‘rib chiqish.</li>
            <li>Buyurtmachiga to‘lovlar va qarzdorlik haqida aniq ma'lumot berish.</li>
            <li>Shartnomani bekor qilish va pulni qaytarish bo‘yicha murojaatlarni belgilangan tartibda ko‘rib chiqish.</li>
          </ol>
          <p><strong>5.2.</strong> Ijrochi o‘quv jarayonida o‘quvchining sha'ni, qadr-qimmati va qonuniy manfaatlarini hurmat qilishi shart.</p>
          <p><strong>5.3.</strong> Ijrochi o‘quvchining bilim darajasini aniqlash uchun test va baholash mashg‘ulotlarini tashkil qilishi mumkin.</p>
          <p><strong>5.4.</strong> Ijrochi ta'lim xizmatlarini ko‘rsatish bilan bog‘liq muammolarni imkon qadar qisqa muddatda bartaraf etishga harakat qiladi.</p>
        </section>

        <!-- 6-BO‘LIM -->
        <section class="doc-section">
          <h2 class="section-title">6-BO‘LIM. IJROCHINING HUQUQLARI</h2>
          <p><strong>6.1.</strong> Ijrochi quyidagi huquqlarga ega:</p>
          <ol class="doc-ol">
            <li>Ko‘rsatilgan ta'lim xizmatlari uchun haq talab qilish.</li>
            <li>O‘quvchidan ichki tartib-qoidalarga rioya qilishni talab qilish.</li>
            <li>O‘quv jarayonini tashkil qilish uchun zarur ma'lumotlarni olish.</li>
            <li>O‘quvchining bilim darajasini baholash.</li>
            <li>Dars jadvalini kelishilgan tartibda o‘zgartirish.</li>
            <li>O‘quvchining xavfsizligiga tahdid tug‘ilganda tegishli choralar ko‘rish.</li>
            <li>Shartnoma shartlari jiddiy buzilganda Buyurtmachiga yozma ogohlantirish yuborish.</li>
          </ol>
          <p><strong>6.2.</strong> O‘quvchining ichki tartibni buzishi holatida Ijrochi dastlab ogohlantirish berishi va muammoni hal qilishga imkon yaratishi lozim.</p>
          <p><strong>6.3.</strong> Ijrochi o‘quvchini kamsitish, haqoratlash yoki unga nisbatan noqonuniy bosim o‘tkazishga haqli emas.</p>
          <p><strong>6.4.</strong> Ijrochi qonunchilikda belgilangan iste'molchi huquqlarini cheklovchi talablarni qo‘yishi mumkin emas.</p>
        </section>

        <!-- 7-BO‘LIM -->
        <section class="doc-section">
          <h2 class="section-title">7-BO‘LIM. BUYURTMACHINING HUQUQLARI</h2>
          <p><strong>7.1.</strong> Buyurtmachi quyidagi huquqlarga ega:</p>
          <ol class="doc-ol">
            <li>Ta'lim xizmatlari haqida to‘liq ma'lumot olish.</li>
            <li>Kurs dasturi va dars jadvali bilan tanishish.</li>
            <li>Sifatli ta'lim xizmatlarini talab qilish.</li>
            <li>O‘quvchining bilim darajasi va o‘zlashtirishi haqida ma'lumot olish.</li>
            <li>Ta'lim jarayoniga oid savollar bilan murojaat qilish.</li>
            <li>Dars jadvalidagi o‘zgarishlar haqida xabardor bo‘lish.</li>
            <li>Shartnomani qonunchilik va ushbu shartnoma asosida bekor qilish.</li>
            <li>Asos mavjud bo‘lganda foydalanilmagan xizmatlar uchun pulni qaytarishni talab qilish.</li>
            <li>O‘z huquqlari buzilgan taqdirda vakolatli organlarga murojaat qilish.</li>
          </ol>
          <p><strong>7.2.</strong> Voyaga yetmagan o‘quvchining qonuniy vakili uning ta'lim jarayoniga oid muhim masalalar bo‘yicha ma'lumot olishga haqli.</p>
          <p><strong>7.3.</strong> Buyurtmachi Ijrochining xizmatlari sifati yuzasidan yozma yoki elektron murojaat yuborishi mumkin.</p>
        </section>

        <!-- 8-BO‘LIM -->
        <section class="doc-section">
          <h2 class="section-title">8-BO‘LIM. BUYURTMACHINING VA O‘QUVCHINING MAJBURIYATLARI</h2>
          <p><strong>8.1.</strong> Buyurtmachi quyidagi majburiyatlarni oladi:</p>
          <ol class="doc-ol">
            <li>Shartnomada belgilangan to‘lovlarni o‘z vaqtida amalga oshirish.</li>
            <li>Shartnomani tuzishda to‘g‘ri ma'lumotlarni taqdim etish.</li>
            <li>Dars jadvali va ichki tartib-qoidalarga rioya qilish.</li>
            <li>O‘quvchining mashg‘ulotlarga muntazam qatnashishini ta'minlash.</li>
            <li>Darslarda qatnashish imkoni bo‘lmaganida Ijrochiga xabar berish.</li>
            <li>Ta'lim jarayoniga tegishli murojaatlarni o‘z vaqtida bildirish.</li>
            <li>Markaz mulkiga ehtiyotkorlik bilan munosabatda bo‘lish.</li>
          </ol>
          <p><strong>8.2.</strong> O‘quvchi boshqa o‘quvchilarning ta'lim olishiga xalaqit bermasligi, o‘qituvchilar va markaz xodimlariga hurmat bilan munosabatda bo‘lishi kerak.</p>
          <p><strong>8.3.</strong> O‘quvchi topshiriqlarni bajarish, darslarda faol ishtirok etish va o‘z bilimini rivojlantirishga harakat qilishi lozim.</p>
          <p><strong>8.4.</strong> O‘quvchi markaz mulkiga qasddan zarar yetkazgan taqdirda, yetkazilgan zarar qonunchilikda belgilangan tartibda aniqlanadi va qoplanadi.</p>
          <p><strong>8.5.</strong> Voyaga yetmagan o‘quvchining qonuniy vakili uning xavfsizligi, darsga kelishi va ketishi bilan bog‘liq zarur tashkiliy masalalarda markaz bilan hamkorlik qiladi.</p>
        </section>

        <!-- 9-BO‘LIM -->
        <section class="doc-section">
          <h2 class="section-title">9-BO‘LIM. DAVOMAT, QOLDIRILGAN DARSLAR VA KURSNI MUZLATISH</h2>
          <p><strong>9.1.</strong> O‘quvchi darslarda belgilangan jadval asosida qatnashishi kerak.</p>
          <p><strong>9.2.</strong> O‘quvchi kasallik, oilaviy vaziyat yoki boshqa uzrli sabab tufayli darsga qatnasha olmasa, Buyurtmachi bu haqda Ijrochiga imkon qadar oldindan xabar beradi.</p>
          <p><strong>9.3.</strong> Qoldirilgan darsni boshqa guruh yoki vaqtga ko‘chirish imkoniyati mavjud bo‘lsa, Tomonlar o‘zaro kelishuv asosida bunday imkoniyatdan foydalanishi mumkin.</p>
          <p><strong>9.4.</strong> O‘quvchi sababsiz ravishda darsga kelmaganligi o‘z-o‘zidan Ijrochining darsni bekor qilganligini anglatmaydi.</p>
          <p><strong>9.5.</strong> O‘quvchi qatnashmagan, biroq jadval bo‘yicha o‘tkazilgan darslar bo‘yicha hisob-kitob kurs shartlari va qonunchilik talablariga muvofiq amalga oshiriladi.</p>
          <p><strong>9.6.</strong> Kursni vaqtincha muzlatish quyidagi hollarda kelishilishi mumkin:</p>
          <ul class="doc-list">
            <li>O‘quvchining kasalligi;</li>
            <li>Uzoq muddatli safar;</li>
            <li>Oilaviy sharoit;</li>
            <li>Boshqa asosli sabablar.</li>
          </ul>
          <p><strong>9.7.</strong> Kursni muzlatish muddati va davom ettirish sanasi Tomonlar tomonidan yozma yoki elektron shaklda kelishiladi.</p>
          <p><strong>9.8.</strong> Kurs muzlatilgan davrda foydalanilmagan darslar bo‘yicha hisob-kitob qayta ko‘rib chiqiladi.</p>
          <p><strong>9.9.</strong> Ijrochi darsni o‘tkaza olmagan holatlarda o‘quvchiga muqobil dars yoki tegishli qayta hisob-kitob taklif qiladi.</p>
        </section>

        <!-- 10-BO‘LIM -->
        <section class="doc-section">
          <h2 class="section-title">10-BO‘LIM. SHARTNOMANI BEKOR QILISH TARTIBI</h2>
          <p><strong>10.1.</strong> Ushbu shartnoma quyidagi hollarda bekor qilinishi mumkin:</p>
          <ul class="doc-list">
            <li>a) Tomonlarning o‘zaro kelishuvi bilan;</li>
            <li>b) Buyurtmachining tashabbusi bilan;</li>
            <li>c) Ijrochining tashabbusi bilan qonunchilikda nazarda tutilgan asoslar mavjud bo‘lganda;</li>
            <li>d) Tomonlardan biri shartnoma shartlarini jiddiy ravishda buzganida;</li>
            <li>e) Xizmatlarni davom ettirish imkonsiz bo‘lib qolgan holatlarda.</li>
          </ul>
          <p><strong>10.2. Buyurtmachining tashabbusi bilan bekor qilish.</strong> Buyurtmachi kurs davomida istalgan vaqtda shartnomani bekor qilish haqida Ijrochiga yozma yoki elektron murojaat yuborishi mumkin. Murojaatda quyidagilar ko‘rsatiladi:</p>
          <ul class="doc-list">
            <li>Buyurtmachining F.I.Sh.;</li>
            <li>Shartnoma raqami;</li>
            <li>Bekor qilish sababi;</li>
            <li>Bekor qilish istalgan sana;</li>
            <li>Pul qaytarilishi talab qilinsa, tegishli rekvizitlar.</li>
          </ul>
          <p><strong>10.3.</strong> Ijrochi murojaatni qabul qilganidan keyin xizmatlar bo‘yicha hisob-kitobni tayyorlaydi va Buyurtmachiga taqdim etadi.</p>
          <p><strong>10.4. Ijrochining tashabbusi bilan bekor qilish.</strong> Ijrochi quyidagi holatlarda shartnomani bekor qilish masalasini ko‘rib chiqishi mumkin:</p>
          <ul class="doc-list">
            <li>Buyurtmachi to‘lov majburiyatlarini jiddiy ravishda bajarmasa;</li>
            <li>O‘quvchi markazning xavfsizlik va tartib-qoidalarini takroran hamda jiddiy buzsa;</li>
            <li>O‘quv jarayoniga yoki boshqa shaxslarning huquqlariga jiddiy zarar yetkazilsa;</li>
            <li>Xizmat ko‘rsatish qonuniy yoki obyektiv sabablarga ko‘ra imkonsiz bo‘lib qolsa.</li>
          </ul>
          <p><strong>10.5.</strong> Imkon mavjud bo‘lgan hollarda Ijrochi avval yozma ogohlantirish yuboradi va muammoni bartaraf etish uchun oqilona muddat beradi.</p>
          <p><strong>10.6.</strong> Ijrochining aybi bilan xizmatlar ko‘rsatilmasligi yoki shartnoma shartlari jiddiy buzilishi natijasida bekor qilish yuz bersa, Buyurtmachining qonuniy talab va huquqlari saqlanadi.</p>
          <p><strong>10.7.</strong> Shartnomani bekor qilish to‘g‘risidagi murojaatning yuborilishi yoki qabul qilinishi o‘z-o‘zidan barcha moliyaviy majburiyatlarni tugatmaydi. Yakuniy hisob-kitob tegishli huquqiy asoslar bo‘yicha amalga oshiriladi.</p>
          <p><strong>10.8.</strong> Shartnoma bekor qilingandan so‘ng Tomonlar o‘zaro hisob-kitoblarni amalga oshiradilar.</p>
        </section>

        <!-- 11-BO‘LIM -->
        <section class="doc-section">
          <h2 class="section-title">11-BO‘LIM. PULNI QAYTARISH VA HISOB-KITOB TARTIBI</h2>
          <p><strong>11.1. Umumiy qoida.</strong> Shartnoma bekor qilinganida yoki xizmatlar tegishli darajada ko‘rsatilmaganida to‘langan pul mablag‘larini qaytarish masalasi amalda ko‘rsatilgan xizmatlar, to‘lov hujjatlari, asoslangan xarajatlar va amaldagi qonunchilik asosida hal qilinadi.</p>
          
          <p><strong>11.2. To‘liq pul qaytarilishi mumkin bo‘lgan holatlar:</strong></p>
          <ul class="doc-list">
            <li>a) Ijrochi kursni boshlash imkoniga ega bo‘lmasa va muqobil xizmatni Buyurtmachi qabul qilmasa;</li>
            <li>b) Ijrochi o‘z faoliyatini to‘xtatib, shartnomada nazarda tutilgan xizmatlarni ko‘rsata olmasa;</li>
            <li>c) Buyurtmachiga xizmat umuman ko‘rsatilmagan va uni ko‘rsatish imkonsiz bo‘lib qolgan bo‘lsa;</li>
            <li>d) Qonunchilikda to‘liq qaytarish talab qilinadigan boshqa holatlar yuzaga kelsa.</li>
          </ul>

          <p><strong>11.3. Qisman pul qaytarilishi mumkin bo‘lgan holatlar.</strong> Buyurtmachi kurs boshlanganidan keyin shartnomani bekor qilsa, quyidagi hisob-kitob amalga oshiriladi:</p>
          <ul class="doc-list">
            <li>Haqiqatda ko‘rsatilgan darslar qiymati aniqlanadi;</li>
            <li>Oldindan to‘langan mablag‘ hisobga olinadi;</li>
            <li>Qonunchilik ruxsat bergan va hujjatlar bilan tasdiqlangan, qaytarib bo‘lmaydigan bevosita xarajatlar mavjud bo‘lsa, ular alohida ko‘rib chiqiladi;</li>
            <li>Foydalanilmagan xizmatlar qiymati bo‘yicha qaytarilishi lozim bo‘lgan mablag‘ aniqlanadi.</li>
          </ul>

          <div class="formula-box">
            <strong>11.4. Hisob-kitob formulasi:</strong><br>
            <code>Qaytariladigan summa = To‘langan summa − Ko‘rsatilgan xizmatlar qiymati − Qonuniy asoslangan va hujjatlashtirilgan chegirmalar.</code><br>
            <em>Bunda qonunchilikda belgilangan iste'molchi huquqlari ustuvor hisoblanadi.</em>
          </div>

          <p><strong>11.5. Hisob-kitob namunasi:</strong></p>
          <p class="calc-example">
            Kursning umumiy qiymati: <strong>${formattedTotalAmount} so‘m</strong>.<br>
            Jami darslar: <strong>${totalLessons} ta</strong>.<br>
            Bir darsning hisob-kitob qiymati: <strong>${formattedPerLessonAmount} so‘m</strong>.<br>
            <em>Misol tariqasida, agar o‘quvchi 12 ta darsda qatnashgan bo‘lsa:</em><br>
            • To‘langan summa: ${formattedTotalAmount} so‘m.<br>
            • 12 ta ko‘rsatilgan dars qiymati: ${(perLessonAmount * 12).toLocaleString('uz-UZ')} so‘m.<br>
            • Qolgan xizmatlar qiymati: ${(totalAmount - (perLessonAmount * 12)).toLocaleString('uz-UZ')} so‘m.<br>
            Qonuniy va hujjatlashtirilgan boshqa chegirmalar mavjud bo‘lmasa, ${(totalAmount - (perLessonAmount * 12)).toLocaleString('uz-UZ')} so‘m qaytarish uchun hisob-kitob summasi sifatida olinadi. Ushbu misol shartnomadagi hisob-kitob modelini tushuntirish uchun keltirilgan. Amaldagi qonunchilik, jumladan Fuqarolik kodeksining 707-moddasi va iste'molchi huquqlariga oid maxsus qoidalar hisobga olinadi.
          </p>

          <p><strong>11.6. Pul qaytarilmaydigan yoki qaytarilishi talab qilinmaydigan holatlar.</strong> Qonunchilikda boshqacha tartib belgilanmagan bo‘lsa, quyidagi summalar qaytarilmaydigan qism sifatida hisoblanishi mumkin:</p>
          <ul class="doc-list">
            <li>a) Haqiqatda ko‘rsatilgan va qiymati hisob-kitob qilingan darslar;</li>
            <li>b) Buyurtmachi alohida rozilik bildirgan va haqiqatda taqdim etilgan qo‘shimcha xizmatlar qiymati;</li>
            <li>c) Qonunchilik asosida ushlab qolinishi mumkin bo‘lgan, hujjatlar bilan tasdiqlangan bevosita xarajatlar.</li>
          </ul>

          <p><strong>11.7.</strong> O‘quvchining darsga kelmaganligi sababli foydalanilmagan darslar qiymatini avtomatik ravishda to‘liq ushlab qolish mumkin emas. Bunday holatlarda tegishli shartlar, darsning amalda tashkil etilgani va qonunchilik talablari hisobga olinadi.</p>
          <p><strong>11.8.</strong> Ijrochi tomonidan bekor qilingan yoki sifatsiz ko‘rsatilgan xizmatlar uchun Buyurtmachidan haq undirish masalasi qonunchilikka muvofiq hal etiladi.</p>
          <p><strong>11.9.</strong> Ijrochi qaytarilishi lozim bo‘lgan pul mablag‘lari bo‘yicha hisob-kitobni Buyurtmachiga tushuntirishi shart.</p>
          <p><strong>11.10.</strong> Pul mablag‘larini qaytarish Buyurtmachining murojaati va zarur to‘lov ma'lumotlari olinganidan keyin, odatda, <strong>10 bank ish kuni</strong> ichida amalga oshiriladi, agar qonunchilikda boshqa muddat belgilangan bo‘lmasa.</p>
          <p><strong>11.11.</strong> Pul mablag‘lari imkon qadar dastlabki to‘lov amalga oshirilgan manbaga qaytariladi. Boshqa hisob raqamiga qaytarish zarurati yuzaga kelganda, to‘lov egasining shaxsi va tegishli vakolati tekshiriladi.</p>
          <p><strong>11.12.</strong> Pulni qaytarish muddatining kechikishi qonunchilikda nazarda tutilgan javobgarlikni keltirib chiqarishi mumkin.</p>
          <p><strong>11.13.</strong> Ijrochi Buyurtmachidan qonunchilikda belgilangan iste'molchi huquqlarini cheklovchi shartlarga rozilik berishni talab qilishi mumkin emas.</p>
        </section>

        <!-- 12-BO‘LIM -->
        <section class="doc-section">
          <h2 class="section-title">12-BO‘LIM. TOMONLARNING JAVOBGARLIGI</h2>
          <p><strong>12.1.</strong> Tomonlar shartnoma majburiyatlarini bajarmagan yoki tegishli darajada bajarmagan taqdirda O‘zbekiston Respublikasi qonunchiligiga muvofiq javobgar bo‘ladilar.</p>
          <p><strong>12.2.</strong> Ijrochi quyidagi holatlar uchun javobgar bo‘lishi mumkin:</p>
          <ul class="doc-list">
            <li>Ta'lim xizmatlarini asossiz ravishda ko‘rsatmaslik;</li>
            <li>Darslarni kelishilgan tartibda tashkil qilmaslik;</li>
            <li>Buyurtmachiga noto‘g‘ri ma'lumot berish;</li>
            <li>O‘quvchining qonuniy huquqlarini buzish;</li>
            <li>Shaxsiy ma'lumotlarni qonunga xilof ravishda oshkor qilish;</li>
            <li>O‘z aybi bilan yetkazilgan zararni qoplamaslik.</li>
          </ul>
          <p><strong>12.3.</strong> Buyurtmachi quyidagi holatlar uchun javobgar bo‘lishi mumkin:</p>
          <ul class="doc-list">
            <li>To‘lov majburiyatlarini bajarmaslik;</li>
            <li>Ataylab noto‘g‘ri ma'lumot taqdim etish;</li>
            <li>Markaz mulkiga qasddan zarar yetkazish;</li>
            <li>O‘quvchining xatti-harakatlari tufayli yetkazilgan va qonunchilikka muvofiq undirilishi mumkin bo‘lgan zararni qoplamaslik.</li>
          </ul>
          <p><strong>12.4.</strong> Zarar miqdori tegishli dalillar va hujjatlar asosida aniqlanadi.</p>
          <p><strong>12.5.</strong> Tomonlar qonunchilikda nazarda tutilgan javobgarlikdan shartnoma orqali asossiz ravishda ozod etilishi mumkin emas.</p>
          <p><strong>12.6.</strong> O‘quvchining kursni tugatmasligi yoki kutilgan natijaga erishmasligi o‘z-o‘zidan Ijrochining xizmatni sifatsiz ko‘rsatganligini anglatmaydi. Biroq xizmatning sifati va shartnoma talablariga muvofiqligi alohida baholanadi.</p>
        </section>

        <!-- 13-BO‘LIM -->
        <section class="doc-section">
          <h2 class="section-title">13-BO‘LIM. FORS-MAJOR HOLATLARI</h2>
          <p><strong>13.1.</strong> Tomonlar o‘z irodasiga bog‘liq bo‘lmagan, oldindan ko‘rish va oldini olish imkonsiz bo‘lgan favqulodda holatlar tufayli majburiyatlarni bajara olmagan taqdirda qonunchilikka muvofiq javobgarlikdan ozod qilinishi mumkin.</p>
          <p><strong>13.2.</strong> Fors-major holatlariga quyidagilar misol bo‘lishi mumkin:</p>
          <ul class="doc-list">
            <li>Tabiiy ofatlar;</li>
            <li>Yong‘in yoki yirik avariyalar;</li>
            <li>Urush va favqulodda holatlar;</li>
            <li>Vakolatli davlat organlarining faoliyatni cheklovchi majburiy qarorlari;</li>
            <li>Tomonlar nazoratidan tashqaridagi boshqa favqulodda hodisalar.</li>
          </ul>
          <p><strong>13.3.</strong> Fors-major holati yuzaga kelgan Tomon ikkinchi Tomonni imkon qadar tezroq xabardor qilishi lozim.</p>
          <p><strong>13.4.</strong> Fors-major holati vaqtida ko‘rsatilmagan xizmatlar bo‘yicha to‘lov va qaytarish masalalari alohida hisob-kitob qilinadi.</p>
          <p><strong>13.5.</strong> Fors-major holati uzoq davom etsa, Tomonlar shartnomani davom ettirish, muddatni o‘zgartirish yoki bekor qilish masalasini kelishib oladilar.</p>
        </section>

        <!-- 14-BO‘LIM -->
        <section class="doc-section">
          <h2 class="section-title">14-BO‘LIM. YAKUNIY QOIDALAR, NIZOLAR VA TOMONLARNING REKVIZITLARI</h2>
          <p><strong>14.1.</strong> Ushbu shartnoma O‘zbekiston Respublikasining amaldagi qonunchiligi asosida talqin qilinadi.</p>
          <p><strong>14.2.</strong> Shartnomaga kiritiladigan o‘zgartirish va qo‘shimchalar Tomonlarning kelishuvi bilan amalga oshiriladi.</p>
          <p><strong>14.3.</strong> Shartnoma yuzasidan yuzaga keladigan nizolar dastlab muzokara va yozma murojaatlar orqali hal qilinadi.</p>
          <p><strong>14.4.</strong> Muzokaralar orqali kelishuvga erishilmagan taqdirda, nizo qonunchilikda belgilangan tartibda vakolatli sud tomonidan ko‘rib chiqiladi.</p>
          <p><strong>14.5.</strong> Tomonlarning yozma yoki elektron murojaatlari, qonunchilikka muvofiq, tegishli huquqiy ahamiyatga ega bo‘lishi mumkin.</p>
          <p><strong>14.6.</strong> Shartnoma elektron shaklda tuzilganida, elektron hujjat va elektron imzolash usulining qonunchilikka muvofiqligi alohida ta'minlanishi lozim.</p>
          <p><strong>14.7.</strong> Ushbu shartnomaning biror bandi qonunchilikka zid deb topilgan taqdirda, qolgan bandlar qonunchilikka zid bo‘lmagan qismi doirasida amal qilishda davom etadi.</p>
          <p><strong>14.8.</strong> Shartnomada nazarda tutilmagan masalalar O‘zbekiston Respublikasi qonunchiligiga muvofiq hal etiladi.</p>
          
          <div class="legal-notice-box">
            <em>Ushbu hujjat namunaviy demo shartnoma hisoblanadi. Vers Study xayoliy tashkilot bo‘lib, hujjat haqiqiy yuridik foydalanish uchun yurist tomonidan tekshirilishi lozim.</em>
          </div>

          <!-- REKVIZITLAR VA IMZOLAR -->
          <h3 class="sub-heading" style="margin-top: 24px;">TOMONLARNING MA'LUMOTLARI VA IMZOLARI</h3>
          
          <div class="parties-grid">
            <!-- IJROCHI -->
            <div class="party-card party-provider">
              <h4 class="party-role">IJROCHI:</h4>
              <div class="party-info">
                <div><strong>Tashkilot nomi:</strong> ${this.organization.name}</div>
                <div><strong>Vakil:</strong> ${adminFullName}</div>
                <div><strong>Yuridik manzil:</strong> ${this.organization.address}</div>
                <div><strong>STIR:</strong> ${this.organization.inn}</div>
                <div><strong>Telefon:</strong> ${this.organization.phone}</div>
                <div><strong>Bank rekvizitlari:</strong> ${this.organization.bank}, MFO: ${this.organization.mfo}, H/r: ${this.organization.account}</div>
              </div>
              <div class="signature-box-container">
                <div class="sig-label">Ijrochi imzosi va muhri:</div>
                <div class="admin-sig-wrapper">
                  <img src="${adminSigImg}" alt="Ijrochi imzosi" class="admin-sig-img" />
                </div>
                <div class="sig-status-badge verified">✓ Tasdiqlangan vakil</div>
              </div>
            </div>

            <!-- BUYURTMACHI -->
            <div class="party-card party-customer">
              <h4 class="party-role">BUYURTMACHI:</h4>
              <div class="party-info">
                <div><strong>F.I.Sh.:</strong> ${customerFullName}</div>
                <div><strong>Tug‘ilgan sana:</strong> ${birthDate}</div>
                <div><strong>Pasport ma'lumotlari:</strong> ${passportDetails}</div>
                <div><strong>Manzil:</strong> ${customerAddress}</div>
                <div><strong>Telefon:</strong> ${customerPhone}</div>
              </div>

              ${isMinor ? `
                <div class="minor-info-block">
                  <div class="minor-tag">Voyaga yetmagan o‘quvchi ma'lumotlari:</div>
                  <div><strong>O‘quvchi F.I.Sh.:</strong> ${studentFullName}</div>
                  <div><strong>O‘quvchi tug‘ilgan sanasi:</strong> ${studentBirthDate}</div>
                  <div><strong>Qonuniy vakil F.I.Sh.:</strong> ${guardianFullName}</div>
                  <div><strong>Qarindoshlik / Vakillik:</strong> ${guardianRelation}</div>
                  <div><strong>Vakil telefoni:</strong> ${guardianPhone}</div>
                </div>
              ` : ''}

              <div class="signature-box-container">
                <div class="sig-label">${isMinor ? "Qonuniy vakil imzosi:" : "Buyurtmachi imzosi:"}</div>
                <div class="customer-sig-wrapper" id="contractCustomerSigBox">
                  ${customerSigImg 
                    ? `<img src="${customerSigImg}" alt="Mijoz imzosi" class="customer-sig-img" />` 
                    : `<div class="sig-placeholder" id="sigPlaceholderBtn">
                         <span class="sig-icon">✍️</span>
                         <span>Imzo kiritilmagan</span>
                         <button type="button" class="btn-sign-inline" onclick="window.ContractApp && window.ContractApp.openSignatureModal()">Imzolash uchun bosing</button>
                       </div>`
                  }
                </div>
                
                <div class="signed-timestamp" id="signedTimestampBlock" style="${customerSigImg ? '' : 'display: none;'}">
                  <div><strong>Imzolangan sana:</strong> <span id="valSignedDate">${signedDate || '—'}</span></div>
                  <div><strong>Imzolangan vaqt:</strong> <span id="valSignedTime">${signedTime || '—'}</span></div>
                </div>
              </div>
            </div>
          </div>

          <!-- FINAL CONFIRMATION TEXT -->
          <div class="doc-conclusion">
            <h4 class="conclusion-heading">SHARTNOMANI TASDIQLASH</h4>
            <p>Buyurtmachi ushbu shartnoma bilan tanishganligini, uning mazmunini tushunganligini va qonunchilikda belgilangan huquqlarini saqlagan holda shartnoma tuzishga roziligini bildiradi. O‘quv markazi vakili va Buyurtmachi tomonidan tegishli tartibda imzolanganidan so‘ng shartnoma kuchga kiradi.</p>
            <div class="brand-motto">VERS STUDY — BILIM SARI BIRGALIKDA!</div>
          </div>
        </section>
      </div>
    `;
  }
};

/**
 * Sonni o'zbek tilidagi so'zga aylantirish (3 600 000 -> uch million olti yuz ming)
 */
function numberToWordsUzbek(num) {
  if (!num || isNaN(num)) return "";
  const ones = ["", "bir", "ikki", "uch", "to‘rt", "besh", "olti", "yetti", "sakkiz", "to‘qqiz"];
  const tens = ["", "o‘n", "yigirma", "o‘ttiz", "qirq", "ellik", "oltmish", "yetmish", "sakson", "to‘qson"];
  
  if (num === 0) return "nol";
  
  function convertGroup(n) {
    let res = "";
    const h = Math.floor(n / 100);
    const t = Math.floor((n % 100) / 10);
    const o = n % 10;
    
    if (h > 0) {
      res += (h === 1 ? "bir yuz " : ones[h] + " yuz ");
    }
    if (t > 0) {
      res += tens[t] + " ";
    }
    if (o > 0) {
      res += ones[o] + " ";
    }
    return res.trim();
  }

  const millions = Math.floor(num / 1000000);
  const thousands = Math.floor((num % 1000000) / 1000);
  const remainder = num % 1000;

  let words = "";
  if (millions > 0) {
    words += convertGroup(millions) + " million ";
  }
  if (thousands > 0) {
    words += convertGroup(thousands) + " ming ";
  }
  if (remainder > 0) {
    words += convertGroup(remainder);
  }
  return words.trim();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ContractTemplate, numberToWordsUzbek };
} else {
  window.ContractTemplate = ContractTemplate;
  window.numberToWordsUzbek = numberToWordsUzbek;
}
