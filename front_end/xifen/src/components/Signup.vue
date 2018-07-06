<template>
    <div>
        <img class="logo" src='../assets/logo.jpg'/>
        <div class="container">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-input
                  prop="username"
                  placeholder="姓名"
                  v-model="ruleForm2.username">
                </el-input>
                <el-input
                  prop="sid"
                  placeholder="学号"
                  v-model.number="ruleForm2.sid">
                </el-input>
                <el-input
                  prop="pass"
                  placeholder="密码"
                  type="password" 
                  v-model="ruleForm2.pass">
                </el-input>
                <el-input
                  prop="checkPass"
                  placeholder="确认密码"
                  type="password" 
                  v-model="ruleForm2.checkPass">
                </el-input>
                <el-input
                  prop="phone"
                  placeholder="手机"
                  v-model.number="ruleForm2.phone">
                </el-input>
                <el-input
                  prop="email"
                  placeholder="邮箱"
                  v-model="ruleForm2.email">
                </el-input>
                <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
                <el-button @click="login">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Signup',
  
  data() {
      let validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入姓名'));
        }
        else {
          callback();
        }
      };
      let validateSid = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('学号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } 
          else {
            callback();
          }
        }, 1000);
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } 
        else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } 
        else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } 
        else {
          callback();
        }
      };
      let validatePhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } 
          else {
            value += ""
            if (value.length != 11) {
                console.log(value.length)
              callback(new Error('手机号必定为11位'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      let validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        }
        else {
          callback();
        }
      };

      return {
        ruleForm2: {
            username: '',
            sid: '',
            pass: '',
            checkPass: '',
            phone: '',
            email: '',
        },
        rules2: {
            username: [
                { validator: validateUsername, trigger: 'blur' }
            ],
            sid: [
                { validator: validateSid, trigger: 'blur' }
            ],
            pass: [
                { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
                { validator: validatePass2, trigger: 'blur' }
            ],
            phone: [
                { validator: validatePhone, trigger: 'blur' }
            ],
            email: [
                { validator: validateEmail, trigger: 'blur' }
            ],
        }
      };
  },

  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.register()
          } 
          else {
            console.log('error submit!!')
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      login() {
          this.$router.push('/signin')
      },

      register() {
          let url = '/api/newUser'
          let params = '?id=' + this.ruleForm2.sid + 
                        '&name=' + this.ruleForm2.username + 
                        '&password=' + this.ruleForm2.pass + 
                        '&mail=' + this.ruleForm2.email + 
                        '&phone=' + this.ruleForm2.phone + 
                        '&url='
          this.$ajax
            .get(url + params)
            .then(res => {
                if (res.data.ok) {
                    this.$router.push({name: 'Personal', params: {uid: res.data.data.id}})
                }
                else {
                    alert('fail to register')
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

</style>
