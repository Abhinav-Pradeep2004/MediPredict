// Import necessary Firebase functions
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase project config (replace with your own)
const firebaseConfig = {
"Your Firebase API"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
