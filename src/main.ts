import './styles/app.scss'

import 'phosphor-icons'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App).use(router)

window.addEventListener("load", function() {
    app.mount('#app')
});
