<template>
  <div class="main-content">
    <!-- 列表页 -->
    <div v-if="showFlag">
      <el-form :inline="true" :model="searchForm" class="form-content">
                                            <el-form-item label="年份">
                <el-input v-model="searchForm.nianfen" 
                    placeholder="年份" clearable></el-input>
              </el-form-item>
                                                                  <el-form-item label="月份">
                <el-input v-model="searchForm.yuefen" 
                    placeholder="月份" clearable></el-input>
              </el-form-item>
                                                                  <el-form-item label="商品名称">
                <el-input v-model="searchForm.shangpinmingcheng" 
                    placeholder="商品名称" clearable></el-input>
              </el-form-item>
                                                                  <el-form-item label="商品类别">
                <el-input v-model="searchForm.shangpinleibie" 
                    placeholder="商品类别" clearable></el-input>
              </el-form-item>
                                                        <el-form-item>
          <el-button round @click="search()">查询</el-button>
          <el-button
            v-if="isAuth('xiaoshoutongji','新增')"
            type="primary"
            @click="addOrUpdateHandler()"
            round
          >新增</el-button>
          <el-button
            v-if="isAuth('xiaoshoutongji','删除')"
            :disabled="dataListSelections.length <= 0"
            type="danger"
            @click="deleteHandler()"
            round
          >删除</el-button>
                    <el-button
            v-if="isAuth('xiaoshoutongji','报表')"
            type="info"
            @click="chartDialog()"
            round
          >统计报表</el-button>
                  </el-form-item>
      </el-form>
      <div class="table-content">
        <el-table
            v-if="isAuth('xiaoshoutongji','查看')"
            :data="dataList"
            v-loading="dataListLoading"
            @selection-change="selectionChangeHandler"
            style="width: 100%;">
            <el-table-column
                type="selection"
                header-align="center"
                align="center"
                width="50">
            </el-table-column>
                                            <el-table-column
                    prop="nianfen"
                    header-align="center"
                    align="center"
                    sortable
                    label="年份">
                    <template slot-scope="scope">
                      {{scope.row.nianfen}}
                    </template>
                </el-table-column>
                                                            <el-table-column
                    prop="yuefen"
                    header-align="center"
                    align="center"
                    sortable
                    label="月份">
                    <template slot-scope="scope">
                      {{scope.row.yuefen}}
                    </template>
                </el-table-column>
                                                            <el-table-column
                    prop="shangpinmingcheng"
                    header-align="center"
                    align="center"
                    sortable
                    label="商品名称">
                    <template slot-scope="scope">
                      {{scope.row.shangpinmingcheng}}
                    </template>
                </el-table-column>
                                                            <el-table-column
                    prop="shangpinleibie"
                    header-align="center"
                    align="center"
                    sortable
                    label="商品类别">
                    <template slot-scope="scope">
                      {{scope.row.shangpinleibie}}
                    </template>
                </el-table-column>
                                                            <el-table-column
                    prop="xiaoshoushuliang"
                    header-align="center"
                    align="center"
                    sortable
                    label="销售数量">
                    <template slot-scope="scope">
                      {{scope.row.xiaoshoushuliang}}
                    </template>
                </el-table-column>
                                                    <el-table-column
                header-align="center"
                align="center"
                label="操作">
                <template slot-scope="scope">
                                <el-button v-if="isAuth('xiaoshoutongji','查看')" type="text" icon="el-icon-edit" size="small" @click="addOrUpdateHandler(scope.row.id,'info')">详情</el-button>
                                                <el-button v-if="isAuth('xiaoshoutongji','修改')" type="text" icon="el-icon-edit" size="small" @click="addOrUpdateHandler(scope.row.id)">修改</el-button>
                <el-button v-if="isAuth('xiaoshoutongji','删除')" type="text" icon="el-icon-delete" size="small" @click="deleteHandler(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
                                                                                                <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="totalPage"
          layout="total, sizes, prev, pager, next, jumper"
          class="pagination-content"
        ></el-pagination>
      </div>
    </div>
    <!-- 添加/修改页面  将父组件的search方法传递给子组件-->
    <add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>

    
    
        <el-dialog
      title="统计报表"
      :visible.sync="chartVisiable"
      width="800">  
                                                                              <div id="xiaoshoushuliangChart" style="width:100%;height:600px;"></div>
                    <span slot="footer" class="dialog-footer">
        <el-button @click="chartDialog">返回</el-button>
      </span>
    </el-dialog>
      </div>
