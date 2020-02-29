<template>
    <div>
      <el-row :gutter="20">
        <!--商品数据-->
        <el-col :span="24" :xs="24">
          <div style="width: 100px;position:absolute;left:30px;" v-if="checkLogin">
            <el-button type="success" icon="el-icon-arrow-left" plain @click="goLogin">前往登录</el-button>
          </div>
          <div style="width: 100px;position:absolute;right:30px;" v-else>
            <el-button type="success" plain @click="goOrder">我的订单<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </div>
          <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
            <el-form-item label="商品名称" prop="name">
              <el-input
                v-model="queryParams.goodsName"
                placeholder="请输入商品名称"
                clearable
                size="small"
                style="width: 240px"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            </el-form-item>
          </el-form>

          <el-table v-loading="loading" :data="goodsList">
            <el-table-column label="商品主图" align="center" prop="picUrl" >
              　　<template slot-scope="scope">
              　　　　<img v-if="scope.row.picUrl" :src="meGo+scope.row.picUrl" width="50px" height="50px">
              <img v-else src="../../static/image/no.jpg" width="50px" height="50px">
              　　</template>
            </el-table-column>
            <el-table-column label="商品编号" align="center" prop="goodsId" />
            <el-table-column label="商品名称" align="center" prop="goodsName" />
            <el-table-column label="商品库存" align="center" prop="goodsCount" />
            <el-table-column label="商品价格" align="center" prop="goodsPrice" />
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
                >购买</el-button>
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
      <div class="block">
        <el-pagination
          background
          :hide-on-single-page="true"
          :page-sizes="[2,3, 5, 10]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :page-size.sync="queryParams.pageSize"
          :current-page.sync="queryParams.pageNum"
          @current-change="getList"
          @size-change="getList"
        />
      </div>
    </div>
</template>

<script>
  import {listGoods,getGoods} from "@/api/Order/goods";
  import {addOrder} from "@/api/Order/order";
    export default {
        name: "hello",
      data(){
          return{
            queryParams: {
              goodsName: undefined,
              pageSize:2,
              pageNum:1
            },
            meGo:"http://127.0.0.1:8080/MyOrder/",
            // meGo:"http://127.0.0.1:82/MyOrderImage/",
            goodsList:{},
            loading:false,
            open:false,
            title: "",
            context:"",
            checkLogin:false,
            total:1
        }
      },methods:{
        /** 查询商品列表 */
        getList() {
          this.loading = true;
          listGoods(this.queryParams).then(response => {
            // if(response.data.error=="null"){
            //   this.msgError("还未登陆");
            //   return false;
            // }
              this.goodsList = response.data.goodsList;
              this.total=response.data.total;
              this.loading = false;
            }
          );
        },
        handleQuery(){
          this.getList();
        },
      /** 查询商品操作 */
      show(row) {
        const id = row.goodsId;
        getGoods(id).then(response => {
          this.context = response.data.info;
          this.open = true;
          this.title = "商品展示";
        });
      },
        // 取消按钮
        cancel() {
          this.open = false;
        },
      /** 购买按钮操作 */
      buy(row) {
        const id= row.goodsId;
        const next=confirm("是否要购买"+row.goodsName+"?","温馨提示");
        if(next==true){
          addOrder(id).then(response=>{
            if(response.data.error=="null"){
              this.msgError("您还未进行登录，无法购买");
              this.checkLogin=true;
              return false;
            }

            if(response.data.error!=null){
              this.msgError(response.data.error);
              return  false;
            }

            if(response.data.result=="success"){
              this.msgSuccess("下单成功！请在45分钟内进行支付操作");
              this.getList();
            }
          });
        }
      },
        goLogin(){
          this.$router.push({ path: "/" });
        },
        goOrder(){
          this.$router.push({ path: "/MyOrder" });
        }
      },created() {
          this.checkLogin=false;
           this.getList();
      }
    }
</script>

<style scoped>

</style>
