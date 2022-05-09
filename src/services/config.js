/** The main config file for firestore services */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBbqDfvI0Xd8kB7-xQ7o6S4Jytu6lp83Ws',
  authDomain: 'portfolio-138d2.firebaseapp.com',
  projectId: 'portfolio-138d2',
  storageBucket: 'portfolio-138d2.appspot.com',
  messagingSenderId: '29164821933',
  appId: '1:29164821933:web:81f1495368f6cef31b9524',
};

// init firebase application
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

export { db, auth };
