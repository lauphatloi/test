/**
 * CẤU HÌNH KẾT NỐI GOOGLE APPS SCRIPT CHO FORM SH350i
 * 
 * Hướng dẫn nhanh:
 * 1. Mở file Google Sheet của bạn trên Google Drive.
 * 2. Vào menu 'Tiện ích mở rộng' (Extensions) -> 'Apps Script'.
 * 3. Copy toàn bộ nội dung file 'google-apps-script.js' (ở thư mục gốc dự án) dán vào đó.
 * 4. Nhấn nút 'Triển khai' (Deploy) -> 'Tùy chọn triển khai mới' (New deployment).
 *    - Chọn loại: 'Ứng dụng web' (Web app)
 *    - Mô tả: Form SH350i
 *    - Thực thi dưới dạng: Tôi (tài khoản của bạn)
 *    - Ai có quyền truy cập: Bất kỳ ai (Anyone)  <-- BẮT BUỘC để form gửi data thành công
 * 5. Copy Web App URL vừa nhận được (dạng https://script.google.com/macros/s/.../exec)
 *    và dán đè vào biến GOOGLE_SHEET_SCRIPT_URL bên dưới!
 */

export const GOOGLE_SHEET_SCRIPT_URL = 
  import.meta.env.VITE_GOOGLE_SHEET_SCRIPT_URL || 
  'https://script.google.com/macros/s/AKfycbz_REPLACE_WITH_YOUR_SCRIPT_ID/exec';
