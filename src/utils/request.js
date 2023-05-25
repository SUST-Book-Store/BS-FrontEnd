import axios from 'axios'
import router from "../router";

const request = axios.create({
    baseURL: '/',
    timeout: 5000
})


// router.beforeEach((to,from,next) => {
//   if(to.path === '/user/login'){
//     next();
//   } else {
//     let token = window.sessionStorage.token;
//     if(token === 'null' || token === '' || token === undefined){
//       next('/user/login')
//     }else{
//         axios.post("http://127.0.0.1:3000/user/validatetoken", {
//             "token": token
//         }).then(res => {
//             if (res.data.code == 200) {
//               next();
//             } else {
//               ElMessage.error("登录已失效，请重新登录")
//               next('/user/login')
//             }
//           })
      
//     }
//   }
// });

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

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

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if(error.response){
      switch(error.response.status){
        case 401:
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

