// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import 'firebase/storage';

import { getFirestore, collection } from "firebase/firestore"
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
// Your web app's Firebase configuration

var firebase = require("firebase/app");
require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyB8IynEDSJNrQ8-m6q46cyjec5RLmUslqM",
  authDomain: "electron-react-app-71c87.firebaseapp.com",
  projectId: "electron-react-app-71c87",
  storageBucket: "electron-react-app-71c87.appspot.com",
  messagingSenderId: "456075924288",
  appId: "1:456075924288:web:cd9fed386956be4684e0a5"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export { firebase as default };
export const auth = getAuth(app);
export const storage = getStorage(app);

export { db }
export { app }

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  
  export function logout() {
    return signOut(auth);
  }


