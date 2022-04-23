<template>
  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true">
      <el-form-item>
        <el-autocomplete
          v-model="searchObj.name"
          :trigger-on-focus="false"
          class="inline-input"
          placeholder="学生名称"
          value-key="name" />
      </el-form-item>

      <el-form-item label="实习时间">
        <el-date-picker
          v-model="searchObj.joinDateBegin"
          placeholder="开始时间"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="-">
        <el-date-picker
          v-model="searchObj.joinDateEnd"
          placeholder="结束时间"
          value-format="yyyy-MM-dd" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="list"
      border
      stripe
      style="width: 100%">
      <el-table-column
        label="#"
        width="50">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="stuName" label="学生姓名" width="120"/>
      <el-table-column prop="interPosition" label="职位" width="120"/>
      <el-table-column label ="开始时间" width = "120px" align = "center" >
        <template slot-scope="scope">
          {{ scope.row.interStartTime.substr(0,10) }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="120px" align="center">
        <template slot-scope="scope">
          {{ scope.row.interEndTime ? scope.row.interEndTime.substr(0, 10): "暂无" }}
        </template>
      </el-table-column>
      <el-table-column prop="interState" width = "120px" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.interState == 2" type="success">已完成</el-tag>
          <el-tag v-if="scope.row.interState == 1">实习中</el-tag>
          <el-tag v-if="scope.row.interState == 0" type="warning">申请中</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="interEvaluate" width = "120px" label="实习评价">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.interEvaluate == ''" type="info">未评价</el-tag>
          <el-tag v-if="scope.row.interEvaluate == 1" type="primary">合格</el-tag>
          <el-tag v-if="scope.row.interEvaluate == 2" type="success">良好</el-tag>
          <el-tag v-if="scope.row.interEvaluate == 3" type="warning">优秀</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <router-link :to="'/teaInternship/jouList/'+scope.row.interStuId">
            <el-button type="primary" size="mini">查看周记</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="dialogVisible"
      :close="handleClose"
      title="给该学生评个分吧！"
      width="30%">
      <span>请选择您的评价</span>
      <el-radio-group v-model="internship.interEvaluate">
        <el-radio-button label="1">合格</el-radio-button>
        <el-radio-button label="2">良好</el-radio-button>
        <el-radio-button label="3">优秀</el-radio-button>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitInterEvaluate">确 定</el-button>
      </span>
    </el-dialog>
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5,10,15]"
      style="padding: 30px; text-align:center"
      layout="sizes,jumper,prev, pager, next,->,total"
      @current-change="changeCurrentPage"
      @size-change="changePageSize"/>
  </div>
</template>

<script>
import internshipApi from '@/api/internship'
export default {
  data() {
    return {
      message: '',
      list: [], // 实习记录列表
      total: 0, // 总记录数
      page: 1, // 页码数
      limit: 5, // 每页记录数
      searchObj: {}, // 查询表单
      multipleSelection: [], // 批量删除选中的记录列表
      dialogVisible: false, // dialog不可见
      internship: {}
    }
  },
  created() {
    this.fetchData()
  },

  methods: {
    // 调用api模块，加载实习记录列表
    fetchData() {
      const teaId = sessionStorage.getItem('teaId')
      internshipApi.getEdByTeaId(teaId).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    },
    openDialog(data) {
      this.dialogVisible = true
      this.internship = data
    },
    handleClose() {
      this.dialogVisible = false
    },
    commitInterEvaluate() {
      internshipApi.updateById(this.internship).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.fetchData()
        this.dialogVisible = false
      })
    },
    // 跳转页数
    changeCurrentPage(page) {
      this.page = page
      this.fetchData()
    },
    // 设置每页显示记录数
    changePageSize(size) {
      this.limit = size
      this.fetchData()
    },
    // 清空查询条件
    resetData() {
      this.searchObj = {}
      this.fetchData()
    },
    querySearch(queryString, cb) {
      internshipApi.selectNameListByKey(queryString).then(response => {
        cb(response.data.nameList)
      })
    }
  }

}
</script>
<style scoped>
.item {
  /* margin-top: 6px;
  margin-left: 300px; */
  float:right;
}
</style>
