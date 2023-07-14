import firebase from 'firebase/compat/app'
import "firebase/compat/firestore";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCqxFWiEEMHY1ePSMN_01Ik29OAYmVKUfQ",
  authDomain: "rn-app-cb4cb.firebaseapp.com",
  projectId: "rn-app-cb4cb",
  storageBucket: "rn-app-cb4cb.appspot.com",
  messagingSenderId: "778769410942",
  appId: "1:778769410942:web:c96c67f76276c227b1212f",
  measurementId: "G-NZ1BYHX52K"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase }