<template>
  <div>
    <div class="container">
      <div class="login-form">
        <h1 class="h1">农业商品信息管理权限后台子系统登录</h1>
        <div class="input-group">
          <div class="input-container">
            <input v-model="rulesForm.username" class="input" type="text" placeholder="用户名" />
          </div>
        </div>
        <div class="input-group">
          <div class="input-container">
            <input v-model="rulesForm.password" class="input" type="password" placeholder="密码" />
          </div>
        </div>
        <div class="input-group">
          <div class="input-container">
            <el-radio
              v-for="item in menus"
              v-bind:key="item.roleName"
              v-model="rulesForm.role"
              :label="item.roleName"
            >{{item.roleName}}</el-radio>
          </div>
        </div>
        <div class="nk-navigation">
          <a href="#">
            <img class="icon" src="../assets/img/login.png" />
            <div @click="login()">登录</div>
          </a>
        </div>
        <div class="register-container">
          <a href="#">
                                    <div @click="register('huiyuan')">注册会员</div>
                                                                                                                                                                                                                                                                                                                                                          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import menu from "@/utils/menu";
export default {
  data() {
    return {
      rulesForm: {
        username: "",
        password: "",
        role: ""
      },
      menus: [],
      tableName: ""
    };
  },
  mounted() {
    let menus = menu.list();
    this.menus = menus;
  },
  methods: {
    register(tableName){
      this.$storage.set("loginTable", tableName);
      this.$router.push({path:'/register'})
    },
    // 登陆
    login() {
      if (!this.rulesForm.username) {
         this.$message.error("请输入用户名");
        return;
      }
      if (!this.rulesForm.password) {
         this.$message.error("请输入密码");
        return;
      }
      if (!this.rulesForm.role) {
         this.$message.error("请选择角色");
        return;
      }
      let menus = this.menus;
      for (let i = 0; i < menus.length; i++) {
        if (menus[i].roleName == this.rulesForm.role) {
          this.tableName = menus[i].tableName;
        }
      }
      this.$http({
        url: `${this.tableName}/login?username=${this.rulesForm.username}&password=${this.rulesForm.password}`,
        method: "post"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$storage.set("Token", data.token);
          this.$storage.set("role", this.rulesForm.role);
          this.$storage.set("sessionTable", this.tableName);
          this.$storage.set("adminName", this.rulesForm.username);
          this.$router.replace({ path: "/index/" });
        } else {
          this.$message.error(data.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-radio__input.is-checked .el-radio__inner {
  border-color: #9a55ff;
  background: #9a55ff;
}

.el-radio__input.is-checked .el-radio__inner {
  border-color: #9a55ff;
  background: #9a55ff;
}

.el-radio__input.is-checked .el-radio__inner {
  border-color: #9a55ff;
  background: #9a55ff;
}

.el-radio__input.is-checked + .el-radio__label {
  color: #9a55ff;
}

.el-radio__input.is-checked + .el-radio__label {
  color: #9a55ff;
}

.el-radio__input.is-checked + .el-radio__label {
  color: #9a55ff;
}

.h1 {
  margin-top: 10px;
  color: #9a55ff;
  text-align: left;
  margin-left: 60px;
  text-align: center;
  margin-left: -20px;
}

.container {
  min-height: 100vh;
  text-align: center;
  // background-color: #f2edf3;
  padding-top: 20vh;
  background-image: url(../assets/img/bg.jpg);
  background-size: 100% 100%;
  opacity: 0.9;
}

.login-form:before {
  vertical-align: middle;
  display: inline-block;
}

.login-form {
  max-width: 500px;
  padding: 20px 0;
  width: 80%;
  position: relative;
  margin: 0 auto;
  border-radius: 30px;

  .input-group {
    max-width: 500px;
    padding: 20px 0;
    width: 80%;
    position: relative;
    margin: 0 auto;
    display: flex;
    align-items: center;

    .input-container {
      display: inline-block;
      width: 100%;
      text-align: left;
      // margin-left: 10px;
    }

    .icon {
      width: 30px;
      height: 30px;
    }

    .input {
      position: relative;
      z-index: 2;
      float: left;
      width: 100%;
      margin-bottom: 0;
      box-shadow: none;
      border: 1px solid #ccc;
      padding: 0px;
      resize: none;
      border-radius: 0px;
      display: block;
      width: 100%;
      height: 34px;
      padding: 6px 12px;
      margin-left: -12px;
      font-size: 14px;
      line-height: 1.42857143;
      color: #555;
      background-color: #fff;
      border-radius: 30px;
    }
  }
}

.nk-navigation {
  margin-top: 15px;

  a {
    display: inline-block;
    color: #fff;
    background: linear-gradient(to right, #da8cff, #9a55ff);
    width: 80%;
    height: 50px;
    border-radius: 30px;
    text-align: center;
    display: flex;
    align-items: center;
    margin: 0 auto;
    justify-content: center;
    padding: 0 20px;
  }

  .icon {
    margin-left: 10px;
    width: 30px;
    height: 30px;
  }
}

.register-container {
  margin-top: 10px;

  a {
    display: inline-block;
    color: #9a55ff;
    max-width: 500px;
    height: 50px;
    border-radius: 30px;
    text-align: center;
    display: flex;
    align-items: center;
    margin: 0 auto;
    justify-content: center;
    padding: 0 20px;

    div {
      margin-left: 10px;
    }
  }
}
</style>
