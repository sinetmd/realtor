// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo0ElHgwfVdaQv1Fc_iXmaRgz9vNCbTqA",
  authDomain: "realtor-clone-react-d91ea.firebaseapp.com",
  projectId: "realtor-clone-react-d91ea",
  storageBucket: "realtor-clone-react-d91ea.appspot.com",
  messagingSenderId: "913221042110",
  appId: "1:913221042110:web:51dde530c02183a25403ef",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
