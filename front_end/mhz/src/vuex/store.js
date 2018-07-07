import Vue from 'vue'
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        author: "noOne",
        isLogin: ""
    },
    mutations: {
        newAuthor(state, msg) {
            state.author = msg;
        },
        isLogin(state, msg) {
            state.isLogin = msg;
            localStorage.setItem("isLogin", msg);
        }
    }
})


export default store