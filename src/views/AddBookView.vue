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
                        <el-form-item label="编号">
                            <el-input v-model="book.isbn"></el-input>
                        </el-form-item>
                        <el-form-item label="书名">
                            <el-input v-model="book.name"></el-input>
                        </el-form-item>
                        <el-form-item label="封面">
                            <el-upload
                                action="http://localhost:3000/admin/books/img"
                                :on-success="handleAvatarSuccess"
                                :before-remove="beforeRemove"
                                list-type="picture"
                            >
                                <el-button slot="trigger">点击上传</el-button>
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

                        <el-form-item label="库存">
                            <el-input v-model="book.stock"></el-input>
                        </el-form-item>
                        <el-form-item prop="book.detail" label="图片集">
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
            book: {
                detail: []
            },
            imageList: [],
            imageUrl: "",
            dialogImageUrl: "",
            dialogVisible: false
        };
    },
    methods: {
        handleAvatarSuccess(res) {
            this.book.photo = res.data;
        },
        beforeRemove(file) {
            this.book.photo = "";
        },
        handleRemove(file) {
            this.book.detail.pop(file.response);
        },
        beforeAvatarUpload(file) {
            console.log(file);
            const isJPG = true;
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error("上传图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        handleSuccess(res, file) {
            //图片上传成功
            this.book.detail.push(res.data);
            this.dialogImageUrl = res.data;
        },

        saveBook() {
            request
                .post(config.api_url + "/admin/books/savebook", this.book)
                .then((res) => {
                    if (res.data.success === true) {
                        this.$message("编辑成功");
                        router.push("/admin/index");
                        // 执行其他操作，如刷新图书列表等
                    } else {
                        console.error("编辑失败:", res.data.errorMsg);
                        // 处理删除失败的情况，显示错误信息等
                        this.$message.error(res.data.errorMsg);
                    }
                })
                .catch((error) => {
                    // 错误处理
                    console.error("删除失败", error);
                });
        },
        cancelEdit() {
            console.log("取消编辑");
        }
    }
};
</script>