</template>
<script>
import AddOrUpdate from "./add-or-update";
export default {
  data() {
    return {
                                                                                          shangpinmingchengOptions: [],
                                                                        searchForm: {
        key: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      showFlag: true,
      sfshVisiable: false,
      shForm: {},
      chartVisiable: false,
      addOrUpdateFlag:false,
          };
  },
  mounted() {
    this.init();
    this.getDataList();
  },
  filters: {
    htmlfilter: function (val) {
      return val.replace(/<[^>]*>/g).replace(/undefined/g,'');
    }
  },
  components: {
    AddOrUpdate,
      },
  methods: {
                chartDialog() {
      this.chartVisiable = !this.chartVisiable;
      this.$nextTick(()=>{
                                                                                  // shangpinmingcheng shangpinmingcheng
                                                                  //  xiaoshoushuliang
                                         // xcolumn ycolumn shangpinmingcheng xiaoshoushuliang
                var xiaoshoushuliangChart = this.$echarts.init(document.getElementById("xiaoshoushuliangChart"),'macarons');
        this.$http({
            url: `value/xiaoshoutongji/shangpinmingcheng/xiaoshoushuliang`,
            method: "get"
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].shangpinmingcheng);
                    yAxis.push(res[i].total);
                    pArray.push({
                    value: res[i].total,
                    name: res[i].shangpinmingcheng
                    })
                    var option = {};
                                        option = {
                        title: {
                            text: '销售统计',
                            left: 'center'
                        },
                        tooltip: {
                          trigger: 'item',
                          formatter: '{b} : {c}'
                        },
                        xAxis: {
                            type: 'category',
                            data: xAxis
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: yAxis,
                            type: 'line'
                        }]
                    };
                                        // 使用刚指定的配置项和数据显示图表。
                    xiaoshoushuliangChart.setOption(option);
                    //根据窗口的大小变动图表
                    window.onresize = function() {
                        xiaoshoushuliangChart.resize();
                    };
                }
            }
        });
              })
    },
        init () {
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
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        page: this.pageIndex,
        limit: this.pageSize,
        sort: 'id',
      }
                                          if(this.searchForm.nianfen!='' && this.searchForm.nianfen!=undefined){
            params['nianfen'] = '%' + this.searchForm.nianfen + '%'
          }
                                                            if(this.searchForm.yuefen!='' && this.searchForm.yuefen!=undefined){
            params['yuefen'] = '%' + this.searchForm.yuefen + '%'
          }
                                                            if(this.searchForm.shangpinmingcheng!='' && this.searchForm.shangpinmingcheng!=undefined){
            params['shangpinmingcheng'] = '%' + this.searchForm.shangpinmingcheng + '%'
          }
                                                            if(this.searchForm.shangpinleibie!='' && this.searchForm.shangpinleibie!=undefined){
            params['shangpinleibie'] = '%' + this.searchForm.shangpinleibie + '%'
          }
                                                    this.$http({
        url: "xiaoshoutongji/page",
        method: "get",
        params: params
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.data.list;
          this.totalPage = data.data.total;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val;
    },
    // 添加/修改
    addOrUpdateHandler(id,type) {
      this.showFlag = false;
      this.addOrUpdateFlag = true;
      this.crossAddOrUpdateFlag = false;
      if(type!='info'){
        type = 'else';
      }
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id,type);
      });
    },
        // 下载
    download(file){
      window.open(`${file}`)
    },
    // 删除
    deleteHandler(id) {
      var ids = id
        ? [Number(id)]
        : this.dataListSelections.map(item => {
            return Number(item.id);
          });
      this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: "xiaoshoutongji/delete",
          method: "post",
          data: ids
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.search();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
