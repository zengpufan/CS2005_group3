<template>
    <body id="paper">
    <el-form :model="registerForm" :rules="rules" class="register-container" label-position="left"
             label-width="0px" v-loading="loading">
        <h3 class="login_title">用户注册</h3>
        <el-form-item prop="username">
            <el-input type="text" v-model="registerForm.username"
                      auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="mobile">
            <el-input type="text" auto-complete="off" v-model="registerForm.mobile"
                      placeholder="电话号码"></el-input>
        </el-form-item>
        <el-form-item prop="email">
            <el-input type="text" auto-complete="off" v-model="registerForm.email"
                      placeholder="电子邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="registerForm.password"
                      auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="passwordConfirm">
            <el-input type="password" v-model="registerForm.passwordConfirm"
                      auto-complete="off" placeholder="确认密码"></el-input>
        </el-form-item>


        <el-form-item style="width: 100%">
            <el-button type="primary" style="width: 100%;background: #505458;border: none;" v-on:click="register">
                立即注册
            </el-button>
        </el-form-item>
        <el-form-item style="width: 100%">
            <el-button type="primary" style="width: 100%;background: #505458;border: none;" v-on:click="tologin">返回
            </el-button>
        </el-form-item>
    </el-form>
    </body>
</template>

<script>
export default {

    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Register',
    data() {
        var checkMobile = (rule, value, callback) => {
            const regUser = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/
            if (regUser.test(value)) {
                return callback()
            }
            callback(new Error('手机号码不能为空'))
        }
        var checkEmail = (rule, value, callback) => {
            const regUser = /^([a-zA-Z0-9]+[-_]?)+@[a-zA-Z0-9]+\.[a-z]+$/
            if (regUser.test(value)) {
                return callback()
            }
            callback(new Error('邮箱不能为空'))
        }
        return {
            rules: {
                username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
                mobile: [{validate: checkMobile, trigger: 'blur'}],
                email: [{validate: checkEmail, trigger: 'blur'}],
                password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
                passwordConfirm: [{required: true, message: '密码不能为空', trigger: 'blur'}]
            },
            checked: true,
            registerForm: {
                username: '',
                mobile: '',
                email: '',
                password: '',
                passwordConfirm: ''
            },
            loading: false
        }
    },
    methods: {
        register() {
            var _this = this
            if (this.registerForm.password !== this.registerForm.passwordConfirm) {
                this.$message({
                    message: '两次输入的密码不一致',
                    type: 'error'
                })
                return
            }
            this.$axios.post("/register", {
                username: this.registerForm.username,
                password: this.registerForm.password,
            })
                .then(function (response) {
                    // console.log(response.data.status)
                    if (response.status === 200) {
                        alert("注册成功")
                        //   _this.$message({
                        //   message: '恭喜你，注册成功',
                        //   type: 'success'
                        // })
                        _this.$router.replace('/login')
                    } else {
                        _this.$message({
                            message: '该用户名已存在，请更换一个',
                            type: 'error'
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        tologin() {
            this.$router.replace('/login')
        }
    }
}
</script>

<style>
#paper {
    background: url("../assets/img_1.png") no-repeat center;
    height: 80%;
    width: 100%;
    background-size: cover;
    position: fixed;
}

body {
    margin: -5px;
}

.register-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 0px auto;
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

.login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
}
</style>
