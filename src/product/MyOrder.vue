<template>
    <div>
      <el-row :gutter="20">
        <el-col :span="24" :xs="24">
        <div style="width: 100px;position:absolute;left:30px;" v-if="checkLogin">
          <el-button type="success" icon="el-icon-arrow-left" plain @click="goLogin">前往登录</el-button>
        </div>
          <div style="width: 100px;position:absolute;left:30px;" v-else>
            <el-button type="success" icon="el-icon-arrow-left" plain @click="back">返回</el-button>
          </div>
          <el-form  ref="queryForm" :inline="true" label-width="68px">
            <el-form-item>
              <h2 style="font-family: 华文楷体">您的订单</h2>
            </el-form-item>
          </el-form>
          <el-table v-loading="loading" :data="orderList">
            <el-table-column label="订单号" align="center" prop="orderId" />
            <el-table-column label="商品号" align="center" prop="goodsId" />
            <el-table-column label="交易金额" align="center" prop="orderPrice" />
            <el-table-column label="下单时间" align="center" prop="orderTime" width="180">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.orderTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="支付状态" align="center" prop="orderStatus" />
            <el-table-column label="超时时间" align="center" prop="overTime" width="180">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.overTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="180"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="show(scope.row)"
                >商品详情</el-button>
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-add"
                  @click="buy(scope.row)"
                >支付</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 添加或修改分类对话框 -->
          <el-dialog :title="title" :visible.sync="open" width="500px">
            <div v-html="context">
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel">返回</el-button>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import {getGoods} from "@/api/Order/goods";
  import {listOrder,payOrder} from "@/api/Order/order";
    export default {
        name: "MyOrder",
      data(){
          return{
            meGo:"http://127.0.0.1:8080/MyOrder/",
            // meGo:"http://127.0.0.1:82/MyOrderImage/",
            orderList:{},
            loading:false,
            open:false,
            title: "",
            context:"",
            checkLogin:false
        }
      },methods:{
        /** 查询商品列表 */
        getList() {
          this.loading = true;
          listOrder().then(response => {
            // if(response.data.error=="null"){
            //   this.msgError("还未登陆");
            //   return false;
            // }
            if(response.data.error=="null"){
              this.msgError("您还未进行登录，请前往登录");
              this.checkLogin=true;
              this.loading = false;
              return false;
            }
              this.orderList = response.data.orderList;
              this.loading = false;
            }
          );
        },
      /** 查询商品操作 */
      show(row) {
        const id = row.goodsId;
        getGoods(id).then(response => {
          this.context = response.data.info;
          this.open = true;
          this.title = "所购商品";
        });
      },
        // 取消按钮
        cancel() {
          this.open = false;
        },
      /** 购买按钮操作 */
      buy(row) {
        const id=row.orderId;
        const next=confirm("是否要支付?","温馨提示");
        if(next==true){
          payOrder(id).then(response=>{
            if(response.data.error!=null){
              this.msgError(response.data.error);
              return false;
            }

            if(response.data.result=="success"){
              this.msgSuccess("支付成功");
              this.getList();
            }
          });
        }
      },
        goLogin(){
          this.$router.push({ path: "/" });
        },back(){
          this.$router.go(-1);
        }
      },created() {
          this.checkLogin=false;
           this.getList();
      }
    }
</script>

<style scoped>

</style>
