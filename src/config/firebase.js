import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAeb7KOoTCT47GoU1uSjjm_711bl1DgxME',
  authDomain: 'fan-cast-api.firebaseapp.com',
  projectId: 'fan-cast-api',
  storageBucket: 'fan-cast-api.firebasestorage.app',
  messagingSenderId: '149788204407',
  appId: '1:149788204407:web:b1701ed5d4dd85c0169572',
  measurementId: 'G-SWYFXJ0QLH'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export default app;
