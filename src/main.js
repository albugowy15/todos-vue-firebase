import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import firebase from 'firebase'

import App from './App.vue'
import router from './router'

import './style.css'

// const firebaseConfig = {
//     apiKey: "AIzaSyD83fdQAxl_kp1ZQDKUy1LwvHyjo7Dm7rM",
//     authDomain: "project2-todolist.firebaseapp.com",
//     projectId: "project2-todolist",
//     storageBucket: "project2-todolist.appspot.com",
//     messagingSenderId: "358355282304",
//     appId: "1:358355282304:web:9f95c6751da2bae5f8b965"
// };

// firebase.initializeApp(firebaseConfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
