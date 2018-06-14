<template>
    <div>
        <mu-card style="width: 100%; max-width: 375px; margin: 0 auto; padding-bottom: 20px;">
        <!-- <mu-card-media title="Image Title" sub-title="Image Sub Title"> -->
        <mu-card-media>
            <img src="../assets/bg.jpg">
        </mu-card-media>
            <div class="container">
                <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="活动名称" prop="name">
                        <el-input v-model="ruleForm2.name" disabled=true></el-input>
                    </el-form-item>
                    <el-form-item label="活动地点" prop="location">
                        <el-input v-model="ruleForm2.location" disabled=true></el-input>
                    </el-form-item>
                    <el-form-item label="报名开始" prop="addStartTime">
                        <el-date-picker v-model="ruleForm2.addStartTime" type="datetime" placeholder="选择日期时间" disabled=true></el-date-picker>
                    </el-form-item>
                    <el-form-item label="报名结束" prop="addEndTime">
                        <el-date-picker v-model="ruleForm2.addEndTime" type="datetime" placeholder="选择日期时间" disabled=true></el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动开始" prop="activityStartTime">
                        <el-date-picker v-model="ruleForm2.activityStartTime" type="datetime" placeholder="选择日期时间" disabled=true></el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动结束" prop="activityEndTime">
                        <el-date-picker v-model="ruleForm2.activityEndTime" type="datetime" placeholder="选择日期时间" disabled=true></el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动简介" prop="info">
                        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="ruleForm2.info" disabled=true></el-input>
                    </el-form-item>
                    <el-form-item label="参加成员" prop="member">
                        <div v-for="iter in memberArr">
                            <mu-card class="card">
                                    <img class="pic" src="../assets/avatar.jpg">
                               
                                    <p class="iterId">学号：{{ iter.id }}</p>
                                    <p class="iterSignin">状态：{{ iter.signin  }}</p>
                               
                            </mu-card>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button v-if="mode == 0" type="primary" @click="takeIn()">参加</el-button>
                        <el-button v-if="mode == 0" @click="goBack">返回</el-button>
                        <el-button v-if="mode == 1" type="primary" disabled>已参加</el-button>
                        <el-button v-if="mode == 1" @click="goBack">返回</el-button>
                        <el-button v-if="mode == 2" type="primary">修改</el-button>
                        <el-button v-if="mode == 2">重置</el-button>
                        <!-- <el-button v-if="mode == 2" type="primary" @click="submitForm('ruleForm2')">修改</el-button>
                        <el-button v-if="mode == 2" @click="resetForm('ruleForm2')">重置</el-button> -->
                        <!-- <el-button @click="register">注册</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
        </mu-card>
        <i class="material-icons back-button" @click="goBack">arrow_back_ios</i>
        <el-button type="text" @click="open" v-if="mode == 2">生成签到二维码</el-button>
        <el-dialog
            :visible.sync="show">
            <canvas id = "code" props = 'gcode'></canvas>
        </el-dialog>
    </div>
</template>

