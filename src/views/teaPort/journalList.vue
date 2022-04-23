<template>
  <div journal="app-container">
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
      <el-table-column prop="jourTitle" label="标题" width="180"/>
      <el-table-column label ="创建时间" width = "120px" align = "center" >
        <template slot-scope="scope">
          {{ scope.row.gmtCreate.substr(0,10) }}
        </template>
      </el-table-column>
      <el-table-column label="详情">
        <template slot-scope="scope">
          <el-button type="text" @click="openDialog(scope.row.jourContent)">查看详细内容</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="dialogVisible"
      :close="handleClose"
      title=""
      width="30%">
      <span>{{ dialogContent }}</span>
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
import journalApi from '@/api/journal'
export default {
//   name: 'JournalList',
  data() {
    return {
      list: [], // 班级列表
      total: 0, // 总记录数
      page: 1, // 页码数
      limit: 5, // 每页记录数
      searchObj: {}, // 查询表单
      dialogVisible: false,
      dialogContent: ''
    }
  },
  created() {
    this.fetchData()
  },

  methods: {
    // 调用api模块，加载当前学生的周记
    fetchData() {
    //   console.log(this.$route.params.stuId)
    //   const comId = sessionStorage.getItem('comId')
      journalApi.getById(this.$route.params.stuId).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    //   journalApi.comGetJouByStuId(this.$route.params.stuId, comId).then(response => {
    //     this.list = response.data.rows
    //     this.total = response.data.total
    //   })
      // journalApi.list().then(response => {
      //   this.list = response.data.items
      //   this.total = this.list.length
      // })
    },
    openDialog(data) {
      this.dialogVisible = true
      this.dialogContent = data
    },

    handleClose() {
      this.dialogVisible = false
      this.dialogContent = ''
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
        journalApi.removeById(id).then(response => {
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
      this.multipleSelection = selection
    },
    batchRemove() {
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
          idList.push(item.teaId)
        })
        // 调用api
        return journalApi.batchRemove(idList)
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
      journalApi.selectNameListByKey(queryString).then(response => {
        cb(response.data.nameList)
      })
    }
  }

}
</script>
