<template>
    <div>
        <img src="../assets/bg.jpg">
        <div>
            <mu-data-table :columns="columns" :data="list" hideHeader stripe>
                <template slot-scope="scope">
                    <td>{{scope.row.tag}}</td>
                    <td>{{scope.row.content}}</td>
                </template>
            </mu-data-table>
            <mu-list toggle-nested>
                <mu-list-item button :ripple="false" nested :open="open === 'member'" @toggle-nested="open = arguments[0] ? 'member' : ''">
                    <!-- <mu-list-item-title>参与人员 : {{this.memberArr.length}}</mu-list-item-title> -->
                    <div id="member-list-button">
                        <mu-button flat color="primary" large>参与人员 : {{this.memberArr.length}}</mu-button>
                    </div>
                    <mu-list-item button :ripple="false" slot="nested">
                        <div id="member-item">
                            <div id="member-id">学号</div>
                            <div id="attendance-status">状态</div>
                        </div>
                    </mu-list-item>
                    <mu-list-item button :ripple="false" slot="nested" v-for="iter in memberArr">
                        <div id="member-item">
                            <div id="item-left"><div id="member-id">{{iter.id}}</div></div>
                            <div id="item-right"><div id="attendance-status">
                                <i class="far fa-check-circle" v-if="iter.signin"></i>
                                <i class="far fa-times-circle" v-else></i>
                            </div></div>
                        </div>
                    </mu-list-item>
                </mu-list-item>
            </mu-list>
            <el-button v-if="mode == 0" type="primary" @click="takeIn()">参加</el-button>
            <el-button v-if="mode == 0" @click="goBack">返回</el-button>
            <el-button v-if="mode == 1" type="primary" disabled>已参加</el-button>
            <el-button v-if="mode == 1" @click="goBack">返回</el-button>
            <el-button v-if="mode == 2" type="primary">修改</el-button>
            <el-button v-if="mode == 2">重置</el-button>
                    
        </div>
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
        columns: [
            { title: 'tag', width: 150, name: 'tag' },
            { title: 'name', name: 'content', width: 264 }
        ],
        list: [],
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
                    this.list.push({tag: '活动名称', content: activity.name});
                    this.list.push({tag: '活动地点', content: activity.place});
                    this.list.push({tag: '报名开始', content: activity.signup_start_time});
                    this.list.push({tag: '报名结束', content: activity.signup_end_time});
                    this.list.push({tag: '活动开始', content: activity.start_time});
                    this.list.push({tag: '活动结束', content: activity.end_time});
                    this.list.push({tag: '活动简介', content: activity.info});
                    // this.list.push({tag: '参加成员', content: });
                    
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
#member-list-button {
    width: 100%
}
#member-item {
    width: 100%;
    margin-left: -18px;
    display: flex;
    justify-content: center;
}
#item-left {
    width: 50%;
    display: flex;
    justify-content: flex-end;
}
#item-right {
    width: 50%;
    display: flex;
    justify-content: flex-start;
}
#member-id {
    font-size: 40px;
    margin-right: 40px;
}
#attendance-status {
    font-size: 40px;
    margin-left: 40px;
}
.fa-check-circle {
    color: #29b6f6;
}
.fa-times-circle {
    color: red;
}
</style>
