import axios from 'axios'
import router from "../router";

const request = axios.create({
    baseURL: '/',
    timeout: 5000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    // config.headers['token'] = user.token;  // 设置请求头
    //取出sessionStorage里面缓存的用户信息
    let userJson = sessionStorage.getItem("user")
    if(!userJson)
    {
        router.push("/user/login/")
    }
    return config
}, error => {
    return Promise.reject(error)
});

export default request

