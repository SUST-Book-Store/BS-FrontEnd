import $ from 'jquery'

export default{
    state: {
        id: "",
        username: "",
        token: "",
        is_login: false,
        pulling_info: true,//是否正在获取信息当中
    },
    getters: {},
    mutations: {
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.is_login = user.is_login;
        },

        updateToken(state, token) {
            state.token = token;
        },

        logout(state) {
            state.id = "";
            state.username = "";
            state.token = "";
            state.is_login = false;
        },

        updatePullingInfo(state, pulling_info) {
            state.pulling_info = pulling_info;
        }
    },
    actions: {
        login(context, data) {
            $.ajax({
                url: "https://app4560.acapp.acwing.com.cn/api/user/account/token/",
                type: "post",
                data: {
                    username: data.username,
                    password: data.password,
                },
                success(resp) {
                    if(resp.error_message === "success"){
                        localStorage.setItem("jwt_token", resp.token);
                        context.commit("updateToken", resp.token);
                        data.success(resp);
                    } else {
                        data.error(resp);
                    }
                },
                error(resp) {
                    data.error(resp);
                }
              })
        },

        logout(context) {
            localStorage.removeItem("jwt_token");
            context.commit("logout");
        },
    },
    modules: {}
}
