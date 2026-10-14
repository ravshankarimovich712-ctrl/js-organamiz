export interface CheatItem {
  id: string;
  category: 'Asoslar' | 'Shart & Sikl' | 'Funksiya' | 'Massiv & Obyekt' | 'Asinxron' | 'React';
  title: string;
  syntax: string;
  description: string;
  example: string;
}

export const CHEATSHEET_DATA: CheatItem[] = [
  {
    id: 'c1',
    category: 'Asoslar',
    title: 'O\'zgaruvchilar (let, const)',
    syntax: 'const x = 10; let y = 20;',
    description: 'const o\'zgarmas qiymatlar, let qayta qiymat oladigan o\'zgaruvchilar uchun.',
    example: 'const pi = 3.14;\nlet score = 0;\nscore += 5;',
  },
  {
    id: 'c2',
    category: 'Asoslar',
    title: 'Template Literals (Formatli matn)',
    syntax: '`Salom ${ism}, yoshingiz: ${yosh}`',
    description: 'Qo\'shtirnoq o\'rniga backtick (`) ishlatib o\'zgaruvchilarni matn ichiga qulay joylashtirish.',
    example: 'const ism = "Anvar";\nconsole.log(`Xush kelibsiz, ${ism}!`);',
  },
  {
    id: 'c3',
    category: 'Shart & Sikl',
    title: 'Ternary Operator (Uchlik shart)',
    syntax: 'shart ? rost_qiymat : yolgon_qiymat',
    description: 'Bir qatorda if/else yozish usuli. Reactda juda ko\'p qo\'llanadi.',
    example: 'const status = ball >= 60 ? "O\'tdi" : "Yiqildi";',
  },
  {
    id: 'c4',
    category: 'Shart & Sikl',
    title: 'for...of Sikli',
    syntax: 'for (const element of massiv) { ... }',
    description: 'Massiv elementlarini ketma-ket to\'g\'ridan-to\'g\'ri aylanib chiqish.',
    example: 'const sonlar = [10, 20, 30];\nfor (const son of sonlar) {\n  console.log(son);\n}',
  },
  {
    id: 'c5',
    category: 'Funksiya',
    title: 'Arrow Function (=>)',
    syntax: 'const fn = (param1, param2) => { return natija; };',
    description: 'Ixcham funksiya sintaksisi. Bir qatorda return yozish ham shart emas.',
    example: 'const kvadrat = x => x * x;\nconsole.log(kvadrat(7)); // 49',
  },
  {
    id: 'c6',
    category: 'Massiv & Obyekt',
    title: 'Array .map()',
    syntax: 'massiv.map(item => yangiElement)',
    description: 'Har bir elementni o\'zgartirib yangi massiv hosil qiladi. Reactda ro\'yxat chiqarish asosi.',
    example: 'const sonlar = [1, 2, 3];\nconst juft = sonlar.map(n => n * 2); // [2, 4, 6]',
  },
  {
    id: 'c7',
    category: 'Massiv & Obyekt',
    title: 'Array .filter()',
    syntax: 'massiv.filter(item => shart)',
    description: 'Faqat shartni qanoatlantirgan (true qaytargan) elementlarni yangi massivga saralaydi.',
    example: 'const sonlar = [5, 12, 8, 130, 44];\nconst kattalar = sonlar.filter(n => n > 10);',
  },
  {
    id: 'c8',
    category: 'Massiv & Obyekt',
    title: 'Destructuring (Ajratib olish)',
    syntax: 'const { ism, yosh } = obyekt; const [birinchi] = massiv;',
    description: 'Obyekt yoki massiv ichidagi ma\'lumotlarni qisqa usulda yangi o\'zgaruvchilarga olish.',
    example: 'const user = { name: "Ali", age: 25 };\nconst { name, age } = user;\nconsole.log(name); // "Ali"',
  },
  {
    id: 'c9',
    category: 'Massiv & Obyekt',
    title: 'Spread Operator (...)',
    syntax: '[...massiv, yangiElement] yoki { ...obyekt, yangiXususiyat }',
    description: 'Eski massiv yoki obyekt nusxasini olib, unga yangi element qo\'shish.',
    example: 'const eski = [1, 2];\nconst yangi = [...eski, 3, 4]; // [1, 2, 3, 4]',
  },
  {
    id: 'c10',
    category: 'Asinxron',
    title: 'async / await',
    syntax: 'async function getData() { const res = await fetch(url); }',
    description: 'Asinxron server so\'rovlarini xuddi sinxron kod kabi qulay o\'qish va boshqarish.',
    example: 'async function loadData() {\n  try {\n    const res = await fetch("/api/data");\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error(err);\n  }\n}',
  },
  {
    id: 'c11',
    category: 'React',
    title: 'useState Hooki',
    syntax: 'const [state, setState] = useState(initialValue);',
    description: 'React komponentida dinamik o\'zgaruvchi (holat) saqlash va yangilanganda UI ni qayta chizish.',
    example: 'function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}',
  },
  {
    id: 'c12',
    category: 'React',
    title: 'Props uzatish',
    syntax: '<UserCard ism="Ali" kasb="Dasturchi" />',
    description: 'Ota komponentdan bola komponentga xususiyat va ma\'lumotlarni uzatish.',
    example: 'function UserCard({ ism, kasb }) {\n  return <div><h3>{ism}</h3><p>{kasb}</p></div>;\n}',
  },
];
