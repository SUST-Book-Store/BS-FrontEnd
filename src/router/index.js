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
    component: UserLoginView
  },
  {
    path: "/user/register/",
    name: "user_register_index",
    component: UserRegisterView
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
