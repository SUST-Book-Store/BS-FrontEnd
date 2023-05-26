import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    state: {
        user: {
            user_id: -1,
            username: "请先登录",
            token: "",
            phone: "",
            sex: "",
            is_admin: false,
            is_login: false
        }
        
    },
    getters: {},
    mutations: {
        setUserInfo (state, userInfo) {
            state.user.user_id = userInfo.user_id,
            state.user.username = userInfo.username,
            state.user.phone = userInfo.phone,
            state.user.sex = userInfo.sex,
            state.user.token = userInfo.token,
            state.user.is_admin = userInfo.is_admin,
            state.user.is_login = userInfo.is_login
        },
        updateToken(state, token) {
            state.user.token = token;
        },

        logout(state) {
            state.user.id = -1;
            state.user.username = "请先登录";
            state.user.phone = "";
            state.user.sex = "";
            state.user.token = "";
            state.user.is_login = false
        },
    },
    actions: {
        logout(context) {
            localStorage.removeItem("token");
            context.commit("logout");
        },
    },
    modules: {},
    plugins: [createPersistedState()]
})