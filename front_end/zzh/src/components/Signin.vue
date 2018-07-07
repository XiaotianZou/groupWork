<template>
    <div>
        <img class="logo" src='../assets/logo.jpg'/>
        <div class="container">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="username">
                    <el-input v-model.number="ruleForm2.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                    <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
                    <el-button @click="register">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Signin',
  
  data() {
      let validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入姓名'));
        } 
        else {
          callback();
        }
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } 
        else {
          callback();
        }
      };

      return {
        ruleForm2: {
            username: '',
            pass: '',
        },
        rules2: {
            username: [
                { validator: validateUsername, trigger: 'blur' }
            ],
            pass: [
                { validator: validatePass, trigger: 'blur' }
            ],
        }
      };
  },

  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login()
          } else {
            console.log('error submit!!')
            return false;
          }
        });
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
  margin-top:30px;
}
</style>
