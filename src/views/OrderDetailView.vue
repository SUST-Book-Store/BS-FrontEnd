<template>
    <NavBar/>
    <div style="padding: 10px; width: 80%; margin: auto">
        <el-card>
            <el-table :data="orderInfo.book" border stripe size="medium">
                    <el-table-column prop="bookId" label="商品图片">
                        <template v-slot="scope">
                            <el-image style="width: 100px" :src="scope.row.photo" :preview-src-list="[scope.row.book.photo]"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="书名"></el-table-column>
                    <el-table-column prop="price" label="价格" width="100px">
                        <template v-slot="scope">
                            <span style="color: orangered">￥ {{ scope.row.book.price }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="amount" label="商品数量">
                        
                    </el-table-column>
                    <el-table-column prop="time" label="添加时间"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios'
import NavBar from '@/components/NavBar.vue'
import { ElMessage } from 'element-plus'
export default {
    components: {
        NavBar
    },
    data() {
        return {
            id: this.$route.query.id,
            orderInfo: {},
        }
    },
    created() {
        this.load()
    },
    methods: {
        load() {
            axios.get("http://127.0.0.1:3000/order/get/" + this.id).then(res => {
                if (res.data.success) {
                    this.orderInfo = res.data.data;
                    console.log(this.orderInfo);
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
