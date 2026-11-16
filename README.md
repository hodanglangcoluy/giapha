# Trang web gia phả họ Đặng (phái 3, làng Cổ Lũy)

Trang tĩnh chạy trên **GitHub Pages**, lưu dữ liệu chung bằng **Firebase** (gói miễn phí Spark, không cần thẻ thanh toán).

## Có gì trong thư mục này

| Tệp | Việc của tệp |
|---|---|
| `index.html` | Cả trang web, kèm dữ liệu 476 thành viên đời 9 đến 17 |
| `img/` | Ảnh làng quê và bản đồ |
| `firebase-config.js` | **Bạn điền** cấu hình Firebase và email quản trị viên |
| `firestore.rules` | **Bạn dán** vào Firebase, đây là chỗ quyết định ai được làm gì |
| `.nojekyll` | Tệp rỗng, báo cho GitHub không xử lý Jekyll (có cũng được, không có cũng chạy) |

Khi chưa điền `firebase-config.js`, trang vẫn mở được ở **chế độ chạy thử**: xem gia phả bình thường, nhưng bài viết, sự kiện, yêu cầu cập nhật chỉ lưu trong tab và mất khi tải lại.

## Cài đặt, làm một lần (khoảng 20 phút)

### 1. Đưa lên GitHub
1. Vào github.com, bấm **New repository**, đặt tên ví dụ `gia-pha-ho-dang`, chọn **Public**.
2. Bấm **uploading an existing file**, kéo toàn bộ tệp và thư mục `img` trong gói này vào, bấm **Commit changes**.
3. Vào **Settings > Pages**. Ở mục Source chọn **Deploy from a branch**, nhánh `main`, thư mục `/ (root)`, bấm Save.
4. Sau 1 đến 2 phút trang có địa chỉ dạng `https://TEN-GITHUB.github.io/gia-pha-ho-dang/`.

### 2. Tạo dự án Firebase
1. Vào console.firebase.google.com, đăng nhập bằng tài khoản Google, bấm **Create a project** (có thể tắt Google Analytics).
2. Menu **Build > Authentication > Get started > Sign-in method**: bật **Google** và **Email/Password**.
3. Cũng trong Authentication, mở **Settings > Authorized domains > Add domain**, thêm `TEN-GITHUB.github.io`. Thiếu bước này thì nút đăng nhập báo lỗi.
4. Menu **Build > Firestore Database > Create database**. Chọn vị trí gần Việt Nam (ví dụ `asia-southeast1`), chọn **Production mode**.

### 3. Dán luật bảo mật
1. Trong Firestore Database, mở tab **Rules**.
2. Mở tệp `firestore.rules`, **sửa dòng email quản trị** (tìm `email-quan-tri-1@gmail.com`), rồi dán toàn bộ nội dung vào ô Rules và bấm **Publish**.

### 4. Nối trang web với Firebase
1. Trong Firebase, bấm bánh răng cạnh Project Overview, chọn **Project settings**. Kéo xuống **Your apps**, bấm biểu tượng web `</>`, đặt tên bất kỳ, bấm Register app.
2. Firebase hiện đoạn `firebaseConfig = {...}`. Chép các giá trị `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId` vào `firebase-config.js` trên GitHub (bấm biểu tượng bút chì để sửa, rồi Commit).
3. Trong cùng tệp, sửa `ADMIN_EMAILS` thành email quản trị. **Danh sách này phải giống danh sách trong firestore.rules.**
4. Chờ 1 phút, mở lại trang, bấm **Đăng nhập bằng Google** bằng email quản trị. Thanh trên cùng sẽ hiện mục **Duyệt cập nhật**.

Giá trị trong `firebase-config.js` không phải mật khẩu và có thể công khai. Việc bảo vệ dữ liệu do `firestore.rules` đảm nhiệm.

## Trang admin hoạt động thế nào

**Ba loại người dùng**

| Ai | Làm được gì |
|---|---|
| Khách chưa đăng nhập | Xem trang chủ, lịch sử, tra cứu, phả đồ, blog, lịch sự kiện, ảnh tư liệu |
| Con cháu đã đăng nhập (Google hoặc email) | Thêm: gửi yêu cầu cập nhật, thêm ảnh, viết blog, thêm sự kiện, đăng ký tham dự. Xem thông tin do con cháu bổ sung. Sửa, xoá nội dung của chính mình |
| Quản trị viên (email nằm trong danh sách) | Tất cả những điều trên, cộng: thấy mục **Duyệt cập nhật**, duyệt hoặc từ chối yêu cầu, xoá bài, sự kiện, ảnh của người khác |

**Luồng cập nhật thông tin một người**
1. Con cháu đăng nhập, mở hồ sơ người đó, bấm **Gửi cập nhật**, ghi thông tin mới và nguồn.
2. Yêu cầu vào hàng chờ với trạng thái `pending`. Chỉ người gửi và quản trị viên xem được yêu cầu này.
3. Quản trị viên vào **Duyệt cập nhật**, so sánh "Hiện có" với "Đề xuất", bấm **Duyệt và cập nhật** hoặc **Từ chối**.
4. Khi duyệt, giá trị mới được ghi vào bộ dữ liệu `overrides` và hiện trên hồ sơ. Dữ liệu gốc trong trang không bị sửa, nên luôn xoá được nếu duyệt nhầm.

