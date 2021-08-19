import { createApp } from 'vue'
import importUiFramework from '@/utils/import-ui-framework'
import App from './App.vue'
import router from './router/index'
import { key, store } from '@/store'
import '@/styles/index.scss'

const app = createApp(App)

importUiFramework(app).use(router).use(store, key).mount('#app')
