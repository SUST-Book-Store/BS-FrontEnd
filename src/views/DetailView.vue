<template>
    <NavBar/>
    <div style="padding: 10px; width: 80%; margin: auto">
        <el-card>
            <div style="display: flex;">
                <div style="width: 300px">
                    <el-image :src="book.photo" :preview-src-list="[book.photo]" style="width: 100%"></el-image>
                </div>
                <div style="flex: 1; padding-left: 50px">
                    <div class="item1"><h3>{{ book.name }}</h3></div>
                    <div class="item1" style="font-size: 14px;">{{ book.description }}</div>
                    <div class="item1" style="color: orangered;">价格 ￥ {{ book.price }}</div>
                    <div class="item1" style="font-size: 14px;">库存  {{ book.stock }} <span style="margin-left: 10px;">本</span></div>
                    <div class="item1" v-if="book.stock < 1">
                        <span style="color:red; font-weight:700;">库存不足，请联系管理员</span> 
                    </div>
                    <div class="item1">
                        <el-input-number v-model="form.amount" :min="1" :max=book.stock label="数量"></el-input-number>
                        <span style="margin-left: 10px;">本</span>
                    </div>
                    <div class="item1" style="margin-top: 20px;">
                        <el-button @click="addOrder" style="background-color: red; color: white"><i class="el-icon-shopping-cart-2"></i> 直接购买</el-button>
                        <el-button style="background-color: red; color: white" v-on:click="addCart">加入购物车</el-button>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
    <div style="padding: 10px; width: 50%; margin: auto">
        <el-card v-if="photos.length > 1" style="width: 100%">
            <tr v-for="one in photos" :key="one" style="width: 100%; height: 100%;">
                <td><img :src="one" style="width: 100%; height: 100%; object-fit: contain;"/></td>
            </tr>
        </el-card>
    </div>
</template>

<script>
import request from "../utils/request";
import NavBar from '@/components/NavBar.vue'
import { ElMessage } from 'element-plus'
export default {
    components: {
        NavBar
    },
    data() {
        return {
            id: this.$route.query.id,
            book: {},
            form: { amount: 1},
            photos: []
        }
    },
    created() {
        this.load()
    },
    methods: {
        load() {
            request.get("http://127.0.0.1:3000/books/detail/" + this.id).then(res => {
                this.book = res.data.data
                console.log(this.book.detail);
                this.photos = this.book.detail.split(";");
                console.log(this.photos);
                console.log(this.book);
            })
        },
        addOrder() {
            let data = {bookId: this.book.bookId, amount: this.form.amount, price: this.book.price}
            console.log(data);
            request.post("http://127.0.0.1:3000/order/detail/add", data).then(res => {
                if (res != null) {
                    if (res.data.success) {
                    ElMessage.success("已加入订单");
                    } else {
                        ElMessage.error(res.data.errorMsg);
                    }
                }
            })
        },
        addCart() {
            this.form.bookId = this.book.bookId //商品id
            request.post("http://127.0.0.1:3000/cart/add", this.form).then(res => {
                if (res != null) {
                    if (res.data.success){
                    ElMessage.success("加入购物车成功");
                } else {
                    ElMessage.error(res.data.errorMsg);
                }
                }
            })
        }
    }

}
</script>

<style scoped>
.item1{
    padding: 10px;
    color: #666
}
</style>
