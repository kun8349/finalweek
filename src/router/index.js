import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '前台路由',
    component: () => import('../views/FrontLayout.vue'),
    children: [
      {
        path: '',
        name: '前台首頁',
        component: () => import('../views/front/HomeView.vue')
      },
      {
        path: 'product',
        name: '產品列表',
        component: () => import('../views/front/ProductsView.vue')
      },
      {
        path: 'product/:id',
        name: '單一產品',
        component: () => import('../views/front/SingleProduct.vue')
      },
      {
        path: 'cart',
        name: '購物車',
        component: () => import('../views/front/CartView.vue')
      },
      {
        path: 'member',
        name: '產品頁面',
        component: () => import('../views/front/MemberView.vue')
      },
      {
        path: 'order',
        name: '訂單頁面',
        component: () => import('../views/front/CheckOrder.vue')
      },
      {
        path: 'order/:id',
        name: '完成訂單頁面',
        component: () => import('../views/front/OrderView.vue')
      },
      {
        path: 'blogs',
        name: '部落格',
        component: () => import('../views/front/BlogsView.vue')
      },
      {
        path: 'blogs/:id',
        name: '部落格細節',
        component: () => import('../views/front/BlogsDetail.vue')
      }
    ]
  },
  // 後台路由
  {
    path: '/login',
    name: '後台登入',
    component: () => import('../views/admin/LoginAdmin.vue')
  },
  {
    path: '/admin',
    name: '後台路由',
    component: () => import('../views/AdminLayout.vue'),
    children: [
      {
        path: 'product',
        name: '後台產品列表',
        component: () => import('../views/admin/ProductAdmin.vue')
      },
      {
        path: 'coupon',
        name: '後台優惠券',
        component: () => import('../views/admin/CouponAdmin.vue')
      },
      {
        path: 'order',
        name: '後台訂單',
        component: () => import('../views/admin/OrderAdmin.vue')
      },
      {
        path: 'blogs',
        name: '後台部落格',
        component: () => import('../views/admin/BlogAdmin.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
