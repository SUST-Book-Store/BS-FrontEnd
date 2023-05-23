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
                    <div class="item1">
                        <el-input-number v-model="form.amount" :min="1" :max="100" label="数量"></el-input-number>
                        <span style="margin-left: 10px;">本</span>
                    </div>
                    <div class="item1" style="margin-top: 20px;">
                        <el-button style="background-color: red; color: white"><i class="el-icon-shopping-cart-2"></i> 直接购买</el-button>
                        <el-button style="background-color: red; color: white" v-on:click="addCart">加入购物车</el-button>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios'
import NavBar from '@/components/NavBar.vue'
export default {
    components: {
        NavBar
    },
    data() {
        return {
            id: this.$route.query.id,
            book: {},
            form: { amount: 1},
        }
    },
    created() {
        this.load()
    },
    methods: {
        load() {
            axios.get("http://127.0.0.1:3000/books/detail/" + this.id).then(res => {
                this.book = res.data.data
                console.log(this.book);
            })
        },
        addCart() {
            this.form.bookId = this.book.bookId //商品id
            axios.post("http://127.0.0.1:3000/cart/add", this.form).then(res => {
                if (res.code == "200"){
                    console.log(res);
                } else {
                    
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
