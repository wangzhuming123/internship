<template>
  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true">
      <el-form-item>
        <el-autocomplete
          v-model="searchObj.name"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          class="inline-input"
          placeholder="学生名称"
          value-key="name" />
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
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        label="#"
        width="50">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="parName" label="姓名" width="180"/>
      <el-table-column prop="parCode" label="账号" width="180"/>
      <el-table-column prop="parPassword" label="密码" width="180"/>
      <el-table-column prop="parEmail" label="邮箱" width="180"/>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <router-link :to="'/student/editPar/'+scope.row.parId">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button
            size="mini"
            type="danger"
            @click="removeById(scope.row.stuId)">删除</el-button>
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
import studentApi from '@/api/student'
export default {
  data() {
    return {
      list: [], // 学生列表
      total: 0, // 总记录数
      page: 1, // 页码数
      limit: 5, // 每页记录数
      searchObj: {}, // 查询表单
      multipleSelection: []// 批量删除选中的记录列表
    }
  },
  created() {
    this.fetchData()
  },

  methods: {
    // 调用api模块，加载学生列表
    fetchData() {
      const teaId = sessionStorage.getItem('teaId')
      if (teaId) {
        studentApi.parPageListByTea(this.page, this.limit, teaId, this.searchObj).then(response => {
          this.list = response.data.rows
          this.total = response.data.total
        })
      } else {
        studentApi.parPageList(this.page, this.limit, this.searchObj).then(response => {
          this.list = response.data.rows
          this.total = response.data.total
        })
      }
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
    // 根据id删除
    removeById(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        studentApi.removeById(id).then(response => {
          this.$message({
            message: response.message,
            type: 'success'
          })

          this.fetchData()
        }

        )
      }).catch((err) => {
        if (err === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    },
    // 当多选选项发生变化的时候调用
    handleSelectionChange(selection) {
      console.log(selection)
      this.multipleSelection = selection
    },
    batchRemove() {
      console.log('removeRows......')

      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择要删除的记录！')
        return
      }

      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定，远程调用ajax
        // 遍历selection，将id取出放入id列表
        var idList = []
        this.multipleSelection.forEach(item => {
          idList.push(item.id)
        })
        // 调用api
        return studentApi.batchRemove(idList)
      }).then((response) => {
        this.fetchData()
        this.$message.success(response.message)
      }).catch(error => {
        if (error === 'cancel') {
          this.$message.info('取消删除')
        }
      })
    },
    querySearch(queryString, cb) {
      studentApi.selectNameListByKey(queryString).then(response => {
        cb(response.data.nameList)
      })
    }
  }

}
</script>
