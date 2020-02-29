<template>
  <div class="hello">
    <el-form v-model="loginForm" ref="loginForm">
      <h3 class="title">在线购物系统</h3>
      <el-form-item prop="userName">
        <el-input label="账号" v-model="loginForm.userName" type="text" auto-complete="off" placeholder="账号" style="width: 300px">
        </el-input>
      </el-form-item>
      <el-form-item prop="userPwd">
        <el-input
          v-model="loginForm.userPwd"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
          style="width: 300px"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="userCode">
        <el-input label="账号" v-model="loginForm.userCode" type="text" auto-complete="off" placeholder="验证码" style="width: 188px">
        </el-input>
        <el-image @click="imagesF" :src="url"/>
      </el-form-item>
      <el-button type="primary" @click="handleLogin">登录</el-button>
      <el-button @click="register">注册</el-button>
        <el-button type="info" icon="el-icon-star-off" plain @click="goMain">先去逛逛</el-button>
<!--      <router-link to="/hello">hello界面</router-link>-->
    </el-form>
  </div>
</template>

<script>
  import { Login } from "@/api/Order/login";
export default {
  name: 'HelloWorld',
  data () {
    return{
      loginForm: {
        userName: undefined,
        userPwd: undefined,
        userCode:undefined
      },
      url:"http://localhost:8082/order/img"
    }
  },methods:{
    // handleLogin() {
    //   // this.$router.push({ path: "/hello" });页面跳转
    // },
    /** 提交按钮 */
    handleLogin: function() {
     if(this.loginForm.userName==undefined||this.loginForm.userName==""){
        this.msgError("用户名不能为空");
        return false;
      }
      if(this.loginForm.userPwd==undefined||this.loginForm.userPwd==""){
        this.msgError("密码不能为空");
        return false;
      }
      if(this.loginForm.userCode==undefined||this.loginForm.userCode==""){
        this.msgError("验证码不能为空");
        this.imagesF();
        return false;
      }
      Login(this.loginForm).then(response => {
        if(response.data.result=="true"){
          this.$router.push({ path: "/Main" });
        }else{
          this.msgError(response.data.error);
          this.imagesF();
        }
        }
      );
    },register(){
      this.$router.push({path:"/Register"});
    },
    goMain(){
      this.$router.push({ path: "/Main" });
    },imagesF(){
      this.url='http://localhost:8082/order/img?d='+new Date()*1;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
