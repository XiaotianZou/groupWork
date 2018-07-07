<template>
    <div>
        <el-row class="tac">
            <el-col :span="9">
                <el-menu class="el-menu-vertical-demo personal" background-color="#545c64" text-color="#fff">
                <mu-avatar class="avatar">
                    <img src="../assets/avatar.jpg">
                </mu-avatar>
                <el-menu-item index="1" class="left">
                    <div class="txt">
                        <i class="material-icons">account_circle</i>
                        <p class="padding">{{ name }}</p>
                    </div>
                    <!-- <i class="material-icons"></i>
                    <span slot="title">{{ name }}</span> -->
                </el-menu-item>
                <el-menu-item index="2" class="left">
                    <div class="txt">
                        <i class="material-icons">fingerprint</i>
                        <p class="padding">{{ uid }}</p>
                    </div>
                    
                    <!-- <i class="material-icons">fingerprint</i>
                    <span slot="title">{{ uid }}</span> -->
                </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="15" class="left">
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
                        <div class="txt">
                            <i class="material-icons">textsms</i>
                            <p>{{ activity.name }}</p>
                        </div>
                        <div class="txt">
                            <i class="material-icons">place</i>
                            <p>{{ activity.place }}</p>
                        </div>
                        <mu-float-button @click="detailActivity(activity)" mini class="demo-float-button detail-button" icon="arrow_forward"/>
                    </mu-card>
                </div>
                <div v-if="bottomNav == '2'" v-for="activity in tkinAtyArr" class="container">
                    <mu-card>
                        <mu-card-media>
                            <img src="../assets/bg.jpg">
                        </mu-card-media>
                        <div class="txt">
                            <i class="material-icons">textsms</i>
                            <p>{{ activity.name }}</p>
                        </div>
                        <div class="txt">
                            <i class="material-icons">place</i>
                            <p>{{ activity.place }}</p>
                        </div>
                        <mu-float-button @click="detailActivity(activity)" mini class="demo-float-button detail-button" icon="arrow_forward"/>
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
        if (this.$route.params.bottomNav)
            this.bottomNav = this.$route.params.bottomNav
        this.fetchData()
    },

    // beforeRouteLeave(to, from, next) {
    //   to.params.uid = this.$route.params.uid
    //   if (this.$route.params.activeTab)
    //     to.params.activeTab = this.$route.params.activeTab
    //   if (this.$route.params.bottomNav)
    //     to.params.bottomNav = this.$route.params.bottomNav
    //   next()
    // },

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
    width: 80px;
    height: 80px;
}

.container {
    margin-bottom: 5px;
    padding: 15px;
}

.bottom-nav {
    position: fixed;
    bottom: 15px;
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
    margin-top: 10px;
    margin-left: 10px;
    height: 30px;
}

</style>
