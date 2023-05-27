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

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/home/",
  },
  {
    path: "/home/",
    name: "home_index",
    component: HomeView
  },
  {
    path: "/cart/",
    name: "cart_index",
    component: CartView
  },
  {
    path: "/user/center/",
    name: "user_center_index",
    component: UserCenterview
  },
  {
    path: "/order/",
    name: "order_index",
    component: OrderView
  },
  {
    path: "/user/login/",
    name: "user_login_index",
    component: UserLoginView,
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
    component: DetailView
  },
  {
    path: "/order/detail/",
    name: "order_detail_index",
    component: OrderDetailView
  },
  {
    path: "/useradmin",
    name: "useradmin",
    component: AdminUser
  },
  {
    path: '/adminindex',
    name: 'adminindex',
    component:AdminBookView
  },
  {
    path: "/EditBook",
    name: "EditBook",
    component: EditBookView,
    props: true
  },
  {
    path: "/orderadmin",
    name: "AdminOrder",
    component: AdminOrdeView,
  },
  {
    path: "/AddBook",
    name: "AddBook",
    component: AddBookView,
  },
  {
    path: "/404/",
    name: "404",
    component: NotFound
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

export default router
