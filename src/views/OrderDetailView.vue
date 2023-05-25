<template>
    <NavBar/>
    <div style="padding: 10px; width: 80%; margin: auto">
        <el-card>
            <el-table :data="book" border stripe size="medium">
                    <el-table-column prop="bookId" label="商品图片">
                        <template v-slot="scope">
                            <el-image @click="$router.push('/book/detail?id=' + scope.row.bookId)" style="width: 100px" :src="scope.row.photo" :preview-src-list="[scope.row.photo]"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="书名" width="200px"></el-table-column>
                    <el-table-column prop="price" label="价格" width="100px">
                        <template v-slot="scope">
                            <span style="color: orangered">￥ {{ scope.row.price }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="amount" label="商品数量" width="100px"></el-table-column>
            </el-table>
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
            orderInfo: [],
            book: [],
        }
    },
    created() {
        this.load()
    },
    methods: {
        load() {
            request.get("http://127.0.0.1:3000/order/get/" + this.id).then(res => {
                if (res.data.success) {
                    var orderInfo = res.data.data;
                    for(var i = 0; i < orderInfo.length; i ++) {
                        console.log(orderInfo[i].book.bookId);
                        this.book.push({amount: orderInfo[i].amount, 
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
            })
        },
    }
}
</script>

<style scoped>
</style>
