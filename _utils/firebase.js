import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBD7Xqiypq-a-dPJPzxQ28GOTZz4-CUHXY',
  authDomain: 'gundamn-2780f.firebaseapp.com',
  projectId: 'gundamn-2780f',
  storageBucket: 'gundamn-2780f.appspot.com',
  messagingSenderId: '142526997416',
  appId: '1:142526997416:web:ceab568071bf82a357739d',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };