import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyB_zbb94GGjkJzHaGmyHCXE18jNAa4J8DI',
    authDomain: 'react-app-cero-experto.firebaseapp.com',
    projectId: 'react-app-cero-experto',
    storageBucket: 'react-app-cero-experto.appspot.com',
    messagingSenderId: '945599917550',
    appId: '1:945599917550:web:178b23fc54d2d1039af2ff',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
