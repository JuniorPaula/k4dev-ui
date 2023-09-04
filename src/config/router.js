import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home.vue'
import AdminPages from '../components/admin/AdminPages.vue'
import ArticlesByCategory from '../components/article/ArticlesByCategory.vue'
import ArticleById from '../components/article/ArticleById.vue'
import Articles from '../components/article/Articles.vue'
import Auth from '../components/auth/Auth.vue'
import User from '../components/user/User.vue'

import { userKey } from '../global'

Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/dashboard',
        component: Home,
        meta: { requiresAdmin: true }

    },
    {
        name: 'adminPages',
        path: '/admin',
        component: AdminPages,
        meta: { requiresAdmin: true }
    },{
        name: 'articlesByCategory',
        path: '/categories/:id/articles',
        component: ArticlesByCategory
    },{
        name: 'articleById',
        path: '/article/:id',
        component: ArticleById
    },{
        name: 'articles',
        path: '/',
        component: Articles
    }, {
        name: 'auth',
        path: '/login',
        component: Auth
    }, {
        name: 'user',
        path: '/user',
        component: User,
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if (to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.role ? next() : next({ path: '/' })
    } else {
        next()
    }

})

export default router