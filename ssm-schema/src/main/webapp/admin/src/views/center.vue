<template>
  <div>
    <el-form
      class="detail-form-content"
      ref="ruleForm"
      :model="ruleForm"
      label-width="80px"
    >  
     <el-row>
                              <el-col :span="12">
        <el-form-item  v-if="flag=='huiyuan'"  label="账号" prop="zhanghao">
          <el-input v-model="ruleForm.zhanghao" 
              placeholder="账号" clearable></el-input>
        </el-form-item>
      </el-col>
                        <el-col :span="12">
        <el-form-item  v-if="flag=='huiyuan'"  label="密码" prop="mima">
          <el-input v-model="ruleForm.mima" 
              placeholder="密码" clearable></el-input>
        </el-form-item>
      </el-col>
                        <el-col :span="12">
        <el-form-item  v-if="flag=='huiyuan'"  label="姓名" prop="xingming">
          <el-input v-model="ruleForm.xingming" 
              placeholder="姓名" clearable></el-input>
        </el-form-item>
      </el-col>
                        <el-col :span="12">
        <el-form-item v-if="flag=='huiyuan'"  label="性别" prop="xingbie">
          <el-select v-model="ruleForm.xingbie" placeholder="请选择性别">
            <el-option
                v-for="(item,index) in huiyuanxingbieOptions"
                v-bind:key="index"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
                        <el-col :span="12">
        <el-form-item  v-if="flag=='huiyuan'"  label="联系电话" prop="lianxidianhua">
          <el-input v-model="ruleForm.lianxidianhua" 
              placeholder="联系电话" clearable></el-input>
        </el-form-item>
      </el-col>
                        <el-col :span="12">
        <el-form-item  v-if="flag=='huiyuan'"  label="电子邮箱" prop="dianziyouxiang">
          <el-input v-model="ruleForm.dianziyouxiang" 
              placeholder="电子邮箱" clearable></el-input>
        </el-form-item>
      </el-col>
                        <el-col :span="12">
        <el-form-item  v-if="flag=='huiyuan'"  label="邮政编码" prop="youzhengbianma">
          <el-input v-model="ruleForm.youzhengbianma" 
              placeholder="邮政编码" clearable></el-input>
        </el-form-item>
      </el-col>
                        <el-col :span="12">
        <el-form-item  v-if="flag=='huiyuan'"  label="家庭地址" prop="jiatingdizhi">
          <el-input v-model="ruleForm.jiatingdizhi" 
              placeholder="家庭地址" clearable></el-input>
        </el-form-item>
      </el-col>
                        <el-col :span="24">  
        <el-form-item v-if="flag=='huiyuan'" label="个人照片" prop="gerenzhaopian">
          <file-upload
          tip="点击上传个人照片"
          action="file/upload"
          :limit="3"
          :multiple="true"
          :fileUrls="ruleForm.gerenzhaopian?ruleForm.gerenzhaopian:''"
          @change="huiyuangerenzhaopianUploadChange"
          ></file-upload>
        </el-form-item>
      </el-col>
                                                                                                                                                                                                            <el-form-item v-if="flag=='users'" label="用户名" prop="username">
        <el-input v-model="ruleForm.username" 
        placeholder="用户名"></el-input>
      </el-form-item>
      <el-col :span="24">
      <el-form-item>
        <el-button type="primary" @click="onUpdateHandler">修 改</el-button>
      </el-form-item>
      </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import { isNumber,isIntNumer,isEmail,isMobile,isURL,checkIdCard } from "@/utils/validate";

export default {
  data() {
    return {
      ruleForm: {},
      flag: '',
      usersFlag: false,
                                                                  huiyuanxingbieOptions: [],
                                                                                                                                                                                                                                                                };
  },
  mounted() {
    var table = this.$storage.get("sessionTable");
    this.flag = table;
    this.$http({
      url: `${this.$storage.get("sessionTable")}/session`,
      method: "get"
    }).then(({ data }) => {
      if (data && data.code === 0) {
        this.ruleForm = data.data;
      } else {
        this.$message.error(data.msg);
      }
    });
                                            this.huiyuanxingbieOptions = "男,女".split(',')
                                                                                                                                                                          },
  methods: {
                                                                                                                                                                                                                                                                                                huiyuangerenzhaopianUploadChange(fileUrls) {
        this.ruleForm.gerenzhaopian = fileUrls;
    },
                                                                                                                                    onUpdateHandler() {
                                                                                                                                                                                                                                                if( 'huiyuan' ==this.flag && this.ruleForm.lianxidianhua&&(!isMobile(this.ruleForm.lianxidianhua))){
        this.$message.error(`联系电话应输入电话格式`);
        return
      }
                                                                  if( 'huiyuan' ==this.flag && this.ruleForm.dianziyouxiang&&(!isEmail(this.ruleForm.dianziyouxiang))){
        this.$message.error(`电子邮箱应输入邮箱格式`);
        return
      }
                                          if( 'huiyuan' ==this.flag && this.ruleForm.youzhengbianma&&(!isIntNumer(this.ruleForm.youzhengbianma))){
       this.$message.error(`邮政编码应输入整数`);
        return
      }
                                                                                                                                                                  if( 'huiyuan' ==this.flag && this.ruleForm.money&&(!isNumber(this.ruleForm.money))){
        this.$message.error(`余额应输入数字`);
        return
      }
                                                                                                                                                                                                                  this.$http({
        url: `${this.$storage.get("sessionTable")}/update`,
        method: "post",
        data: this.ruleForm
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: "修改信息成功",
            type: "success",
            duration: 1500,
            onClose: () => {
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
</style>
