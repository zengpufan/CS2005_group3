import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/index.vue";
import Login from "@/views/Login.vue"
import Register from "@/views/Register.vue";
import AntiqueDetail from "@/views/antiqueDetail.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect:'/login'
    },
    {
      path: "/register",
      name:'Register',
      component: Register,
    },
    {
      path: "/login",
      name:'Login',
      component: Login,
    },
    {
      path: "/index",
      name:'index',
      component: Index,
    },
    {
      path: "/antiqueDetail",
      name:'antiqueDetail',
      component: AntiqueDetail,
    },
    {
      path:"/dataView",
      redirect:"localhost:7777"
    },
    {
      path: '/change',
      name: 'change',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/change.vue')
    }
  ],
});

export default router;
