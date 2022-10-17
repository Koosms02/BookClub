import { initializeApp } from "firebase/app";
import {initializeFirestore} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyCHz_ePYDucPVaUbgQgBoZ-kC76FyXjPRI",
    authDomain: "books-32c06.firebaseapp.com",
    projectId: "books-32c06",
    storageBucket: "books-32c06.appspot.com",
    messagingSenderId: "792452184990",
    appId: "1:792452184990:web:821722996f69f5eebf348f",
    measurementId: "G-X86K9RCP1P"
  };

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app ,{ 
  experimentalForceLongPolling:true,})

export {db, app}