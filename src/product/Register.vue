<template>
  <div class="hello">
    <el-form v-model="registerForm" ref="loginForm">
      <h3 class="title">在线购物系统——注册</h3>
      <el-form-item prop="userName">
        <el-input label="账号" v-model="registerForm.userName" type="text" auto-complete="off" placeholder="账号" style="width: 300px">
        </el-input>
      </el-form-item>
      <el-form-item prop="userPwd">
        <el-input
          v-model="registerForm.userPwd"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleRegister"
          style="width: 300px"
        >
        </el-input>
      </el-form-item>
      <el-button type="primary" @click="handleRegister">注册</el-button>
      <el-button @click="back">返回</el-button>
      <!--      <router-link to="/hello">hello界面</router-link>-->
    </el-form>
  </div>
</template>

<script>
  import { Register } from "@/api/Order/login";
    export default {
        name: "Register",
      data () {
        return{
          registerForm: {
            userName: undefined,
            userPwd: undefined
          }
        }
      },methods:{
        // handleLogin() {
        //   // this.$router.push({ path: "/hello" });页面跳转
        // },
        /** 提交按钮 */
        handleRegister: function() {
          if(this.registerForm.userName==undefined||this.registerForm.userName==""){
            this.msgError("用户名不能为空");
            return false;
          }
          if(this.registerForm.userPwd==undefined||this.registerForm.userPwd==""){
            this.msgError("密码不能为空");
            return false;
          }
          Register(this.registerForm).then(response => {
              if(response.data.success=="true"){
                this.msgSuccess("注册成功,请登录");
                this.$router.push({ path: "/" });
              }else{
                this.msgError(response.data.error);
              }
            }
          );
        },back(){
          this.$router.go(-1);
        }
      }
    }
</script>

<style scoped>

</style>
