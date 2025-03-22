<template>
  <div>
    <el-form
      class="detail-form-content"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
    >
      <el-row>
                  <el-col :span="12">
        <el-form-item  v-if="type!='info'"  label="年份" prop="nianfen">
          <el-input v-model="ruleForm.nianfen" 
              placeholder="年份" clearable></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item v-if="ruleForm.nianfen" label="年份" prop="nianfen">
              <el-input v-model="ruleForm.nianfen" 
                placeholder="年份" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
                        <el-col :span="12">
        <el-form-item v-if="type!='info'"  label="月份" prop="yuefen">
          <el-select v-model="ruleForm.yuefen" placeholder="请选择月份">
            <el-option
                v-for="(item,index) in yuefenOptions"
                v-bind:key="index"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <div v-else>
          <el-form-item v-if="ruleForm.yuefen" label="月份" prop="yuefen">
              <el-input v-model="ruleForm.yuefen" 
                placeholder="月份" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
                        <el-col :span="12">
        <el-form-item v-if="type!='info'" label="商品名称" prop="shangpinmingcheng">
          <el-select  @change="shangpinmingchengChange" v-model="ruleForm.shangpinmingcheng" placeholder="请选择商品名称">
            <el-option
                v-for="(item,index) in shangpinmingchengOptions"
                v-bind:key="index"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <div v-else>
          <el-form-item v-if="ruleForm.shangpinmingcheng" label="商品名称" prop="shangpinmingcheng">
              <el-input v-model="ruleForm.shangpinmingcheng" 
                placeholder="商品名称" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
                        <el-col :span="12">
        <el-form-item  v-if="type!='info'"  label="商品类别" prop="shangpinleibie">
          <el-input v-model="ruleForm.shangpinleibie" 
              placeholder="商品类别" clearable></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item v-if="ruleForm.shangpinleibie" label="商品类别" prop="shangpinleibie">
              <el-input v-model="ruleForm.shangpinleibie" 
                placeholder="商品类别" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
                        <el-col :span="12">
        <el-form-item  v-if="type!='info'"  label="销售数量" prop="xiaoshoushuliang">
          <el-input v-model="ruleForm.xiaoshoushuliang" 
              placeholder="销售数量" clearable></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item v-if="ruleForm.xiaoshoushuliang" label="销售数量" prop="xiaoshoushuliang">
              <el-input v-model="ruleForm.xiaoshoushuliang" 
                placeholder="销售数量" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
                        </el-row>
                                                                                                                                                              <el-form-item>
                <el-button v-if="type!='info'" type="primary" @click="onSubmit">提交</el-button>
        <el-button v-if="type!='info'" @click="back()">取消</el-button>
        <el-button v-if="type=='info'" @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
    
    
  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import { isNumber,isIntNumer,isEmail,isMobile,isURL,checkIdCard } from "@/utils/validate";
