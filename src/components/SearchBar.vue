<template>
    <div class="container">
        <el-row>
            <el-col style="display: flex; flex-direction: row">
                <el-input
                    type="text"
                    :prefix-icon="Search"
                    v-model="input"
                    placeholder="请输入书名或者作者名"
                    @keydown.enter="search"
                    style="cursor: pointer; margin-right: 5px; font-size: 125%"
                    clearable
                ></el-input
                ><el-button
                    type="primary"
                    style="width: 150px; height: 50px; font-size: 125%"
                    @click="search"
                    >搜索</el-button
                >
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { Search } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

export default {
    setup() {
        return { Search };
    },
    data() {
        return { input: "" };
    },
    methods: {
        search() {
            if (this.input === undefined || this.input.trim() === "") {
                ElMessage.warning("请输入搜索内容");
            } else {
                this.$router.push({
                    name: "search",
                    params: {
                        keyword: this.input.trim(),
                        page: 1
                    }
                });
            }
        }
    }
};
</script>
