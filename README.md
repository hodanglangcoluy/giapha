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

### 5. Nạp dữ liệu gia phả lên Firebase (làm một lần)
Để gia phả thật sự riêng tư, **dữ liệu 476 thành viên không nằm trong mã nguồn GitHub**. Nó nằm trong Firebase và chỉ người đã được duyệt mới đọc được.
1. Trong gói tải về có thư mục `KHONG-DUA-LEN-GITHUB` chứa tệp `members.json`. **Không đưa tệp này lên GitHub.** Hãy cất ở máy bạn.
2. Đăng nhập bằng email quản trị, mở mục **Duyệt cập nhật**, kéo xuống ô **Dữ liệu gốc của gia phả**, chọn tệp `members.json`, bấm đồng ý. Khi báo "Đã nạp xong 476 thành viên" là xong.

Giá trị trong `firebase-config.js` không phải mật khẩu và có thể công khai. Việc bảo vệ dữ liệu do `firestore.rules` đảm nhiệm.

## Trang admin hoạt động thế nào

**Ba loại người dùng**

| Ai | Làm được gì |
|---|---|
| Khách chưa đăng nhập | Chỉ thấy màn hình mời đăng nhập, không xem được gì của gia phả |
| Tài khoản mới đăng ký, chưa được duyệt | Thấy thông báo "Tài khoản đang chờ duyệt", chưa xem được gì |
| Con cháu đã được duyệt | Xem toàn bộ gia phả. Gửi yêu cầu cập nhật, thêm ảnh, viết blog, thêm sự kiện, đăng ký tham dự. Sửa, xoá nội dung của chính mình |
| Quản trị viên (email nằm trong danh sách) | Tất cả những điều trên, cộng: **duyệt hoặc thu hồi tài khoản**, nạp dữ liệu gốc, duyệt yêu cầu cập nhật, xoá bài, sự kiện, ảnh của người khác |

**Luồng cho người muốn xem gia phả**
1. Người đó mở trang, bấm **Đăng nhập hoặc tạo tài khoản** (Google hoặc email và mật khẩu).
2. Hệ thống tự tạo một yêu cầu "chờ duyệt" mang email của họ. Họ chỉ thấy thông báo chờ.
3. Quản trị viên vào **Duyệt cập nhật**, mục **Tài khoản chờ cho phép xem**, kiểm tra email có đúng người trong họ, bấm **Cho phép xem** hoặc **Từ chối**. Bấm **Thu hồi quyền** bất cứ lúc nào để khoá lại.
4. Người đó tải lại trang là xem được. Nên nhắn riêng cho quản trị viên biết email mình đã dùng để đăng ký.

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

**Sửa khi thông tin bị sai hoặc thiếu (quản trị viên)**
Mở hồ sơ người đó, dòng **Quản trị** dưới mục Quan hệ có các nút:
- **Sửa thông tin**: sửa họ tên, năm sinh, mọi mục thông tin, tên cha và tên mẹ (dạng chữ). Bấm Lưu là áp dụng ngay, không qua hàng chờ. Để trống một ô là xoá thông tin đó. Làm được cho cả người trong dữ liệu gốc lẫn người con cháu thêm vào. Bản gốc không bị mất: thay đổi nằm ở bộ `overrides`, xoá tài liệu tương ứng là về như cũ.
- **Đổi cha hoặc mẹ**, **Gỡ cha**, **Gỡ mẹ**: chỉnh quan hệ cha mẹ.
- **Xoá người này**: chỉ có với người con cháu thêm vào (hỏi xác nhận). Con của người đó trở thành người chưa nối cha mẹ.
- Khi quản trị viên tự bấm **＋ Thêm con**, **＋ Thêm vợ hoặc chồng**, **Gắn cha hoặc mẹ** thì thay đổi được áp dụng ngay, không cần tự duyệt.

**Thêm con mà quên tên mẹ (hoặc cha)**
- Khi thêm con, có ô "Hoặc ghi tên cha hoặc mẹ còn lại nếu chưa có trong danh sách". Ghi ở đó thì hồ sơ con hiện tên mẹ dạng chữ.
- Mở lại hồ sơ người con, nếu còn thiếu cha hoặc mẹ sẽ có nút **Bổ sung cha** hoặc **Bổ sung mẹ**. Bấm vào để chọn người đã có trong phả hệ (cùng đời với cha mẹ), hoặc ghi tên nếu người đó chưa có trong phả hệ. Đề nghị đi qua hàng chờ duyệt như các đề nghị khác.
- Muốn mẹ trở thành một hồ sơ đầy đủ (có ngày sinh, ảnh…), trước hết thêm bà ấy làm vợ của người cha bằng **＋ Thêm vợ hoặc chồng**, rồi dùng **Bổ sung mẹ** để chọn bà ấy.

