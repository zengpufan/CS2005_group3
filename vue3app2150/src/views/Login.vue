<script>

import {ElMessage} from 'element-plus'
import Axios from 'axios'
import axios from "axios";
let storage=window.localStorage;
export default{

  components: {ElMessage},
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      let _this = this
      this.$axios.post("/api/controller/all/user/login", {
        userAccount: _this.loginForm.username,
        userPassword: _this.loginForm.password,
      }).then(function (response) {
        // console.log(response.data.status)
        if (response.data.code==0) {
          ElMessage.success("登录成功")
          storage.setItem("token",response.data.data);
          _this.$router.replace('/index')

          // var path = _this.$route.query.redirect
          // _this.$router.replace({path: path === undefined ? '/' : path})
        } else {
          console.log(response)
          ElMessage.error("账号或密码错误")
        }
      })
          .catch(function (error) {
            console.log(error)
          })
    },
    toregister() {
      this.$router.replace('/register')
    }
  }
}
</script>
<template>
    <div class="content-box">
        <body id="poster">
        <el-form class="login-container" label-position="left"
                 label-width="0px">
            <h3 class="login_title">海外文物知识系统登录</h3>
            <el-form-item>
                <el-input type="text" v-model="loginForm.username"
                          auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" v-model="loginForm.password"
                          auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录
                </el-button>
            </el-form-item>
            <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="toregister">
                    没有账号？去注册
                </el-button>
            </el-form-item>
        </el-form>
        </body>
    </div>
</template>



<style>
#poster {
    /*background-image: url("../assets/img_1.png");*/
    height: 80%;
    width: 100%;
    background-size: cover;
    position: fixed;
}

body {
    margin: 0px;
}

.login-container {
    position: relative;
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}

.login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}

</style>
