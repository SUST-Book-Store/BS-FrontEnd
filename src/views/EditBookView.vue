<template>
    <div>
        <el-container style="height: 700px; border: 1px solid #eee">
            <el-header
                style="font-size: 40px; background-color: rgb(238, 241, 246)"
                >网上书店管理系统后台<el-button
                    type="text"
                    style="font-size: large; margin-left: 800px"
                    @click="$router.push('/')"
                    >前往首页 >>
                </el-button></el-header
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
                    <el-form ref="bookForm" :model="book" label-width="120px">
                        <el-form-item label="bookId">
                            <el-input v-model="book.bookId" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="编号">
                            <el-input v-model="book.isbn" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="书名">
                            <el-input v-model="book.name"></el-input>
                        </el-form-item>
                        <el-form-item label="封面">
                            <el-input
                                v-model="book.photo"
                                v-if="false"
                            ></el-input>
                            <el-upload
                                class="avatar-uploader"
                                action="http://localhost:3000/admin/books/img"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                            >
                                <img
                                    v-if="book.photo"
                                    :src="book.photo"
                                    class="avatar"
                                    style="max-width: 200px; max-height: 100px"
                                />
                                <i
                                    v-else
                                    class="el-icon-plus avatar-uploader-icon"
                                ></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="作者">
                            <el-input v-model="book.author"></el-input>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input v-model="book.description"></el-input>
                        </el-form-item>

                        <el-form-item label="价格">
                            <el-input v-model="book.price"></el-input>
                        </el-form-item>

                        <el-form-item label="类型">
                            <el-input v-model="book.category"></el-input>
                        </el-form-item>

                        <el-form-item label="出版社">
                            <el-input v-model="book.publisher"></el-input>
                        </el-form-item>
                        <el-form-item label="书籍详情">
                            <div
                                v-for="(image, index) in book.detail"
                                :key="index"
                                class="image-item"
                            >
                                <div class="image-container">
                                    <img
                                        :src="image"
                                        alt="Product Image"
                                        class="product-image"
                                        style="width: 150px; height: auto"
                                    />
                                    <el-button
                                        size="mini"
                                        @click="removeImage(index)"
                                        >Remove</el-button
                                    >
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item prop="book.detail" label="添加书籍详情">
                            <el-upload
                                action="http://localhost:3000/admin/books/img"
                                :multiple="true"
                                list-type="picture-card"
                                :with-credentials="true"
                                :on-remove="handleRemove"
                                :on-success="handleSuccess"
                                :before-upload="beforeAvatarUpload"
                            >
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="book.detail" alt="" />
                            </el-dialog>
                        </el-form-item>
                        <el-form-item label="库存">
                            <el-input v-model="book.stock"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select
                                v-model="book.available"
                                placeholder="请选择状态"
                            >
                                <el-option
                                    label="已上架"
                                    :value="1"
                                ></el-option>
                                <el-option
                                    label="未上架"
                                    :value="0"
                                ></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="saveBook"
                                >保存</el-button
                            >
                            <el-button type="primary" @click="cancelEdit"
                                >取消</el-button
                            >
                        </el-form-item>
                    </el-form>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import request from "@/utils/request";
import router from "@/router";
import config from "@/config";

export default {
    data() {
        return {
            book: {},
            imageList: [],
            imgs: "",
            dialogVisible: false
        };
    },
    methods: {
        handleUploadSuccess(index, response) {
            this.book.detail.push(response.data);
        },
        handleRemoveImage(index) {
            this.book.detail.splice(index, 1);
        },
        handleAvatarSuccess(res) {
            this.book.photo = res.data;
        },
        removeImage(index) {
            this.book.detail.splice(index, 1);
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 5;
            if (!isLt2M) {
                this.$message.error("上传图片大小不能超过 5MB!");
            }
            return isLt2M;
        },
        handleRemove(file) {
            this.book.detail.pop(file.response);
        },
        handleSuccess(res, file) {
            this.book.detail.push(res.data);
            this.dialogImageUrl = res.data;
        },
        saveBook() {
            request
                .post(config.api_url + "/admin/books/save", this.book)
                .then((res) => {
                    if (res.data.success === true) {
                        this.$message("编辑成功");
                        router.push("/admin/index");
                    } else {
                        console.error("编辑失败:", res.data.errorMsg);
                        this.$message.error(res.data.errorMsg);
                    }
                })
                .catch((error) => {
                    console.error("失败", error);
                    this.$message.error("未知错误");
                });
        },
        cancelEdit() {
            router.push("/admin/index");
        }
    },
    created() {
        const bookId = this.$route.query.id;
        request
            .post(config.api_url + "/admin/getBooks?id=" + bookId)
            .then((res) => {
                this.book = res.data.data;
                this.imgs = res.data.data.detail;
            })
            .catch((error) => {
                console.error("失败", error);
            });
    }
};
</script>

<style scoped>
.edit-book-page {
    padding: 20px;
}
</style>
