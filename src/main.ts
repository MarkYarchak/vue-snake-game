import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/style.css';

createApp(App).use(store).mount('#app');
