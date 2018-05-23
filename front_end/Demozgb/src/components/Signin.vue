<template>
  <div class="container-fluid">
    <img class="logo" src='../assets/logo.png'/>
    <form @submit.prevent="submit">
      <div class="row justify-content-center">
        <input class="col-8" placeholder="用户名" v-model="profile.username"/>
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
export default {
  name: 'Signin',
  data: function () {
    return {
      profile: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submit: function () {
      var formData = JSON.stringify(this.profile)
      console.log(formData)
      var url = 'http://139.199.59.246:8888/newUser'
      // post有两个参数
      // 参数1:请求的路径
      // 参数2:提交的参数
      // 提交参数的两种形态:
      // 1.可以直接传入字符串 name=张三&age=19
      // 2.可以以对象的形式传入{name:"三",age:19}
      axios.post(url, formData).then(function(res) {
        var resData = res.data;
        console.log(resData);
        if(resData.status == "0") { //0表示成功，1表示失败    
          alert(resData.message);
        } else {
          alert(resData.message);
        } 
      });
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
