import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAUq1ldkfefta6Z1daPpIfMYlkS5um-Fy0",
    authDomain: "acciojob-project-b0e00.firebaseapp.com",
    projectId: "acciojob-project-b0e00",
    storageBucket: "acciojob-project-b0e00.appspot.com",
    messagingSenderId: "380077065018",
    appId: "1:380077065018:web:0300c4fa469cea8383c603",
    measurementId: "G-3G65Y0XWE6"
  };

  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();

export {auth, db};