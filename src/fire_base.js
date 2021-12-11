import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

// const app= initializeApp  ({
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
//     measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
//   });
const app= initializeApp  ({
    apiKey: 'AIzaSyBRKoLkB5VVonG35NTu2EWryh3o01CzwCA',
    authDomain: 'pizzahust-d7124.firebaseapp.com',
    databaseURL: "https://pizzahust-d7124-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: 'pizzahust-d7124',
    storageBucket: 'pizzahust-d7124.appspot.com',
    messagingSenderId: '969729411649',
    appId: '1:969729411649:web:7298cc63bd3caa965e54c0',
    measurementId: '${config.measurementId}'
  });
export default app;
export const auth = getAuth(app);

  // export const auth = app.auth();

  