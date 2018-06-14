<template>
    <div>
        <mu-card-media>
        <img class="logo" src='../assets/bg.jpg'/>
        </mu-card-media>
        <div class="container">
            <el-form :model="ruleForm2"  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名">
                    <el-input v-model="ruleForm2.username"></el-input>
                </el-form-item>
                <el-form-item label="活动">
                    <el-input v-model="ruleForm2.pass"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button id = "button" type="primary" @click="submitForm('ruleForm2')">确认签到</el-button>
                    <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Signin',
  
  data() {

      return {
        ruleForm2: {
            username: '',
            pass: '',
        },
      };
  },

  created() {
    let uid = this.$store.state.isLogin;
    let url = '/api/getOneUser';
    let params = '?id=' + uid;
    this.$ajax.get(url + params).then(res => {
        if (res.data.ok) {
            this.ruleForm2.username = res.data.data.name;
        }
    });
    url = '/api/getOneActivity';
    console.log(this.$route.params)
    params = '?id=' + this.$route.params.id;
    this.$ajax.get(url + params).then(res => {
        if (res.data.ok) {
            this.ruleForm2.pass = res.data.data.name;
        }
    });
  },

  methods: {
      submitForm(formName) {
          let url = '/api/signin';
          let params = '?aid=' + this.$route.params.id + '&uid=' + this.$store.state.isLogin;
          this.$ajax.get(url + params).then(res => {
              if (res.data.ok) {
                  document.getElementById("button").disabled = true;
                   document.getElementById("button").innerText = "已签到";
              }
              else {
                  alert("网络出错，签到失败！");
              }
          })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      register() {
          this.$router.push('/signup')
      },

      login() {
          let url = '/api/log'
          let params = '?name=' + this.ruleForm2.username + 
                        '&password=' + this.ruleForm2.pass
          this.$ajax
            .get(url + params)
            .then(res => {
                if (res.data.ok) {
                    this.$store.commit('isLogin', res.data.data.id)
                    this.$router.push({name: 'Personal', params: {uid: res.data.data.id}})
                }
                else {
                    alert('fail to login')
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
    margin-top:50px;
    margin-right:50px;
    text-align: center;
}

.logo {
  width: 280px;
}
</style>
