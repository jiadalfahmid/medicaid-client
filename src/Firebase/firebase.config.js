// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};

Object.keys(firebaseConfig).forEach((key) => {
  if (!firebaseConfig[key] || firebaseConfig[key] === "undefined") {
    console.warn(`Firebase config warning: ${key} is not defined in the environment variables.`);
  }
});


// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;
