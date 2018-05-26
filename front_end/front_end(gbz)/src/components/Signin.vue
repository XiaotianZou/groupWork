<template>
  <div class="container-fluid">
    <img class="logo" src='../assets/logo.png'/>
    <form @submit.prevent="submit">
      <div class="row justify-content-center">
        <input class="col-8" placeholder="用户名" v-model="profile.id"/>
        <input class="col-8" placeholder="密码" v-model="profile.password"/>
      </div>
      <div class="row justify-content-center">
        <button type="submit" class="btn btn-primary">登录</button>
        <a href="/#/signup" class="btn btn-outline-primary" role="button" aria-disabled="true">注册</a>
      </div>
    </form>
  </div>
</template>

<script>
import crypto from 'crypto'
// import axios from 'axios'
export default {
  name: 'Signin',
  data: function () {
    return {
      profile: {
        id: '',
        password: ''
      }
    }
  },
  methods: {
    submit: function () {
      var url = 'api/log/'
      var params = '?id=' + this.profile.id + '&password=' + this.profile.password
      this.$ajax.get(url + params).then(function (res) {
        var resData = res.data
        if (resData.ok) {
          alert('登陆成功')
        } else {
          console.log(resData)
        }
      })
    },
    getmd5: function (password) {
      var md5 = crypto.createHash('md5')
      md5.update(password)
      return md5.digest('hex')
    }
  }
}
</script>

<style scoped>
.logo {
  width: 280px
}
input {
  outline: none;
  border: 0;
  border-bottom: 1px solid black;
  padding: 0;
  margin-top: 20px;
  font-size: 20px;
}
a, button {
  outline: none;
  margin: 8px;
  margin-top: 28px;
  width: 72px;
}
</style>
