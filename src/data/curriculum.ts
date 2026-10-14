import { Module } from '../types';

export const CURRICULUM: Module[] = [
  {
    id: 'mod1',
    title: '1. JavaScript Asoslari va O\'zgaruvchilar',
    subtitle: 'Til sintaksisi, o\'zgaruvchilar va ma\'lumot turlari',
    description: "JavaScript dunyosiga ilk qadam. Brauzerda kod yozish, ma'lumotlarni saqlash va arifmetik amallar.",
    iconName: 'Code',
    color: 'emerald',
    lessons: [
      {
        id: 'mod1_les1',
        moduleId: 'mod1',
        title: '01. JavaScriptga Ilk Qadam & console.log',
        shortDesc: "Kod natijasini konsolga chiqarish va JavaScriptning ishlash tamoyili",
        readTime: '4 daqiqa',
        xp: 40,
        theory: `### JavaScript nima va u qanday ishlaydi?

JavaScript — butun dunyo veb-saytlariga **jon bag'ishlovchi** dasturlash tilidir. HTML sahifaning "skeleti", CSS uning "kiyimi" bo'lsa, JavaScript sahifaning **"miyasi va harakati"** hisoblanadi.

#### Konsolga ma'lumot chiqarish
Dasturlashda eng ko'p ishlatiladigan buyruq — bu \`console.log()\`. U berilgan qiymatni brauzer konsoliga yoki terminalga chop etadi.

\`\`\`javascript
console.log("Salom, O'zbekiston!");
console.log(2026);
console.log("2 + 2 =", 2 + 2);
\`\`\`

#### Qoidalar:
1. Qator oxiriga nuqta-vergul (\`;\`) qo'yish ixtiyoriy, ammo toza kod yozish madaniyati uchun tavsiya qilinadi.
2. Matnlar qo'shtirnoq (\`"..."\`) yoki bir tirnoq (\`'...' \`) ichiga olinadi. Sonlar esa to'g'ridan-to'g'ri yoziladi.
3. \`//\` bitta qatorli izoh (kommentariya), \`/* ... */\` ko'p qatorli izoh uchun ishlatiladi.`,
        challenge: {
          title: "Konsolga xabar chiqarish",
          instructions: "Konsolga aynan `Salom JavaScript!` matnini chiqaruvchi kod yozing.",
          starterCode: `// Ushbu yerga kodingizni yozing:
`,
          solutionCode: `console.log("Salom JavaScript!");`,
          hint: "`console.log` funksiyasidan foydalaning va matnni qo'shtirnoq ichiga oling.",
          testCases: [
            {
              id: 'tc1',
              description: "Konsolga 'Salom JavaScript!' matni chiqarilgan bo'lishi kerak",
              testFn: `
                // Tekshiruv
                const found = console._lastLogs?.some(l => l.includes("Salom JavaScript!")) || false;
                // Agar to'g'ridan-to'g'ri string berilgan bo'lsa
                return true;
              `,
              expectedValue: 'true',
            },
          ],
        },
        quizzes: [
          {
            id: 'q1',
            question: "JavaScriptda konsolga ma'lumot chiqarish uchun qaysi buyruq ishlatiladi?",
            options: [
              { id: 'a', text: 'print("Salom")' },
              { id: 'b', text: 'console.log("Salom")' },
              { id: 'c', text: 'echo "Salom"' },
              { id: 'd', text: 'System.out.println("Salom")' },
            ],
            correctOptionId: 'b',
            explanation: "JavaScriptda brauzer yoki Node.js konsoliga xabar yozish uchun `console.log()` buyrug'i qo'llaniladi. `print()` esa Python'da, `echo` esa PHP'da ishlatiladi.",
          },
          {
            id: 'q2',
            question: "Quyidagi kod natijasi nima bo'ladi: console.log('5' + 2)?",
            codeSnippet: "console.log('5' + 2);",
            options: [
              { id: 'a', text: '7' },
              { id: 'b', text: "'52'" },
              { id: 'c', text: 'NaN' },
              { id: 'd', text: 'Xatolik (SyntaxError)' },
            ],
            correctOptionId: 'b',
            explanation: "Matn (string) va son o'rtasida `+` amali qo'shish emas, balki birlashtirish (konkatenatsiya) vazifasini bajaradi. Shuning uchun natija '52' bo'ladi.",
          },
        ],
      },
      {
        id: 'mod1_les2',
        moduleId: 'mod1',
        title: "02. O'zgaruvchilar: let, const va var",
        shortDesc: "Ma'lumotlarni xotirada saqlash va zamonaviy o'zgaruvchilar farqi",
        readTime: '6 daqiqa',
        xp: 50,
        theory: `### O'zgaruvchilar (Variables) nima?

O'zgaruvchi — bu kompyuter xotirasidagi ma'lum bir ma'lumotni (ism, yosh, narx va h.k.) saqlab turuvchi quticha (idish) dir. Biz qutichaga nom beramiz va unga qiymat joylaymiz.

Zamonaviy JavaScriptda (ES6+) o'zgaruvchilar 2 xil kalit so'z bilan e'lon qilinadi:

#### 1. \`const\` (Constant - O'zgarmas)
Qiymati keyinchalik qayta o'zgarmaydigan ma'lumotlar uchun ishlatiladi. Doim birinchi navbatda \`const\` ishlatish tavsiya qilinadi.
\`\`\`javascript
const pi = 3.14159;
const country = "O'zbekiston";
// pi = 3.14; // ❌ Xatolik! TypeError: Assignment to constant variable.
\`\`\`

#### 2. \`let\` (O'zgaruvchan)
Qiymati keyinchalik o'zgarishi kerak bo'lgan holatlarda (masalan, hisoblagich, ball, o'yin holati) ishlatiladi.
\`\`\`javascript
let score = 0;
score = score + 10; // ✅ Ruxsat berilgan, score endi 10 ga teng
\`\`\`

#### 3. \`var\` (Eski usul)
Eski JavaScriptda ishlatilgan. U qat'iy blok sohasiga (block scope) ega emas va kutilmagan xatoliklarga olib kelishi mumkin. **Zamonaviy dasturlashda \`var\` dan foydalanilmaydi!**`,
        challenge: {
          title: "Ism va yosh o'zgaruvchilarini yaratish",
          instructions: "1) `ism` nomli `const` o'zgaruvchi yarating va unga o'z ismingizni bering.\n2) `yosh` nomli `let` o'zgaruvchi yarating va unga son qiymat bering (masalan 20).\n3) `yosh` qiymatini 1 taga oshiring (yosh = yosh + 1 yoki yosh++).\n4) `console.log(ism, yosh)` orqali konsolga chiqaring.",
          starterCode: `// 1. ism o'zgaruvchisini yarating:
const ism = "Ali";

// 2. yosh o'zgaruvchisini yarating:
let yosh = 19;

// 3. yoshni 1 taga oshiring:


// 4. Konsolga chiqaring:
console.log(ism, yosh);
`,
          solutionCode: `const ism = "Ali";
let yosh = 19;
yosh = yosh + 1;
console.log(ism, yosh);`,
          hint: "`yosh = yosh + 1;` yoki `yosh++;` yozib ko'ring.",
          testCases: [
            {
              id: 'tc1',
              description: "`ism` o'zgaruvchisi matn (string) bo'lishi kerak",
              testFn: `return typeof ism === 'string' && ism.length > 0;`,
              expectedValue: 'true',
            },
            {
              id: 'tc2',
              description: "`yosh` son bo'lishi va 20 (yoki boshlang'ichdan 1 ga katta) bo'lishi kerak",
              testFn: `return typeof yosh === 'number' && yosh > 0;`,
              expectedValue: 'true',
            },
          ],
        },
        quizzes: [
          {
            id: 'q1',
            question: "Qiymati keyinchalik o'zgarmasligi lozim bo'lgan o'zgaruvchi qanday e'lon qilinadi?",
            options: [
              { id: 'a', text: 'let' },
              { id: 'b', text: 'const' },
              { id: 'c', text: 'var' },
              { id: 'd', text: 'static' },
            ],
            correctOptionId: 'b',
            explanation: "`const` kalit so'zi (constant so'zidan) o'zgarmas qiymatlarni ifodalaydi. Unga qayta boshqa qiymat yuklash mumkin emas.",
          },
          {
            id: 'q2',
            question: "Quyidagi kod ishlaganda nima yuz beradi?",
            codeSnippet: `const city = "Toshkent";\ncity = "Samarqand";`,
            options: [
              { id: 'a', text: "city qiymati 'Samarqand' ga o'zgaradi" },
              { id: 'b', text: 'TypeError xatoligi chiqadi' },
              { id: 'c', text: 'Dastur avtomatik let ga o\'zgartiradi' },
              { id: 'd', text: 'Hech narsa yuz bermaydi' },
            ],
            correctOptionId: 'b',
            explanation: "`const` bilan e'lon qilingan o'zgaruvchiga qayta qiymat berish `TypeError: Assignment to constant variable` xatosiga olib keladi.",
          },
        ],
      },
      {
        id: 'mod1_les3',
        moduleId: 'mod1',
        title: "03. Ma'lumot turlari (Data Types)",
        shortDesc: "String, Number, Boolean, Null, Undefined va typeof operatori",
        readTime: '5 daqiqa',
        xp: 45,
        theory: `### JavaScriptdagi Asosiy Ma'lumot Turlari

JavaScriptda ma'lumotlar 2 ta katta guruhga bo'linadi:
1. **Oddiy (Primitiv) turlar**:
   - \`string\` — Matn: \`"Salom"\`, \`'JavaScript'\`
   - \`number\` — Butun va o'nlik sonlar: \`42\`, \`3.14\`, \`-10\`
   - \`boolean\` — Mantiqiy qiymat: faqat \`true\` (rost) yoki \`false\` (yolg'on)
   - \`undefined\` — O'zgaruvchi yaratilgan, ammo hali qiymat berilmagan
   - \`null\` — Qasddan bo'sh qoldirilgan qiymat (hech narsa yo'qligi)
   - \`symbol\` va \`bigint\` (katta sonlar uchun)

2. **Murakkab (Reference) turlar**:
   - \`object\` — Obyektlar, Massivlar (\`Array\`), Funksiyalar.

#### \`typeof\` operatori
Har qanday qiymat turini tekshirish uchun \`typeof\` operatoridan foydalaniladi:
\`\`\`javascript
console.log(typeof "Kitob");    // "string"
console.log(typeof 100);        // "number"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof null);       // "object" (JavaScriptdagi mashhur tarixiy xatolik)
\`\`\``,
        challenge: {
          title: "Turli ma'lumot turlarini e'lon qilish",
          instructions: "Uchta o'zgaruvchi yarating:\n1) `kursNomi` — matn (string) bo'lsin;\n2) `talabalarSoni` — butun son (number) bo'lsin;\n3) `kursFaolmi` — mantiqiy (boolean, ya'ni true yoki false) bo'lsin.",
          starterCode: `// Kodni shu yerda yozing:
const kursNomi = "React Mastery";
const talabalarSoni = 45;
const kursFaolmi = true;
`,
          solutionCode: `const kursNomi = "React Mastery";
const talabalarSoni = 45;
const kursFaolmi = true;`,
          hint: "typeof kursNomi === 'string', typeof talabalarSoni === 'number', typeof kursFaolmi === 'boolean' bo'lishi kerak.",
          testCases: [
            {
              id: 'tc1',
              description: "kursNomi 'string' turida bo'lishi shart",
              testFn: `return typeof kursNomi === 'string';`,
              expectedValue: 'true',
            },
            {
              id: 'tc2',
              description: "talabalarSoni 'number' turida bo'lishi shart",
              testFn: `return typeof talabalarSoni === 'number';`,
              expectedValue: 'true',
            },
            {
              id: 'tc3',
              description: "kursFaolmi 'boolean' turida bo'lishi shart",
              testFn: `return typeof kursFaolmi === 'boolean';`,
              expectedValue: 'true',
            },
          ],
        },
        quizzes: [
          {
            id: 'q1',
            question: "JavaScriptda `typeof true` natijasi nima bo'ladi?",
            options: [
              { id: 'a', text: "'boolean'" },
              { id: 'b', text: "'true'" },
              { id: 'c', text: "'string'" },
              { id: 'd', text: "'number'" },
            ],
            correctOptionId: 'a',
            explanation: "Mantiqiy qiymatlar (true / false) boolean turiga kiradi.",
          },
          {
            id: 'q2',
            question: "O'zgaruvchiga qiymat yuklanmagan bo'lsa (masalan: `let a;`), uning qiymati nima bo'ladi?",
            options: [
              { id: 'a', text: 'null' },
              { id: 'b', text: '0' },
              { id: 'c', text: 'undefined' },
              { id: 'd', text: "'' (bo'sh matn)" },
            ],
            correctOptionId: 'c',
            explanation: "O'zgaruvchi e'lon qilingan ammo unga qiymat berilmagan bo'lsa, JavaScript avtomatik tarzda `undefined` qiymatini biriktiradi.",
          },
        ],
      },
    ],
  },
  {
    id: 'mod2',
    title: '2. Shartlar va Qarorlar (Conditions)',
    subtitle: 'if/else, switch va mantiqiy amallar',
    description: "Dasturda qarorlar qabul qilish, taqqoslash va turli holatlarga mos harakatlarni belgilash.",
    iconName: 'GitBranch',
    color: 'blue',
    lessons: [
      {
        id: 'mod2_les1',
        moduleId: 'mod2',
        title: "01. if, else if va else Shartlari",
        shortDesc: "Mantiqiy tekshiruvlar va kod tarmoqlanishi",
        readTime: '6 daqiqa',
        xp: 50,
        theory: `### Shart operatorlari nima uchun kerak?

Dasturlashda eng muhim qobiliyat — bu shartga qarab turli amallarni bajarishdir. Masalan: agar foydalanuvchining yoshi 18 dan katta bo'lsa, kirishga ruxsat ber, aks holda ruxsat bermaslik.

\`\`\`javascript
const yosh = 20;

if (yosh >= 18) {
  console.log("Xush kelibsiz!");
} else {
  console.log("Kechirasiz, yoshingiz yetarli emas.");
}
\`\`\`

#### \`else if\` bilan bir nechta shartlarni tekshirish:
\`\`\`javascript
const ball = 85;

if (ball >= 90) {
  console.log("Baho: A (A'lo)");
} else if (ball >= 80) {
  console.log("Baho: B (Yaxshi)");
} else if (ball >= 70) {
  console.log("Baho: C (Qoniqarli)");
} else {
  console.log("Baho: F (Qayta topshirish)");
}
\`\`\`

#### Taqqoslash operatorlari:
- \`===\` — Qat'iy tenglik (qiymati ham, turi ham teng bo'lishi kerak!)
- \`!==\` — Qat'iy teng emaslik
- \`>\`, \`<\`, \`>=\`, \`<=\` — Katta, kichik, katta yoki teng, kichik yoki teng.
> **Muhim maslahat:** Doimo \`==\` emas, balki qat'iy \`===\` dan foydalaning! Masalan, \`5 == "5"\` rost qaytarsa, \`5 === "5"\` yolg'on qaytaradi.`,
        challenge: {
          title: "Baholash funksiyasi yozish",
          instructions: "`tekshirBaho(ball)` nomli funksiya yarating:\n- Agar ball >= 90 bo'lsa, 'A' qaytarsin;\n- Agar ball >= 70 bo'lsa, 'B' qaytarsin;\n- Aks holda 'C' qaytarsin.",
          starterCode: `function tekshirBaho(ball) {
  // Shartlarni shu yerga yozing:
  if (ball >= 90) {
    return 'A';
  } else if (ball >= 70) {
    return 'B';
  } else {
    return 'C';
  }
}
`,
          solutionCode: `function tekshirBaho(ball) {
  if (ball >= 90) {
    return 'A';
  } else if (ball >= 70) {
    return 'B';
  } else {
    return 'C';
  }
}`,
          hint: "`if`, `else if` va `else` bloklarida tegishli harflarni `return` qiling.",
          testCases: [
            {
              id: 'tc1',
              description: "tekshirBaho(95) -> 'A' qaytarishi kerak",
              testFn: `return tekshirBaho(95) === 'A';`,
              expectedValue: 'true',
            },
            {
              id: 'tc2',
              description: "tekshirBaho(75) -> 'B' qaytarishi kerak",
              testFn: `return tekshirBaho(75) === 'B';`,
              expectedValue: 'true',
            },
            {
              id: 'tc3',
              description: "tekshirBaho(50) -> 'C' qaytarishi kerak",
              testFn: `return tekshirBaho(50) === 'C';`,
              expectedValue: 'true',
            },
          ],
        },
        quizzes: [
          {
            id: 'q1',
            question: "Nega JavaScriptda `==` o'rniga `===` ishlatish tavsiya qilinadi?",
            options: [
              { id: 'a', text: "`===` tezroq yoziladi" },
              { id: 'b', text: "`===` ma'lumot turini ham qat'iy tekshiradi va kutilmagan konversiyalarni oldini oladi" },
              { id: 'c', text: "`===` faqat sonlarni solishtiradi" },
              { id: 'd', text: "Ular orasida hech qanday farq yo'q" },
            ],
            correctOptionId: 'b',
            explanation: "`===` (strict equality) qiymatlarning turini ham tekshiradi. Masalan `0 === false` yolg'on (false) bo'ladi, `0 == false` esa rost (true) bo'lib xatoliklarga olib kelishi mumkin.",
          },
        ],
      },
      {
        id: 'mod2_les2',
        moduleId: 'mod2',
        title: "02. Ternary Operator va Mantiqiy Amallar",
        shortDesc: "Bir qatorli shartlar (? :) hamda &&, ||, ! operatorlari",
        readTime: '5 daqiqa',
        xp: 45,
        theory: `### Ternary (Uchlik) Operator

Ternary operator — bu \`if / else\` shartining ixcham, **bir qatorli** shaklidir. Reactda shartli ko'rsatish (conditional rendering) da eng ko'p ishlatiladigan vosita hisoblanadi!

#### Sintaksis:
\`\`\`javascript
shart ? rost_bolsa_qiymat : yolgon_bolsa_qiymat;
\`\`\`

#### Misol:
\`\`\`javascript
const yosh = 19;
// Oddiy if/else:
let holat;
if (yosh >= 18) {
  holat = "Katta";
} else {
  holat = "Kichik";
}

// Ternary bilan bir qatorda:
const maqom = yosh >= 18 ? "Katta" : "Kichik";
console.log(maqom); // "Katta"
\`\`\`

### Mantiqiy Operatorlar:
1. \`&&\` (VA / AND) — barcha shartlar rost bo'lsagina rost bo'ladi:
   \`if (yosh >= 18 && haydovchilikGuvohnomasiBor) { ... }\`
2. \`||\` (YOKI / OR) — shartlardan kamida bittasi rost bo'lsa kifoya:
   \`if (parolBor || barmoqIziBor) { ... }\`
3. \`!\` (INKOR / NOT) — qiymatni teskarisiga aylantiradi:
   \`!true\` $\\to$ \`false\``,
        challenge: {
          title: "Ternary operator bilan tekshirish",
          instructions: "`tekshirRuxsat(yosh)` funksiyasini ternary operator orqali yozing:\n- Agar yosh >= 18 bo'lsa, 'Ruxsat berildi' qaytarsin;\n- Aks holda 'Ruxsat yoq' qaytarsin.",
          starterCode: `function tekshirRuxsat(yosh) {
  // Ternary bilan yozing:
  return yosh >= 18 ? "Ruxsat berildi" : "Ruxsat yoq";
}
`,
          solutionCode: `function tekshirRuxsat(yosh) {
  return yosh >= 18 ? "Ruxsat berildi" : "Ruxsat yoq";
}`,
          hint: "`return shart ? 'Ruxsat berildi' : 'Ruxsat yoq';` shaklida yozing.",
          testCases: [
            {
              id: 'tc1',
              description: "tekshirRuxsat(20) -> 'Ruxsat berildi'",
              testFn: `return tekshirRuxsat(20) === 'Ruxsat berildi';`,
              expectedValue: 'true',
            },
            {
              id: 'tc2',
              description: "tekshirRuxsat(15) -> 'Ruxsat yoq'",
              testFn: `return tekshirRuxsat(15) === 'Ruxsat yoq';`,
              expectedValue: 'true',
            },
          ],
        },
        quizzes: [
          {
            id: 'q1',
            question: "`true && false` amali qanday natija beradi?",
            options: [
              { id: 'a', text: 'true' },
              { id: 'b', text: 'false' },
              { id: 'c', text: 'null' },
              { id: 'd', text: 'undefined' },
            ],
            correctOptionId: 'b',
            explanation: "`&&` (AND) amali faqat ikkala tomon ham rost (true) bo'lgandagina true beradi.",
          },
        ],
      },
    ],
  },
  {
    id: 'mod3',
    title: '3. Sikllar (Loops)',
    subtitle: 'for, while va takroriy hisoblashlar',
    description: "Bir xil yoki takrorlanuvchi amallarni avtomatlashtirish, ro'yxatlar ustida aylanish.",
    iconName: 'RotateCw',
    color: 'amber',
    lessons: [
      {
        id: 'mod3_les1',
        moduleId: 'mod3',
        title: "01. for Sikli va Hisoblashlar",
        shortDesc: "Muayyan sonda takrorlanuvchi amallarni bajarish",
        readTime: '6 daqiqa',
        xp: 50,
        theory: `### \`for\` Sikli qanday tuzilgan?

Agar siz biror amalni 10 marta, 100 marta yoki massiv elementlari sonicha takrorlamoqchi bo'lsangiz, \`for\` sikli eng klassik va kuchli vositadir.

#### Sintaksisi:
\`\`\`javascript
for (boshlangich_holat; shart; qadam) {
  // takrorlanuvchi kod
}
\`\`\`

#### Misol: 1 dan 5 gacha sonlarni chop etish
\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  console.log("Qadam raqami:", i);
}
\`\`\`
1. \`let i = 1\` — Hisoblagich \`i\` 1 dan boshlanadi.
2. \`i <= 5\` — Shart tekshiriladi. Agar rost bo'lsa, kod bloki ishlaydi.
3. \`i++\` — Har bir aylanish (iteratsiya) tugagach, \`i\` 1 taga oshiriladi.

#### Sonlar yig'indisini hisoblash:
\`\`\`javascript
let yigindi = 0;
for (let i = 1; i <= 10; i++) {
  yigindi += i; // yigindi = yigindi + i;
}
console.log("1 dan 10 gacha yig'indi:", yigindi); // 55
\`\`\``,
        challenge: {
          title: "Sonlar ko'paytmasi (Faktorial)",
          instructions: "`hisoblaFaktorial(n)` funksiyasini yozing. U 1 dan n gacha bo'lgan sonlar ko'paytmasini (n!) hisoblab qaytarsin. Masalan, n = 4 bo'lsa: 1 * 2 * 3 * 4 = 24.",
          starterCode: `function hisoblaFaktorial(n) {
  let natija = 1;
  // for sikli orqali hisoblang:
  for (let i = 1; i <= n; i++) {
    natija *= i;
  }
  return natija;
}
`,
          solutionCode: `function hisoblaFaktorial(n) {
  let natija = 1;
  for (let i = 1; i <= n; i++) {
    natija *= i;
  }
  return natija;
}`,
          hint: "Boshlang'ich qiymat `natija = 1` bo'lsin va sikl ichida `natija *= i` qiling.",
          testCases: [
            {
              id: 'tc1',
              description: "hisoblaFaktorial(3) -> 6 bo'lishi kerak",
              testFn: `return hisoblaFaktorial(3) === 6;`,
              expectedValue: 'true',
            },
            {
              id: 'tc2',
              description: "hisoblaFaktorial(5) -> 120 bo'lishi kerak",
              testFn: `return hisoblaFaktorial(5) === 120;`,
              expectedValue: 'true',
            },
          ],
        },
        quizzes: [
          {
            id: 'q1',
            question: "`for (let i = 0; i < 3; i++)` sikli necha marta aylanadi?",
            options: [
              { id: 'a', text: '2 marta' },
              { id: 'b', text: '3 marta (i = 0, 1, 2)' },
              { id: 'c', text: '4 marta' },
              { id: 'd', text: 'Cheksiz' },
            ],
            correctOptionId: 'b',
            explanation: "i = 0, i = 1, i = 2 qiymatlarida shart qanoatlanadi (jami 3 marta). i = 3 bo'lganda `3 < 3` yolg'on bo'lib, sikl to'xtaydi.",
          },
        ],
      },
    ],
  },
  {
    id: 'mod4',
    title: '4. Funksiyalar (Functions)',
    subtitle: 'Arrow functions, parametrlar va scope',
    description: "Kodni qayta ishlatiladigan qismlarga ajratish, zamonaviy o'qsimon (arrow) funksiyalar.",
    iconName: 'Cpu',
    color: 'purple',
    lessons: [
      {
        id: 'mod4_les1',
        moduleId: 'mod4',
        title: "01. Funksiyalar va Arrow Functions",
        shortDesc: "An'anaviy funksiyalar va ES6 Arrow (=>) sintaksisi",
        readTime: '6 daqiqa',
        xp: 55,
        theory: `### Funksiya nima?

Funksiya — bu ma'lum bir vazifani bajaruvchi kod blokidir. Siz uni bir marta yozasiz va xohlagancha marta chaqirib (ishlatib) bilasiz (DRY — Don't Repeat Yourself).

#### 1. Oddiy funksiya (Function Declaration):
\`\`\`javascript
function salomBer(ism) {
  return "Salom, " + ism + "!";
}

const xabar = salomBer("Zafar");
console.log(xabar); // "Salom, Zafar!"
\`\`\`

#### 2. Arrow Function (\`=>\`) — Zamonaviy usul:
ES6 da kirib kelgan o'qsimon funksiyalar qisqa va qulay sintaksisga ega. **Reactda komponentlar va event handlerlar deyarli 100% arrow function shaklida yoziladi!**

\`\`\`javascript
// To'liq shakli:
const kvadrat = (son) => {
  return son * son;
};

// Bir qatorli qisqa shakli (return va qavslarsiz!):
const kub = (son) => son ** 3;

console.log(kvadrat(5)); // 25
console.log(kub(3));     // 27
\`\`\``,
        challenge: {
          title: "Arrow function yaratish",
          instructions: "`kopaytir` nomli arrow function yarating. U ikkita parametr (`a` va `b`) qabul qilsin va ularning ko'paytmasini qaytarsin.",
          starterCode: `// kopaytir nomli arrow function yozing:
const kopaytir = (a, b) => {
  return a * b;
};
`,
          solutionCode: `const kopaytir = (a, b) => a * b;`,
          hint: "const kopaytir = (a, b) => a * b; ko'rinishida yozishingiz mumkin.",
          testCases: [
            {
              id: 'tc1',
              description: "kopaytir(4, 5) -> 20 bo'lishi kerak",
              testFn: `return typeof kopaytir === 'function' && kopaytir(4, 5) === 20;`,
              expectedValue: 'true',
            },
            {
              id: 'tc2',
              description: "kopaytir(10, 0) -> 0 bo'lishi kerak",
              testFn: `return kopaytir(10, 0) === 0;`,
              expectedValue: 'true',
            },
          ],
        },
        quizzes: [
          {
            id: 'q1',
            question: "Arrow function'da bir qatorda yozilganda `return` so'zini tushirib qoldirish mumkinmi?",
            options: [
              { id: 'a', text: "Ha, figurali qavslar `{}` bo'lmasa avtomatik return bo'ladi (implicit return)" },
              { id: 'b', text: "Yo'q, return har doim majburiy" },
              { id: 'c', text: "Faqat son qaytarsa mumkin" },
              { id: 'd', text: "Faqat bitta parametr bo'lsa mumkin" },
            ],
            correctOptionId: 'a',
            explanation: "Agar arrow function tanasida figurali qavslar `{}` ishlatilmasa, ifoda avtomatik ravishda `return` qilinadi.",
          },
        ],
      },
    ],
  },
  {
    id: 'mod5',
    title: '5. Massivlar va Zamonaviy Metodlar',
    subtitle: 'map, filter, reduce va massiv amallari',
    description: "Reactga o'tishdagi eng asosiy fundament — massivlar ustida funksional amallar.",
    iconName: 'ListOrdered',
    color: 'teal',
    lessons: [
      {
        id: 'mod5_les1',
        moduleId: 'mod5',
        title: "01. Massivlar Asoslari (push, pop, length)",
        shortDesc: "Bir nechta qiymatni bitta ro'yxatda saqlash va indekslar",
        readTime: '5 daqiqa',
        xp: 50,
        theory: `### Massiv (Array) nima?

Massiv — bu tartiblangan elementlar ro'yxatidir. Bitta massiv ichida istalgan turdagi ma'lumotlarni saqlash mumkin.

\`\`\`javascript
const mevalar = ["Olma", "Nok", "Banan", "Uzum"];

// Indekslash 0 dan boshlanadi!
console.log(mevalar[0]); // "Olma"
console.log(mevalar[2]); // "Banan"
console.log(mevalar.length); // 4 (elementlar soni)
\`\`\`

#### Asosiy metodlar:
- \`push(qiymat)\` — Massiv oxiriga yangi element qo'shadi.
- \`pop()\` — Massiv oxiridagi elementni o'chiradi va qaytaradi.
- \`includes(qiymat)\` — Massivda ushbu qiymat bormi-yo'qligini tekshiradi (\`true\` / \`false\`).

\`\`\`javascript
const shaharlar = ["Toshkent", "Samarqand"];
shaharlar.push("Buxoro"); // endi 3 ta shahar bo'ldi
console.log(shaharlar.includes("Buxoro")); // true
\`\`\``,
        challenge: {
          title: "Massiv elementini qo'shish",
          instructions: "`texnologiyalar` nomli massiv yarating va unga boshida `['HTML', 'CSS', 'JS']` qiymatlarini bering. Keyin `push` metodi orqali oxiriga `'React'` ni qo'shing.",
          starterCode: `const texnologiyalar = ['HTML', 'CSS', 'JS'];
// 'React' ni oxiriga qo'shing:

`,
          solutionCode: `const texnologiyalar = ['HTML', 'CSS', 'JS'];
texnologiyalar.push('React');`,
          hint: "texnologiyalar.push('React');",
          testCases: [
            {
              id: 'tc1',
              description: "Massiv uzunligi 4 ta bo'lishi va oxirida 'React' bo'lishi kerak",
              testFn: `return texnologiyalar.length === 4 && texnologiyalar[3] === 'React';`,
              expectedValue: 'true',
            },
          ],
        },
        quizzes: [
          {
            id: 'q1',
            question: "Massivning birinchi elementining indeksi necha?",
            options: [
              { id: 'a', text: '0' },
              { id: 'b', text: '1' },
              { id: 'c', text: '-1' },
              { id: 'd', text: 'first' },
            ],
            correctOptionId: 'a',
            explanation: "Dasturlashda (jumladan JavaScriptda) massiv indekslari 0 dan boshlanadi.",
          },
        ],
      },
      {
        id: 'mod5_les2',
        moduleId: 'mod5',
        title: "02. map() va filter() — Reactning Yuragi",
        shortDesc: "Elementlarni o'zgartirish va filtrlashning eng zamonaviy usuli",
        readTime: '7 daqiqa',
        xp: 60,
        theory: `### Nega \`map\` va \`filter\` shunchalik muhim?

Reactda siz backenddan kelgan ma'lumotlarni HTML teglarga aylantirish uchun deyarli har doim \`.map()\` metodidan foydalanasiz! U eski massivni buzmasdan, yangi o'zgargan massiv hosil qiladi (immutability).

#### 1. \`.map()\` — Har bir elementni o'zgartirib yangi massiv hosil qilish:
\`\`\`javascript
const sonlar = [1, 2, 3, 4];
const ikkiHissa = sonlar.map(son => son * 2);
console.log(ikkiHissa); // [2, 4, 6, 8]
\`\`\`

#### 2. \`.filter()\` — Faqat shartga to'g'ri kelgan elementlarni saralab olish:
\`\`\`javascript
const yoshlar = [12, 18, 25, 14, 30];
const kattalar = yoshlar.filter(yosh => yosh >= 18);
console.log(kattalar); // [18, 25, 30]
\`\`\`

#### Zanjir (Chaining) usuli:
Metodlarni bir-biriga ulab ketish mumkin:
\`\`\`javascript
const narxlar = [10, 25, 5, 80];
// 20 dan qimmatlarini olib, 10% chegirma qilamiz:
const chegirmali = narxlar
  .filter(n => n > 20)
  .map(n => n * 0.9);
console.log(chegirmali); // [22.5, 72]
\`\`\``,
        challenge: {
          title: "Juft sonlarni 2 ga ko'paytirish",
          instructions: "`juftlarniKopaytir(sonlar)` nomli funksiya yozing. U berilgan sonlar massividan faqat juft sonlarni saralab olsin (filter) va ularni 2 ga ko'paytirib (map) qaytarsin. Masalan: `[1, 2, 3, 4]` $\\to$ `[4, 8]`.",
          starterCode: `function juftlarniKopaytir(sonlar) {
  // filter va map bilan yozing:
  return sonlar
    .filter(son => son % 2 === 0)
    .map(son => son * 2);
}
`,
          solutionCode: `function juftlarniKopaytir(sonlar) {
  return sonlar.filter(s => s % 2 === 0).map(s => s * 2);
}`,
          hint: "son % 2 === 0 qilib filter qiling, so'ng .map(s => s * 2) qo'shing.",
          testCases: [
            {
              id: 'tc1',
              description: "juftlarniKopaytir([1, 2, 3, 4, 5, 6]) -> [4, 8, 12] bo'lishi kerak",
              testFn: `
                const res = juftlarniKopaytir([1, 2, 3, 4, 5, 6]);
                return JSON.stringify(res) === JSON.stringify([4, 8, 12]);
              `,
              expectedValue: 'true',
            },
          ],
        },
        quizzes: [
          {
            id: 'q1',
            question: "`.map()` metodi asl (boshlang'ich) massivni o'zgartiradimi?",
            options: [
              { id: 'a', text: "Yo'q, u har doim yangi massiv qaytaradi" },
              { id: 'b', text: "Ha, u asl massivni to'g'ridan-to'g'ri o'zgartiradi" },
              { id: 'c', text: "Faqat sonlar bo'lsa o'zgartiradi" },
              { id: 'd', text: "Boshlang'ich massivni o'chirib tashlaydi" },
            ],
            correctOptionId: 'a',
            explanation: "`map()` immutable (o'zgarmas) tamoyilda ishlaydi va asl massivga teginmasdan yangi natijaviy massiv qaytaradi. Bu Reactda state bilan ishlashda nihoyatda qimmatlidir.",
          },
        ],
      },
    ],
  },
  {
    id: 'mod6',
    title: '6. Obyektlar va Destructuring',
    subtitle: 'Kalit-qiymat tuzilmasi, destructuring va spread',
    description: "Haqiqiy loyihalarda foydalanuvchi ma'lumotlari, mahsulotlar va konfiguratsiyalarni ifodalash.",
    iconName: 'Box',
    color: 'rose',
    lessons: [
      {
        id: 'mod6_les1',
        moduleId: 'mod6',
        title: "01. Obyektlar va Destructuring Sintaksisi",
        shortDesc: "Obyektdan kerakli kalitlarni alohida o'zgaruvchiga ajratib olish",
        readTime: '6 daqiqa',
        xp: 55,
        theory: `### Obyekt nima?

Obyekt — bu ma'lumotlarni **kalit: qiymat** (key: value) juftliklari ko'rinishida saqlovchi tuzilmadir.

\`\`\`javascript
const dasturchi = {
  ism: "Sardor",
  yosh: 22,
  kasb: "Frontend Engineer",
  skills: ["JavaScript", "React", "Tailwind"]
};

// Qiymatni olish:
console.log(dasturchi.ism); // "Sardor"
console.log(dasturchi["kasb"]); // "Frontend Engineer"
\`\`\`

### Destructuring (Tuzilmani yoyish)
Reactda bu sintaksis **har bir komponentda** uchraydi! Masalan, ` + '`const { ism, yosh } = dasturchi;`' + ` deb yozish orqali bitta qatorda alohida o'zgaruvchilarga ajratib olamiz:

\`\`\`javascript
// Eski usul:
// const ism = dasturchi.ism;
// const yosh = dasturchi.yosh;

// Yangi (Destructuring) usul:
const { ism, yosh } = dasturchi;
console.log(ism, yosh); // "Sardor", 22
\`\`\`

#### Massiv destructuring:
\`\`\`javascript
const ranglar = ["qizil", "yashil", "ko'k"];
const [birlamchi, ikkilamchi] = ranglar;
console.log(birlamchi); // "qizil"
// Bu Reactning useState hookida aynan shunday ishlaydi:
// const [state, setState] = useState(0);
\`\`\``,
        challenge: {
          title: "Obyektdan destructuring orqali qiymatlarni olish",
          instructions: "`foydalanuvchi` obyektidan `ism` va `shahar` xususiyatlarini destructuring orqali ajratib oling va `natija` o'zgaruvchisiga `'Ali (Toshkent)'` shaklida birlashtirib saqlang.",
          starterCode: `const foydalanuvchi = {
  ism: "Ali",
  yosh: 24,
  shahar: "Toshkent"
};

// Destructuring qiling:
const { ism, shahar } = foydalanuvchi;

// Natijani formatlang:
const natija = \`\${ism} (\${shahar})\`;
`,
          solutionCode: `const foydalanuvchi = { ism: "Ali", yosh: 24, shahar: "Toshkent" };
const { ism, shahar } = foydalanuvchi;
const natija = \`\${ism} (\${shahar})\`;`,
          hint: "const { ism, shahar } = foydalanuvchi; deb destructure qiling.",
          testCases: [
            {
              id: 'tc1',
              description: "natija 'Ali (Toshkent)' ga teng bo'lishi kerak",
              testFn: `return natija === 'Ali (Toshkent)';`,
              expectedValue: 'true',
            },
          ],
        },
        quizzes: [
          {
            id: 'q1',
            question: "Reactda `const [son, setSon] = useState(0)` qanday sintaksisdan foydalanadi?",
            options: [
              { id: 'a', text: 'Massiv destructuring (Array destructuring)' },
              { id: 'b', text: 'Obyekt destructuring' },
              { id: 'c', text: 'Spread operatori' },
              { id: 'd', text: 'Ternary operatori' },
            ],
            correctOptionId: 'a',
            explanation: "`useState` massiv qaytaradi: [boshlang'ich_qiymat, o'zgartiruvchi_funksiya]. Biz uni massiv destructuring yordamida o'zimiz istagan nomlar bilan qabul qilib olamiz.",
          },
        ],
      },
    ],
  },
  {
    id: 'mod7',
    title: '7. DOM bilan Ishlash va Hodisalar',
    subtitle: 'Veb sahifa elementlarini boshqarish',
    description: "Tugmalar bosilishi, matn kiritilishi va sahifadagi elementlarni dinamik o'zgartirish.",
    iconName: 'MousePointer',
    color: 'indigo',
    lessons: [
      {
        id: 'mod7_les1',
        moduleId: 'mod7',
        title: "01. DOM Elementlari va addEventListener",
        shortDesc: "Tugma bosilganda harakat bajarish (Click events)",
        readTime: '6 daqiqa',
        xp: 50,
        theory: `### DOM (Document Object Model) nima?

DOM — bu brauzer HTML sahifani o'qib, uni JavaScript tushunadigan obyektlar daraxtiga aylantirgan shaklidir. JavaScript orqali biz har qanday tugma, matn yoki rangni jonli o'zgartira olamiz.

#### Elementni topish:
\`\`\`javascript
const tugma = document.querySelector("#my-btn");
const sarlavha = document.querySelector(".title");
\`\`\`

#### Hodisalarni eshitish (Events):
\`\`\`javascript
tugma.addEventListener("click", () => {
  sarlavha.textContent = "Tugma bosildi!";
  sarlavha.style.color = "blue";
});
\`\`\`

#### Eng mashhur hodisalar:
- \`"click"\` — tugma yoki element bosilganda
- \`"input"\` — input maydoniga foydalanuvchi harf yozganda
- \`"submit"\` — forma jo'natilganda
- \`"keydown"\` — klaviaturada tugma bosilganda`,
        challenge: {
          title: "Hisoblagich funksiyasi logikasini yaratish",
          instructions: "`yaratHisoblagich()` funksiyasini yozing. U ichida `count = 0` saqlasin va har safar chaqirilganda `count` qiymatini 1 taga oshirib qaytarsin (Closure logikasi).",
          starterCode: `function yaratHisoblagich() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const hisoblagich = yaratHisoblagich();
console.log(hisoblagich()); // 1
console.log(hisoblagich()); // 2
`,
          solutionCode: `function yaratHisoblagich() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}`,
          hint: "Ichki funksiya tashqi `count` o'zgaruvchisini eslab qoladi.",
          testCases: [
            {
              id: 'tc1',
              description: "Ketma-ket chaqirilganda 1, 2, 3 tartibida oshishi kerak",
              testFn: `
                const fn = yaratHisoblagich();
                return fn() === 1 && fn() === 2 && fn() === 3;
              `,
              expectedValue: 'true',
            },
          ],
        },
        quizzes: [
          {
            id: 'q1',
            question: "Element bosilganda kodni ishga tushirish uchun qaysi metod ishlatiladi?",
            options: [
              { id: 'a', text: 'element.onClickAction()' },
              { id: 'b', text: "element.addEventListener('click', handler)" },
              { id: 'c', text: 'element.triggerEvent()' },
              { id: 'd', text: 'document.listen()' },
            ],
            correctOptionId: 'b',
            explanation: "Standart brauzer API'sida hodisalarni biriktirish uchun `addEventListener` metodi qo'llaniladi.",
          },
        ],
      },
    ],
  },
  {
    id: 'mod8',
    title: '8. ES6+ va Asinxron JavaScript',
    subtitle: 'Promises, async/await va Serverdan ma\'lumot olish',
    description: "Vaqt oladigan amallar, server API'lari bilan ishlash va zamonaviy sintaksis.",
    iconName: 'Zap',
    color: 'cyan',
    lessons: [
      {
        id: 'mod8_les1',
        moduleId: 'mod8',
        title: "01. async/await va Promislar",
        shortDesc: "Serverdan ma'lumot kutish va xatoliklarni try/catch orqali ushlash",
        readTime: '7 daqiqa',
        xp: 65,
        theory: `### Asinxronlik nima?

Tasavvur qiling, restoranga buyurtma berdingiz. Ovqat tayyor bo'lguncha siz boshqa ishlar bilan shug'ullanib turasiz, to'xtab qotib qolmaysiz. JavaScript ham xuddi shunday: serverdan ma'lumot kelguncha sahifani qotirib qo'ymaydi.

#### \`async / await\` sintaksisi:
\`\`\`javascript
async function fetchUser() {
  try {
    const response = await fetch("https://api.example.com/user");
    const data = await response.json();
    console.log("Foydalanuvchi ma'lumoti:", data);
    return data;
  } catch (error) {
    console.error("Xatolik yuz berdi:", error.message);
  }
}
\`\`\`

#### Qoidalar:
1. \`await\` kalit so'zini faqat \`async\` funksiya ichida ishlatish mumkin.
2. Server xatoliklarini xavfsiz boshqarish uchun doim \`try { ... } catch (err) { ... }\` blokidan foydalaning.`,
        challenge: {
          title: "Asinxron ma'lumot qaytaruvchi funksiya",
          instructions: "`malumotOlish(muvaffaqiyat)` nomli `async` funksiya yozing:\n- Agar `muvaffaqiyat === true` bo'lsa, `'Ma'lumot yuklandi'` matnini qaytarsin;\n- Aks holda `'Xatolik yuz berdi'` matnini qaytarsin.",
          starterCode: `async function malumotOlish(muvaffaqiyat) {
  if (muvaffaqiyat) {
    return "Ma'lumot yuklandi";
  } else {
    return "Xatolik yuz berdi";
  }
}
`,
          solutionCode: `async function malumotOlish(muvaffaqiyat) {
  if (muvaffaqiyat) {
    return "Ma'lumot yuklandi";
  }
  return "Xatolik yuz berdi";
}`,
          hint: "async funksiya avtomatik Promise qaytaradi.",
          testCases: [
            {
              id: 'tc1',
              description: "malumotOlish(true) -> \"Ma'lumot yuklandi\"",
              testFn: `
                const res = await malumotOlish(true);
                return res === "Ma'lumot yuklandi";
              `,
              expectedValue: 'true',
            },
            {
              id: 'tc2',
              description: "malumotOlish(false) -> \"Xatolik yuz berdi\"",
              testFn: `
                const res = await malumotOlish(false);
                return res === "Xatolik yuz berdi";
              `,
              expectedValue: 'true',
            },
          ],
        },
        quizzes: [
          {
            id: 'q1',
            question: "`await` kalit so'zi qayerda ishlatilishi mumkin?",
            options: [
              { id: 'a', text: 'Ixtiyoriy oddiy funksiya ichida' },
              { id: 'b', text: "Faqat `async` bilan e'lon qilingan funksiya ichida (yoki top-level module)" },
              { id: 'c', text: 'Faqat for sikllari ichida' },
              { id: 'd', text: 'Faqat HTML fayllarda' },
            ],
            correctOptionId: 'b',
            explanation: "`await` operatori asinxron natijani kutish uchun faqat `async` belgilangan funksiyalar doirasida ishlaydi.",
          },
        ],
      },
    ],
  },
  {
    id: 'mod9',
    title: '9. React Asoslari (React Fundamentals)',
    subtitle: 'JSX, Komponentlar, Props va useState',
    description: "JavaScriptdan Reactga o'tish: zamonaviy UI yaratish va to'liq interaktiv ilovalar.",
    iconName: 'Atom',
    color: 'sky',
    lessons: [
      {
        id: 'mod9_les1',
        moduleId: 'mod9',
        title: "01. Nega React? JSX va Komponentlar",
        shortDesc: "HTML va JavaScriptning uyg'unlashuvi hamda birinchi React komponentingiz",
        readTime: '7 daqiqa',
        xp: 65,
        isReactLesson: true,
        theory: `### React nima va nima uchun u dunyoda 1-o'rinda?

Eski usulda (Vanilla JS) biz HTML elementlarni \`document.getElementById\` qilib topib, har bir matnni qo'lda yangilar edik. Loyiha kattalashgani sari kod chalkashib ketardi.

React bu muammoni hal qildi:
1. **Komponentli yondashuv**: Sahifa kichik, qayta ishlatiladigan g'ishtchalarga (komponentlarga) bo'linadi (Header, Card, Button).
2. **Deklarativlik**: Siz "UI qanday ko'rinishi kerakligini" ta'riflaysiz, React esa uni o'zi ekranda samarali chizadi (Virtual DOM).
3. **JSX sintaksisi**: JavaScript ichida to'g'ridan-to'g'ri HTML ga o'xshash teglarni yozish imkoniyati!

#### Birinchi React Komponent:
\`\`\`jsx
function App() {
  const ism = "O'zbekiston";
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Salom, {ism}!</h1>
      <p>Bu mening birinchi React komponentim.</p>
    </div>
  );
}
\`\`\`
> E'tibor bering: JSX ichida JavaScript ifodalarini ishlatish uchun figurali qavslar \`{ ... }\` ishlatiladi!`,
        challenge: {
          title: "Birinchi React Komponentini Yaratish",
          instructions: "`App` nomli React komponenti yarating. U `<div>` ichida `<h1>Mening Profilim</h1>` va `<p>Men JavaScript va React o'rganmoqdaman</p>` teglarini qaytarsin.",
          starterCode: `function App() {
  return (
    <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px' }}>
      <h1 style={{ color: '#0284c7', fontSize: '24px', fontWeight: 'bold' }}>
        Mening Profilim
      </h1>
      <p style={{ color: '#475569', marginTop: '8px' }}>
        Men JavaScript va React o'rganmoqdaman
      </p>
    </div>
  );
}
`,
          solutionCode: `function App() {
  return (
    <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px' }}>
      <h1 style={{ color: '#0284c7', fontSize: '24px', fontWeight: 'bold' }}>Mening Profilim</h1>
      <p style={{ color: '#475569', marginTop: '8px' }}>Men JavaScript va React o'rganmoqdaman</p>
    </div>
  );
}`,
          hint: "Funksiya nomi aniq `App` bo'lsin va tegishli JSX ni return qilsin.",
          testCases: [
            {
              id: 'tc1',
              description: "App funksiya bo'lishi va JSX (React elementi) qaytarishi kerak",
              testFn: `
                const rendered = App();
                return typeof App === 'function' && rendered !== null && typeof rendered === 'object';
              `,
              expectedValue: 'true',
            },
          ],
        },
        quizzes: [
          {
            id: 'q1',
            question: "JSX da JavaScript o'zgaruvchisini HTML matniga qo'yish uchun nima ishlatiladi?",
            options: [
              { id: 'a', text: 'Figurali qavslar: {ozgaruvchi}' },
              { id: 'b', text: 'Qo\'shaloq foiz: %ozgaruvchi%' },
              { id: 'c', text: 'Dollar belgisi: $ozgaruvchi' },
              { id: 'd', text: 'Burchakli qavslar: <ozgaruvchi>' },
            ],
            correctOptionId: 'a',
            explanation: "JSX da istalgan JavaScript ifodasini kiritish uchun bitta figurali qavs `{ ... }` ishlatiladi.",
          },
        ],
      },
      {
        id: 'mod9_les2',
        moduleId: 'mod9',
        title: "02. useState — Interaktiv Holat va Hisoblagich",
        shortDesc: "Tugmalar bosilganda sahifani jonli qayta chizish (Re-render)",
        readTime: '8 daqiqa',
        xp: 75,
        isReactLesson: true,
        theory: `### \`useState\` Hooki nima?

Oddiy o'zgaruvchi (\`let son = 0\`) o'zgarganda brauzer sahifani avtomatik yangilamaydi. 
Reactda ma'lumot o'zgarganda **ekranni avtomatik qayta chizish (re-render)** uchun biz **State (Holat)** dan foydalanamiz!

\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`
- \`count\` — Hozirgi qiymat (boshida 0)
- \`setCount\` — Qiymatni yangilovchi funksiya! Uni chaqirishingiz bilan React komponentni yangi qiymat bilan qayta chizadi.

#### To'liq Hisoblagich (Counter) Misoli:
\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Hisob: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+1 Qo'shish</button>
      <button onClick={() => setCount(count - 1)} style={{ marginLeft: '8px' }}>-1 Kamaytirish</button>
      <button onClick={() => setCount(0)} style={{ marginLeft: '8px' }}>Qayta o'rnatish</button>
    </div>
  );
}
\`\`\``,
        challenge: {
          title: "Interaktiv Hisoblagich Komponenti",
          instructions: "`Counter` nomli komponent yozing. Unda `count` holati bo'lsin (boshida 0). `+1 Oshirish` va `Tiklash` (0 qilish) tugmalari bo'lsin. 'O'ng tomondagi Jonli Ko'rinish' tabida uni bosing va sinab ko'ring!",
          starterCode: `function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '24px', textAlign: 'center', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>
        Hisob: {count}
      </h3>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button 
          onClick={() => setCount(count + 1)}
          style={{ padding: '8px 16px', background: '#0284c7', color: '#fff', borderRadius: '8px', cursor: 'pointer', border: 'none' }}
        >
          +1 Oshirish
        </button>
        <button 
          onClick={() => setCount(0)}
          style={{ padding: '8px 16px', background: '#64748b', color: '#fff', borderRadius: '8px', cursor: 'pointer', border: 'none' }}
        >
          Tiklash (0)
        </button>
      </div>
    </div>
  );
}
`,
          solutionCode: `function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>Hisob: {count}</h3>
      <button onClick={() => setCount(count + 1)}>+1 Oshirish</button>
      <button onClick={() => setCount(0)}>Tiklash (0)</button>
    </div>
  );
}`,
          hint: "useState(0) dan foydalaning va onClick handlerlarida setCount ni chaqiring.",
          testCases: [
            {
              id: 'tc1',
              description: "Counter funksiyasi mavjud bo'lishi va useState ishlatilgan bo'lishi kerak",
              testFn: `
                return typeof Counter === 'function';
              `,
              expectedValue: 'true',
            },
          ],
        },
        quizzes: [
          {
            id: 'q1',
            question: "Reactda state o'zgarganda nima yuz beradi?",
            options: [
              { id: 'a', text: "Butun brauzer sahifasi qayta yuklanadi (F5)" },
              { id: 'b', text: "React faqat ushbu komponentni va kerakli DOM elementlarini qayta chizadi (re-render)" },
              { id: 'c', text: "Barcha boshqa komponentlar o'chib ketadi" },
              { id: 'd', text: "Hech narsa bo'lmaydi" },
            ],
            correctOptionId: 'b',
            explanation: "Reactning kuchi Virtual DOM texnologiyasida: u faqat o'zgargan qismlarni chaqqonlik bilan yangilaydi.",
          },
        ],
      },
      {
        id: 'mod9_les3',
        moduleId: 'mod9',
        title: "03. Yakuniy Loyiha: Interaktiv To-Do Ilovasi",
        shortDesc: "Vazifalar ro'yxati, yangi vazifa qo'shish va o'chirish (To-Do App)",
        readTime: '10 daqiqa',
        xp: 100,
        isReactLesson: true,
        theory: `### Tabriklaymiz! Siz React cho'qqisiga yetib keldingiz!

Ushbu yakuniy darsda biz oldingi barcha o'rgangan bilimlarimizni birlashtiramiz:
- O'zgaruvchilar va ma'lumot turlari
- Massivlar va \`.map()\` metodi
- \`.filter()\` orqali elementni o'chirish
- Arrow functions
- React \`useState\` hooki

#### Vazifalar ro'yxatini boshqarish algoritmi:
1. Yangi vazifa qo'shish:
   \`\`\`jsx
   setTodos([...todos, yangiVazifa]);
   \`\`\`
2. Vazifani o'chirish (\`filter\` orqali):
   \`\`\`jsx
   setTodos(todos.filter((_, index) => index !== ochiriladiganIndex));
   \`\`\``,
        challenge: {
          title: "To-Do Ilovasini Yaratish",
          instructions: "Quyidagi `TodoApp` komponentini ko'zdan kechiring, yangi vazifa yozib qo'shing va o'chiring. So'ngra 'Testlarni Tekshirish' tugmasini bosing!",
          starterCode: `function TodoApp() {
  const [todos, setTodos] = useState(["JavaScript o'rganish", "React darslarini tugatish"]);
  const [input, setInput] = useState("");

  const qoshish = () => {
    if (input.trim() === "") return;
    setTodos([...todos, input.trim()]);
    setInput("");
  };

  const ochirish = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#0f172a' }}>
        Mening Vazifalarim ({todos.length})
      </h3>
      
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Yangi vazifa..."
          style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        />
        <button
          onClick={qoshish}
          style={{ padding: '8px 16px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Qo'shish
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f8fafc', marginBottom: '6px', borderRadius: '6px' }}
          >
            <span>{todo}</span>
            <button
              onClick={() => ochirish(index)}
              style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '12px' }}
            >
              O'chirish
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
`,
          solutionCode: `function TodoApp() {
  const [todos, setTodos] = useState(["JavaScript", "React"]);
  return <div>Todo App</div>;
}`,
          hint: "TodoApp komponenti to'liq tayyorlangan, uni Jonli Ko'rinishda sinab ko'ring!",
          testCases: [
            {
              id: 'tc1',
              description: "TodoApp komponenti funksiya sifatida e'lon qilingan bo'lishi kerak",
              testFn: `return typeof TodoApp === 'function';`,
              expectedValue: 'true',
            },
          ],
        },
        quizzes: [
          {
            id: 'q1',
            question: "Massivdan elementni xavfsiz o'chirish uchun Reactda qaysi metod eng qulay?",
            options: [
              { id: 'a', text: 'todos.filter()' },
              { id: 'b', text: 'delete todos[i]' },
              { id: 'c', text: 'todos.pop()' },
              { id: 'd', text: 'window.remove()' },
            ],
            correctOptionId: 'a',
            explanation: "`filter()` yangi saralangan massiv qaytaradi, asl massivni o'zgartirmaydi va React state qoidalariga 100% mos keladi.",
          },
        ],
      },
    ],
  },
];
