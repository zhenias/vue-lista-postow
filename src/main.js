import { createApp } from 'vue'
import App from "@/App.vue";
import store from "@/store/index";
import './assets/css/style.css';

const app = createApp(App);

app.use(store);

app.mount('#app');
