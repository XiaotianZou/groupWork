<template>
    <div>
        <div class="activity">
            <mu-tabs :value="activeTab" @change="handleTabChange" class="tab" full-width>
                <mu-tab value="0" title="全部活动"/>
                <mu-tab value="1" title="参与的活动"/>
                <mu-tab value="2" title="组织的活动"/>
            </mu-tabs>
            <div style="height: 40px;"></div>
            <div v-if="activeTab === '0'" v-for="activity of allAtyArr" class="container">
                <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
                    <mu-card-media v-if="activity.mode == 2" title="已组织此活动">
                        <img src="../assets/bg.jpg">
                    </mu-card-media>
                    <mu-card-media v-else-if="activity.mode == 1" title="已参加此活动">
                        <img src="../assets/bg.jpg">
                    </mu-card-media>
                    <mu-card-media v-else>
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
                    <mu-float-button v-if="activity.mode == 0" @click="addActivity(activity)" mini class="demo-float-button add-button" icon="check"/>
                </mu-card>
            </div>
            <div v-if="activeTab === '1'" v-for="activity in tkinAtyArr" class="container">
                <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
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
            <div v-if="activeTab === '2'" v-for="activity in orgAtyArr" class="container">
                <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
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
        </div>
        <el-button @click="goBack" class="back-button" icon="el-icon-arrow-left"></el-button>
        <el-button @click="createActivity" class="create-button" icon="el-icon-plus"></el-button>
    </div>
</template>


<script>
export default {
  name: 'Activity',

  data () {
    return {
      activeTab: '0',
      allAtyArr: [],
      orgAtyArr: [],
      tkinAtyArr: [],
    }
  },

  created() {
      if (this.$store.state.isLogin == "") {
          this.$router.push('/signin')
      }
    if (this.$route.params.activeTab)
        this.activeTab = this.$route.params.activeTab
    this.$route.params.uid = this.$store.state.isLogin
    this.fetchData()
    
  },

  methods: {
    fetchData() {
        this.getAllActivity()
        this.getOrganizeActivity()
        this.getTakeinActivity()
    },
    handleTabChange (val) {
      this.activeTab = val
    },
    addActivity(activity) {
        for (let aty of this.allAtyArr) {
            if (aty.id === activity.id) {
                let url = '/api/signup'
                let params = '?aid=' + activity.id + 
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
                this.getTakeinActivity()
                aty.mode = 1
            }
        }
    },
    detailActivity(activity) {
        this.$router.push({name: 'Detail', params: {uid: this.$route.params.uid, aid: activity.id, activeTab: this.activeTab}})
    },
    createActivity() {
        this.$router.push({name: 'Create', params: {uid: this.$route.params.uid, activeTab: this.activeTab}})
    },
    goBack() {
        this.$router.push({name: 'Personal', params: {uid: this.$route.params.uid, bottomNav: '0'}})
    },

    getAllActivity() {
        this.$ajax
            .get('/api/getAllActivity')
            .then((res) => {
                let activity = res.data.data
                if (activity.length != 0) {
                    this.allAtyArr = []
                    activity.forEach(aty => {
                        this.$ajax
                            .get('/api/getOneActivity?id=' + aty.id)
                            .then(res => {
                                let tmpAty = res.data.data
                                tmpAty.mode = 0
                                if (tmpAty.organizer === this.$route.params.uid)
                                    tmpAty.mode = 2
                                else {
                                    for (let val of tmpAty.joins) {
                                        if (val.id === this.$route.params.uid) {
                                            tmpAty.mode = 1
                                            break
                                        }
                                    }
                                }
                                this.allAtyArr.push(tmpAty)
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
#activity {
    font-size: 20px;
}

.activity {
    text-align: left;
    width: 100%;
    /* padding-left: 40px;
    padding-right: 40px; */
}

.container {
    display: inline-block;
    margin-top: 20px;
    margin-bottom: 20px;
}

.paper {
    position: relative;
    height: 200px;
    width: 300px;
    margin: 30px;
    padding: 20px;
}

.detail-button {
    position: absolute;
    bottom: 10px;
    right: 15px;
    width: 30px;
    height: 30px;
}

.add-button {
    position: absolute;
    bottom: 10px;
    right: 60px;
    width: 30px;
    height: 30px;
}

.create-button {
    width: 48px;
    height: 48px;
    position: fixed;
    top: 0px;
    right: 0px;
    background-color: #7e57c2;
    border-radius: 0px;
    color: white;
}

.back-button {
    width: 48px;
    height: 48px;
    position: fixed;
    left: 0px;
    top: 0px;
    background-color: #7e57c2;
    border-radius: 0px;
    color: white;
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

.tab {
    width: 300px;
    position: fixed;
    top: 0px;
    left: 40px;
    right: 40px;
}

</style>

