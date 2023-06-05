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
                    <!-- 表单 -->
                    <el-form
                        :inline="true"
                        :model="SearchOrderDto"
                        class="demo-form-inline"
                    >
                        <el-form-item label="订单编号">
                            <el-input
                                v-model="SearchOrderDto.no"
                                placeholder="订单编号"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select
                                v-model="SearchOrderDto.status"
                                placeholder="请选择状态"
                            >
                                <el-option label="全部" :value="-1"></el-option>
                                <el-option
                                    label="未付款"
                                    :value="0"
                                ></el-option>
                                <el-option
                                    label="已付款"
                                    :value="1"
                                ></el-option>
                                <el-option
                                    label="已取消"
                                    :value="2"
                                ></el-option>
                                <el-option
                                    label="已处理"
                                    :value="3"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="Search"
                                >查询</el-button
                            >
                            <el-button
                                type="danger"
                                @click="deleteOrdes"
                                >删除</el-button
                            >
                            <el-button type="primary" @click="send"
                                >发货</el-button
                            >
                            <el-button type="primary" @click="res"
                                >重置</el-button
                            >
                        </el-form-item>
                    </el-form>

                    <!-- 表格 -->
                    <el-table
                        ref="multipleTable"
                        :data="page.orderList"
                        tooltip-effect="dark"
                        border
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column
                            type="selection"
                            width="60"
                        ></el-table-column>
                        <el-table-column
                            prop="orderId"
                            label="订单id"
                            width="180"
                        ></el-table-column>
                        <el-table-column
                            prop="no"
                            label="编号"
                            width="180"
                        ></el-table-column>
                        <el-table-column
                            prop="userId"
                            label="用户id"
                            width="180"
                        ></el-table-column>
                        <el-table-column
                            prop="totalPrice"
                            label="价格"
                            width="180"
                        ></el-table-column>
                        <el-table-column prop="status" label="状态" width="180">
                            <template #default="{ row }">
                                <span v-if="row.status === 0">未付款</span>
                                <span v-else-if="row.status === 1">已付款</span>
                                <span v-else-if="row.status === 2">已取消</span>
                                <span v-else>已处理</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="remark"
                            label="备注"
                            width="180"
                        ></el-table-column>

                        <el-table-column
                            prop="time"
                            label="下单时间"
                            width="180"
                        ></el-table-column>
                        <el-table-column
                            prop="payTime"
                            label="付款时间"
                            width="180"
                        ></el-table-column>
                        <el-table-column
                            prop="address"
                            label="下单时间"
                            width="180"
                        ></el-table-column>
                    </el-table>

                    <br />

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
import request from "@/utils/request";
import config from "@/config";

export default {
    data() {
        return {
            editDialogVisible: false,
            editbook: {},
            tableData: [],
            SearchOrderDto: {
                pageSize: 10,
                pageNum: 1,
                no: "",
                status: -1
            },
            page: {
                total: 0, //总条数
                pages: 0, //总页数
                orderList: [] //当前页数据集合
            },
            selectedOrders: []
        };
    },
    methods: {
        handleSelectionChange(selection) {
            this.selectedOrders = selection;
        },
        handleSizeChange: function (val) {
            this.SearchOrderDto.pageSize = val;
            this.Search();
        },
        handleCurrentChange: function (val) {
            this.SearchOrderDto.pageNum = val;
            this.Search();
        },
        Search() {
            request
                .post(config.api_url + "/admin/listOrder", this.SearchOrderDto)
                .then((res) => {
                    this.page = res.data.data;
                });
        },
        send() {
            const orderIds = this.selectedOrders.map((order) => order.orderId);
            request
                .post(config.api_url + "/admin/orders/send", orderIds)
                .then((res) => {
                    if (res.data.success === true) {
                        this.$message({
                           message: '操作成功',
                          type: 'success'
                            });
                        this.Search();
                    } else {
                        console.error("操作失败:", res.data.errorMsg);

                        this.$message.error(res.data.errorMsg);
                    }
                })
                .catch((error) => {
                    console.error("失败", error);
                    // 错误处理
                    this.$message.error("未知错误");
                });
        },
        deleteOrdes()
        {
            const orderIds = this.selectedOrders.map((order) => order.orderId);
            request
                .post(config.api_url + "/admin/orders/delete", orderIds)
                .then((res) => {
                    if (res.data.success === true) {
                        console.log("删除成功");
                        this.$message({
                           message: '操作成功',
                          type: 'success'
                            });
                        this.Search();
                    } else {
                        this.$message.error(res.data.errorMsg);
                    }
                })
                .catch((error) => {
                    // 错误处理
                    console.error("失败", error);
                    this.$message.error("未知错误");
                });
        },
        res() {
            (this.SearchOrderDto = {
                pageSize: 10,
                pageNum: 1,
                no: "",
                status: -1
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
