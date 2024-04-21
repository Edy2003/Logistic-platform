import {getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDYlEIDagP4UOxsN87x0lAuLeAdbVIszLM",
    authDomain: "logistic-platform-43af4.firebaseapp.com",
    databaseURL: "https://logistic-platform-43af4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "logistic-platform-43af4",
    storageBucket: "logistic-platform-43af4.appspot.com",
    messagingSenderId: "335221137380",
    appId: "1:335221137380:web:ba0993caa2d379db45f1f1",
    measurementId: "G-LNBEP67KNN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app, auth};