export default {
  data() {
    let self = this
    var validateIdCard = (rule, value, callback) => {
      if(!value){
        callback();
      } else if (!checkIdCard(value)) {
        callback(new Error("请输入正确的身份证号码"));
      } else {
        callback();
      }
    };
    var validateUrl = (rule, value, callback) => {
      if(!value){
        callback();
      } else if (!isURL(value)) {
        callback(new Error("请输入正确的URL地址"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if(!value){
        callback();
      } else if (!isMobile(value)) {
        callback(new Error("请输入正确的电话号码"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if(!value){
        callback();
      } else if (!isEmail(value)) {
        callback(new Error("请输入正确的邮箱地址"));
      } else {
        callback();
      }
    };
    var validateNumber = (rule, value, callback) => {
      if(!value){
        callback();
      } else if (!isNumber(value)) {
        callback(new Error("请输入数字"));
      } else {
        callback();
      }
    };
    var validateIntNumber = (rule, value, callback) => {
      if(!value){
        callback();
      } else if (!isIntNumer(value)) {
        callback(new Error("请输入整数"));
      } else {
        callback();
      }
    };
    return {
      id: '',
      type: '',
            ruleForm: {
                        nianfen: '',
                                yuefen: '',
                                shangpinmingcheng: '',
                                shangpinleibie: '',
                                xiaoshoushuliang: '',
                      },
                                      yuefenOptions: [],
                                shangpinmingchengOptions: [],
                                                rules: {
                  nianfen: [
                                                                                              ],
                  yuefen: [
                                                                                              ],
                  shangpinmingcheng: [
                                                                                              ],
                  shangpinleibie: [
                                                                                              ],
                  xiaoshoushuliang: [
                                        { validator: validateIntNumber, trigger: 'blur' },
                                                                                  ],
              }
    };
  },
  props: ["parent"],
  computed: {
                                                                  },
  methods: {
        // 下载
    download(file){
      window.open(`${file}`)
    },
    // 初始化
    init(id,type) {
      if (id) {
        this.id = id;
        this.type = type;
      }
      if(this.type=='info'||this.type=='else'){
        this.info(id);
      }else if(this.type=='cross'){
        var obj = this.$storage.getObj('crossObj');
        for (var o in obj){
                    if(o=='nianfen'){
            this.ruleForm.nianfen = obj[o];
            continue;
          }
                    if(o=='yuefen'){
            this.ruleForm.yuefen = obj[o];
            continue;
          }
                    if(o=='shangpinmingcheng'){
            this.ruleForm.shangpinmingcheng = obj[o];
            continue;
          }
                    if(o=='shangpinleibie'){
            this.ruleForm.shangpinleibie = obj[o];
            continue;
          }
                    if(o=='xiaoshoushuliang'){
            this.ruleForm.xiaoshoushuliang = obj[o];
            continue;
          }
                  }
                                                                                              }
                                                            this.yuefenOptions = "一月份,二月份,三月份,四月份,五月份,六月份,七月份,八月份,九月份,十月份,十一月份,十二月份".split(',')
                                        this.$http({
              url: `option/shangpinxinxi/shangpinmingcheng`,
              method: "get"
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.shangpinmingchengOptions = data.data;
              } else {
                this.$message.error(data.msg);
              }
            });
                                                                },
                            // 下二随
    shangpinmingchengChange () {
      this.$http({
        url: `follow/shangpinxinxi/shangpinmingcheng?columnValue=`+ this.ruleForm.shangpinmingcheng,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
                                                                                                      if(data.data.shangpinleibie){
                this.ruleForm.shangpinleibie = data.data.shangpinleibie
              }
                                                    } else {
          this.$message.error(data.msg);
        }
      });
    },
                            // 多级联动参数
                                                              info(id) {
      this.$http({
        url: `xiaoshoutongji/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.ruleForm = data.data;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
        // 提交
    onSubmit() {
                  // ${column.compare}
                              // ${column.compare}
                              // ${column.compare}
                              // ${column.compare}
                              // ${column.compare}
                                                                                                                              this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: `xiaoshoutongji/${!this.ruleForm.id ? "save" : "update"}`,
            method: "post",
            data: this.ruleForm
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.parent.showFlag = true;
                  this.parent.addOrUpdateFlag = false;
                  this.parent.xiaoshoutongjiCrossAddOrUpdateFlag = false;
                  this.parent.search();
                }
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
    // 获取uuid
    getUUID () {
      return new Date().getTime();
    },
    // 返回
    back() {
      this.parent.showFlag = true;
      this.parent.addOrUpdateFlag = false;
      this.parent.xiaoshoutongjiCrossAddOrUpdateFlag = false;
    },
                                                                  }
};
</script>
<style lang="scss">
.editor{
  height: 500px;
}
.amap-wrapper {
  width: 100%;
  height: 500px;
}
.search-box {
  position: absolute;
}
</style>
