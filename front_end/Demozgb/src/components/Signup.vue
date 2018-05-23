<template>
  <div class="container-fluid">
    <form v-on:submit.prevent="handleSubmit">
      <div class="row justify-content-center">
        <input class="col-8" placeholder="姓名" type="text" v-model="name"/>
        <input class="col-8" placeholder="学号" type="number" v-model="studentId"/>
        <input class="col-8" placeholder="密码" type="password" v-model="password"/>
        <input class="col-8" placeholder="确认密码" type="password" v-model="confirmPwd"/>
        <input class="col-8" placeholder="邮箱" type="email" v-model="email"/>
        <input class="col-8" placeholder="手机" type="number" v-model="phone"/>
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
      name: '',
      studentId: '',
      password: '',
      confirmPwd: '',
      email: '',
      phone: ''
    }
  },
  methods: {
    handleSubmit: function () {
      console.log(this.name, this.studentId, this.password, this.confirmPwd, this.email, this.phone)
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
