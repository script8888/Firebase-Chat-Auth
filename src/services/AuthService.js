import axios from 'axios';
import { initializeApp } from 'firebase/app';

import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import firebaseConfig from '../config/firebase.config';

const app = initializeApp(firebaseConfig);
getAuth(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const AuthService = {
  waitForUser: (callback) => {
    return onAuthStateChanged(auth, (user) => {
      callback(user);
    });
  },
  register: async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({ error: errorMessage, errorMessage: errorCode });
        return { errorCode, errorMessage };
        // ..
      });
  },
  loginEmail: async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        return user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return { errorCode, errorMessage };
      });
  },
  loginWithGoogle: async () => {
    return signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(result.user);
        console.log('token', token);
        // The signed-in user info.
        return result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.error({ error: errorMessage, email: email, cred: credential });
        return { errorCode, errorMessage };
      });
  },
  logout: async () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.error('signout err', error);
      });
  },
};
export default AuthService;
