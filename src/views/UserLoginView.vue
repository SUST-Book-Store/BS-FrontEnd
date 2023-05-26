<template>
<div  class="login-container"  >
    <el-form ref="form" :model="form"   :rules="rules" class="login-page">
      <h2 class="title" style="margin-bottom: 20px">用户登陆</h2>
      <el-form-item prop="phone" >
        <el-input v-model="form.phone"  clearable>
          <template #prefix>
            <el-icon class="el-input__icon">😃</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password"  clearable show-password>
          <template #prefix>
            <el-icon class="el-input__icon">🔒</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary"  style=" width: 100%" @click="login">登 录</el-button>
      </el-form-item>
      <el-form-item><el-button type="text" @click="$router.push('/user/register/')">前往注册 >> </el-button></el-form-item>
    </el-form>
</div>

</template>

<script>
import request from "../utils/request";
import {ElMessage} from "element-plus";
import { mapMutations, mapState } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      form: {},
      rules: {
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur',
          },
            {
            pattern: /^\d+$/,
            message: '手机号必须为纯数字',
            trigger: 'blur',
            }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          }
        ]

      }

    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapMutations(['setUserInfo', 'updateToken', 'logout']),
  
  // 示例方法：更新用户信息
  updateUserInfo(userInfo) {
    this.setUserInfo(userInfo);
  },
  
  // 示例方法：更新token
  updateToken(token) {
    this.updateToken(token);
  },
  
  // 示例方法：登出
  logoutUser() {
    this.logout();
  },

    login(){
      this.$refs['form'].validate((valid) => {
        if (valid) {
          request.post("http://127.0.0.1:3000/user/login", this.form).then(res => {
            if (res.data.status == 0) {
              localStorage.setItem("token", res.data.accessToken)//缓存用户信息
              request.get("http://127.0.0.1:3000/user/getUserInfo").then(res2 => {
                if (res2.data.code == 0) {
                    const newUser = {
                        user_id: res2.data.data.user_id,
                        username: res2.data.data.username,
                        token: res.data.accessToken,
                        is_admin: res2.data.data.is_admin,
                        is_login: true
                    }
                    this.updateUserInfo(newUser);
                    ElMessage.success("登录成功")
                    this.$router.push("/")
                } else {
                    localStorage.removeItem("token")
                    ElMessage.error("登录失败")
                }
              })
            } else {
              ElMessage.error(res.data.msg)
            }
          })
        }
      })
    }
  }
}

</script>

<style scoped>
.login-container {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: url('../assets/images/sust.png');
  background-size: cover;
  overflow: hidden;
}
.login-page {
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>