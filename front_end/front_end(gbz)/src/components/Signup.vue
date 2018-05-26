<template>
  <div class="container-fluid">
    <form v-on:submit.prevent="submit">
      <div class="row justify-content-center">
        <input class="col-8" placeholder="姓名" type="text" v-model="profile.name"/>
        <input class="col-8" placeholder="学号" type="number" v-model="profile.studentId"/>
        <input class="col-8" placeholder="密码" type="password" v-model="profile.password"/>
        <input class="col-8" placeholder="确认密码" type="password" v-model="profile.confirmPwd"/>
        <input class="col-8" placeholder="邮箱" type="email" v-model="profile.email"/>
        <input class="col-8" placeholder="手机" type="number" v-model="profile.phone"/>
      </div>
      <div class="row justify-content-center">
        <button type="submit" class="btn btn-primary">注册</button>
        <a href="/#/signin" class="btn btn-outline-primary" role="button" aria-disabled="true">返回</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data: function () {
    return {
      profile: {
        name: '',
        studentId: '',
        password: '',
        confirmPwd: '',
        email: '',
        phone: '',
      }
    }
  },
  methods: {
    submit: function () {
      var url = 'api/newUser'
      var params = '?id=' + this.profile.studentId + '&name=' + this.profile.name + '&password=' + this.profile.password + '&mail=' + this.profile.email + '&phone=' + this.profile.phone + '&url=' + this.profile.url
      this.$ajax.get(url + params).then(function (res) {
        var resData = res.data
        console.log(resData)
        if (resData.ok) {
          alert('注册成功')
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
