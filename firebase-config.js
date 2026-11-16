/* Cấu hình Firebase của trang gia phả.
   Làm theo README.md để lấy các giá trị này từ Firebase Console
   (Project settings > Your apps > Web app > Config), rồi dán thay các dòng DIEN_VAO_...
   Các giá trị này không phải mật khẩu. Bảo mật nằm ở tệp firestore.rules. */
window.FIREBASE_CONFIG = {
  apiKey: "DIEN_VAO_apiKey",
  authDomain: "DIEN_VAO_authDomain",
  projectId: "DIEN_VAO_projectId",
  storageBucket: "DIEN_VAO_storageBucket",
  messagingSenderId: "DIEN_VAO_messagingSenderId",
  appId: "DIEN_VAO_appId"
};

/* Email của quản trị viên (ban biên soạn). Chỉ những email này, đã xác minh,
   mới thấy mục "Duyệt cập nhật". Danh sách này PHẢI giống danh sách trong firestore.rules. */
window.ADMIN_EMAILS = [
  "email-quan-tri-1@gmail.com"
];
