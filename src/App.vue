<template>
  <div>
    <div @click="clickCreatRoomBtn">创建</div>
    <div @click="clickJoinRoomBtn">加入</div>
    <div @click="clickLeaveRoomBtn">离开</div>

    <div v-if="signin" class="signin">
      <input type="text" v-model="userName" />
      <input type="password" v-model="password" />
      <div @click="clickSigninBtn">登录</div>
    </div>
    <div v-if="register" class="register">
      <input type="text" v-model="userName" />
      <input type="password" v-model="password" />
      <input type="password" v-model="registerPassword" />
      <div @click="clickRegisterBtn">注册</div>
    </div>
  </div>
</template>

<script>
import { getParam } from "./utils/utils";
//TODO 每次登陆需要更新session userNo;
export default {
  name: "App",
  data() {
    return {
      socket: null,
      signin: false,
      register: false,
      userName: "",
      password: "",
      registerPassword: "",
      roomInfo: null
    };
  },
  components: {},
  methods: {
    clickCreatRoomBtn: function() {
      console.log("请求创建房间");
      this.socket.emit("creatRoom", {
        userNo: this.$store.state.userId,
        userName: this.userName
      });
    },
    clickJoinRoomBtn: function() {
      console.log("请求加入房间");
      this.socket.emit("joinRoom", {
        userNo: this.$store.state.userId,
        userName: this.userName,
        roomNo: this.roomInfo
      });
      // console.log("instance=>", instance);
    },
    clickLeaveRoomBtn: function() {
      console.log("请求离开房间");
      this.socket.emit("leaveRoom", {
        userNo: this.$store.state.userId,
        userName: this.userName,
        roomNo: this.roomInfo
      });
    },
    clickSigninBtn: function() {
      console.log("点击了登录");
      this.$store.dispatch("Signin", {
        userName: this.userName,
        password: this.password,
        success: this.signinSuccess
      });
    },
    signinSuccess: function() {
      //socket登录
      this.socket.emit("signin", { userNo: this.$store.state.userId });
    },
    clickRegisterBtn: function() {
      if (this.password != this.registerPassword) {
        console.log("密码不一致");
      }
      console.log("点击了注册");
      this.$store.dispatch("Register", {
        userName: this.userName,
        password: this.password
      });
    }
  },
  mounted() {
    // Notification.requestPermission(function(status) {
    //   console.log(status); // 仅当值为 "granted" 时显示通知
    //   var n = new Notification("title", { body: "notification body" }); // 显示通知
    // });
    //注册进入房间通知
    this.socket.on("joinRoom", msg => {
      console.log(`${msg.msg}用户${msg.id}加入房间`);
    });
    //注册房间信息通知
    this.socket.on("roomInfo", msg => {
      console.log(`房间信息`, msg);
      for (const key in msg) {
        this.roomInfo = key;
        break;
      }
      console.log("this.roomInfo=>", this.roomInfo);
    });
  },
  created() {
    let userInfo = localStorage.getItem("userInfo");
    this.signin = userInfo;
    this.register = !userInfo;
    if (userInfo) {
      this.userName = JSON.parse(userInfo).userName;
      this.password = JSON.parse(userInfo).password;
    }
    this.socket = require("socket.io-client")("http://127.0.0.1:7001");

    // this.socket.on("connect", () => {
    //   console.log("connect!");
    //   this.socket.emit("default", { userNo: getParam("userNo") });
    // });

    // this.socket.on("res", msg => {
    //   console.log("res from server: %s!", msg);
    // });

    // this.socket.on("disconnect", () => {
    //   console.log("网络连接断开,请重新登录!");
    // });
  }
};
</script>

<style>
input{
  outline: none;
  
}
</style>


