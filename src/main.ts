import './assets/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'

import EmptyLayout from './layouts/EmptyLayout.vue'
import SideNavLayout from './layouts/SideNavLayout.vue'
import { useAuthStore } from './stores/auth.store'

const app = createApp(App)
    .component("empty-layout", EmptyLayout)
    .component("sidenav-layout", SideNavLayout)

const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(VueQueryPlugin)

try {
    const authStore = useAuthStore()
    await authStore.refreshToken()
} catch {
    console.log("No token found")
}

app.mount('#app')
