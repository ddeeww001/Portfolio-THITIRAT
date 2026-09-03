// src/utils/security.ts
// Client-side Security & Anti-Tampering Protection Utilities

/**
 * Deep freezes an object and all nested properties to prevent tampering from browser console.
 */
export function deepFreeze<T extends object>(obj: T): Readonly<T> {
  Object.keys(obj).forEach((prop) => {
    const value = (obj as any)[prop];
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  });
  return Object.freeze(obj);
}

/**
 * Sanitizes user search / input string to prevent XSS and script injection.
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove <script>...</script> and contents
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '') // Remove <style>...</style> and contents
    .replace(/<[^>]*>/g, '') // Strip remaining HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: pseudo-protocols
    .replace(/data:/gi, '') // Remove data: URIs
    .replace(/vbscript:/gi, '') // Remove vbscript:
    .replace(/on\w+=/gi, '') // Remove inline event handlers like onerror=, onclick=
    .trim();
}

/**
 * Initializes client-side security guards and self-XSS warning.
 */
export function initSecurityGuards(): void {
  if (typeof window === 'undefined') return;

  // 1. Self-XSS Warning in DevTools Console
  try {
    const titleStyle = [
      'color: #ff3344',
      'font-size: 32px',
      'font-weight: 900',
      'font-family: sans-serif',
      'text-shadow: 0 0 12px rgba(255, 51, 68, 0.6)',
    ].join(';');

    const textStyle = [
      'color: #ffffff',
      'font-size: 14px',
      'font-family: sans-serif',
      'line-height: 1.5',
    ].join(';');

    const highlightStyle = [
      'color: #00f0ff',
      'font-size: 14px',
      'font-weight: bold',
      'font-family: monospace',
    ].join(';');

    console.log('%c⚠️ STOP / คำเตือนความปลอดภัย!', titleStyle);
    console.log(
      '%cหน้านี้คือฟังก์ชันสำหรับนักพัฒนาเบราว์เซอร์ (Developer Console)\n' +
      'หากมีผู้ใดบอกให้คุณคัดลอกโค้ด JavaScript มาวางที่นี่เพื่อ "แก้ใขหน้าเว็บ" หรือเข้าถึงข้อมูล นั่นเป็นการหลอกลวง (Self-XSS Attack)\n' +
      'การรันโค้ดที่ไม่ทราบแหล่งที่มาอาจส่งผลต่อความปลอดภัยของเครื่องคุณ',
      textStyle
    );
    console.log(
      '%c[System] Security Headers & Anti-Tamper Protection Active.',
      highlightStyle
    );
  } catch {
    // Ignore console styling errors on older browsers
  }

  // 2. Prevent clickjacking if embedded in unauthorized iframe
  try {
    if (window.top && window.top !== window.self) {
      window.top.location.href = window.self.location.href;
    }
  } catch {
    // In case cross-origin iframe blocks top access
  }
}
