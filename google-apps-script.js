/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: TỰ ĐỘNG THU THẬP DỮ LIỆU ĐĂNG KÝ HONDA SH350i
 * =========================================================================
 * 
 * HƯỚNG DẪN CÀI ĐẶT & SỬA LỖI TRUY CẬP (HTTP 403):
 * -------------------------------------------------------------------------
 * LƯU Ý QUAN TRỌNG NHẤT:
 * Nếu gửi form bị lỗi "Bạn cần có quyền truy cập" hoặc mã 403 Forbidden:
 * -> Đó là do khi Triển khai (Deploy), mục "Ai có quyền truy cập" (Who has access)
 *    chưa được chọn là "BẤT KỲ AI" (Anyone).
 * 
 * CÁCH CHỈNH LẠI:
 * 1. Trong Apps Script, bấm nút "Triển khai" (Deploy) -> "Quản lý các bản triển khai" (Manage deployments).
 * 2. Bấm vào biểu tượng CÂY BÚT CHÌ (Chỉnh sửa) ở bản triển khai đang có.
 * 3. Ở mục "Phiên bản" (Version): Chọn "Phiên bản mới" (New version).
 * 4. Ở mục "Ai có quyền truy cập" (Who has access): Chọn "Bất kỳ ai" (Anyone).
 * 5. Bấm "Triển khai" (Deploy) để hoàn tất.
 * =========================================================================
 */

// Tên trang tính (sheet tab) để lưu dữ liệu khách hàng
var SHEET_NAME = 'DanhSachDangKy';

/**
 * Xử lý yêu cầu POST khi khách hàng bấm gửi form từ Landing Page
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Khóa tối đa 30 giây để xử lý an toàn khi nhiều khách gửi form cùng lúc
  lock.tryLock(30000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    if (!doc) {
      throw new Error("Không tìm thấy Google Sheet. Vui lòng mở Apps Script từ menu 'Tiện ích mở rộng' -> 'Apps Script' trong Google Sheet của bạn.");
    }

    var sheet = doc.getSheetByName(SHEET_NAME);
    
    // Nếu chưa có tab DanhSachDangKy thì lấy sheet hiện tại hoặc đổi tên sheet mặc định
    if (!sheet) {
      sheet = doc.getActiveSheet();
      if (sheet.getName() === 'Trang tính1' || sheet.getName() === 'Sheet1') {
        sheet.setName(SHEET_NAME);
      } else {
        sheet = doc.insertSheet(SHEET_NAME);
      }
    }

    // Danh sách tiêu đề các cột
    var headers = [
      'Mã Lịch Hẹn',
      'Thời Gian Đăng Ký',
      'Họ Và Tên',
      'Số Điện Thoại',
      'Phiên Bản Quan Tâm',
      'Đại Lý HEAD Tiếp Nhận',
      'Ghi Chú Thêm',
      'Trạng Thái Tư Vấn'
    ];

    // Tự động tạo hàng tiêu đề nếu Sheet còn trống (dòng 1 chưa có)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#1e293b'); // Màu xám đen sang trọng
      headerRange.setFontColor('#ffffff'); // Chữ trắng
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
      headerRange.setVerticalAlignment('middle');
      sheet.setRowHeight(1, 38);
      sheet.setFrozenRows(1); // Ghim dòng tiêu đề
    }

    // Đọc dữ liệu gửi lên từ Landing Page
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = (e && e.parameter) ? e.parameter : {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Lấy thông tin từ payload
    var bookingCode = data.bookingCode || ('SH350-' + Math.floor(100000 + Math.random() * 900000));
    var timestamp = data.timestamp || Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');
    var name = data.name || 'Khách hàng';
    
    // Thêm ký tự ' ở đầu số điện thoại để Google Sheet không làm mất số 0 đầu tiên
    var rawPhone = (data.phone || '').toString().trim();
    var phone = rawPhone ? (rawPhone.startsWith("'") ? rawPhone : "'" + rawPhone) : '';
    var edition = data.edition || 'Honda SH350i';
    var city = data.city || 'Phú Nhuận - HEAD OSC';
    var note = data.note || '';
    var status = 'Mới tiếp nhận';

    // Thêm một dòng mới vào Sheet
    sheet.appendRow([
      bookingCode,
      timestamp,
      name,
      phone,
      edition,
      city,
      note,
      status
    ]);

    // Định dạng thẩm mỹ cho dòng dữ liệu mới
    var newRowIdx = sheet.getLastRow();
    sheet.setRowHeight(newRowIdx, 30);
    sheet.getRange(newRowIdx, 1).setHorizontalAlignment('center').setFontWeight('bold').setFontColor('#dc2626'); // Mã màu đỏ thể thao
    sheet.getRange(newRowIdx, 2).setHorizontalAlignment('center'); // Thời gian
    sheet.getRange(newRowIdx, 3).setFontWeight('medium'); // Họ tên
    sheet.getRange(newRowIdx, 4).setHorizontalAlignment('center'); // SĐT
    sheet.getRange(newRowIdx, 5).setHorizontalAlignment('left'); // Phiên bản
    sheet.getRange(newRowIdx, 6).setHorizontalAlignment('left'); // Đại lý
    sheet.getRange(newRowIdx, 7).setHorizontalAlignment('left'); // Ghi chú
    sheet.getRange(newRowIdx, 8).setHorizontalAlignment('center').setBackground('#fef2f2').setFontColor('#b91c1c').setFontWeight('bold'); // Trạng thái nổi bật

    // Tự căn chỉnh độ rộng các cột
    sheet.autoResizeColumns(1, headers.length);

    // Trả về JSON xác nhận thành công
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Đăng ký thành công! Dữ liệu đã được lưu vào Google Sheet.',
        bookingCode: bookingCode
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Xử lý yêu cầu GET: Cho phép kiểm tra nhanh trạng thái Web App trên trình duyệt
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'active',
      service: 'Honda SH350i Lead Generation API',
      message: 'Hệ thống kết nối Google Sheet đang sẵn sàng nhận dữ liệu đăng ký!'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * HÀM TEST THỬ NGHIỆM:
 * Dùng để test trực tiếp trong màn hình Apps Script:
 * Chọn hàm "testChayThu" ở thanh công cụ phía trên rồi bấm nút "Chạy" (Run) ▶.
 * Bạn sẽ thấy ngay 1 dòng dữ liệu mẫu tự động xuất hiện trên Google Sheet!
 */
function testChayThu() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        bookingCode: 'SH350-TEST999',
        name: 'Nguyễn Văn Test',
        phone: '0988888888',
        edition: 'Bản Thể Thao ( Xám Đen )',
        city: 'Phú Nhuận - HEAD OSC',
        note: 'Đơn hàng test thử nghiệm',
        timestamp: Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss')
      })
    }
  };
  var result = doPost(fakeEvent);
  Logger.log("Kết quả test: " + result.getContent());
}
