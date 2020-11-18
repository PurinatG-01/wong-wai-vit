// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBixaeqfNA80pq9TdgQQBkCvrXjn_Z-b-c",
    authDomain: "wong-wai-vit.firebaseapp.com",
    databaseURL: "https://wong-wai-vit.firebaseio.com",
    projectId: "wong-wai-vit",
    storageBucket: "wong-wai-vit.appspot.com",
    messagingSenderId: "48380718806",
    appId: "1:48380718806:web:ad507664ed1be831eae377"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase