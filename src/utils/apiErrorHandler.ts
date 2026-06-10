
export interface ApiError {
  message: string;
  instruction: string;
  technicalDetails?: string;
}

export const handleApiError = (response: Response | null, error?: any): ApiError => {
  if (!response) {
    return {
      message: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์หลังบ้านได้",
      instruction: "กรุณาเปิด Terminal และรันคำสั่ง 'node src/backend/server.cjs' ก่อนใช้งาน",
      technicalDetails: error?.message
    };
  }

  const contentType = response.headers.get("content-type");
  
  if (contentType && contentType.includes("text/html")) {
    return {
      message: "ตรวจพบการส่งข้อมูลผิดพลาด (ได้รับ HTML แทน JSON)",
      instruction: "สาเหตุน่าจะมาจาก URL ของ API ไม่ถูกต้อง หรือเซิร์ฟเวอร์หลังบ้านส่งหน้าเว็บกลับมาแทนข้อมูล",
      technicalDetails: `URL: ${response.url} | Status: ${response.status}`
    };
  }

  if (response.status === 401) {
    return {
      message: "รหัสผ่านไม่ถูกต้อง หรือไม่มีสิทธิ์เข้าถึง",
      instruction: "กรุณาตรวจสอบ Username/Password หรือลอง Login ใหม่อีกครั้ง",
    };
  }

  if (response.status === 403) {
    return {
      message: "Session หมดอายุ",
      instruction: "กรุณาเข้าสู่ระบบใหม่อีกครั้งเพื่อความปลอดภัย",
    };
  }

  return {
    message: "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ",
    instruction: "ลองตรวจสอบการเชื่อมต่ออินเทอร์เน็ต หรือสถานะของฐานข้อมูล SQLite",
    technicalDetails: `Status: ${response.status}`
  };
};
