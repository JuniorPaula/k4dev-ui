import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home.vue'
import AdminPages from '../components/admin/AdminPages.vue'
import ArticlesByCategory from '../components/article/ArticlesByCategory.vue'
import ArticleById from '../components/article/ArticleById.vue'
import Auth from '../components/auth/Auth.vue'

Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'adminPages',
        path: '/admin',
        component: AdminPages
    },{
        name: 'articlesByCategory',
        path: '/categories/:id/articles',
        component: ArticlesByCategory
    },{
        name: 'articleById',
        path: '/article/:id',
        component: ArticleById
    }, {
        name: 'auth',
        path: '/login',
        component: Auth
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router