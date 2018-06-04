<template>
  <div class="container-fluid">
    <h1>个人中心</h1>
    <form v-on:submit.prevent="handleSubmit">
      <div class="row justify-content-center">
        <!-- <h2>{{studentName}}</h2> -->
        <ul>
        <li>
        姓名: 
        <input class="col-8" placeholder="姓名" type="text" v-model="studentName"/>
        </li>
        <li>
        学号: 
        <input class="col-8" placeholder="学号" type="number" v-model="studentId"/>
        </li>
        <li>
        邮箱: 
        <input class="col-8" placeholder="邮箱" type="email" v-model="email"/>
        </li>
        <li>
        手机:   
        <input class="col-8" placeholder="手机" type="number" v-model="phone"/>
        </li>
        </ul>
      </div>
      <div>
        <h4>我参加的活动</h4>
        <ul id="example-1">
          <li v-for="item in items" v-bind:key="item.name" >
            <div class="container">
           <span class="activityItem">名称： {{ item.name }}</span>
           <span class="activityItem">地点： {{ item.place }}</span>
           <span class="activityItem">组织者： {{ item.organizer }}</span>
           </div>
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
      // {name:'名称',place:'地点',organizer:'组织人'},
      { name: 'Foo',place:'gz',organizer:'zwk'},
      { name: 'zhuwenkun',place:'zsdx',organizer:'wenkun'}
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
      var url = 'api/getOneUserTakein/'
      // routerParams.data.id
      var params='?uid='+"312"
      this.$ajax.get(url+params).then(function(res) {
        var resData=res.data
        console.log("------------get one activity")
        console.log(resData)
      })
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
.container{
  width:100%;
  margin: 50px auto;
  overflow: hidden;
  border: 1px solid #ccc
}
row{
  left: 50%;
}
h1{
  left: 50%;
}
.activityItem{
  /* width: 30%; */
  width: 100%;
  display: block;
}
li{
  /* width: 30%; */
  font-size: 20px;
  padding-left: 1px;
}
ul{
  list-style-type:none;
}
h2{
  /* font-size: large */
}
a, button {
  outline: none;
  margin: 8px;
  margin-top: 28px;
  width: 72px;
}
</style>
