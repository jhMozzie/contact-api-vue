import './style.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // si usas vue-router

// Pinia
import { createPinia } from 'pinia';

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faPen);

const app = createApp(App);

// Configurar Pinia
const pinia = createPinia();
app.use(pinia);

// Configurar vue-router
app.use(router);

// Registrar componente FontAwesome globalmente
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');