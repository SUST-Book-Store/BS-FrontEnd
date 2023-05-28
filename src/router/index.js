import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue"
import UserCenterview from "@/views/UserCenterView.vue"
import CartView from "@/views/CartView.vue"
import OrderView from "@/views/OrderView.vue"
import UserLoginView from "@/views/UserLoginView.vue"
import UserRegisterView from "@/views/UserRegisterView.vue"
import NotFound from "@/views/NotFound.vue"
import DetailView from "@/views/DetailView.vue"
import OrderDetailView from "@/views/OrderDetailView.vue"
import AdminBookView from "@/views/AdminBookView.vue"
import EditBookView from '@/views/EditBookView.vue'
import AdminUser from '@/views/AdminUser'
import AddBookView from '@/views/AddBookView'
import AdminOrdeView from '@/views/AdminOrdeView'
import SearchView from '@/views/SearchView'

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/home/",
    meta: { title: '首页 - 网上书店' }
  },
  {
    path: "/home/",
    name: "home_index",
    component: HomeView,
    meta: { title: '首页 - 网上书店' }
  },
  {
    path: "/search/:keyword",
    name: "search",
    component: SearchView,
    meta: { title: '搜索 - 网上书店' }
  },
  {
    path: "/cart/",
    name: "cart_index",
    component: CartView,
    meta: { title: '购物车 - 网上书店' }
  },
  {
    path: "/user/center/",
    name: "user_center_index",
    component: UserCenterview,
    meta: { title: '个人中心 - 网上书店' }
  },
  {
    path: "/order/",
    name: "order_index",
    component: OrderView,
    meta: { title: '我的订单 - 网上书店' }
  },
  {
    path: "/user/login/",
    name: "user_login_index",
    component: UserLoginView,
    meta: { title: '登录 - 网上书店' },
    beforeEnter: (to, from, next) => {
    // 判断用户是否已登录
    const isLogin = localStorage.getItem('token')
    if (isLogin) {
      // 如果已登录，则自动跳转到首页
      next({ path: '/' })
    } else {
      // 如果未登录，则继续进入登录页
      next()
    }
  }
  },
  {
    path: "/user/register/",
    name: "user_register_index",
    component: UserRegisterView,
    meta: { title: '注册 - 网上书店' },
    beforeEnter: (to, from, next) => {
    // 判断用户是否已登录
    const isLogin = localStorage.getItem('token')
    if (isLogin) {
      // 如果已登录，则自动跳转到首页
      next({ path: '/' })
    } else {
      // 如果未登录，则继续进入登录页
      next()
    }
  }
  },
  {
    path: "/book/detail/",
    name: "book_detail_index",
    component: DetailView,
    meta: { title: '商品详情 - 网上书店' }
  },
  {
    path: "/order/detail/",
    name: "order_detail_index",
    component: OrderDetailView,
    meta: { title: '订单详情 - 网上书店' }
  },
  {
    path: "/admin/manageUser",
    name: "useradmin",
    component: AdminUser,
    meta: { title: '用户管理 - 网上书店' }
  },
  {
    path: '/admin/index',
    name: 'adminindex',
    component:AdminBookView,
    meta: { title: '书籍管理 - 网上书店' }
  },
  {
    path: "/admin/editBook",
    name: "EditBook",
    component: EditBookView,
    props: true,
    meta: { title: '书籍编辑 - 网上书店' }
  },
  {
    path: "/admin/manageOrder",
    name: "AdminOrder",
    component: AdminOrdeView,
    meta: { title: '订单管理 - 网上书店' }
  },
  {
    path: "/admin/addBook",
    name: "AddBook",
    component: AddBookView,
    meta: { title: '添加书籍 - 网上书店' }
  },
  {
    path: "/404/",
    name: "404",
    component: NotFound,
    meta: { title: '页面未找到 - 网上书店' }
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404/"
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
})

export default router
