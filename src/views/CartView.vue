<template>
    <NavBar/>
    <content-field>
        <div style="font-size: large;">购物车(全部)</div>
        <hr/>
        <div>
            <div>
                <el-input style="width: 400px" placeholder="请输入名称" clearable size="medium" v-model="name"></el-input>
                <el-button class="ml-5" type="primary" size="medium" suffix-icon="el-icon-search" @click="load">搜索</el-button>
            </div>
        </div>
        <div class="card" style="margin-top: 20px;">
            <div class="card-body">
                <el-table :data="tableData" border stripe size="medium" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="bookId" label="商品图片">
                        <template v-slot="scope">
                            <el-image style="width: 100px" :src="scope.row.photo" :preview-src-list="[scope.row.photo]"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="书名"></el-table-column>
                    <el-table-column prop="price" label="价格" width="100px">
                        <template v-slot="scope">
                            <span style="color: orangered">￥ {{ scope.row.price }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="amount" label="商品数量">
                        <template v-slot="scope">
                            <el-input-number v-model="scope.row.amount" :min="1" :max="100" label="数量" @click="changeAmount(scope.row)"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="time" label="添加时间"></el-table-column>
                    <el-table-column label="操作" width="120">
                        <template v-slot="scope" >
                            <el-button type="danger" @click="handleEdit(scope.row)">删除</el-button>
                            <el-popconfirm
                            class="ml-5"
                            confirm-button-text="确定"
                            cancel-button-text="我再想想"
                            icon="el-icon-info"
                            icon-color="red"
                            title="您确定删除吗"
                            @confirm="del(scope.row.cartId)"
                            >
                        </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="padding: 10px 0;">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[2, 5, 10, 20]"
                        :page-size="pageSize"
                        layout="total, prev, pager, next"
                        :total="total">
                    </el-pagination>
                </div>
                <div style="margin: 10px 0; text-align: right;">
                    <div style="padding: 10px 0; margin-right: 50px; font-size: large;"><span style="color: orangered">￥{{ totalPrice.toFixed(2) }}</span></div>
                    <el-button @click="calculate" size="large" style="background-color: orangered; color:white; margin-right: 40px; border-radius: 10%;">下单</el-button>
                </div>
            </div>
        </div>
        <hr/>
    </content-field>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import ContentField from '@/components/ContentField.vue';
import axios from 'axios';
export default {
    components: {
        NavBar,
        ContentField,
    },
    data () {
    return {
      totalPrice: 0.00,
      tableData : [],
      pageNum: 1,
      pageSize: 10,
      name: "",
      total: 0,
      form: {},
      dialogFormVisible: false,
      multipleSelection: []
    }
    },
    created() {
        this.load();
    },
    methods: {
        load() {
            axios.get("http://127.0.0.1:3000/cart/page", {
                params: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    name: this.name,
                }
            }).then(res => {
                this.tableData = res.data.data;
                this.total = res.data.total;
            })
        },
        calculate() {
            if (!this.multipleSelection.length) {
                console.log("请选择结算的书籍");
                return;
            }
            let data = {totalPrice: this.totalPrice, carts: this.multipleSelection};
            console.log(data);
            axios.post("http://127.0.0.1:3000/order/add", data).then(res => {
                if (res.data.success) {
                    console.log("下单成功");
                    this.load();
                } else {
                    console.log(res);
                }
            })
        },
        del(id) {
            axios.post("/cart/" + id).then(res => {
                if (res.code == '200') {
                    console.log("删除成功");
                } else {
                    console.log("删除失败")
                }
            })
        },
        handleEdit(row) {
            this.dialogFormVisible = true;
            this.form = {};

        },
        changeAmount(row) {
            axios.post("http://127.0.0.1:3000/cart/update", JSON.parse(JSON.stringify(row))).then(res => {
                //this.load();
                this.totalPrice = 0;
                this.multipleSelection.forEach(item => {
                    if (item.cartId == row.cartId) {
                        item.amount = row.amount;
                    }
                    this.totalPrice += item.price * item.amount;
                })
            })
        },
        handleSelectionChange(val) {
            console.log(val);
            this.totalPrice = 0.00;
            this.multipleSelection = val
            if (val && val.length) {
                val.forEach(item => {
                    this.totalPrice += item.amount * item.price;
                });
            }
        },
        handleSizeChange(pageSize) {
            console.log(pageSize);
            this.pageSize = pageSize;
            this.load()
        },
        handleCurrentChange(pageNum) {
            console.log(pageNum);
            this.pageNum = pageNum;
            this.load()
        },
    }
}
</script>

<style scoped>

</style>