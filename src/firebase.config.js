import {getApp, getApps, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAxXtlKXx-BU6OgoH3s_OTyJXogGvyBjOA",
    authDomain: "restaurantapp-efb04.firebaseapp.com",
    databaseURL: "https://restaurantapp-efb04-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-efb04",
    storageBucket: "restaurantapp-efb04.appspot.com",
    messagingSenderId: "1095171925794",
    appId: "1:1095171925794:web:a7acb529f776d0f824677b"
  };

const app = getApps.length >0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };