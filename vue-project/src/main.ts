import { createApp, createVNode, render } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import loadingBar from './components/loadingBar.vue'

// console.log(loadingBar)
const Vnode = createVNode(loadingBar)
render(Vnode, document.body)
console.log(Vnode)

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

const whileList = ['/']

// 前置守卫
router.beforeEach((to, from, next) => {
    Vnode.component?.exposed?.startLoading()
    if (whileList.includes(to.path) || localStorage.getItem('token')) {
        next()
    } else {
        next('/')
    }
})

// 后置守卫
router.afterEach((to, from) => {
    Vnode.component?.exposed?.endLoading()
})

app.mount('#app')
