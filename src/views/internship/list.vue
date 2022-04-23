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
      <router-link :to="'/internship/todo/'">
        <el-badge :value="message" class="item">
          <el-button size="small" type="dangar">待办事项</el-button>
        </el-badge>
      </router-link>
    </el-form>
    <!-- 多选删除 -->
    <div style="margin-bottom: 10px">
      <el-button type="danger" size="mini" @click="batchRemove()">批量删除</el-button>
    </div>

    <el-table
      :data="list"
      border
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection"/>
      <el-table-column
        label="#"
        width="50">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="stuName" label="学生姓名" width="120"/>
      <el-table-column prop="comName" label="实习公司" width="120"/>
      <el-table-column prop="interPosition" label="职位" width="120"/>
      <el-table-column prop="interState" width = "120px" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.interState == 2" type="success">已完成</el-tag>
          <el-tag v-if="scope.row.interState == 1">实习中</el-tag>
          <el-tag v-if="scope.row.interState == 0" type="warning">申请中</el-tag>
        </template>
      </el-table-column>
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
      <el-table-column prop ="interIsagreeCom" label="企业是否同意" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.interIsagreeCom == 1" type="success" >已同意</el-tag>
          <el-tag v-if="scope.row.interIsagreeCom == 0" type="danger">未同意</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop ="interIsagreePar" label="家长是否同意" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.interIsagreePar == 1" type="success" >已同意</el-tag>
          <el-tag v-if="scope.row.interIsagreePar == 0" type="danger">未同意</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop ="interIsagreeTea" label="辅导员是否同意" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.interIsagreeTea == 1" type="success" >已同意</el-tag>
          <el-tag v-if="scope.row.interIsagreeTea == 0" type="danger">未同意</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <router-link :to="'/internship/edit/'+scope.row.interId">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button
            size="mini"
            type="danger"
            @click="removeById(scope.row.interId)">删除</el-button>
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
      list: [], // 实习记录列表
      total: 0, // 总记录数
      page: 1, // 页码数
      limit: 5, // 每页记录数
      searchObj: {}, // 查询表单
      message: ''
    }
  },
  created() {
    this.fetchData()
  },

  methods: {
    // 调用api模块，加载实习记录列表
    fetchData() {
      const stuId = sessionStorage.getItem('stuId')
      const comId = sessionStorage.getItem('comId')
      const teaId = sessionStorage.getItem('teaId')
      const parId = sessionStorage.getItem('parId')
      if (stuId) {
        internshipApi.getByStuId(stuId).then(response => {
          this.list = response.data.rows

          this.total = response.data.total
        })
      } else if (comId) {
        internshipApi.getByComId(comId).then(response => {
          this.list = response.data.rows

          this.total = response.data.total
        })
      } else if (teaId) {
        internshipApi.getByTeaId(this.page, this.limit, teaId, this.searchObj).then(response => {
          this.list = response.data.rows
          this.total = response.data.total
        })

        internshipApi.getToDoByTeaId(teaId).then(response => {
          this.message = response.data.total
        })
      } else if (parId) {
        internshipApi.getByParId(parId).then(response => {
          this.list = response.data.rows

          this.total = response.data.total
        })
      } else {
        internshipApi.pageList(this.page, this.limit, this.searchObj).then(response => {
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
        internshipApi.removeById(id).then(response => {
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
          idList.push(item.id)
        })
        // 调用api
        return internshipApi.batchRemove(idList)
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