**Luồng thêm con, vợ chồng, cha mẹ, nơi sinh**
1. Trên hồ sơ một người, mục Quan hệ có các nút **＋ Thêm con**, **＋ Thêm vợ hoặc chồng** và (với người chưa có cha mẹ trong phả hệ) **Gắn cha hoặc mẹ**. Nơi sinh là một mục mới trong thông tin cá nhân, gửi cập nhật như các mục khác.
2. Biểu mẫu thêm người mới hỏi họ tên, giới tính, ngày sinh dương và âm lịch, nơi sinh, tình trạng, ngày mất, nghề nghiệp, rồi thông tin người gửi và nguồn. Họ tên tự được viết hoa chữ cái đầu. Nếu tên trùng với người đã có, biểu mẫu cảnh báo một lần.
3. Đề nghị vào hàng chờ duyệt, hiển thị đầy đủ: ai thêm cho ai, thông tin gì, ai gửi.
4. Quản trị viên bấm **Duyệt và thêm vào phả hệ**: người mới được tạo trong bộ dữ liệu `newmembers` với mã số mới (từ 1001), tự nối cha mẹ hoặc vợ chồng, tự thuộc đúng đời và nhánh, rồi hiện trong cây, phả đồ, tra cứu. Với đề nghị **Gắn cha hoặc mẹ**, hồ sơ được nối vào cha hoặc mẹ đã chọn.
5. Dữ liệu gốc không bị sửa. Muốn gỡ một người đã duyệt nhầm, quản trị viên xoá tài liệu tương ứng trong Firebase (bộ `newmembers`).

**Quyền được kiểm tra ở máy chủ Firebase**, không chỉ ở giao diện. Ai đó mở công cụ lập trình của trình duyệt cũng không tự cấp quyền admin cho mình được, vì Firestore từ chối theo `firestore.rules`.
Quản trị viên phải đăng nhập bằng email **đã xác minh**. Đăng nhập Google luôn thoả điều này. Nếu dùng email và mật khẩu, bấm đường dẫn xác minh trong thư Firebase gửi.

**Thêm hoặc bớt quản trị viên**: sửa danh sách email ở cả `firebase-config.js` và `firestore.rules` (nhớ Publish lại rules).

## Quyền riêng tư: cần biết

- Kho GitHub công khai, nên dữ liệu 476 thành viên trong `index.html` (tên, quan hệ, ngày sinh có trong bản gia phả 2008) ai cũng đọc được, kể cả người chưa đăng nhập. Nếu họ muốn ẩn thông tin người còn sống, cần xử lý trước khi đưa lên.
- Thông tin con cháu bổ sung (điện thoại, địa chỉ, email, ngày sinh mới) chỉ **người đã đăng nhập** mới xem được, nhờ luật `overrides` và `photos`. Nếu muốn công khai hoàn toàn, cần đổi luật và một đoạn mã nhỏ.
- Người mới được duyệt thêm (bộ `newmembers`) cũng chỉ hiện với người đã đăng nhập, giống thông tin bổ sung.
- Email người đăng nhập được Firebase lưu. Tên người viết blog và người đăng ký tham dự hiện cho mọi người xem.

## Giới hạn của bản này

- Ảnh được thu nhỏ rồi lưu thẳng trong Firestore để không cần gói trả phí. Mỗi lần mở trang sau khi đăng nhập, trình duyệt tải toàn bộ ảnh người đã có. Khi ảnh lên đến vài trăm, trang sẽ chậm. Lúc đó nên chuyển sang Firebase Storage (cần gói Blaze, có hạn mức miễn phí nhưng phải gắn thẻ).
- Gói Spark có hạn mức miễn phí mỗi ngày về số lượt đọc, ghi và dung lượng lưu. Với một dòng họ vài trăm người dùng là đủ, nhưng nên xem mục Usage trong Firebase thỉnh thoảng.
- Bài viết, sự kiện, đăng ký của người đã đăng nhập hiện ngay, chưa qua duyệt. Nếu có spam, quản trị viên xoá được, hoặc có thể thêm bước duyệt bài.
- Firebase không tự sao lưu miễn phí. Xuất dữ liệu tự động cần gói Blaze. Nên thỉnh thoảng chụp màn hình hoặc sao chép nội dung quan trọng.
- Dữ liệu gốc (476 người, quan hệ cha con) nằm trong `index.html`. Sửa trực tiếp thì phải sửa tệp này.

## Chạy thử trên máy

Mở thẳng `index.html` bằng trình duyệt sẽ chạy ở chế độ chạy thử. Đăng nhập Firebase cần địa chỉ `https://` của GitHub Pages, hoặc `http://localhost` nếu bạn chạy `python3 -m http.server` trong thư mục này (khi đó nhớ thêm `localhost` vào Authorized domains).
