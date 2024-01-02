import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

const whileList = ['/']
router.beforeEach((to, from, next) => {
    if (whileList.includes(to.path) || localStorage.getItem('token')) {
        next()
    } else {
        next('/')
    }
})

app.mount('#app')
