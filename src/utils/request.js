import axios from 'axios'
import router from "../router";
import {ElMessage} from "element-plus";
import store from '@/store';

const request = axios.create({
    baseURL: '/',
    timeout: 5000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    // 判断url是否包含admin/，如果是则跳转首页
    if (config.url.includes("admin/")) {
        if (!store.state.user.is_admin){
            ElMessage.error("你没有权限")
            router.push("/");
        }
        
    }

    // config.headers['token'] = user.token;  // 设置请求头
    //取出sessionStorage里面缓存的用户信息
    let userToken = localStorage.getItem("token")
    if(userToken === 'null' || userToken === '' || userToken === undefined)
    {
        router.push("/user/login/")
    } else {
        config.headers['token'] = userToken
    }
    return config
}, error => {
    return Promise.reject(error)
});

request.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if(error.response){
      switch(error.response.status){
        case 401:
          ElMessage.error('未授权，请先登录');
          sessionStorage.removeItem('token');
          router.replace({
            path: '/user/login',
            query: {
              redirect: router.currentRoute.fullPath //登录成功后跳入浏览的当前页
            }
          })
      }
    }
  }
)

export default request

