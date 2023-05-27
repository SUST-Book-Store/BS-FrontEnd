<template>
    <div>
        <el-container style="height: 700px; border: 1px solid #eee">
            <el-header
                style="font-size: 40px; background-color: rgb(238, 241, 246)"
                >网上书店管理系统后台</el-header
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
                        :model="SearchBooksDto"
                        class="demo-form-inline"
                    >
                        <el-form-item label="书名">
                            <el-input
                                v-model="SearchBooksDto.name"
                                placeholder="书名"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="作者">
                            <el-input
                                v-model="SearchBooksDto.author"
                                placeholder="作者"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select
                                v-model="SearchBooksDto.status"
                                placeholder="请选择状态"
                            >
                                <el-option label="全部" :value="-1"></el-option>
                                <el-option
                                    label="未上架"
                                    :value="0"
                                ></el-option>
                                <el-option
                                    label="已上架"
                                    :value="1"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-input
                                v-model="SearchBooksDto.type"
                                placeholder="作者"
                            ></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="Search"
                                >查询</el-button
                            >
                            <el-button
                                type="danger"
                                @click="deleteSelectedBooks"
                                >删除</el-button
                            >
                            <el-button type="primary" @click="upBook"
                                >上架</el-button
                            >
                            <el-button type="primary" @click="downBook"
                                >下架</el-button
                            >
                            <el-button type="primary" @click="res"
                                >重置</el-button
                            >
                            <el-button
                                type="primary"
                                size="mini"
                                @click="$router.push('/admin/addBook')"
                                >添加</el-button
                            >
                        </el-form-item>
                    </el-form>

                    <!-- 表格 -->
                    <el-table
                        ref="multipleTable"
                        :data="page.bookList"
                        tooltip-effect="dark"
                        border
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column
                            type="selection"
                            width="60"
                        ></el-table-column>
                        <el-table-column
                            prop="name"
                            label="书名"
                            width="180"
                        ></el-table-column>
                        <el-table-column
                            prop="author"
                            label="作者"
                            width="180"
                        ></el-table-column>
                        <el-table-column label="封面" width="200">
                            <template #default="{ row }">
                                <img :src="row.photo" />
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="description"
                            label="描述"
                            width="180"
                        ></el-table-column>
                        <el-table-column
                            prop="price"
                            label="价格"
                            width="180"
                        ></el-table-column>
                        <el-table-column
                            prop="category"
                            label="类型"
                            width="150"
                        ></el-table-column>
                        <el-table-column
                            prop="publisher"
                            label="出版社"
                            width="180"
                        ></el-table-column>

                        <el-table-column
                            prop="detail"
                            label="图片"
                            width=" 250"
                        >
                            <template v-slot="{ row }">
                                <el-carousel :interval="4000" arrow="always">
                                    <el-carousel-item
                                        v-for="(
                                            image, index
                                        ) in row.detail.split(';')"
                                        :key="index"
                                    >
                                        <img
                                            :src="image"
                                            alt="图片"
                                            style="
                                                max-width: 250px;
                                                max-height: 300px;
                                            "
                                        />
                                    </el-carousel-item>
                                </el-carousel>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="stock"
                            label="库存"
                            width="140"
                        ></el-table-column>
                        <el-table-column
                            prop="createTime"
                            label="入库时间"
                            width="180"
                        ></el-table-column>
                        <el-table-column
                            prop="stock"
                            label="库存"
                            width="140"
                        ></el-table-column>
                        <el-table-column prop="available" label="状态">
                            <template #default="{ row }">
                                <span v-if="row.available === 1">已上架</span>
                                <span v-else>未上架</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template #default="{ row }">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    @click="
                                        $router.push(
                                            '/admin/editBook?id=' + row.bookId
                                        )
                                    "
                                    >编辑</el-button
                                >
                            </template>
                        </el-table-column>
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
export default {
    data() {
        return {
            editDialogVisible: false,
            editbook: {},
            tableData: [],
            SearchBooksDto: {
                pageSize: 10,
                pageNum: 1,
                name: "",
                dates: [],
                author: "",
                type: "",
                status: -1
            },
            page: {
                total: 0, //总条数
                pages: 0, //总页数
                bookList: [] //当前页数据集合
            },
            selectedBooks: []
        };
    },
    methods: {
        handleSelectionChange(selection) {
            this.selectedBooks = selection;
        },
        handleSizeChange: function (val) {
            this.SearchBooksDto.pageSize = val;
            this.Search();
        },
        handleCurrentChange: function (val) {
            this.SearchBooksDto.pageNum = val;
            this.Search();
        },
        Search() {
            request
                .post("http://127.0.0.1:3000/admin/lists", this.SearchBooksDto)
                .then((res) => {
                    this.page = res.data.data;
                });
        },
        deleteSelectedBooks() {
            const bookIds = this.selectedBooks.map((book) => book.bookId);
            request
                .post("http://127.0.0.1:3000/admin/books/delete", bookIds)
                .then((res) => {
                    if (res.data.success === true) {
                        console.log("删除成功");
                        this.Search();
                        // 执行其他操作，如刷新图书列表等
                    } else {
                        console.error("删除失败:", res.data.errorMsg);
                        // 处理删除失败的情况，显示错误信息等
                        this.$message.error(res.data.errorMsg);
                    }
                })
                .catch((error) => {
                    // 错误处理
                    console.error("删除失败", error);
                });
        },

        upBook() {
            const bookIds = this.selectedBooks.map((book) => book.bookId);
            request
                .post("http://127.0.0.1:3000/admin/books/up", bookIds)
                .then((res) => {
                    if (res.data.success === true) {
                        console.log("操作成功");
                        this.Search();
                        // 执行其他操作，如刷新图书列表等
                    } else {
                        console.error("操作失败:", res.data.errorMsg);
                        // 处理删除失败的情况，显示错误信息等
                        this.$message.error(res.data.errorMsg);
                    }
                })
                .catch((error) => {
                    // 错误处理
                    console.error("删除失败", error);
                });
        },
        downBook() {
            const bookIds = this.selectedBooks.map((book) => book.bookId);
            request
                .post("http://127.0.0.1:3000/admin/books/down", bookIds)
                .then((res) => {
                    if (res.data.success === true) {
                        console.log("操作成功");
                        this.Search();
                        // 执行其他操作，如刷新图书列表等
                    } else {
                        console.error("操作失败:", res.data.errorMsg);
                        // 处理删除失败的情况，显示错误信息等
                        this.$message.error(res.data.errorMsg);
                    }
                })
                .catch((error) => {
                    // 错误处理
                    console.error("删除失败", error);
                });
        },
        res() {
            (this.SearchBooksDto = {
                pageSize: 10,
                pageNum: 1,
                name: "",
                dates: [],
                author: "",
                type: "",
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
