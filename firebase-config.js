/* Cấu hình Firebase của trang gia phả.
   Làm theo README.md để lấy các giá trị này từ Firebase Console
   (Project settings > Your apps > Web app > Config), rồi dán thay các dòng DIEN_VAO_...
   Các giá trị này không phải mật khẩu. Bảo mật nằm ở tệp firestore.rules. */
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyB02mRUcDTPjWJL0ggq0ITjZXnXHaMD-1Y",
  authDomain: "giaphahodang.firebaseapp.com",
  projectId: "giaphahodang",
  storageBucket: "giaphahodang.firebasestorage.app",
  messagingSenderId: "502054228146",
  appId: "1:502054228146:web:4377fe3e7fd7787e1fb9ab"
};

/* Email của quản trị viên (ban biên soạn). Chỉ những email này, đã xác minh,
   mới thấy mục "Duyệt cập nhật". Danh sách này PHẢI giống danh sách trong firestore.rules. */
window.ADMIN_EMAILS = [
  "wellmat2023@gmail.com"
];
