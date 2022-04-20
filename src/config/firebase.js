import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCn1vwFSR-rhOCkzrvGy4IczGsSY3Iying",
    authDomain: "fooddeliveryapp-d5dfd.firebaseapp.com",
    projectId: "fooddeliveryapp-d5dfd",
    storageBucket: "fooddeliveryapp-d5dfd.appspot.com",
    messagingSenderId: "843305193325",
    appId: "1:843305193325:web:42af413201dbcf64d91464",
    measurementId: "G-8XRPYL17ND"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();

export {auth, db, storage};

export default firebase;