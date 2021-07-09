import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBoy2ZWVKpiiy3Gyyd7F4o0dH0y7Y5A4Zk",
    authDomain: "vgame-blog.firebaseapp.com",
    projectId: "vgame-blog",
    storageBucket: "vgame-blog.appspot.com",
    messagingSenderId: "916839598992",
    appId: "1:916839598992:web:f0e2f63ef8cb0894b18115",
    measurementId: "G-HX5QQJB24K"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const db = firebase.database();