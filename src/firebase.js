import * as firebase from 'firebase/app';
import 'firebase/firebase-messaging';


const firebaseConfig = {
    apiKey: "AIzaSyDJpuAgz5ToWvd_vk-YcvqIDrOMu7MMpYo",
    authDomain: "shaikhquiz.firebaseapp.com",
    databaseURL: "https://shaikhquiz.firebaseio.com",
    projectId: "shaikhquiz",
    storageBucket: "shaikhquiz.appspot.com",
    messagingSenderId: "725753359201",
    appId: "1:725753359201:web:3bf2f1891dbcc090ddf320"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;