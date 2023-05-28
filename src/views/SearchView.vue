<template>
    <NavBar></NavBar>
    <SearchBar></SearchBar>
    <content-field>
        <div>
            <el-row :gutter="10">
                <el-col
                    :span="6"
                    v-for="item in tableData"
                    :key="item.bookId"
                    style="display: table; margin-bottom: 10px"
                >
                    <div
                        style="
                            display: table-cell;
                            border: 1px solid #ccc;
                            padding-bottom: 10px;
                            border-radius: 10px;
                            overflow: hidden;
                        "
                    >
                        <img
                            :src="item.photo"
                            alt=""
                            style="width: 100%; cursor: pointer"
                            @click="
                                $router.push('/book/detail?id=' + item.bookId)
                            "
                        />
                        <div
                            style="
                                color: #666;
                                padding: 5px;
                                font-size: 18px;
                                cursor: pointer;
                            "
                            @click="
                                $router.push('/book/detail?id=' + item.bookId)
                            "
                        >
                            {{ item.name }}
                        </div>
                        <div style="color: #666; padding: 5px; font-size: 14px">
                            {{ item.description }}
                        </div>
                        <div
                            style="
                                color: #666;
                                padding: 5px;
                                font-size: 18px;
                                color: orangered;
                            "
                        >
                            ￥{{ item.price }}
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div style="padding: 50px 0">
            <el-pagination
                style="float: right"
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
    </content-field>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import ContentField from "../components/ContentField.vue";
import request from "../utils/request";
import SearchBar from "@/components/SearchBar.vue";
import { ElMessage } from "element-plus";
import config from "@/config";

export default {
    components: {
        NavBar,
        ContentField,
        SearchBar
    },

    data() {
        return {
            tableData: [],
            total: 0,
            pageNum: 1,
            pageSize: 12,
            name: ""
        };
    },

    created() {
        this.load(); // 获取后台商品数据
    },

    methods: {
        load() {
            if (
                this.$route.params.keyword == null ||
                this.$route.params.keyword == undefined ||
                this.$route.params.keyword.trim() == ""
            ) {
                ElMessage.error("参数错误");
                this.$router.push("/");
            } else {
                request
                    .get(config.api_url + "/books/search", {
                        params: {
                            keyword: this.$route.params.keyword,
                            page: this.pageNum
                        }
                    })
                    .then((res) => {
                        if (res.data.success) {
                            this.tableData = res.data.data.bookList;
                            this.total = res.data.data.total;
                            for (var i = 0; i < this.tableData.length; i++) {
                                this.tableData[i].name =
                                    this.tableData[i].name.substring(0, 15) +
                                    "......";
                            }
                        } else {
                            ElMessage.error(res.data.errorMsg);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
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
.bar {
    background: #a3d0c3;
}
.unique-carousel /deep/ .el-image {
    /* 宽高和最外层 ElCarousel 控件宽高一致 */
    width: 100%;
    height: 200px;
    object-fit: cover;
}
</style>
