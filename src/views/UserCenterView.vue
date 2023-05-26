<template>
    <NavBar />
    <div
        style="
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 5%;
        "
    >
        <el-card style="width: 40%">
            <h2 style="padding: 30px">个人中心</h2>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="个人信息" name="first">
                    <el-form
                        :model="form"
                        ref="form"
                        :rules="rules"
                        label-width="80px"
                    >
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="form.username"></el-input>
                        </el-form-item>
                        <el-form-item label="电话号码" prop="phone">
                            <el-input v-model="form.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="sex">
                            <div>
                                <el-radio v-model="form.sex" label="男"
                                    >男</el-radio
                                >
                                <el-radio v-model="form.sex" label="女"
                                    >女</el-radio
                                >
                                <el-radio v-model="form.sex" label="保密"
                                    >保密</el-radio
                                >
                            </div>
                        </el-form-item>
                    </el-form>
                    <div style="text-align: center">
                        <el-button type="primary" @click="update"
                            >保存</el-button
                        >
                    </div>
                </el-tab-pane>
                <el-tab-pane label="修改密码" name="second">
                    <el-form
                        :model="passForm"
                        ref="passForm"
                        :rules="passRules"
                        label-width="80px"
                    >
                        <el-form-item prop="origpass" label="原密码">
                            <el-input
                                v-model="passForm.origpass"
                                placeholder="请输入原密码"
                                clearable
                                show-password
                            >
                                <template #prefix>
                                    <el-icon class="el-input__icon">🔒</el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password" label="新密码">
                            <el-input
                                v-model="passForm.password"
                                placeholder="请输入新密码"
                                clearable
                                show-password
                            >
                                <template #prefix>
                                    <el-icon class="el-input__icon">🔒</el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="confirm" label="确认密码">
                            <el-input
                                v-model="passForm.confirm"
                                placeholder="请确认新密码"
                                clearable
                                show-password
                            >
                                <template #prefix>
                                    <el-icon class="el-input__icon">🔒</el-icon>
                                </template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div style="text-align: center">
                        <el-button type="primary" @click="changepwd"
                            >修改密码</el-button
                        >
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

import request from "../utils/request";
import { ElMessage } from "element-plus";
import { mapMutations, mapState, useStore } from "vuex";

export default {
    name: "UserCenter",
    components: {
        NavBar
    },
    data() {
        return {
            activeName: "first",
            form: {},
            passForm: {},
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 13,
                        message: "长度要求为2到13位",
                        trigger: "blur"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur"
                    },
                    {
                        pattern: /^\d+$/,
                        message: "手机号必须为纯数字",
                        trigger: "blur"
                    },
                    {
                        min: 11,
                        max: 11,
                        message: "长度要求为11位",
                        trigger: "blur"
                    }
                ],
                sex: [
                    {
                        required: true,
                        message: "请选择性别",
                        trigger: "blur"
                    }
                ]
            },
            passRules: {
                origpass: [
                    {
                        required: true,
                        message: "请输入原密码",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入新密码",
                        trigger: "blur"
                    }
                ],
                confirm: [
                    {
                        required: true,
                        message: "请确认新密码",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        const store = useStore();
        console.log(store.state.user);
        this.form = {
            user_id: store.state.user.user_id,
            username: store.state.user.username,
            sex: store.state.user.sex,
            phone: store.state.user.phone
        };
    },
    computed: {
        ...mapState(["user"])
    },
    methods: {
        ...mapMutations(["setUserInfo", "updateToken", "logout"]),
        handleClick(tab, event) {
            console.log(tab, event);
        },
        // 示例方法：更新用户信息
        updateUserInfo(userInfo) {
            this.setUserInfo(userInfo);
        },
        update() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    request
                        .post(
                            "http://127.0.0.1:3000/user/changeUserInfo",
                            this.form
                        )
                        .then((res) => {
                            if (res.data.code == 0) {
                                ElMessage.success("修改成功");
                            } else {
                                ElMessage.error(res.data.msg);
                            }
                        });
                }
            });
        },
        changepwd() {
            this.$refs["passForm"].validate((valid) => {
                if (valid) {
                    request
                        .post(
                            "http://127.0.0.1:3000/user/changeUserPassword",
                            this.passForm
                        )
                        .then((res) => {
                            if (
                                this.passForm.password != this.passForm.confirm
                            ) {
                                ElMessage.error("两次密码输入不一致");
                                return;
                            }
                            if (res.data.code == 0) {
                                ElMessage.success("密码修改成功! 请重新登录");
                                this.$store.dispatch("logout");
                                this.$router.push("/user/login");
                            } else {
                                ElMessage.error(res.data.msg);
                            }
                        });
                }
            });
        }
    }
};
</script>

<style scoped>
.box-card {
    width: 60%;
    margin: auto;
    padding: 20px;
}
</style>
