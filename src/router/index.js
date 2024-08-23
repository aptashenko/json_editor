import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from "@/views/DashboardView.vue";
import {useAuthorization} from "@/composables/useAuthorization.js";

const routes = [
    {
        path: '/',
        name: 'dashboard',
        meta: {reqAuth: true},
        component: DashboardView
    },
    {
        path: '/registration',
        name: 'sign-up',
        meta: { auth: true },
        component: () => import('@/views/auth/sign-up.vue'),
    },
    {
        path: '/login',
        name: 'sign-in',
        meta: { auth: true },
        component: () => import('@/views/auth/sign-in.vue'),
    },
]

const router = createRouter({
    history: createWebHistory('./'),
    routes,
})

router.beforeEach((to, from) => {
    const { user } = useAuthorization();
    if (to.meta.auth) {
        return user.value.isAuth ? { name: 'dashboard' } : true;
    } else {
        if (to.matched.some((record) => record.meta.reqAuth)) {
            if (!user.value.isAuth) {
                return { name: 'sign-in' };
            } else {
                return true;
            }
        }
    }

    return true;
});

export default router
