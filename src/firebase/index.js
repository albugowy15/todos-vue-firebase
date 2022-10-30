import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { collection, getFirestore } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyD83fdQAxl_kp1ZQDKUy1LwvHyjo7Dm7rM",
    authDomain: "project2-todolist.firebaseapp.com",
    projectId: "project2-todolist",
    storageBucket: "project2-todolist.appspot.com",
    messagingSenderId: "358355282304",
    appId: "1:358355282304:web:9f95c6751da2bae5f8b965",
};

const app = initializeApp(firebaseConfig)
const db_collect = getFirestore(app)
const db = collection(getFirestore(app), "task")

export {
    db,
    db_collect
}