<template>
  <div class="main-content">
    <!-- 列表页 -->
    <div v-if="showFlag">
      <el-form :inline="true" :model="searchForm" class="form-content">
                                            <el-form-item label="商品编号">
                <el-input v-model="searchForm.shangpinbianhao" 
                    placeholder="商品编号" clearable></el-input>
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
            v-if="isAuth('shangpinxinxi','新增')"
            type="primary"
            @click="addOrUpdateHandler()"
            round
          >新增</el-button>
          <el-button
            v-if="isAuth('shangpinxinxi','删除')"
            :disabled="dataListSelections.length <= 0"
            type="danger"
            @click="deleteHandler()"
            round
          >删除</el-button>
                  </el-form-item>
      </el-form>
      <div class="table-content">
        <el-table
            v-if="isAuth('shangpinxinxi','查看')"
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
                    prop="shangpinbianhao"
                    header-align="center"
                    align="center"
                    sortable
                    label="商品编号">
                    <template slot-scope="scope">
                      {{scope.row.shangpinbianhao}}
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
                                                              <el-table-column prop="shangpintupian" 
                    header-align="center"
                    align="center" 
                    width="200" 
                    label="商品图片">
                    <template slot-scope="scope">
                      <div v-if="scope.row.shangpintupian">
                        <img :src="scope.row.shangpintupian.split(',')[0]" width="100" height="100">
                      </div>
                      <div v-else>无图片</div>
                    </template>
                  </el-table-column>
                                                            <el-table-column
                    prop="shangpinkucun"
                    header-align="center"
                    align="center"
                    sortable
                    label="商品库存">
                    <template slot-scope="scope">
                      {{scope.row.shangpinkucun}}
                    </template>
                </el-table-column>
                                                            <el-table-column
                    prop="shangpinchandi"
                    header-align="center"
                    align="center"
                    sortable
                    label="商品产地">
                    <template slot-scope="scope">
                      {{scope.row.shangpinchandi}}
                    </template>
                </el-table-column>
                                                            <el-table-column
                    prop="shangpinjieshao"
                    header-align="center"
                    align="center"
                    sortable
                    label="商品介绍">
                    <template slot-scope="scope">
                      {{scope.row.shangpinjieshao}}
                    </template>
                </el-table-column>
                                                                                                                                                                                                <el-table-column
                    prop="price"
                    header-align="center"
                    align="center"
                    sortable
                    label="价格">
                    <template slot-scope="scope">
                      {{scope.row.price}}
                    </template>
                </el-table-column>
                                                    <el-table-column
                header-align="center"
                align="center"
                label="操作">
                <template slot-scope="scope">
                                <el-button v-if="isAuth('shangpinxinxi','查看')" type="text" icon="el-icon-edit" size="small" @click="addOrUpdateHandler(scope.row.id,'info')">详情</el-button>
                                                                <el-button v-if="isAuth('shangpinxinxi','入库')" type="text" icon="el-icon-edit" size="small" @click="shangpinrukuCrossAddOrUpdateHandler(scope.row,'cross')">入库</el-button>
                                                <el-button v-if="isAuth('shangpinxinxi','出库')" type="text" icon="el-icon-edit" size="small" @click="shangpinchukuCrossAddOrUpdateHandler(scope.row,'cross')">出库</el-button>
                                                                <el-button v-if="isAuth('shangpinxinxi','修改')" type="text" icon="el-icon-edit" size="small" @click="addOrUpdateHandler(scope.row.id)">修改</el-button>
                <el-button v-if="isAuth('shangpinxinxi','删除')" type="text" icon="el-icon-delete" size="small" @click="deleteHandler(scope.row.id)">删除</el-button>
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

            <shangpinruku-cross-add-or-update v-if="shangpinrukuCrossAddOrUpdateFlag" :parent="this" ref="shangpinrukuCrossaddOrUpdate"></shangpinruku-cross-add-or-update>
        <shangpinchuku-cross-add-or-update v-if="shangpinchukuCrossAddOrUpdateFlag" :parent="this" ref="shangpinchukuCrossaddOrUpdate"></shangpinchuku-cross-add-or-update>
        
    
      </div>
</template>
<script>
import AddOrUpdate from "./add-or-update";
import shangpinrukuCrossAddOrUpdate from "../shangpinruku/add-or-update";
import shangpinchukuCrossAddOrUpdate from "../shangpinchuku/add-or-update";
export default {
  data() {
    return {
                                                                                          shangpinleibieOptions: [],
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
                  shangpinrukuCrossAddOrUpdateFlag: false,
            shangpinchukuCrossAddOrUpdateFlag: false,
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
            shangpinrukuCrossAddOrUpdate,
        shangpinchukuCrossAddOrUpdate,
          },
  methods: {
            shangpinrukuCrossAddOrUpdateHandler(row,type){
      this.showFlag = false;
      this.addOrUpdateFlag = false;
      this.shangpinrukuCrossAddOrUpdateFlag = true;
      this.$storage.set('crossObj',row);
      this.$storage.set('crossTable','shangpinxinxi');
      this.$nextTick(() => {
        this.$refs.shangpinrukuCrossaddOrUpdate.init(row.id,type);
      });
    },
        shangpinchukuCrossAddOrUpdateHandler(row,type){
      this.showFlag = false;
      this.addOrUpdateFlag = false;
      this.shangpinchukuCrossAddOrUpdateFlag = true;
      this.$storage.set('crossObj',row);
      this.$storage.set('crossTable','shangpinxinxi');
      this.$nextTick(() => {
        this.$refs.shangpinchukuCrossaddOrUpdate.init(row.id,type);
      });
    },
                    init () {
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
                                          if(this.searchForm.shangpinbianhao!='' && this.searchForm.shangpinbianhao!=undefined){
            params['shangpinbianhao'] = '%' + this.searchForm.shangpinbianhao + '%'
          }
                                                            if(this.searchForm.shangpinmingcheng!='' && this.searchForm.shangpinmingcheng!=undefined){
            params['shangpinmingcheng'] = '%' + this.searchForm.shangpinmingcheng + '%'
          }
                                                            if(this.searchForm.shangpinleibie!='' && this.searchForm.shangpinleibie!=undefined){
            params['shangpinleibie'] = '%' + this.searchForm.shangpinleibie + '%'
          }
                                                                                                                                                                                                              this.$http({
        url: "shangpinxinxi/page",
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
          url: "shangpinxinxi/delete",
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
