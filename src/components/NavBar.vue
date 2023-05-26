<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" style="">
      <div class="container">
        <router-link class="navbar-brand" :to="{name: 'home'}">网上书店系统</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link :class="route_name == 'home_index' ? 'nav-link active' : 'nav-link'" :to="{name: 'home_index'}">首页</router-link>
              </li>
              <li class="nav-item">
                <router-link :class="route_name == 'order_index' ? 'nav-link active' : 'nav-link'" :to="{name: 'order_index'}">我的订单</router-link>
              </li>
              <li class="nav-item">
                <router-link :class="route_name == 'cart_index' ? 'nav-link active' : 'nav-link'" :to="{name: 'cart_index'}">我的购物车</router-link>
              </li>
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    欢迎您，{{ user.username }}
                </a>
                <ul class="dropdown-menu">
                    <li>
                      <router-link class="dropdown-item" :to="{name: 'user_center_index'}">个人中心</router-link>
                    </li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" @click="logout">退出</a></li>
                </ul>
              </li>
            </ul>
            <!-- <ul class="navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link" :to="{name: 'user_account_login' }" href="#" role="button">
                    登录
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{name: 'user_account_register' }" href="#" role="button">
                    注册
                </router-link>
              </li>
            </ul> -->
          </div>
      </div>
    </nav>
    </template>
    
    <script>
    import { useRoute } from 'vue-router';
    import { computed } from 'vue';
    import { useStore } from 'vuex';
    import { mapMutations, mapState } from "vuex";

    export default {
        computed: {
            ...mapState(['user'])
            
        },
        methods: {
            ...mapMutations(['logout'])
        },
        setup() {
          const store = useStore();
          const route = useRoute();
          let route_name = computed(() => route.name)
          
          const logout = () => {
            store.dispatch("logout");
          }
          return {
            route_name,
            logout
          }
        }
    }
    </script>
    
    <style scoped>/**scoped 使得这个样式不会影响到该组件以外的部分 */

    </style>
    