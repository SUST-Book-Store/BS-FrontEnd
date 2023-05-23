<template>
<div  class="login-container"  >
    <el-form ref="form" :model="form"    :rules="rules" class="login-page">
      <h2 class="title" style="margin-bottom: 20px">用户注册</h2>
      <el-form-item prop="username" >
        <el-input v-model="form.username" placeholder="请输入用户名" clearable >
          <template #prefix>
            <el-icon class="el-input__icon">🥳</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="phone" >
        <el-input v-model="form.phone" placeholder="请输入手机号" clearable >
          <template #prefix>
            <el-icon class="el-input__icon">😎</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="sex" label="性别: ">
        <el-radio v-model="form.sex" label="男">男</el-radio>
        <el-radio v-model="form.sex" label="女">女</el-radio>
        <el-radio v-model="form.sex" label="其他">其他</el-radio>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password"  placeholder="请输入密码" clearable show-password>
          <template #prefix>
            <el-icon class="el-input__icon">🔒</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="confirm">
        <el-input v-model="form.confirm" placeholder="请再次确认密码" clearable show-password>
          <template #prefix>
            <el-icon class="el-input__icon">🔒</el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" style=" width: 100%" @click="register">注 册</el-button>
      </el-form-item>
      <el-form-item><el-button type="text" @click="$router.push('/user/login')">前往登录>> </el-button></el-form-item>
    </el-form>
</div>

</template>

<script>
import request from "../utils/request";
import {ElMessage} from "element-plus";
export default {
  name: "Login",
  data(){
    return{
      form:{},
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
          {
            min: 2,
            max: 13,
            message: '长度要求为2到13位',
            trigger: 'blur',
          },
        ],
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
            },
          {
            min: 11,
            max: 11,
            message: '长度要求为11位',
            trigger: 'blur',
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          }
        ],
      confirm:[
        {
          required:true,
          message:"请确认密码",
          trigger:"blur"
        }
      ],
      }
    }
    },

  methods:{
    createValidCode(data){
      this.validCode =data
    },
    register(){
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if(this.form.password != this.form.confirm)
          {
            ElMessage.error("两次密码输入不一致")
            return
          }
          request.post("http://127.0.0.1:3000/register",this.form).then(res=>{
            if(res.data.status == 0)
            {
              ElMessage.success("注册成功")
              this.$router.push("/user/login")
            }
            else {ElMessage.error(res.data.msg)}
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
  height: 100%;
  background: url('../assets/images/sust.png');
  background-size: cover;
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