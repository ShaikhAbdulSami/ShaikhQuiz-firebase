importScripts("https://www.gstatic.com/firebasejs/7.21.1/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/7.21.1/firebase-messaging.js")

firebase.initializeApp({
    apiKey: "AIzaSyDJpuAgz5ToWvd_vk-YcvqIDrOMu7MMpYo",
    authDomain: "shaikhquiz.firebaseapp.com",
    databaseURL: "https://shaikhquiz.firebaseio.com",
    projectId: "shaikhquiz",
    storageBucket: "shaikhquiz.appspot.com",
    messagingSenderId: "725753359201",
    appId: "1:725753359201:web:3bf2f1891dbcc090ddf320"
})
firebase.messaging();