<div align="center">

# ⚡ THITIRAT SIRISAWAD
### UX/UI Designer & Frontend Developer

เว็บไซต์ Portfolio แบบ interactive พัฒนาด้วย **React 19**, **TypeScript** และ **Vite**

</div>

---

## 📑 สารบัญ
1. [ภาพรวม](#-ภาพรวม)
2. [เริ่มต้นใช้งาน](#-เริ่มต้นใช้งาน)
3. [การตั้งค่า .env](#-การตั้งค่า-env)
4. [คำสั่งที่ใช้บ่อย](#-คำสั่งที่ใช้บ่อย)
5. [โครงสร้างโปรเจกต์](#-โครงสร้างโปรเจกต์)
6. [การแก้ไขเนื้อหา](#-การแก้ไขเนื้อหา)
7. [แนวทางการพัฒนา](#-แนวทางการพัฒนา)
8. [แผนพัฒนาต่อ (Roadmap)](#-แผนพัฒนาต่อ-roadmap)
9. [เอกสารอื่น](#-เอกสารอื่น)

---

## 🧭 ภาพรวม

| ส่วน | รายละเอียด |
|---|---|
| **Hero / Studio** | หน้าแรก, ข้อความ Studio, Services และ FAQ |
| **Work** | ผลงานพร้อมค้นหา, กรองตามหมวด และ Quick View (ภาพตัวอย่างจาก microlink) |
| **About** | โปรไฟล์, ทักษะ, เครื่องมือ, ภาษา และสถิติ GitHub แบบ live |
| **Certificates** | ใบประกาศแบบ marquee พร้อมค้นหา/กรอง และเปิดดู PDF ได้ |
| **Contact** | ช่องทางติดต่อแบบ **ไอคอนเท่านั้น** (อีเมล, โทร, Line, IG, FB, GitHub) |

**Tech stack:** React 19 · TypeScript · Vite 7 · Vitest + Testing Library · pdfjs-dist · CSS (Grid/Flexbox, fluid typography)

---

## 🚀 เริ่มต้นใช้งาน

ต้องมี **Node.js 20 ขึ้นไป**

```bash
npm install              # ติดตั้ง dependencies
cp .env.example .env     # สร้างไฟล์ตั้งค่า แล้วใส่ข้อมูลของคุณ
npm run dev              # เปิด dev server ที่ http://localhost:5173
```

Build สำหรับ production:

```bash
npm run build            # type-check (tsc -b) + vite build → dist/
npm run preview          # ดูผล build บนเครื่อง
```

> ⚠️ ต้องตั้งค่า `.env` (หรือ environment variables บน hosting) **ก่อน build** เพราะ Vite ฝังค่า `VITE_*` ลงไปตอน build

---

## 🔐 การตั้งค่า .env

**ข้อมูลส่วนตัวทั้งหมดอยู่ใน `.env` เท่านั้น** ไม่มีค่าใดเขียนตายตัวในโค้ด ถ้าไม่ได้ตั้งค่าไหน ส่วนที่ใช้ค่านั้นจะถูกซ่อน
ไฟล์ `.env` อยู่ใน `.gitignore` แล้ว **ห้าม commit**

| ตัวแปร | ใช้ทำอะไร | แสดงบนหน้าเว็บ |
|---|---|---|
| `VITE_USER_NAME` | ชื่อใน Navbar, Hero, About, `<title>` | ✅ เป็นข้อความ |
| `VITE_GITHUB_USERNAME`, `VITE_GITHUB_URL` | สถิติ GitHub และลิงก์ | ✅ เป็นข้อความ |
| `VITE_USER_EMAIL` | ปุ่มส่งอีเมล / คัดลอกอีเมล | 🔘 ไอคอนเท่านั้น |
| `VITE_USER_PHONE` | ปุ่มโทร | 🔘 ไอคอนเท่านั้น |
| `VITE_LINE_ID` | ลิงก์เพิ่มเพื่อน Line | 🔘 ไอคอนเท่านั้น |
| `VITE_INSTAGRAM_USERNAME`, `VITE_INSTAGRAM_URL` | ลิงก์ Instagram | 🔘 ไอคอนเท่านั้น |
| `VITE_FACEBOOK_NAME`, `VITE_FACEBOOK_URL` | ลิงก์ Facebook | 🔘 ไอคอนเท่านั้น |
| `VITE_USER_BIRTHDAY` | สำรองไว้ (ยังไม่แสดง) | — |
| `VITE_ENABLE_SELF_XSS_WARNING` | `true`/`false` แสดงคำเตือน Self-XSS ใน console | — |
| `VITE_SECURITY_MODE` | `strict`/`standard` (ค่าอื่นจะใช้ `strict`) *ยังไม่มีโค้ดใช้* | — |
| `VITE_ENABLE_SECURITY_LOGS`, `VITE_TEST_CSP_ENFORCE` | สำรองไว้สำหรับฟีเจอร์ในอนาคต | — |
| `PORT`, `JWT_SECRET`, `ALLOWED_ORIGINS` | ใช้กับ backend ใน `src/backend/services/` เท่านั้น | — |

ทุกค่าถูกอ่านและตรวจสอบในไฟล์เดียวคือ [`src/config/env.ts`](src/config/env.ts)

---

## 🧰 คำสั่งที่ใช้บ่อย

| คำสั่ง | ทำอะไร |
|---|---|
| `npm run dev` | เปิด dev server |
| `npm run build` | type-check + build production |
| `npm run lint` | ตรวจโค้ดด้วย ESLint |
| `npm test` | รันเทสทั้งหมด |
| `npm run test:watch` | รันเทสอัตโนมัติเมื่อแก้ไฟล์ |
| `npm run test:features` / `test:app` / `test:shared` / `test:config` | รันเทสเฉพาะส่วน |
| `npm run test:security` | รันเทสด้านความปลอดภัย (XSS, security guards, privacy) |
| `npm run test:coverage` | สร้างรายงาน coverage ใน `coverage/` |

รายละเอียดเทสทั้งหมดอยู่ที่ [TESTING.md](TESTING.md)

---

## 🗂️ โครงสร้างโปรเจกต์

จัดโค้ดแบบ **feature-based** แต่ละ feature มี component, CSS, ข้อมูล และ helper อยู่ในโฟลเดอร์เดียวกัน

```
src/
├── main.tsx              # จุดเริ่มต้น: CSS หลัก, security guards, render <App />
├── app/                  # ประกอบหน้าเว็บ (App.tsx, navigation, layout/, sections/)
├── config/env.ts         # ที่เดียวที่อ่าน VITE_*
├── features/
│   ├── profile/          # About + profileData.ts (ข้อมูลโปรไฟล์, ทักษะ, ใบประกาศ)
│   ├── projects/         # Work + projectsData.ts (ข้อมูลผลงาน)
│   ├── certificates/     # Certificates + certificatesData.ts (ไฟล์ PDF, หมวดหมู่)
│   ├── contact/          # Contact (ไอคอน)
│   ├── github/           # สถิติ GitHub แบบ live
│   └── studio/           # Services, FAQ, Statement
├── shared/               # ใช้ร่วมกันหลาย feature: components, hooks, lib, styles
└── backend/services/     # Express server (แยกจากแอป Vite)

public/                   # รูป, ไอคอน, PDF ใบประกาศ (certify_LifeLongLearning/)
tests/                    # โครงเดียวกับ src/ (app, config, features, shared, security)
```

คำอธิบายละเอียดของแต่ละโฟลเดอร์อยู่ที่ [src/README.md](src/README.md)

---

## ✏️ การแก้ไขเนื้อหา

| อยากแก้ | แก้ที่ |
|---|---|
| ชื่อ, อีเมล, เบอร์, โซเชียล | `.env` |
| ผลงาน (Work) | `src/features/projects/projectsData.ts` |
| ทักษะ, เครื่องมือ, ภาษา, รายชื่อใบประกาศ | `src/features/profile/profileData.ts` |
| ไฟล์ PDF ใบประกาศ | วางไว้ใน `public/certify_LifeLongLearning/` ถ้าชื่อไฟล์ไม่ตรงกับชื่อใบประกาศ ให้เพิ่มใน `certFiles` ของ `certificatesData.ts` |
| หมวดหมู่ใบประกาศ | `categoryKeywords` ใน `src/features/certificates/certificatesData.ts` |
| เมนู Navbar | `navItems` ใน `src/app/navigation.ts` |
| สี, ฟอนต์, ระยะห่าง | `src/shared/styles/variables.css` |
| รูปโปรไฟล์ | `public/picture/profile.jpg` |

ตัวอย่างการเพิ่มผลงาน:

```ts
// src/features/projects/projectsData.ts
{
  id: 9,
  title: 'New Project',
  date: '2026',
  role: 'Frontend Developer',
  details: ['สรุปผลงานสั้น ๆ'],
  link: [{ label: 'Live', url: 'https://...' }],
  tags: ['Frontend', 'UX/UI'],   // ใช้กับปุ่มกรอง
}
```

---

## 🧱 แนวทางการพัฒนา

1. **ข้อมูลส่วนตัวมาจาก `.env` เท่านั้น** ถ้าเผลอเขียนค่าจริงลงใน `src/` เทส `tests/config/envPrivacy.test.ts` จะล้ม
2. **feature ไม่ import ไฟล์ภายในของ feature อื่น** อะไรที่ใช้ร่วมกันให้ย้ายไป `shared/` (ยกเว้น `profileData.ts` ที่ใช้เป็นข้อมูลกลาง)
3. **`app/` ทำหน้าที่ประกอบหน้าเว็บเท่านั้น** เนื้อหาใหม่ให้สร้างเป็น feature แล้วนำมาวางใน `App.tsx`
4. **ไฟล์ component export เฉพาะ component** ส่วนค่าคงที่และ helper ให้แยกเป็นไฟล์ `.ts` เพื่อให้ Fast Refresh ทำงาน
5. **แต่ละ feature import CSS ของตัวเอง**
6. **รายการที่ค้นหา/กรองได้** ให้ใช้ `useFilteredList` คู่กับ `SearchBox`, `FilterTabs` และ `EmptyState` จาก `shared/`
7. **ทุกการเปลี่ยนแปลงต้องมีเทส** วางไว้ใน `tests/` ตำแหน่งเดียวกับไฟล์ใน `src/`
8. **ก่อนเปิด PR** ให้รัน `npm test`, `npx tsc -b` และ `npm run lint`
9. **ลิงก์ที่มาจากข้อมูลภายนอก** ต้องผ่าน `sanitizeUrl` และข้อความจากผู้ใช้ต้องไม่ถูกแสดงเป็น HTML (ดู [SECURITY.md](SECURITY.md))

### เพิ่ม section ใหม่
1. สร้าง `src/features/<name>/<Name>Section.tsx` และไฟล์ CSS ของมัน
2. เขียนเทสใน `tests/features/<name>/`
3. นำไปวางใน `src/app/App.tsx`
4. ถ้าต้องการให้มีในเมนู ให้เพิ่มใน `navItems` (`src/app/navigation.ts`)

---

## 📚 เอกสารอื่น

- [src/README.md](src/README.md) — โครงสร้างโค้ดและกฎการวางไฟล์
- [TESTING.md](TESTING.md) — โครงสร้างเทสและคำสั่งรันเทส
- [SECURITY.md](SECURITY.md) — แนวทางด้านความปลอดภัย

---

## 📄 License

© 2026 Thitirat Sirisawad. All rights reserved.
