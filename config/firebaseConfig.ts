// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAPa3c3EfvrMoaZvqHnAqGteA-39uRXiuo',
    authDomain: 'prestigeauctions-12911.firebaseapp.com',
    projectId: 'prestigeauctions-12911',
    storageBucket: 'prestigeauctions-12911.appspot.com',
    messagingSenderId: '149115741516',
    appId: '1:149115741516:web:3de84333aa59eb2f085be9',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
