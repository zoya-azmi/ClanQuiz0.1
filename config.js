import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
   apiKey: "AIzaSyDmXxj5J6fMGLD6RUeBY1glb08t14a4bc0",
    authDomain: "my-app-926b4.firebaseapp.com",
    projectId: "my-app-926b4",
    storageBucket: "my-app-926b4.appspot.com",
    messagingSenderId: "984864446238",
    appId: "1:984864446238:web:01e56ae7820bfbb4209b0f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
