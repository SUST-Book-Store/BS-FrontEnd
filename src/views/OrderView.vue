<template>
  <NavBar/>
  <content-field>
      <div style="font-size: large;">订单(全部)</div>
      <hr/>
      <div class="card" style="margin-top: 20px;">
          <div class="card-body">
              <el-table :data="tableData" border stripe size="medium">
                  <el-table-column prop="no" label="订单编号"></el-table-column>
                  <el-table-column prop="totalPrice" label="价格" width="100px"></el-table-column>
                  <el-table-column prop="status" label="订单状态"></el-table-column>
                  <el-table-column prop="time" label="下单时间"></el-table-column>
                  <el-table-column prop="payTime" label="付款时间"></el-table-column>
                  <el-table-column label="操作" width="120">
                      <template v-slot="scope" >
                          <el-button type="danger" @click="handleEdit(scope.row)">结算</el-button>
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
          </div>
      </div>
      <hr/>
  </content-field>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import ContentField from '@/components/ContentField.vue'
import axios from 'axios'
export default {
    components: {
        ContentField,
        NavBar
    },
    data() {
        return {
          tableData : [],
          pageNum: 1,
          pageSize: 10,
          total: 0,
        }
    },
    created() {
      this.load();
        
    },
    methods: {
      load() {
        axios.get("http://127.0.0.1:3000/order/page",{
            params:{
              pageNum: this.pageNum,
              pageSize: this.pageSize,
            }
        }).then(res => {
          this.tableData = res.data.data;
          this.total = res.data.total;
        })
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