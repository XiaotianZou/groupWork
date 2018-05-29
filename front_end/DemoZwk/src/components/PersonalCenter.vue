<template>
  <div class="container-fluid">
    <h1>个人中心</h1>
    <form v-on:submit.prevent="handleSubmit">
      <div class="row justify-content-center">
        <!-- <h2>{{studentName}}</h2> -->
        <input class="col-8" placeholder="姓名" type="text" v-model="studentName"/>
        <input class="col-8" placeholder="学号" type="number" v-model="studentId"/>
        <input class="col-8" placeholder="邮箱" type="email" v-model="email"/>
        <input class="col-8" placeholder="手机" type="number" v-model="phone"/>
      </div>
      <div>
        <ul id="example-1">
          <li v-for="item in items">
            {{ item.message }}
            {{ item.place }}
            {{item.organizer}}
            {{item.start_time}}
            {{item.end_time}}
          </li>
        </ul>
      </div>
      <div class="row justify-content-center">
        <!-- <button type="submit" class="btn btn-primary">注册</button> -->
        <a href="/#/signin" class="btn btn-outline-primary" role="button" aria-disabled="true">返回</a>
      </div>
      <div>
        <button v-on:click="getActivity">getActivityfffuck</button>
        <!-- <a role="button" >获取该用户的活动</a> -->
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
export default {
  name: 'Signup',
  data: function () {
    return {
        studentName: 'zwk',
        studentId: '',
        password: '',
        confirmPwd: '',
        email: '',
        phone: '',
      items: [
      {message:'名称',place:'地点',organizer:'组织人',start_time:'开始时间',end_time:'结束时间'},
      { message: 'Foo',place:'gz',organizer:'zwk',start_time:'5-26',end_time:'5-28' }
      // { message: 'Bar',place:'dd' }
      ]
      
    }
  },
  methods: {
    handleSubmit: function () {
      console.log(this.name, this.studentId, this.password, this.confirmPwd, this.email, this.phone)
    },
    getActivity: function () {
      var formData=JSON.stringify(this.profile)
      let routerParams=this.$route.params.data
      // console.log(routerParams)
      var url = 'api/getAllActivity'
      this.$ajax.get(url).then(function(res) {
        var resData=res.data
        console.log(resData)
      })
      // axios.post(url, formData).then(function (res) {
      //   var resData=res.data
      //   console.log(resData)

      // })
    },
    getParams() {
      
    }
  },
  watch:{
    $route(to,from) {
      
    }
  },
  mounted:function() {
      let routerParams=this.$route.params.data
      this.studentName=routerParams.data.name
      this.email=routerParams.data.mail
      this.phone=routerParams.data.phone
      this.studentId=routerParams.data.id

    //获取个人的活动列表

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
row{
  left: 50%;
}
h1{
  left: 50%;
}
a, button {
  outline: none;
  margin: 8px;
  margin-top: 28px;
  width: 72px;
}
</style>
