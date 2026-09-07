# HƯỚNG DẪN KẾT NỐI FORM LANDING PAGE VỀ GOOGLE SHEET (QUA APPS SCRIPT)

Hệ thống đã được lập trình sẵn để tự động gửi toàn bộ thông tin đăng ký tư vấn/lái thử SH350i về trang tính Google Sheet của bạn.

---

## 5 BƯỚC THIẾT LẬP (MẤT KHOẢNG 2 PHÚT)

### Bước 1: Tạo Google Sheet
1. Truy cập [Google Drive](https://drive.google.com/) và tạo một file **Google Trang tính (Google Sheets)** mới.
2. Đặt tên file tùy ý, ví dụ: `Khách Hàng Đăng Ký SH350i - HEAD OSC`.

---

### Bước 2: Mở Apps Script
1. Trên thanh menu trên cùng của Google Sheet, bấm chọn:
   **Tiện ích mở rộng (Extensions)** ➔ **Apps Script**.
2. Một tab trình duyệt mới sẽ mở ra giao diện soạn thảo code của Google.

---

### Bước 3: Dán Mã Nguồn
1. Mở file `google-apps-script.js` trong thư mục dự án này.
2. Xóa toàn bộ nội dung mặc định trong file `Code.gs` của Apps Script.
3. **Sao chép toàn bộ nội dung** từ file `google-apps-script.js` và dán vào `Code.gs`.
4. Bấm tổ hợp phím **Ctrl + S** (hoặc biểu tượng cái Đĩa mềm) để Lưu.

---

### Bước 4: Triển khai (Deploy) Web App
1. Ở góc trên cùng bên phải màn hình Apps Script, bấm nút **Triển khai (Deploy)** màu xanh ➔ Chọn **Tùy chọn triển khai mới (New deployment)**.
2. Ở mục **Chọn loại (Select type)** (bấm vào biểu tượng bánh răng ⚙️):
   - Chọn **Ứng dụng web (Web App)**.
3. Điền thông tin cấu hình:
   - **Mô tả (Description):** `API Form SH350i`
   - **Thực thi dưới dạng (Execute as):** `Tôi (tài khoản email của bạn)`
   - **Ai có quyền truy cập (Who has access):** ⚠️ Chọn **Bất kỳ ai (Anyone)** *(Lưu ý quan trọng: Bắt buộc chọn Bất kỳ ai để người xem web có thể gửi dữ liệu vào Sheet)*.
4. Bấm nút **Triển khai (Deploy)**:
   - Nếu Google hiển thị bảng yêu cầu cấp quyền: Bấm **Ủy quyền truy cập (Authorize access)** ➔ Chọn email của bạn ➔ Bấm **Nâng cao (Advanced)** ở góc dưới bên trái ➔ Bấm **Đi tới... (không an toàn)** ➔ Bấm **Cho phép (Allow)**.
5. Google sẽ cấp cho bạn một **URL ứng dụng web (Web App URL)** kết thúc bằng `/exec`. Hãy **sao chép (Copy)** URL này.

---

### Bước 5: Dán URL vào dự án
Mở file `src/config/googleSheet.js` trong source code:
```javascript
export const GOOGLE_SHEET_SCRIPT_URL = 
  'https://script.google.com/macros/s/AKfycbz_URL_VUA_COPY/exec';
```
Dán URL bạn vừa copy vào thay cho dòng mặc định.

Sau đó lưu file và chạy lệnh deploy:
```bash
npm run deploy
```

---

## CÁC CỘT DỮ LIỆU TỰ ĐỘNG TẠO TRÊN GOOGLE SHEET:
| Mã Lịch Hẹn | Thời Gian Đăng Ký | Họ Và Tên | Số Điện Thoại | Phiên Bản Quan Tâm | Đại Lý HEAD Tiếp Nhận | Ghi Chú Thêm | Trạng Thái Tư Vấn |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| SH350-128945 | 07/09/2026 16:30:00 | Nguyễn Văn An | 0909123456 | Bản Thể Thao ( Xám Đen ) | Phú Nhuận - HEAD OSC | Cần tư vấn biển số TP.HCM | Mới tiếp nhận |

- Số điện thoại được giữ nguyên số `0` ở đầu.
- Hàng tiêu đề được tự động định dạng màu đen xám thanh lịch, ghim cố định dòng 1.
- Hỗ trợ chống trùng lặp và ghi đồng thời nhiều khách đăng ký cùng lúc an toàn.
