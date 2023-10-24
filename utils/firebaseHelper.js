// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';



export const getFirebaseApp =()=>{
    const firebaseConfig = {
        apiKey: "AIzaSyCI_vsYtf4frW-pKU0shP96jAIF7ziilZo",
        authDomain: "whatsapp-59c55.firebaseapp.com",
        projectId: "whatsapp-59c55",
        storageBucket: "whatsapp-59c55.appspot.com",
        messagingSenderId: "97129963924",
        appId: "1:97129963924:web:ad9505a5e7d6749df2ef81",
        measurementId: "G-X4LXC7DYZT"
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
      });
     return app;

}