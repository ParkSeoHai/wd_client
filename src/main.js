import 'vuetify/styles';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css';
import '../src/assets/css/main.css';
import "swiper/css";

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const app = createApp(App);

const vuetify = createVuetify({
    components,
    directives,
})

app.use(router);

app.use(vuetify);

app.provide("url_api", "https://wd-server.vercel.app");

app.mount('#app');