<script>
let QRCode = require('qrcode')
let canvas = document.getElementById('qrcode');
export default {
  name: 'Detail',
  
  data() {
    //   let validateName = (rule, value, callback) => {
    //     if (value === '') {
    //       callback(new Error('请输入活动名称'));
    //     } 
    //     else {
    //       callback();
    //     }
    //   };
    //   let validateLocation = (rule, value, callback) => {
    //     if (value === '') {
    //       callback(new Error('请输入活动地点'));
    //     } 
    //     else {
    //       callback();
    //     }
    //   };
    //   let validateInfo = (rule, value, callback) => {
    //     if (value === '') {
    //       callback(new Error('活动简介不能为空'));
    //     } 
    //     else {
    //       callback();
    //     }
    //   };
    //   let validateAddStartTime = (rule, value, callback) => {
    //       if (value === '') {
    //         callback(new Error('报名开始时间不能为空'));
    //       } 
    //       else {
    //         callback();
    //       }
    //   };
    //   let validateAddEndtTime = (rule, value, callback) => {
    //       if (value === '') {
    //         callback(new Error('报名结束时间不能为空'));
    //       } 
    //       else {
    //         callback();
    //       }
    //   };
    //   let validateActivityStartTime = (rule, value, callback) => {
    //       if (value === '') {
    //         callback(new Error('活动开始时间不能为空'));
    //       } 
    //       else {
    //         callback();
    //       }
    //   };
    //   let validateActivityEndTime = (rule, value, callback) => {
    //       if (value === '') {
    //         callback(new Error('活动结束时间不能为空'));
    //       } 
    //       else {
    //         callback();
    //       }
    //   };

      return {
        mode: 0,
        aid: '',
        memberArr: [],
        arr: [],
        ruleForm2: {
            name: '',
            location: '',
            info: '',
            member: [],
            addStartTime: '',
            addEndTime: '',
            activityStartTime: '',
            activityEndTime: '',
        },
        show: false,
        // rules2: {
        //     name: [
        //         { validator: validateName, trigger: 'blur' }
        //     ],
        //     location: [
        //         { validator: validateLocation, trigger: 'blur' }
        //     ],
        //     info: [
        //         { validator: validateInfo, trigger: 'blur' }
        //     ],
        //     addStartTime: [
        //         { validator: validateAddStartTime, trigger: 'blur' }
        //     ],
        //     addEndTime: [
        //         { validator: validateAddEndtTime, trigger: 'blur' }
        //     ],
        //     activityStartTime: [
        //         { validator: validateActivityStartTime, trigger: 'blur' }
        //     ],
        //     activityEndTime: [
        //         { validator: validateActivityEndTime, trigger: 'blur' }
        //     ],
        // }
      };
  },

props: {
    gcode: function() {
        QRCode.toCanvas(document.getElementById('code'), 'qiandao/' + this.$route.params.aid);
    }
},

  watch: {
      show() {
          this.visible = this.show; 
      }
  },

  beforeRouteLeave(to, from, next) {
      to.params.uid = this.$route.params.uid
      if (this.$route.params.activeTab)
        to.params.activeTab = this.$route.params.activeTab
      if (this.$route.params.bottomNav)
        to.params.bottomNav = this.$route.params.bottomNav
      next()
  },

  created() {
      this.checkUser()
      this.getActivity()
      //QRCode.toCanvas(document.getElementById('code'), 'qiandao/' + this.$route.params.aid);
      //alert(this.$store.state.isLogin)
  },


  methods: {
      open() {
          this.show = true;
          this.$nextTick(function(){
              //QRCode.toCanvas(document.getElementById('code'), 'www.baidu.com');
                QRCode.toCanvas(document.getElementById('code'), 'http://139.199.59.246:3000/qiandao/' + this.$route.params.aid);
          })
         
      },
    //   submitForm(formName) {
    //     this.$refs[formName].validate((valid) => {
    //       if (valid) {
    //         this.$router.push('/activity')
    //       } else {
    //         console.log('error submit!!')
    //         return false;
    //       }
    //     });
    //   },
    //   resetForm(formName) {
    //     this.$refs[formName].resetFields()
    //   },
      takeIn() {
          if (this.mode == 0) {
            let url = '/api/signup'
            let params = '?aid=' + this.$route.params.aid + 
                          '&uid=' + this.$route.params.uid
            this.$ajax
                .get(url + params)
                .then(res => {
                    if (res.data.ok)
                        this.mode = 1
                    else
                        alert('fail to take in')
                })
                .catch(err => {
                    console.log(err)
                })
          }
      },
      goBack() {
          this.$router.go(-1)
      },

      qrCode() {

          document.getElementById("code").qrcode({
              render: 'table',
              width: 200,
              height: 200,
              text: 'qiandao/' + this.$route.params.aid
          });
      },
      
      checkUser() {
          this.isTakeIn()
          this.isOrganize()
      },
      isTakeIn() {
          let url = '/api/isSignup'
          let params = '?aid=' + this.$route.params.aid + 
                        '&uid=' + this.$route.params.uid
          this.$ajax
            .get(url + params)
            .then(res => {
                if (res.data.ok) {
                    let s = res.data.data
                    if (s === 'signup')
                        this.mode = 1
                    else
                        this.mode = 0
                }
                else
                    console.log('fail to check take in')
            })
            .catch(err => {
                console.log(err)
            })
      },
      isOrganize() {
          this.$ajax
            .get('/api/getOneUserOrganize?uid=' + this.$route.params.uid)
            .then((res) => {
                if (res.data.ok) {
                    let activityID = res.data.data
                    if (activityID.length != 0) {
                        for (let id of activityID) {
                            if (this.$route.params.aid === id) {
                                this.mode = 2
                                break
                            }
                        }
                    }
                    else
                        this.mode = 0
                }
                else
                    alert('fail to check organize')
            })
            .catch((err) => {
                console.log(err)
            })
      },
      getActivity() {
          this.aid = this.$route.params.aid
          this.$ajax
            .get('/api/getOneActivity?id=' + this.aid)
            .then(res => {
                if (res.data.ok) {
                    this.memberArr = []
                    let activity = res.data.data
                    this.ruleForm2.name = activity.name
                    this.ruleForm2.location = activity.place
                    this.ruleForm2.info = activity.info
                    this.ruleForm2.addStartTime = activity.start_time
                    this.ruleForm2.addEndTime = activity.end_time
                    this.ruleForm2.activityStartTime = activity.signup_start_time
                    this.ruleForm2.activityEndTime = activity.signup_end_time
                    this.ruleForm2.member.push(activity.joins)
                    
                    for (var i = 0; i < this.ruleForm2.member[0].length; i++) {
                        this.memberArr.push(this.ruleForm2.member[0][i])
                        if (this.memberArr[i].signin == false) {
                            this.memberArr[i].signin = '未签到'
                        } else {
                            this.memberArr[i].signin = '签到'
                        }
                        
                    }
                   
                }
                else {
                    alert('fail to create activity')
                }
            })
            .catch(err => {
                console.log(err)
            })
            
      }
  },
}
</script>

<style scoped>

.card {
    height: 115px;
}

.pic {
    border-radius: 50%;
    width: 45px;
    height: 45px;
    position: relative;
    right: 35%;
    top: 5px
}

.iterId {
    margin: 0px;
    position: relative;
    left: 10%;
    bottom: 30px;
}

.iterSignin {
    margin: 0;
    position: relative;
    left: 5%;
    bottom: 30px;
}


.container {
    margin-top: 20px;
    margin-right:50px;
    text-align: center;
}

.back-button {
    width: 50px;
    height: 50px;
    position: fixed;
    left: 10px;
    top: 10px;
}
</style>
