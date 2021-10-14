import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'

const app = createApp(App).use(store);
app.use(router);
app.mount('#app');
