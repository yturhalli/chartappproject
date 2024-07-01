import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia';
import highcharts from './plugins/highcharts';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(highcharts);
app.mount('#app');

