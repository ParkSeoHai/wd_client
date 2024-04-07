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
      path: '/san-pham/:name',
      name: 'product',
      component: () => import('@/views/ProductDetail.vue'),
      props: true
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },
    {
      path: '/danh-muc/:name',
      name: 'product-filter',
      component: () => import('@/views/ProductFilter.vue'),
      props: true
    }
  ]
})

export default router;