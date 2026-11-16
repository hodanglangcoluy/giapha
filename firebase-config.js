
/* Email của quản trị viên (ban biên soạn). Chỉ những email này, đã xác minh,
   mới thấy mục "Duyệt cập nhật". Danh sách này PHẢI giống danh sách trong firestore.rules. */
window.ADMIN_EMAILS = [
  "wellmat2023@gmail.com"
];
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB02mRUcDTPjWJL0ggq0ITjZXnXHaMD-1Y",
  authDomain: "giaphahodang.firebaseapp.com",
  projectId: "giaphahodang",
  storageBucket: "giaphahodang.firebasestorage.app",
  messagingSenderId: "502054228146",
  appId: "1:502054228146:web:4377fe3e7fd7787e1fb9ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
