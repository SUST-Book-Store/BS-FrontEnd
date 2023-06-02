<template>
    <NavBar />
    <div style="padding: 10px; width: 80%; margin: auto">
        <el-card>
            <div style="font-size: large">订单详情</div>
            <hr />
            <el-table :data="book" border stripe size="medium">
                <el-table-column prop="bookId" label="商品图片">
                    <template v-slot="scope">
                        <el-image
                            @click="
                                $router.push(
                                    '/book/detail?id=' + scope.row.bookId
                                )
                            "
                            style="width: 100px"
                            :src="scope.row.photo"
                            :preview-src-list="[scope.row.photo]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="书名"
                    width="200px"
                ></el-table-column>
                <el-table-column prop="price" label="价格" width="100px">
                    <template v-slot="scope">
                        <span style="color: orangered"
                            >￥ {{ scope.row.price }}</span
                        >
                    </template>
                </el-table-column>
                <el-table-column
                    prop="amount"
                    label="商品数量"
                    width="100px"
                ></el-table-column>
            </el-table>
            <div style="margin: 10px 0; text-align: right; padding: 10px, 0">
                <div
                    style="
                        padding: 10px 0;
                        margin-right: 50px;
                        font-size: large;
                    "
                >
                    <span style="color: orangered"
                        >￥{{ totalPrice.toFixed(2) }}</span
                    >
                </div>
                <el-button
                    v-if="this.status == 0"
                    @click="payOrder"
                    size="large"
                    style="
                        background-color: orangered;
                        color: white;
                        margin-right: 40px;
                        border-radius: 10%;
                    "
                    >结算</el-button
                >
                <div
                    style="
                        padding: 10px 0;
                        margin-right: 50px;
                        font-size: large;
                    "
                >
                    <span
                        style=" color: red"
                        v-if="this.status == 1"
                        >已付款</span
                    >
                    <span
                        style="; color: red"
                        v-else-if="this.status == 2"
                        >已取消</span
                    >
                    <span
                        style=" color: red"
                        v-else-if="this.status == 3"
                        >已处理</span
                    >
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import request from "../utils/request";
import NavBar from "@/components/NavBar.vue";
import { ElMessage } from "element-plus";
import config from "@/config";

export default {
    components: {
        NavBar
    },
    data() {
        return {
            id: this.$route.query.id,
            status: this.$route.query.status,
            orderInfo: [],
            book: [],
            totalPrice: 0
        };
    },
    created() {
        this.load();
    },
    methods: {
        load() {
            request
                .get(config.api_url + "/order/get/" + this.id)
                .then((res) => {
                    if (res.data.success) {
                        console.log(this.status);
                        var orderInfo = res.data.data;
                        for (var i = 0; i < orderInfo.length; i++) {
                            console.log(orderInfo[i].book.bookId);
                            console.log(orderInfo);
                            this.totalPrice +=
                                orderInfo[i].book.price * orderInfo[i].amount;
                            this.book.push({
                                amount: orderInfo[i].amount,
                                bookId: orderInfo[i].book.bookId,
                                photo: orderInfo[i].book.photo,
                                name: orderInfo[i].book.name,
                                price: orderInfo[i].book.price
                            });
                        }
                        console.log(this.book);
                    } else {
                        ElMessage.error(res.data.errorMsg);
                    }
                });
        },
        payOrder() {
            request
                .get(config.api_url + "/order/pay/" + this.id)
                .then((res) => {
                    if (res.data.success) {
                        //this.orderInfo = res.data.data;
                        ElMessage.success("付款成功");
                        this.status = 1;
                    } else {
                        ElMessage.error(res.data.errorMsg);
                    }
                });
        }
    }
};
</script>

<style scoped></style>
