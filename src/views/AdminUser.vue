<template>
    <div>
        <el-container style="height: 700px; border: 1px solid #eee">
            <el-header
                style="font-size: 40px; background-color: rgb(238, 241, 246)"
                >网上书店管理系统后台
                <el-button
                    type="text"
                    style="font-size: large; margin-left: 800px"
                    @click="$router.push('/')"
                    >前往首页 >>
                </el-button></el-header
            >
            <el-container>
                <el-aside width="230px" style="border: 1px solid #eee">
                    <el-menu :default-openeds="['1', '3']">
                        <el-submenu index="1">
                            <template #title
                                ><i class="el-icon-message"></i
                                >系统信息管理</template
                            >
                            <el-menu-item index="1-1">
                                <router-link to="/admin/index"
                                    >库存管理</router-link
                                >
                            </el-menu-item>
                            <el-menu-item index="1-2">
                                <router-link to="/admin/manageUser"
                                    >用户管理</router-link
                                >
                            </el-menu-item>
                            <el-menu-item index="1-3">
                                <router-link to="/admin/manageOrder"
                                    >订单管理</router-link
                                >
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>

                <el-main>
                    <el-form
                        :inline="true"
                        :model="SearchUserDto"
                        class="demo-form-inline"
                    >
                        <el-form-item label="用户名">
                            <el-input
                                v-model="SearchUserDto.username"
                                placeholder="用户名"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="sex">
                            <el-select
                                v-model="SearchUserDto.sex"
                                placeholder="请选择"
                            >
                                <el-option label="男" value="男"></el-option>
                                <el-option label="女" value="女"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select
                                v-model="SearchUserDto.role"
                                placeholder="请选择状态"
                            >
                                <el-option label="全部" :value="-1"></el-option>
                                <el-option
                                    label="普通用户"
                                    :value="0"
                                ></el-option>
                                <el-option
                                    label="管理员"
                                    :value="1"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="Search"
                                >查询</el-button
                            >
                            <el-button type="danger" @click="deleteSelectedUser"
                                >删除</el-button
                            >
                            <el-button type="primary" @click="upUser"
                                >提高权限</el-button
                            >
                            <el-button type="primary" @click="downUser"
                                >降低权限</el-button
                            >
                            <el-button type="primary" @click="res"
                                >重置</el-button
                            >
                        </el-form-item>
                    </el-form>
                    <el-table
                        ref="multipleTable"
                        :data="page.userList"
                        tooltip-effect="dark"
                        border
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column
                            type="selection"
                            width="60"
                        ></el-table-column>
                        <el-table-column
                            prop="username"
                            label="用户名"
                            width="180"
                        ></el-table-column>
                        <el-table-column
                            prop="sex"
                            label="性别"
                            width="180"
                        ></el-table-column>
                        <el-table-column
                            prop="phone"
                            label="手机号"
                            width="180"
                        ></el-table-column>
                        <el-table-column prop="role" label="状态" width="180">
                            <template #default="{ row }">
                                <span v-if="row.role === 1">管理员</span>
                                <span v-else-if="row.role === 0">普通用户</span>
                                <span v-else-if="row.role === 2">超级管理员</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页条 -->
                    <!-- Pagination 分页 -->
                    <el-pagination
                        background
                        layout="total,sizes, prev, pager, next, jumper"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :total="page.total"
                    ></el-pagination>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import request from "../utils/request";
import config from "@/config";

export default {
    data() {
        return {
            SearchUserDto: {
                pageSize: 10,
                pageNum: 1,
                username: "",
                sex: "",
                role: -1
            },
            page: {
                total: 0, //总条数
                pages: 0, //总页数
                userList: [] //当前页数据集合
            },
            selectedUser: []
        };
    },
    methods: {
        handleSelectionChange(selection) {
            this.selectedUser = selection;
        },
        handleSizeChange: function (val) {
            this.SearchUserDto.pageSize = val;
            this.Search();
        },
        handleCurrentChange: function (val) {
            this.SearchUserDto.pageNum = val;
            this.Search();
        },
        Search() {
            request
                .post(config.api_url + "/admin/userList", this.SearchUserDto)
                .then((res) => {
                    this.page = res.data.data;
                });
        },
        deleteSelectedUser() {
            const userIds = this.selectedUser.map((user) => user.userId);
            request
                .post(config.api_url + "/admin/user/delete", userIds)
                .then((res) => {
                    if (res.data.success === true) {
                        console.log("删除成功");
                        this.$message.success("删除成功")
                        this.Search();
                       
                    } else {
                        console.error("删除失败:", res.data.errorMsg);
                        
                        this.$message.error(res.data.errorMsg);
                    }
                })
                .catch((error) => {
                    console.error("失败", error);
                    this.$message.error("未知错误");
                });
        },
        upUser() {
            const userIds = this.selectedUser.map((user) => user.userId);
            request
                .post(config.api_url + "/admin/user/up", userIds)
                .then((res) => {
                    if (res.data.success === true) {
                        console.log("操作成功");
                        this.Search();
                        
                    } else {
                        console.error("操作失败:", res.data.errorMsg);
                        
                        this.$message.error(res.data.errorMsg);
                    }
                })
                .catch((error) => {
                    console.error("失败", error);
                    this.$message.error("未知错误");
                });
        },
        downUser() {
            const userIds = this.selectedUser.map((user) => user.userId);
            request
                .post(config.api_url + "/admin/user/down", userIds)
                .then((res) => {
                    if (res.data.success === true) {
                        console.log("操作成功");
                        this.Search();
                    } else {
                        console.error("操作失败:", res.data.errorMsg);
                        this.$message.error(res.data.errorMsg);
                    }
                })
                .catch((error) => {
                    console.error("失败", error);
                    this.$message.error("未知错误");
                });
        },
        res() {
            (this.SearchUserDto = {
                pageSize: 10,
                pageNum: 1,
                username: "",
                sex: "",
                role: -1
            }),
                this.Search();
        }
    },
    created() {
        this.Search(); // 获取后台商品数据
    }
};
</script>

<style></style>
