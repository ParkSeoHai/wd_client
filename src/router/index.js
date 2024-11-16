import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Index.vue')
    },
    {
      path: '/san-pham/:productUrl',
      name: 'product',
      component: () => import('@/views/ProductDetail.vue'),
      props: true
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },
    {
      path: '/danh-muc/:categoryUrl',
      name: 'ProductCategory',
      component: () => import('@/views/ProductCategory.vue'),
      props: true
    },
    {
      path: '/user/register',
      name: 'Register',
      component: () => import('@/views/Register.vue')
    },
    {
      path: '/user/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/user/account',
      name: 'Account',
      component: () => import('@/views/Account.vue'),
      props: true
    },
    {
      path: '/gio-hang',
      name: 'Cart',
      component: () => import('@/views/Cart.vue')
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    // return desired position
    return {
      top: 0,
      behavior: "instant"
    }
  }
})

export default router;