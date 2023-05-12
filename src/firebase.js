// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD1dWMLJoPi0WGrJVFoIlEwwI8IpQckHo8',
  authDomain: 'signal-clone-fbea9.firebaseapp.com',
  projectId: 'signal-clone-fbea9',
  storageBucket: 'signal-clone-fbea9.appspot.com',
  messagingSenderId: '351124151592',
  appId: '1:351124151592:web:4370990ee8cb57894d441d',
};

// Initialize Firebase

let app, auth;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log('Error initializing app: ' + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}

const db = getFirestore(app);

export { auth, db };
