<template>
  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true">
      <el-form-item>
        <!-- <el-input v-model="searchObj.name" placeholder="实习记录"/> -->
        <el-autocomplete
          v-model="searchObj.name"
          :fetch-suggestions="querySearch"
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
          <el-tag v-if="scope.row.interState == 0" type="success">已完成</el-tag>
          <el-tag v-if="scope.row.interState == 1">实习中</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <router-link :to="'/companyPortInternshipList/jouList/'+scope.row.interStuId">
            <el-button type="primary" size="mini">查看周记</el-button>
          </router-link>
          <el-button
            size="mini"
            type="success"
            @click="complete(scope.row.interId)">完成实习</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      searchObj: {} // 查询表单
    }
  },
  created() {
    this.fetchData()
  },

  methods: {
    // 调用api模块，加载实习记录列表
    fetchData() {
      const comId = sessionStorage.getItem('comId')
      internshipApi.getIngByComId(comId).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    },
    // 完成实习
    complete(id) {
      internshipApi.complete(id).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.fetchData()
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
