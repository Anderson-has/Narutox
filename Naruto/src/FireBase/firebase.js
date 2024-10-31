import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyACARCcSKX0OZvGluBNYidlRPT2hfSUrwM",
    authDomain: "narutojs-da937.firebaseapp.com",
    projectId: "narutojs-da937",
    storageBucket: "narutojs-da937.appspot.com",
    messagingSenderId: "227525680753",
    appId: "1:227525680753:web:41a6a7c9ff460dac3705d0"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
