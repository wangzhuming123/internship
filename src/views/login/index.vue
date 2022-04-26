<template>
  <div class="login-container">
    <h3 class="title">西邮实习生管理系统</h3>
    <el-form
      v-show="!isRe"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left">
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item
        prop="type"
        align="right"
        style="display:flex;justify-content:center;">
        <el-select
          v-model="loginForm.type"
          name="type"
          placeholder="请选用户类型">
          <el-option
            label="管理员"
            value="0"/>
          <el-option
            label="辅导员"
            value="1" />
          <el-option
            label="学生"
            value="2"/>
          <el-option
            label="家长"
            value="3"/>
          <el-option
            label="企业"
            value="4"/>
        </el-select>
      </el-form-item>
      <div class="button-box">
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          登录
        </el-button>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click.native.prevent="isRe = true"
        >
          注册
        </el-button>
      </div>
    </el-form>
    <div class="register-box">
      <el-form v-show="isRe" label-width="80px">
        <el-form-item label="学生姓名">
          <el-input v-model="registerForm.name" />
        </el-form-item>

        <el-form-item label="学生学号">
          <el-input v-model="registerForm.username" />
        </el-form-item>
        <el-form-item label="登陆密码">
          <el-input v-model="registerForm.password" />
        </el-form-item>

        <el-form-item label="电子邮箱">
          <el-input v-model="registerForm.email" />
        </el-form-item>
        <el-form-item
          prop="type"
          align="right"
          style="display:flex;justify-content:center;">
          <el-select
            v-model="loginForm.type"
            name="type"
            placeholder="请选用户类型">
            <el-option
              label="管理员"
              value="0"/>
            <el-option
              label="辅导员"
              value="1" />
            <el-option
              label="学生"
              value="2"/>
            <el-option
              label="家长"
              value="3"/>
            <el-option
              label="企业"
              value="4"/>
          </el-select>
        </el-form-item>
        <el-button type="primary" style="margin-left:158px; width: 200px;">保存</el-button>
      </el-form>
    </div>
    <!-- <left/> -->
  </div>
</template>

<script>
import roleLisr from '@/utils/role'
import { asyncRouterMap } from '../../router'

import register from '@/views/register'

export default {
  name: 'Login',
  components: { register },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      isRe: false,
      registerForm: {
        username: '',
        name: '',
        password: '',
        email: '',
        phone: '',
        sex: ''
      },
      loginForm: {
        username: '',
        password: '',
        type: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('Login', this.loginForm)
            .then((res) => {
              console.log('res', res)
              this.loading = false
              const arr = roleLisr[res]
              const authRouteList = asyncRouterMap.filter((item) => {
                if (arr.includes(item.path)) return true
                else return false
              })
              this.$router.addRoutes(authRouteList)
              const constRoutes = this.$router.options.routes
              this.$router.options.routes = [...constRoutes, ...authRouteList]
              // if (res === 'student') {
              //   this.$router.push('/stuPort')
              // } else if (res === 'parent') {
              //   this.$router.push('/parPort')
              // } else {
              //   this.$router.push({ path: this.redirect || '/' })
              // }
              this.$router.push({ path: this.redirect || '/' })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #fdfdfd;
  }
}
.button-box{
  display:flex;
  flex-flow: row nowrap;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #cecece;
$light_gray: #eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    position: relative;
    top: 80px;
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.register-box{
  position: relative;
  top: 110px;
  margin: 0 auto;
  width: 400px;
}
/deep/.el-form-item__label{
  color: rgb(224, 224, 224);
}
</style>
