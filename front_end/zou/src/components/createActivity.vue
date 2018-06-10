<template>
    <div id="app">
    <div class="container">
        <div class="row clearfix">
            <div class="col-md-12 column">
                 <button type="button" id = "return" class="btn btn-default btn-link" >返回</button>
                 <button type="button" id = "participate" class="btn btn-default btn-link" v-on:click="partici">创建</button>
            </div>
        </div>
    </div>
    <hr id="line" style="FILTER: alpha(opacity=100,finishopacity=0,style=3)" width="80%" color=#AFEEEE SIZE=3>
    <p id="activity_name">活动名称</p>
    <textarea id="display1" class="info_display"></textarea>
    <p id="activity_time">报名时间</p>
    <textarea id='time1' class="time_display" placeholder="年"></textarea>
    <textarea id='time2' class="time_display" placeholder="月"></textarea>
    <textarea id='time3' class="time_display" placeholder="日"></textarea>
    <p id="to1">到</p>
    <textarea id='end_time1' class="time_display" placeholder="年"></textarea>
    <textarea id='end_time2' class="time_display" placeholder="月"></textarea>
    <textarea id='end_time3' class="time_display" placeholder="日"></textarea>
    <p id="signup_time">活动时间</p>
    <textarea id='time4' class="time_display" placeholder="年"></textarea>
    <textarea id='time5' class="time_display" placeholder="月"></textarea>
    <textarea id='time6' class="time_display" placeholder="日"></textarea>
    <p id="to2">到</p>
    <textarea id='end_time4' class="time_display" placeholder="年"></textarea>
    <textarea id='end_time5' class="time_display" placeholder="月"></textarea>
    <textarea id='end_time6' class="time_display" placeholder="日"></textarea>
    <p id="activity_location">活动地点</p>
    <textarea id="display3" class="info_display" ></textarea>
    <p id="activity_request">活动简介</p>
    <textarea id="display4" class="info_display"></textarea>
    <br>
    </div>
</template>

<script>
export default {
    name: "createActivity",
    methods: {
        smaller: function(a, b) {
                if (a != '' && b != '' && a <= b) {
                    return true;
                }
                return false;
        },
        partici: function() {

                function smaller(a, b) {
                    return (a <= b && a != '' && b != '');
                }
            
                let data = this.$route.params.data;;
                // let aid = data.aid;
                // let uid = data.uid;
                let aid = 'aid'
                let uid = 'uid'
                let url = '/api/newActivity';
                
                let date = new Date();
                let signup_date = $('#time1').val() + '-' + $('#time2').val() + '-' + $('#time3').val()
                let end_signup_date = $('#end_time1').val() + '-' + $('#end_time2').val() + '-' + $('#end_time3').val()
                let activity_date = $('#time4').val() + '-' + $('#time5').val() + '-' + $('#time6').val()
                let end_activity_date = $('#end_time4').val() + '-' + $('#end_time5').val() + '-' + $('#end_time6').val()
                let current_date = date.getFullYear() + '-' + date.getUTCMonth() + '-' + date.getDate()
                let flag = false;
                let s_d = new Date(signup_date.replace(/\-/g, "\/"));
                let a_d = new Date(activity_date.replace(/\-/g, "\/"));
                let c_d = new Date(current_date.replace(/\-/g, "\/"));
                let e_a_d = new Date(end_activity_date.replace(/\-/g, "\/"));
                let e_s_d = new Date(end_signup_date.replace(/\-/g, "\/"));
                if (smaller(c_d, a_d) && smaller(c_d, s_d) && smaller(a_d, e_a_d) && smaller(s_d, e_s_d)) {
                    alert('down')
                    let name = $('#display1').val();
                    let info = $('#display4').val();
                    let place = $('#display3').val();
                    let oid = uid;
                    let timestamp = Date.parse(new Date());
                    let param = '?aid=' + oid + '_' + timestamp + '&name=' + name + '&info=' + info + '&place=' + place + '&oid=' + oid + '&st=' + activity_date + 'et=' + end_activity_date + '&sst=' + signup_date + '&set=' + end_signup_date;
                    this.$ajax.get(url +param).then(function(res) {
                        var resData = res.data
                        console.log(resData)
                    })
                } else {
                    alert("时间错误！")
                }
            },
        smaller: function(a, b) {
                if (a != '' && b != '' && a <= b) {
                    return true;
                }
                return false;
            },
        
    }
}
</script>



<style>
#return {
    position: absolute;
    left: 5%;
    bottom: 15pt;
}

#participate {
    position: absolute;
    right: 5%;
    bottom: 15pt;
}

#line {
    position: absolute;
    top: 18pt;
    left: 10%;
    height: 1pt;
}

.info_display {
    border-left: 0;
    border-right: 0;
    
    width: 80%;
    height: 80pt;
    
}

#display1 {
    position: absolute;
    top: 20%;
    left: 10%
}

#to1 {
    position: absolute;
    top: 46%;
    left: 48%;
}

#to2 {
    position: absolute;
    top: 61%;
    left: 48%;
}

#display2 {
    position: absolute;
    top: 50%;
    left: 10%;
}

#display3 {
    position: absolute;
    top: 80%;
    left: 10%;
}

#display4 {
    position: absolute;
    top: 110%;
    left: 10%;
}

#activity_name {
    position: absolute;
    top: 15%;
    left: 10%;
    margin: 0;
}

#signup_time {
    position: absolute;
    top: 55%;
    left: 10%;
    margin: 0;
}

#time4 {
    position: absolute;
    top: 60%;
    right: 80%;
}

#time5 {
    position: absolute;
    top: 60%;
    left: 21%;
}

#time6 {
    position: absolute;
    top: 60%;
    left: 34%;
}

#end_time4 {
    position: absolute;
    top: 60%;
    right: 34%;
}

#end_time5 {
    position: absolute;
    top: 60%;
    right: 21%;
}

#end_time6 {
    position: absolute;
    top: 60%;
    right: 8%;
}

#activity_time {
    position: absolute;
    top: 40%;
    left: 10%;
    margin: 0;
}

.time_display {
    width: 50px;
    height: 30px;
}

#time1 {
    position: absolute;
    top: 45%;
    right: 80%;
}

#end_time1 {
    position: absolute;
    top: 45%;
    right: 34%;
}

#time2 {
    position: absolute;
    top: 45%;
    left: 21%;
}
#end_time2 {
    position: absolute;
    top: 45%;
    right: 21%;
}
#end_time3 {
    position: absolute;
    top: 45%;
    right: 8%;
}

#time3 {
    position: absolute;
    top: 45%;
    left: 34%;
}

#activity_location {
    position: absolute;
    top: 75%;
    left: 10%;
}

#activity_request {
    position: absolute;
    top: 105%;
    left: 10%;
}
</style>