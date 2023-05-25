<template>
    <NavBar></NavBar>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <img src="../assets/images/logo.png" style="margin-left: 150px; margin-top: 20px;" width="100px">
            </div>
            <div class="col-9">
                    <input type="text" class="input" placeholder="请输入书名或者作者名">
                    <input type="button" value="搜索" class="button">
            </div>
        </div>
    </div>
    <content-field>
        <div class="container" style="margin-bottom: 50px;">
            <div style="width: 50%" class="unique-carousel">
                <el-carousel height="200px" :interval="5000" style="cursor: pointer;">
                    <el-carousel-item v-for="item in imgs" :key="item">
                        <ElImage :src="require('../assets/images/' + item + '.jpg')" alt="picture" fit="cover"></ElImage>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <hr>
        <div>
            <el-row :gutter="10">
                <el-col :span="6" v-for="item in tableData" :key="item.bookId" style="display: table; margin-bottom: 10px">
                    <div style="display: table-cell; border: 1px solid #ccc; padding-bottom: 10px; border-radius: 10px; overflow: hidden">
                        <img :src="item.photo" alt="" style="width: 100%; cursor: pointer;" @click="$router.push('/book/detail?id=' + item.bookId)">
                        <div style="color: #666; padding: 5px; font-size: 18px; cursor: pointer;" @click="$router.push('/book/detail?id=' + item.bookId)">{{ item.name }}</div>
                        <div style="color: #666; padding: 5px; font-size: 14px;">{{ item.description }}</div>
                        <div style="color: #666; padding: 5px; font-size: 18px; color: orangered">￥{{ item.price }}</div>
                    </div>

                </el-col>
            </el-row>
        </div>
        <div style="padding: 50px 0;">
            <el-pagination
                style=" float: right;"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[2, 5, 10, 20]"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
        
    </content-field>
    
</template>


<script>
import NavBar from '@/components/NavBar.vue'
import ContentField from '../components/ContentField.vue'
import axios from 'axios';
    
export default {
    components: {
        NavBar,
        ContentField,
    },

    data() {
      return {
        imgs: [
            'carousel-1',
            'carousel-2',
        ],
        tableData: [],
        total: 0,
        pageNum: 1,
        pageSize: 12,
        name: "",
      }
    },

    created() {
        this.load() // 获取后台商品数据
    },

    methods: {
        load() {
            axios.get("http://127.0.0.1:3000/books/page", {
                params: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    name: this.name,
                }
            }).then(res => {
                console.log(res);
                this.tableData = res.data.data.records
                this.total = res.data.data.total
            }).catch(error => {
                console.error(error);
            });
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

.bar {background: #A3D0C3;}
.input {
    margin: auto;
    border: 2px solid #7BA7AB;
    border-radius: 10px, 0, 0, 10px;
    background: #F9F0DA;
    color: #9E9C9C;
    height: 50px;
    width: 500px;
    font-size: 20px;
    margin-top: 40px;
    margin-left: 100px;
}
        .button {
           background: #7BA7AB;
           border-radius: 0 25px 25px 0;
           margin-top: 40px;
           height: 50px;
           font-size: 20px;
        }
        .button:before {
            content: "\f002";
            font-family: FontAwesome;
            font-size: 16px;
            color: #F9F0DA;
        }
        .unique-carousel /deep/ .el-image {
            /* 宽高和最外层 ElCarousel 控件宽高一致 */
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
</style>