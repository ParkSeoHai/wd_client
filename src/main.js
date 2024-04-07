import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css';
import '../src/assets/css/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

const app = createApp(App);

app.use(router);

// Kiểm tra kết nối api
async function checkApiNetwork() {
    const url = 'https://localhost:44371/api/Product';
    try {
        const response = await axios.get(url);
        if (!response.status === 200) {
            throw new Error("Lỗi " + response.message);
        } else {
            console.log("Web api networking");
            app.provide('$route', 'https://localhost:44371/api');
            app.mount('#app');
        }
    } catch (error) {
        alert(error.message);
        throw error; // Re-throw the error to propagate it further
    }
}

await checkApiNetwork();