# 🧪 Comprehensive Testing Architecture & Guide

คู่มือและโครงสร้างระบบทดสอบของ **Portfolio Application** พัฒนาด้วย [Vitest](https://vitest.dev/) และ [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) โดยมีการแบ่งสัดส่วนการทดสอบชัดเจนระหว่าง **Frontend UI & Interactions** และ **Backend/API Services & Security**

---

## 📑 สารบัญ (Table of Contents)
1. [โครงสร้างไดเรกทอรีการทดสอบ (Directory Structure)](#1-โครงสร้างไดเรกทอรีการทดสอบ-directory-structure)
2. [ชุดการทดสอบฝั่งหน้าบ้าน (Frontend Test Suite)](#2-ชุดการทดสอบฝั่งหน้าบ้าน-frontend-test-suite)
3. [ชุดการทดสอบฝั่งหลังบ้านและบริการ (Backend & Services Test Suite)](#3-ชุดการทดสอบฝั่งหลังบ้านและบริการ-backend--services-test-suite)
4. [คำสั่งสำหรับการรันการทดสอบ (Execution Commands)](#4-คำสั่งสำหรับการรันการทดสอบ-execution-commands)
5. [การตั้งค่า Mock & สภาพแวดล้อม (Test Setup & Mocks)](#5-การตั้งค่า-mock--สภาพแวดล้อม-test-setup--mocks)
6. [แนวทางการเขียนเทสเพิ่ม (How to Add New Tests)](#6-แนวทางการเขียนเทสเพิ่ม-how-to-add-new-tests)
7. [ตัวอย่าง CI/CD Automation (GitHub Actions)](#7-ตัวอย่าง-cicd-automation-github-actions)

---

## 1. โครงสร้างไดเรกทอรีการทดสอบ (Directory Structure)

```
d:\Portfolio\
├── tests\
│   ├── setup.ts                      # ⚙️ Global Test Setup (JSDOM, Canvas, Audio, PDF.js Mocks)
│   │
│   ├── security\                     # 🛡️ SECURITY & XSS ISOLATED TEST SUITE
│   │   └── xss.test.ts               # ทดสอบ XSS Payloads, Script Stripping, URL Sanitization, CSP & Escaping
│   │
│   ├── frontend\                     # 🖥️ FRONTEND TEST SUITE (UI, Components & User Interactions)
│   │   ├── Navbar.test.tsx           # ทดสอบ Desktop/Mobile Dropdown, Sound Toggle, Escape key
│   │   ├── Preloader.test.tsx        # ทดสอบ Splash Screen progress, minimumDuration, onComplete
│   │   ├── showExperience.test.tsx   # ทดสอบ Project filters, Debounced search, Empty state, Modal
│   │   ├── certificate.test.tsx      # ทดสอบ Certificate search, Category filter, Lightbox viewer
│   │   ├── GitHubSection.test.tsx    # ทดสอบ Live API fetch, Skeleton state, Refresh button, Error fallback
│   │   ├── Personal.test.tsx         # ทดสอบ Profile info, Avatar skeleton, Tech stack, Languages
│   │   └── ContactSection.test.tsx   # ทดสอบ Contact channels, Copy email clipboard & toast feedback
│   │
│   └── backend\                      # ⚙️ BACKEND / SERVICES & SECURITY TEST SUITE
│       ├── githubService.test.ts     # ทดสอบ 200 OK contract, 404 User Not Found, 403 Rate Limit, 500 Network error
│       ├── microlinkService.test.ts  # ทดสอบ URL Encoding, Parameter screenshot, Fallback URLs
│       ├── securityGuards.test.ts    # ทดสอบ XSS Sanitization (<script>, onerror=, javascript:), deepFreeze
│       └── envConfig.test.ts         # ทดสอบ Env fallback defaults, Schema integrity, Email regex
│
├── vitest.config.ts                  # 🛠️ Vitest Configuration (JSDOM, Coverage, Globals)
└── package.json                      # 📦 Test Scripts
```

---

## 2. ชุดการทดสอบฝั่งหน้าบ้าน (Frontend Test Suite)

ครอบคลุมทุก User Journey และการตอบสนองต่อการคลิก, การพิมพ์, แอนิเมชัน และ Responsive Breakpoints:

| ไฟล์ทดสอบ | กรณีทดสอบที่ครอบคลุม (Test Cases Covered) |
|---|---|
| **`Navbar.test.tsx`** | 1. ตรวจสอบการแสดงผลโลโก้และปุ่มเมนูหลัก (Home, Services, Work, About, Certificates, Contact)<br>2. ทดสอบปุ่มเปิด/ปิดเสียง (Sound Toggle) และสถานะ `AUDIO ON` / `MUTED`<br>3. ทดสอบการเปิด/ปิด Dropdown Menu บนหน้าจอมือถือ พร้อมการเลือก Section<br>4. ทดสอบการกดปุ่ม `Escape` หรือคลิก Backdrop เพื่อปิดเมนู |
| **`Preloader.test.tsx`** | 1. ตรวจสอบการแสดงผล Brand Title และ Tech Stack Badges (React 19, TypeScript)<br>2. ทดสอบการนับ Progress และการเรียก Callback `onComplete` หลังโหลดเสร็จ<br>3. ทดสอบการค้างสถานะ (Hold Progress ~88%) เมื่อ `isLoading === true` |
| **`showExperience.test.tsx`** | 1. ตรวจสอบการแสดงผลหัวข้อและปุ่ม Filter Tabs ทั้งหมด<br>2. ทดสอบการคลิก Filter หมวดหมู่ (`Hackathon`, `Design`, `Frontend`) และการสลับสถานะ `.active`<br>3. ทดสอบการค้นหาแบบ Debounced Search พร้อมการอัปเดตป้ายสถานะแบบเรียลไทม์<br>4. ทดสอบ Empty State เมื่อค้นหาไม่พบข้อมูล พร้อมการกดปุ่ม `Reset Filters ⟳`<br>5. ทดสอบการเปิดและปิด Project Quick View Modal Drawer |
| **`certificate.test.tsx`** | 1. ตรวจสอบช่องค้นหาและปุ่มเลือกหมวดหมู่ใบประกาศนียบัตร<br>2. ทดสอบการกรองใบประกาศตามคำค้นหา (เช่น `Agile`)<br>3. ทดสอบ Empty State เมื่อค้นหาไม่พบ และการกดปุ่ม `Reset Search ⟳`<br>4. ทดสอบการเปิดดูเอกสาร PDF Lightbox Viewer และการปิดหน้าต่าง |
| **`GitHubSection.test.tsx`** | 1. ตรวจสอบการแสดงสถิติและ Repositories เมื่อเรียก API สำเร็จ (Status 200 OK)<br>2. ทดสอบปุ่ม `⟳ REFRESH` สำหรับดึงข้อมูลสดใหม่ และการแสดงป้าย `✓ UPDATED`<br>3. ทดสอบ Error Fallback State เมื่อ GitHub API ล่มหรือไม่สามารถเชื่อมต่อได้ |
| **`Personal.test.tsx`** | 1. ตรวจสอบชื่อผู้ใช้, ตำแหน่ง (UX/UI Designer, Frontend Developer) และประวัติย่อ<br>2. ตรวจสอบรายชื่อทักษะ (HTML, React, TypeScript) และความสามารถด้านภาษา (Thai, English)<br>3. ตรวจสอบเครื่องมือและซอฟต์แวร์ออกแบบ (Figma, Canva, Visual Studio Code) |
| **`ContactSection.test.tsx`** | 1. ตรวจสอบการแสดงผลหัวข้อและช่องทางติดต่อโดยตรง (Email, Phone, Social links)<br>2. ทดสอบการคัดลอกอีเมลลง Clipboard (`navigator.clipboard.writeText`) พร้อมการแสดงผล Toast `✓ COPIED TO CLIPBOARD` |

---

## 3. ชุดการทดสอบฝั่งหลังบ้านและบริการ (Backend & Services Test Suite)

ทดสอบความถูกต้องของ Data Contract, Security Guards, การแปลงค่า URL และความสมบูรณ์ของ Environment Variables:

| ไฟล์ทดสอบ | กรณีทดสอบที่ครอบคลุม (Test Cases Covered) |
|---|---|
| **`githubService.test.ts`** | 1. **200 OK Contract:** ตรวจสอบโครงสร้าง Schema (`login`, `public_repos`, `followers`, `avatar_url`)<br>2. **404 User Not Found:** ตรวจสอบการดักจับข้อผิดพลาดเมื่อไม่พบบัญชีผู้ใช้<br>3. **403 Rate Limit Exceeded:** ตรวจสอบการรับมือเมื่อติด Rate Limit จาก GitHub API<br>4. **Network Failure / Timeout:** ตรวจสอบการจัดการเมื่อขาดการเชื่อมต่ออินเทอร์เน็ต |
| **`microlinkService.test.ts`** | 1. ตรวจสอบการเข้ารหัส Target URL ที่ซับซ้อน (URI Encoding) สำหรับเรียก Screenshot API<br>2. ตรวจสอบความถูกต้องของ Query Parameters (`screenshot=true`, `embed=screenshot.url`) |
| **`securityGuards.test.ts`** | 1. **XSS Sanitization:** ทดสอบ `sanitizeInput()` ตัดโค้ด `<script>`, `javascript:`, `vbscript:`, `onerror=` ออกทั้งหมด<br>2. **Deep Freeze Immutability:** ทดสอบ `deepFreeze()` ป้องกันการแก้ไข, ลบ หรือแทรก Property ใน Console<br>3. **Strict Mode Protection:** ยืนยันว่าการพยายามแก้ไขข้อมูลที่ถูก Freeze จะเกิด `TypeError` ทันที |
| **`envConfig.test.ts`** | 1. ตรวจสอบว่าระบบมีค่า Default Fallbacks ปลอดภัยครบทุกตัวแปรเมื่อไม่ได้ตั้งค่าใน `.env`<br>2. ตรวจสอบความถูกต้องของโครงสร้าง `profileDatabase` (ID, Roles, Skills, Certifications)<br>3. ตรวจสอบรูปแบบ Email Format ด้วย Regex |

---

## 4. คำสั่งสำหรับการรันการทดสอบ (Execution Commands)

### 🔹 รันชุดทดสอบทั้งหมด (Full Suite)
```bash
npm run test
```
*รันการทดสอบทั้งหมด (Frontend, Backend, Services และ XSS Security)*

### 🛡️ รันเฉพาะทดสอบระบบความปลอดภัย XSS (Isolated XSS Tests)
```bash
npm run test:xss
```
*รันเฉพาะการตรวจสอบการป้องกันช่องโหว่ Cross-Site Scripting (XSS), Script Stripping, HTML Escaping, URL Protocol Injection และ CSP Meta Tags ช่วยให้เช็คจุดผิดพลาดด้าน Security ได้อย่างรวดเร็วและตรงจุด*

### 🔒 รันชุดทดสอบความปลอดภัยทั้งหมด (Full Security Suite)
```bash
npm run test:security
```
*รันทั้ง XSS Isolated Tests (`tests/security/`) และ Security Guards / Deep Freeze Tests (`tests/backend/`)*

### 🔹 รันเฉพาะฝั่ง Frontend (UI & Component Tests)
```bash
npm run test:frontend
```
*รันเฉพาะไฟล์ใน `tests/frontend/` เพื่อความรวดเร็วในการพัฒนาหน้าบ้าน*

### 🔹 รันเฉพาะฝั่ง Backend & Services (API & Security Tests)
```bash
npm run test:backend
```
*รันเฉพาะไฟล์ใน `tests/backend/` เพื่อทดสอบ Logic, ความปลอดภัย และ Data Contracts*

### 🔹 รันแบบ Real-time Watch Mode (ระหว่างเขียนโค้ด)
```bash
npm run test:watch
```
*ระบบจะเฝ้าดูการเปลี่ยนแปลงของไฟล์ และรันเทสที่เกี่ยวข้องซ้ำให้อัตโนมัติทันทีที่กด Save*

### 🔹 รันรายงาน Code Coverage
```bash
npm run test:coverage
```
*สร้างรายงาน Coverage ตารางสรุปเปอร์เซ็นต์ของ Statements, Branches, Functions และ Lines พร้อมไฟล์ HTML ในโฟลเดอร์ `coverage/`*

---

## 5. การตั้งค่า Mock & สภาพแวดล้อม (Test Setup & Mocks)

ไฟล์ [`tests/setup.ts`](file:///d:/Portfolio/tests/setup.ts) ทำการตั้งค่าจำลอง Browser APIs ที่ Node.js ไม่มีอยู่โดยกำเนิด:

1. **`window.scrollTo`**: จำลองฟังก์ชันเลื่อนหน้าจอไปยัง Section ต่างๆ
2. **`window.matchMedia`**: จำลอง Responsive Viewport สำหรับตรวจจับหน้าจอมือถือ ($\le 850\text{px}$)
3. **`IntersectionObserver`**: จำลองการตรวจจับ Element เมื่อเลื่อนเข้าสู่หน้าจอ
4. **`AudioContext` & `webkitAudioContext`**: จำลอง Web Audio Oscillator และ Gain Nodes สำหรับ Sound Effects
5. **`HTMLCanvasElement` & 2D Context**: จำลอง Canvas API (`fillRect`, `drawImage`, `toDataURL`)
6. **`pdfjs-dist`**: Mocking API ของ PDF.js ไม่ให้เกิดการเรียก Web Worker จริงขณะรัน Unit Test
7. **`document.fonts`**: จำลอง `document.fonts.ready` สำหรับ Asset Preloader

---

## 6. แนวทางการเขียนเทสเพิ่ม (How to Add New Tests)

### การเพิ่มเทสสำหรับ Component ใหม่ใน Frontend:
สร้างไฟล์ `tests/frontend/NewComponent.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NewComponent } from '../../src/frontend/components/NewComponent';

describe('NewComponent (Frontend Test)', () => {
  it('renders correctly with initial state', () => {
    render(<NewComponent title="My Title" />);
    expect(screen.getByText('My Title')).toBeInTheDocument();
  });

  it('handles user interaction properly', () => {
    render(<NewComponent title="My Title" />);
    const btn = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(btn);
    expect(screen.getByText(/Success/i)).toBeInTheDocument();
  });
});
```

### การเพิ่มเทสสำหรับ Service หรือฟังก์ชัน Utility ใน Backend:
สร้างไฟล์ `tests/backend/newService.test.ts`:
```ts
import { describe, it, expect, vi } from 'vitest';
import { newUtilityFunction } from '../../src/utils/newUtility';

describe('New Utility Service (Backend Test)', () => {
  it('transforms data correctly', () => {
    const result = newUtilityFunction('input-data');
    expect(result).toBe('expected-output');
  });
});
```

---

## 7. ตัวอย่าง CI/CD Automation (GitHub Actions)

คุณสามารถนำไฟล์ Workflow นี้ไปวางไว้ที่ `.github/workflows/test.yml` เพื่อให้ GitHub Actions รันเทสและสร้างรายงานอัตโนมัติทุกครั้งที่มีการ Push หรือเปิด Pull Request:

```yaml
name: Continuous Integration & Automated Testing

on:
  push:
    branches: [ main, master, portfolio-* ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    name: Run Test Suites & Build Check
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Backend & Security Tests
        run: npm run test:backend

      - name: Run Frontend UI Tests
        run: npm run test:frontend

      - name: Run Full Production Build
        run: npm run build
```

---

*เอกสารฉบับนี้อัปเดตล่าสุด: มีนาคม 2026 • จัดทำสำหรับระบบพอร์ตโฟลิโอของ Thitirat Sirisawad*
