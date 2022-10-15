// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyA-Hy645qSXZe3zDPczIuDTxo0nbID5iR4',
	authDomain: 'fordacaps.firebaseapp.com',
	projectId: 'fordacaps',
	storageBucket: 'fordacaps.appspot.com',
	messagingSenderId: '488670587196',
	appId: '1:488670587196:web:90c99555aaa5a86ed79639'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
