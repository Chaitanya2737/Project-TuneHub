import {getApp , getApps , initializeApp} from 'firebase/app'
import{getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey:process.env.REACT_APP_FIREBASE_APP_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_APP_PROJECTID,
    storageBucket:process.env.REACT_APP_FIREBASE_APP_STORAHE_BUCCKET,
    messagingSenderId:process.env.REACT_APP_FIREBASE_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    
  };
const app =getApps.length >0 ?getApp() :initializeApp(firebaseConfig);
const storage  = getStorage(app);
export {app ,  storage}