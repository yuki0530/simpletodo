import firebase from "firebase";
import "firebase/auth";
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyBH9bdPlwG_dXLzne95vDdccp6mrICUfVg",
  authDomain: "todo-app-ad0f8.firebaseapp.com",
  databaseURL: "https://todo-app-ad0f8.firebaseio.com",
  projectId: "todo-app-ad0f8",
  storageBucket: "todo-app-ad0f8.appspot.com",
  messagingSenderId: "321123310717",
  appId: "1:321123310717:web:0fba291c606129024c2514",
  measurementId: "G-MYFZK76HX5"
};

firebase.initializeApp(config);

const db = firebase.firestore()

export default firebase;

export {
  db
}