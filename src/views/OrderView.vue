<template>
    <NavBar />
    <content-field>
        <div style="font-size: large">订单(全部)</div>
        <hr />
        <div>
            <div>
                <el-input
                    style="width: 400px"
                    placeholder="请输入订单编号进行搜索"
                    clearable
                    size="medium"
                    v-model="no"
                ></el-input>
                <el-button
                    class="ml-5"
                    type="primary"
                    size="medium"
                    suffix-icon="el-icon-search"
                    @click="getByNo"
                    >搜索</el-button
                >
            </div>
        </div>
        <div class="card" style="margin-top: 20px">
            <div class="card-body">
                <el-table :data="tableData">
                    <el-table-column
                        prop="no"
                        label="订单编号"
                    ></el-table-column>
                    <el-table-column
                        prop="totalPrice"
                        label="价格"
                        width="100px"
                    >
                        <template v-slot="scope">
                            <span style="color: orangered"
                                >￥ {{ scope.row.totalPrice }}</span
                            >
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="订单状态"
                        width="100px"
                    >
                        <template v-slot="scope">
                            <span v-if="scope.row.status === 0">未付款</span>
                            <span v-else-if="scope.row.status === 1"
                                >已付款</span
                            >
                            <span v-else-if="scope.row.status === 2"
                                >已取消</span
                            >
                            <span v-else-if="scope.row.status === 3"
                                >已处理</span
                            >
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="收货地址"
                    ></el-table-column>
                    <el-table-column
                        prop="time"
                        label="下单时间"
                    ></el-table-column>
                    <el-table-column
                        prop="payTime"
                        label="付款时间"
                    ></el-table-column>
                    <el-table-column label="操作" width="200px">
                        <template v-slot="scope">
                            <span
                                class="item"
                                @click="
                                    $router.push(
                                        '/order/detail?id=' +
                                            scope.row.orderId +
                                            '&status=' +
                                            scope.row.status
                                    )
                                "
                                >查看</span
                            >
                            <span
                                class="item"
                                @click="showCancelDialog(scope.row.orderId)"
                                v-if="scope.row.status === 0"
                                >取消</span
                            >
                            <span
                                class="item"
                                v-else-if="scope.row.status === 2"
                                >已取消</span
                            >
                            <el-popover
                                :visible="visible"
                                placement="top"
                                :width="280"
                                style=""
                                v-if="scope.row.status === 0"
                            >
                                <p>
                                    <img
                                        :src="
                                            require('../assets/images/checkout.jpg')
                                        "
                                        style="width: 100%"
                                    />
                                </p>
                                <div
                                    style="
                                        text-align: right;
                                        margin: 0;
                                        display: flex;
                                        flex-direction: column;
                                    "
                                >
                                    <el-button
                                        size="small"
                                        type="primary"
                                        @click="payOrder(scope.row.orderId)"
                                        >我已完成付款</el-button
                                    >
                                </div>
                                <template #reference>
                                    <span class="item">付款</span>
                                </template>
                            </el-popover>
                            <span class="item" v-if="scope.row.status === 1"
                                >已付款</span
                            >
                            <span class="item" v-if="scope.row.status === 3"
                                >已处理</span
                            >
                            <span
                                class="item"
                                @click="deleteById(scope.row.orderId)"
                                >删除</span
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <div style="padding: 10px 0">
                    <el-pagination
                        v-if="total > pageSize"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[2, 5, 10, 20]"
                        :page-size="pageSize"
                        layout="total, prev, pager, next"
                        :total="total"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
        <hr />
    </content-field>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import ContentField from "@/components/ContentField.vue";
import request from "../utils/request";
import { ElMessage } from "element-plus";
import config from "@/config";

export default {
    components: {
        ContentField,
        NavBar
    },
    data() {
        return {
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            no: "",
            total: 0,
            orderInfo: [],
            dialogVisible: false
        };
    },
    created() {
        this.load();
    },
    methods: {
        load() {
            request
                .get(config.api_url + "/order/page", {
                    params: {
                        pageNum: this.pageNum,
                        pageSize: this.pageSize
                    }
                })
                .then((res) => {
                    if (res != null) {
                        this.tableData = res.data.data;
                        this.total = res.data.total;
                        console.log(this.tableData);
                    }
                });
        },
        deleteById(id) {
            request.post(config.api_url + "/order/delete/" + id).then((res) => {
                if (res != null) {
                    if (res.data.success) {
                        ElMessage.success("删除成功!");
                        this.load();
                    } else {
                        ElMessage.error(res.data.errorMsg);
                    }
                }
            });
        },
        getByNo() {
            if (this.no.trim().length != 0) {
                request
                    .get(config.api_url + "/order/get/no", {
                        params: {
                            no: this.no
                        }
                    })
                    .then((res) => {
                        if (res != null) {
                            if (res.data.success) {
                                //this.tableData = res.data.data;
                                this.tableData = [];
                                this.total = 1;
                                this.tableData.push(res.data.data);
                                console.log(this.tableData);
                            }
                        }
                    });
            }
        },
        // 显示删除提示框
        showCancelDialog(orderId) {
            this.$confirm("确定取消该订单吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    // 点击确定按钮后调用删除函数
                    this.cancelOrder(orderId);
                })
                .catch(() => {
                    // 取消订单操作
                });
        },
        // 取消订单函数
        cancelOrder(orderId) {
            // 取消订单
            request
                .get(config.api_url + "/order/cancel/" + orderId)
                .then((res) => {
                    if (res.data.success) {
                        ElMessage.success("该订单已取消");
                        this.load();
                    } else {
                        ElMessage.error(res.data.errorMsg);
                    }
                });
        },
        lookOrder(orderId) {
            request
                .get(config.api_url + "/order/get/" + orderId)
                .then((res) => {
                    if (res.data.success) {
                        this.orderInfo = res.data.data;
                        console.log(this.orderInfo);
                        this.dialogVisible = true; // 显示弹出框
                    } else {
                        ElMessage.error(res.data.errorMsg);
                    }
                });
        },
        payOrder(orderId) {
            request
                .get(config.api_url + "/order/pay/" + orderId)
                .then((res) => {
                    if (res.data.success) {
                        this.orderInfo = res.data.data;
                        ElMessage.success("付款成功");
                        this.$router.push(
                            "/order/detail?id=" + orderId + "&status=" + 1
                        );
                    } else {
                        ElMessage.error(res.data.errorMsg);
                    }
                });
        },
        handleSizeChange(pageSize) {
            console.log(pageSize);
            this.pageSize = pageSize;
            this.load();
        },
        handleCurrentChange(pageNum) {
            console.log(pageNum);
            this.pageNum = pageNum;
            this.load();
        }
    }
};
</script>

<style scoped>
.item {
    padding: 5px;
    cursor: pointer;
}
</style>
