import Vue from 'vue'
import Router from 'vue-router'
import Register from "../views/Register";
import Login from "../views/Login";
import Index from "../views/Index.vue";

Vue.use(Router)

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/index',
        name: 'Index',
        component: Index
    },
]
// eslint-disable-next-line no-undef
const router = new Router({
    routes
})
export default router

