<template>
  <div>
    <div class="container">
      <div class="login-form">
        <h1 class="h1">农业商品信息管理权限后台子系统注册</h1>
                                        <div v-if="tableName=='huiyuan'" class="input-group">
          <div class="label">账号</div>
          <div class="input-container">
            <input v-model="ruleForm.zhanghao" class="input" type="text" placeholder="账号">
          </div>
        </div>
                                <div v-if="tableName=='huiyuan'" class="input-group">
          <div class="label">密码</div>
          <div class="input-container">
            <input v-model="ruleForm.mima" class="input" type="text" placeholder="密码">
          </div>
        </div>
                                <div v-if="tableName=='huiyuan'" class="input-group">
          <div class="label">姓名</div>
          <div class="input-container">
            <input v-model="ruleForm.xingming" class="input" type="text" placeholder="姓名">
          </div>
        </div>
                                                        <div v-if="tableName=='huiyuan'" class="input-group">
          <div class="label">联系电话</div>
          <div class="input-container">
            <input v-model="ruleForm.lianxidianhua" class="input" type="text" placeholder="联系电话">
          </div>
        </div>
                                <div v-if="tableName=='huiyuan'" class="input-group">
          <div class="label">电子邮箱</div>
          <div class="input-container">
            <input v-model="ruleForm.dianziyouxiang" class="input" type="text" placeholder="电子邮箱">
          </div>
        </div>
                                <div v-if="tableName=='huiyuan'" class="input-group">
          <div class="label">邮政编码</div>
          <div class="input-container">
            <input v-model="ruleForm.youzhengbianma" class="input" type="text" placeholder="邮政编码">
          </div>
        </div>
                                <div v-if="tableName=='huiyuan'" class="input-group">
          <div class="label">家庭地址</div>
          <div class="input-container">
            <input v-model="ruleForm.jiatingdizhi" class="input" type="text" placeholder="家庭地址">
          </div>
        </div>
                                                	                                                                                                                                                                                                                                                <div class="nk-navigation">
          <a href="#">
            <div @click="login()">注册</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
              },
      tableName:"",
      rules: {}
    };
  },
  mounted(){
    let table = this.$storage.get("loginTable");
    this.tableName = table;
  },
  methods: {
    // 获取uuid
    getUUID () {
      return new Date().getTime();
    },
    // 注册
    login() {
                                                                                                                                                                                                                                                if(`huiyuan` == this.tableName && this.ruleForm.lianxidianhua&&(!this.$validate.isMobile(this.ruleForm.lianxidianhua))){
        this.$message.error(`联系电话应输入电话格式`);
        return
      }
                                                                  if(`huiyuan` == this.tableName && this.ruleForm.dianziyouxiang&&(!this.$validate.isEmail(this.ruleForm.dianziyouxiang))){
        this.$message.error(`电子邮箱应输入邮件格式`);
        return
      }
                                          if(`huiyuan` == this.tableName && this.ruleForm.youzhengbianma&&(!this.$validate.isIntNumer(this.ruleForm.youzhengbianma))){
        this.$message.error(`邮政编码应输入整数`);
        return
      }
                                                                                                                                                                  if(`huiyuan` == this.tableName && this.ruleForm.money&&(!this.$validate.isNumber(this.ruleForm.money))){
        this.$message.error(`余额应输入数字`);
        return
      }
                                                                                                                                                                                                                  this.$http({
        url: `${this.tableName}/register`,
        method: "post",
        data:this.ruleForm
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: "注册成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.$router.replace({ path: "/login" });
            }
          });
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
  border-color: #00c292;
  background: #00c292;
}

.el-radio__input.is-checked .el-radio__inner {
  border-color: #00c292;
  background: #00c292;
}

.el-radio__input.is-checked .el-radio__inner {
  border-color: #00c292;
  background: #00c292;
}

.el-radio__input.is-checked + .el-radio__label {
  color: #00c292;
}

.el-radio__input.is-checked + .el-radio__label {
  color: #00c292;
}

.el-radio__input.is-checked + .el-radio__label {
  color: #00c292;
}

.h1 {
  margin-top: 10px;
}

body {
  padding: 0;
  margin: 0;
  background-image: url(../assets/img/bg.jpg);
  background-size: 100% 100%;
}

.container {
  min-height: 100vh;
  text-align: center;
  // background-color: #f2edf3;
  background-image: url(../assets/img/bg.jpg);
  padding-top: 20vh;
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

  .label {
    min-width: 60px;
  }

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
      margin-left: 10px;
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
      border-top: 0px solid #ccc;
      border-left: 0px solid #ccc;
      border-right: 0px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 0px;
      resize: none;
      border-radius: 0px;
      display: block;
      width: 100%;
      height: 34px;
      padding: 6px 12px;
      font-size: 14px;
      line-height: 1.42857143;
      color: #555;
      background-color: #fff;
    }
  }
}

.nk-navigation {
  margin-top: 15px;

  a {
    display: inline-block;
    color: #fff;
    background: linear-gradient(to right, #da8cff, #9a55ff);
    width: 100px;
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
    color: #fff;
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
