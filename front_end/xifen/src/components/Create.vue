<template>
    <div>
        <mu-card style="width: 100%; max-width: 375px; margin: 0 auto; padding-bottom: 20px;">
            <mu-card-media>
                <img src="../assets/bg.jpg">
            </mu-card-media>
            <div class="container">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="活动名称" prop="name">
                        <el-input v-model="ruleForm2.name"></el-input>
                    </el-form-item>
                    <el-form-item label="活动地点" prop="location">
                        <el-input v-model="ruleForm2.location"></el-input>
                    </el-form-item>
                    <el-form-item label="报名开始" prop="addStartTime">
                        <el-date-picker v-model="ruleForm2.addStartTime" type="datetime"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="报名结束" prop="addEndTime">
                        <el-date-picker v-model="ruleForm2.addEndTime" type="datetime"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动开始" prop="activityStartTime">
                        <el-date-picker v-model="ruleForm2.activityStartTime" type="datetime"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动结束" prop="activityEndTime">
                        <el-date-picker v-model="ruleForm2.activityEndTime" type="datetime"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动简介" prop="info">
                        <el-input type="textarea" :rows="3" v-model="ruleForm2.info"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')">创建</el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                        <!-- <el-button @click="register">注册</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
        </mu-card>
        <i class="material-icons back-button" @click="goBack">arrow_back_ios</i>
    </div>
</template>

<script>
export default {
  name: 'Create',
  
  data() {
      let validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入活动名称'));
        } 
        else {
          callback();
        }
      };
      let validateLocation = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入活动地点'));
        } 
        else {
          callback();
        }
      };
      let validateInfo = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('活动简介不能为空'));
        } 
        else {
          callback();
        }
      };
      let validateAddStartTime = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('报名开始时间不能为空'));
          } 
          else {
            callback();
          }
      };
      let validateAddEndtTime = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('报名结束时间不能为空'));
          } 
          else {
            callback();
          }
      };
      let validateActivityStartTime = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('活动开始时间不能为空'));
          } 
          else {
            callback();
          }
      };
      let validateActivityEndTime = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('活动结束时间不能为空'));
          } 
          else {
            callback();
          }
      };

      return {
        ruleForm2: {
            name: '',
            location: '',
            info: '',
            addStartTime: '',
            addEndTime: '',
            activityStartTime: '',
            activityEndTime: '',
        },
        rules2: {
            name: [
                { validator: validateName, trigger: 'blur' }
            ],
            location: [
                { validator: validateLocation, trigger: 'blur' }
            ],
            info: [
                { validator: validateInfo, trigger: 'blur' }
            ],
            addStartTime: [
                { validator: validateAddStartTime, trigger: 'blur' }
            ],
            addEndTime: [
                { validator: validateAddEndtTime, trigger: 'blur' }
            ],
            activityStartTime: [
                { validator: validateActivityStartTime, trigger: 'blur' }
            ],
            activityEndTime: [
                { validator: validateActivityEndTime, trigger: 'blur' }
            ],
        }
      };
  },

  beforeRouteLeave(to, from, next) {
      to.params.uid = this.$route.params.uid
      if (this.$route.params.activeTab)
        to.params.activeTab = this.$route.params.activeTab
      to.params.bottomNav = '0'
      next()
  },

//   created() {
//       console.log(this.$route.params.activeTab)
//       console.log(this.$route.params.uid)
//   },

  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.createActivity()
          } else {
            console.log('error submit!!')
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      GMTToStr(date) {
          let str = date.getFullYear() + '-' + 
                    (date.getMonth() + 1) + '-' + 
                    date.getDate() + ' ' + 
                    date.getHours() + ':' + 
                    date.getMinutes() + ':' + 
                    date.getSeconds()
          return str
      },
      goBack() {
          this.$router.go(-1)
      },

      createActivity() {
          let s = this.$route.params.uid + Date.parse(new Date())
          let url = '/api/newActivity'
          let params = '?aid=' + s + 
                        '&name=' + this.ruleForm2.name + 
                        '&info=' + this.ruleForm2.info + 
                        '&place=' + this.ruleForm2.location + 
                        '&oid=' + this.$route.params.uid + 
                        '&st=' + this.GMTToStr(this.ruleForm2.addStartTime) + 
                        '&et=' + this.GMTToStr(this.ruleForm2.addEndTime) + 
                        '&sst=' + this.GMTToStr(this.ruleForm2.activityStartTime) + 
                        '&set=' + this.GMTToStr(this.ruleForm2.activityEndTime)
          this.$ajax
            .get(url + params)
            .then(res => {
                if (res.data.ok) {
                    this.$router.go(-1)
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