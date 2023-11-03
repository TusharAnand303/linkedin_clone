
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "linkedin-clone-89531.firebaseapp.com",
  projectId: "linkedin-clone-89531",
  storageBucket: "linkedin-clone-89531.appspot.com",
  messagingSenderId: "97944274829",
  appId: "1:97944274829:web:d542638d0611ece9f21fc4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth  (app);
const provider = new GoogleAuthProvider();
export {auth, provider};