**Quyền được kiểm tra ở máy chủ Firebase**, không chỉ ở giao diện. Ai đó mở công cụ lập trình của trình duyệt cũng không tự cấp quyền admin cho mình được, vì Firestore từ chối theo `firestore.rules`.
Quản trị viên phải đăng nhập bằng email **đã xác minh**. Đăng nhập Google luôn thoả điều này. Nếu dùng email và mật khẩu, bấm đường dẫn xác minh trong thư Firebase gửi.

**Thêm hoặc bớt quản trị viên**: sửa danh sách email ở cả `firebase-config.js` và `firestore.rules` (nhớ Publish lại rules).

## Quyền riêng tư: cần biết

- Toàn bộ dữ liệu gia phả (476 thành viên, quan hệ, ngày sinh, thông tin bổ sung, ảnh, blog, lịch) nằm trong Firebase và chỉ đọc được khi đã đăng nhập **và** được quản trị viên duyệt. Điều này do `firestore.rules` bảo đảm ở máy chủ, không chỉ ở giao diện.
- Phần còn nằm công khai trong `index.html` trên GitHub: giao diện, bài lịch sử họ ở trang chủ, ba bài mẫu trong blog, các ảnh làng quê trong thư mục `img`. Ai biết địa chỉ đều đọc được phần này. Nếu cũng muốn giấu, cần chuyển sang kho GitHub riêng tư (Pages cho kho riêng tư cần gói GitHub trả phí) hoặc đưa nội dung đó vào Firebase.
- Cho phép xem là cho xem **toàn bộ** gia phả, gồm cả thông tin người còn sống. Hãy chỉ duyệt người bạn biết rõ.
- Email người đăng ký được Firebase lưu và quản trị viên thấy được. Tên người viết blog và người đăng ký tham dự hiện cho mọi người đã được duyệt xem.
- Giá trị trong `firebase-config.js` công khai nhưng không cho ai đọc dữ liệu nếu `firestore.rules` đã được dán và Publish đúng.

## Giới hạn của bản này

- Ảnh được thu nhỏ rồi lưu thẳng trong Firestore để không cần gói trả phí. Mỗi lần mở trang sau khi đăng nhập, trình duyệt tải toàn bộ ảnh người đã có. Khi ảnh lên đến vài trăm, trang sẽ chậm. Lúc đó nên chuyển sang Firebase Storage (cần gói Blaze, có hạn mức miễn phí nhưng phải gắn thẻ).
- Gói Spark có hạn mức miễn phí mỗi ngày về số lượt đọc, ghi và dung lượng lưu. Với một dòng họ vài trăm người dùng là đủ, nhưng nên xem mục Usage trong Firebase thỉnh thoảng.
- Bài viết, sự kiện, đăng ký của người đã đăng nhập hiện ngay, chưa qua duyệt. Nếu có spam, quản trị viên xoá được, hoặc có thể thêm bước duyệt bài.
- Firebase không tự sao lưu miễn phí. Xuất dữ liệu tự động cần gói Blaze. Nên thỉnh thoảng chụp màn hình hoặc sao chép nội dung quan trọng.
- Dữ liệu gốc (476 người) nằm trong Firebase, bộ `base`. Muốn thay cả bộ, nạp lại tệp `members.json` ở mục Duyệt cập nhật (không ảnh hưởng thông tin bổ sung và người mới đã duyệt).
- Quản trị viên phải đăng nhập bằng email đã xác minh, nếu không sẽ không thấy mục Duyệt.

## Chạy thử trên máy

Mở thẳng `index.html` bằng trình duyệt chỉ hiện thông báo chưa kết nối, vì không còn dữ liệu trong tệp. Đăng nhập Firebase cần địa chỉ `https://` của GitHub Pages, hoặc `http://localhost` nếu bạn chạy `python3 -m http.server` trong thư mục này (khi đó nhớ thêm `localhost` vào Authorized domains).
