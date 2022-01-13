import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

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


  