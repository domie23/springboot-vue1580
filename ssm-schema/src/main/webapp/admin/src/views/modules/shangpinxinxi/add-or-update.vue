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
        <el-form-item v-if="type!='info'" label="商品编号" prop="shangpinbianhao">
            <el-input v-model="ruleForm.shangpinbianhao" 
                placeholder="商品编号" readonly></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item v-if="ruleForm.shangpinbianhao" label="商品编号" prop="shangpinbianhao">
              <el-input v-model="ruleForm.shangpinbianhao" 
                placeholder="商品编号" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
                        <el-col :span="12">
        <el-form-item  v-if="type!='info'"  label="商品名称" prop="shangpinmingcheng">
          <el-input v-model="ruleForm.shangpinmingcheng" 
              placeholder="商品名称" clearable></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item v-if="ruleForm.shangpinmingcheng" label="商品名称" prop="shangpinmingcheng">
              <el-input v-model="ruleForm.shangpinmingcheng" 
                placeholder="商品名称" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
                        <el-col :span="12">
        <el-form-item v-if="type!='info'"  label="商品类别" prop="shangpinleibie">
          <el-select v-model="ruleForm.shangpinleibie" placeholder="请选择商品类别">
            <el-option
                v-for="(item,index) in shangpinleibieOptions"
                v-bind:key="index"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <div v-else>
          <el-form-item v-if="ruleForm.shangpinleibie" label="商品类别" prop="shangpinleibie">
              <el-input v-model="ruleForm.shangpinleibie" 
                placeholder="商品类别" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
                        <el-col :span="24">  
        <el-form-item v-if="type!='info'" label="商品图片" prop="shangpintupian">
          <file-upload
          tip="点击上传商品图片"
          action="file/upload"
          :limit="3"
          :multiple="true"
          :fileUrls="ruleForm.shangpintupian?ruleForm.shangpintupian:''"
          @change="shangpintupianUploadChange"
          ></file-upload>
        </el-form-item>
        <div v-else>
          <el-form-item v-if="ruleForm.shangpintupian" label="商品图片" prop="shangpintupian">
            <img style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.shangpintupian.split(',')" :src="item" width="100" height="100">
          </el-form-item>
        </div>
      </el-col>
                        <el-col :span="12">
        <el-form-item  v-if="type!='info'"  label="商品库存" prop="shangpinkucun">
          <el-input v-model="ruleForm.shangpinkucun" 
              placeholder="商品库存" clearable></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item v-if="ruleForm.shangpinkucun" label="商品库存" prop="shangpinkucun">
              <el-input v-model="ruleForm.shangpinkucun" 
                placeholder="商品库存" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
                        <el-col :span="12">
        <el-form-item  v-if="type!='info'"  label="商品产地" prop="shangpinchandi">
          <el-input v-model="ruleForm.shangpinchandi" 
              placeholder="商品产地" clearable></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item v-if="ruleForm.shangpinchandi" label="商品产地" prop="shangpinchandi">
              <el-input v-model="ruleForm.shangpinchandi" 
                placeholder="商品产地" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
                                                                                                <el-col :span="12">
        <el-form-item  v-if="type!='info'"  label="价格" prop="price">
          <el-input v-model="ruleForm.price" 
              placeholder="价格" clearable></el-input>
        </el-form-item>
        <div v-else>
          <el-form-item v-if="ruleForm.price" label="价格" prop="price">
              <el-input v-model="ruleForm.price" 
                placeholder="价格" readonly></el-input>
          </el-form-item>
        </div>
      </el-col>
                        </el-row>
                                                                                                            <el-row>
            <el-col :span="24">
              <el-form-item v-if="type!='info'" label="商品介绍" prop="shangpinjieshao">
                <el-input
                  style="min-width: 200px; max-width: 600px;"
                  type="textarea"
                  :rows="8"
                  placeholder="商品介绍"
                  v-model="ruleForm.shangpinjieshao">
                </el-input>
              </el-form-item>
              <div v-else>
                <el-form-item v-if="ruleForm.shangpinjieshao" label="商品介绍" prop="shangpinjieshao">
                    <span>{{ruleForm.shangpinjieshao}}</span>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
                                                                                                                                                                                                <el-row>
            <el-col :span="24">
              <el-form-item v-if="type!='info'"  label="商品详情" prop="shangpinxiangqing">
                <editor 
                    style="min-width: 200px; max-width: 600px;"
                    v-model="ruleForm.shangpinxiangqing" 
                    class="editor" 
                    action="file/upload">
                </editor>
              </el-form-item>
              <div v-else>
                <el-form-item v-if="ruleForm.shangpinxiangqing" label="商品详情" prop="shangpinxiangqing">
                    <span v-html="ruleForm.shangpinxiangqing"></span>
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
                        shangpinbianhao: this.getUUID(),
                                shangpinmingcheng: '',
                                shangpinleibie: '',
                                shangpintupian: '',
                                shangpinkucun: '',
                                shangpinchandi: '',
                                shangpinjieshao: '',
                                shangpinxiangqing: '',
                                thumbsupnum: '',
                                crazilynum: '',
                                price: '',
                      },
                                                    shangpinleibieOptions: [],
                                                                                                                                    rules: {
                  shangpinbianhao: [
                                                                                              ],
                  shangpinmingcheng: [
                                                                                              ],
                  shangpinleibie: [
                                                                                              ],
                  shangpintupian: [
                                                                                              ],
                  shangpinkucun: [
                                        { validator: validateIntNumber, trigger: 'blur' },
                                                                                  ],
                  shangpinchandi: [
                                                                                              ],
                  shangpinjieshao: [
                                                                                              ],
                  shangpinxiangqing: [
                                                                                              ],
                  thumbsupnum: [
                                        { validator: validateIntNumber, trigger: 'blur' },
                                                                                  ],
                  crazilynum: [
                                        { validator: validateIntNumber, trigger: 'blur' },
                                                                                  ],
                  price: [
                            { required: true, message: '价格不能为空', trigger: 'blur' },
                                                    { validator: validateNumber, trigger: 'blur' },
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
                    if(o=='shangpinbianhao'){
            this.ruleForm.shangpinbianhao = obj[o];
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
                    if(o=='shangpintupian'){
            this.ruleForm.shangpintupian = obj[o];
            continue;
          }
                    if(o=='shangpinkucun'){
            this.ruleForm.shangpinkucun = obj[o];
            continue;
          }
                    if(o=='shangpinchandi'){
            this.ruleForm.shangpinchandi = obj[o];
            continue;
          }
                    if(o=='shangpinjieshao'){
            this.ruleForm.shangpinjieshao = obj[o];
            continue;
          }
                    if(o=='shangpinxiangqing'){
            this.ruleForm.shangpinxiangqing = obj[o];
            continue;
          }
                    if(o=='thumbsupnum'){
            this.ruleForm.thumbsupnum = obj[o];
            continue;
          }
                    if(o=='crazilynum'){
            this.ruleForm.crazilynum = obj[o];
            continue;
          }
                    if(o=='price'){
            this.ruleForm.price = obj[o];
            continue;
          }
                  }
                                                                                                                                                                                              }
                                                                              this.$http({
              url: `option/shangpinfenlei/shangpinleibie`,
              method: "get"
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.shangpinleibieOptions = data.data;
              } else {
                this.$message.error(data.msg);
              }
            });
         
                                                                                                                                                                            },
                                                                                                // 多级联动参数
                                                                                                                          info(id) {
      this.$http({
        url: `shangpinxinxi/info/${id}`,
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
                              // ${column.compare}
                              // ${column.compare}
                              // ${column.compare}
                              // ${column.compare}
                              // ${column.compare}
                              // ${column.compare}
                                                                                                                                                                                                                                          this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: `shangpinxinxi/${!this.ruleForm.id ? "save" : "update"}`,
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
                  this.parent.shangpinxinxiCrossAddOrUpdateFlag = false;
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
      this.parent.shangpinxinxiCrossAddOrUpdateFlag = false;
    },
                                                            shangpintupianUploadChange(fileUrls) {
                this.ruleForm.shangpintupian = fileUrls;
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
