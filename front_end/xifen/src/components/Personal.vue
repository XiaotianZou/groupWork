<template>
    <div>
        <div class="cover">
            <div class="cover-content">
                <mu-avatar class="avatar">
                    <img src="../assets/avatar.jpg">
                </mu-avatar>
                <div class="txt">
                    <p class="padding">{{ name }}</p>
                </div>
            </div>
        </div>
        <div class="main-content">
            <el-row class="tac">
                <el-col :span="24" class="left">
                    <div v-if="bottomNav == '0'">
                        <el-table :data="tableData" stripe class="center">
                            <el-table-column prop="label"></el-table-column>
                            <el-table-column prop="value"></el-table-column>
                        </el-table>
                    </div>
                    <div v-if="bottomNav == '1'" v-for="activity in orgAtyArr" class="container">
                        <mu-card>
                            <mu-card-media>
                                <img src="../assets/bg.jpg">
                            </mu-card-media>
                            <span class="card-title">{{ activity.name }}</span>
                            <div class="location">
                                <i class="fas fa-map-marker-alt"></i>
                                <div>{{ activity.place }}</div>
                            </div>
                            <mu-card-actions>
                                <mu-button class="muBtn" flat large @click="detailActivity(activity)">详情</mu-button>
                            </mu-card-actions>
                        </mu-card>
                    </div>
                    <div v-if="bottomNav == '2'" v-for="activity in tkinAtyArr" class="container">
                        <mu-card>
                            <mu-card-media>
                                <img src="../assets/bg.jpg">
                            </mu-card-media>
                            <span class="card-title">{{ activity.name }}</span>
                            <div class="location">
                                <i class="fas fa-map-marker-alt"></i>
                                <div>{{ activity.place }}</div>
                            </div>
                            <mu-card-actions>
                                <mu-button class="muBtn" flat large @click="detailActivity(activity)">详情</mu-button>
                            </mu-card-actions>
                        </mu-card>
                    </div>
                    <div v-if="bottomNav == '3'">{{toAllActivity()}}</div>
                    <div v-if="bottomNav == '4'">{{toCreate()}}</div>
                </el-col>
            </el-row>
            <mu-bottom-nav :value="bottomNav" shift @change="handleChange" class="bottom-nav">
                <mu-bottom-nav-item value="0" title="个人中心" icon="perm_identity"/>
                <mu-bottom-nav-item value="1" title="组织活动" icon="star_rate"/>
                <mu-bottom-nav-item value="2" title="参加活动" icon="pan_tool"/>
                <mu-bottom-nav-item value="3" title="查看活动" icon="visibility"/>
                <mu-bottom-nav-item value="4" title="创建活动" icon="add"/>
            </mu-bottom-nav>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Personal',

    data() {
        return {
            bottomNav: '0',
            uid: '',
            name: '',
            tableData: [],
            orgAtyArr: [],
            tkinAtyArr: [],
        }
    },

    created() {
        if (this.$store.state.isLogin == "") {
          this.$router.push('/signin')
      }
        if (this.$route.params.bottomNav)
            this.bottomNav = this.$route.params.bottomNav
        this.$route.params.uid = this.$store.state.isLogin
        this.fetchData()
        
    },

    methods: {
        fetchData() {
            this.getUser()
            this.getOrganizeActivity()
            this.getTakeinActivity()
        },
        handleChange(val) {
            this.bottomNav = val
        },
        toAllActivity() {
            this.$router.push({name: 'Activity', params: {uid: this.$route.params.uid, bottomNav: this.bottomNav}})
        },
        toCreate() {
            this.$router.push({name: 'Create', params: {uid: this.$route.params.uid, bottomNav: this.bottomNav}})
        },
        detailActivity(activity) {
            this.$router.push({name: 'Detail', params: {uid: this.$route.params.uid, aid: activity.id, bottomNav: this.bottomNav}})
        },

        getUser() {
            this.$ajax
                .get('/api/getOneUser?id=' + this.$route.params.uid)
                .then(res => {
                    if (res.data.ok) {
                        this.tableData = []
                        let user = res.data.data
                        this.tableData.push({label: '姓名', value: user.name})
                        this.tableData.push({label: '学号', value: user.id})
                        this.tableData.push({label: '手机', value: user.phone})
                        this.tableData.push({label: '邮箱', value: user.mail})
                        this.uid = user.id
                        this.name = user.name
                    }
                    else
                        alert('fail to get user')
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getOrganizeActivity() {
            this.$ajax
                .get('/api/getOneUserOrganize?uid=' + this.$route.params.uid)
                .then((res) => {
                    let activityID = res.data.data
                    if (activityID.length != 0) {
                        this.orgAtyArr = []
                        activityID.forEach(id => {
                            this.$ajax
                                .get('/api/getOneActivity?id=' + id)
                                .then(res => {
                                    this.orgAtyArr.push(res.data.data)
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        getTakeinActivity() {
            this.$ajax
                .get('/api/getOneUserTakein?uid=' + this.$route.params.uid)
                .then((res) => {
                    let activityID = res.data.data
                    if (activityID.length != 0) {
                        this.tkinAtyArr = []
                        activityID.forEach(id => {
                            this.$ajax
                                .get('/api/getOneActivity?id=' + id)
                                .then(res => {
                                    this.tkinAtyArr.push(res.data.data)
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        },
    },
}
</script>

<style scoped>
.personal {
    height: 100vh;
}

.avatar {
    margin-top:20px;
    margin-bottom: 10px;
    width: 200px;
    height: 200px;
}

.container {
    margin-bottom: 5px;
    padding: 15px;
}

.bottom-nav {
    position: fixed;
    bottom: 0;
}

.center {
    text-align: center;
}

.left {
    text-align: left;
}

span {
    display: inline;
    margin-left: 5px;
    vertical-align: top;
}

.detail-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
}

i {
    display: inline;
    vertical-align: baseline;
}

p {
    display: inline;
    line-height: 30px;
    margin-left: 5px;
    vertical-align: top;
}

.txt {
    margin-top: 20px;
    margin-left: 10px;
    height: 30px;
    font-size: 60px;
    color: white;
    font-weight: bold;
}

.cover {
    background-color: #545c64;
    height: 400px;
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 5;
}
.cover-content {
    padding-top: 50%;
    transform: translateY(-50%)
}
.main-content {
    margin-top: 400px;
    z-index: 4;
    padding-bottom: 110px;
}
.mu-card {
    border-radius: 16px;
    overflow: hidden;
}
.card-title {
    font-size: 60px;
    margin-left: 20px;
    padding-right: 40px;
    border-bottom: 1px solid gray;
}
.location {
    margin-left: 20px;
    font-size: 30px;
    display: flex;
    align-items: center;
}
.fa-map-marker-alt {
    margin-right: 10px;
}
</style>
