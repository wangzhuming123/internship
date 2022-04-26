<template>
  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true">
      <el-form-item>
        <!-- <el-input v-model="searchObj.name" placeholder="实习记录"/> -->
        <el-autocomplete
          v-model="searchObj.stuName"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          class="inline-input"
          placeholder="学生名称"
          value-key="stu_name"
        />

        <template>
          <el-select v-model="searchObj.classId" placeholder="请选择班级">
            <el-option
              v-for="item in classList"
              :key="item.classId"
              :label="item.className"
              :value="item.classId"/>
          </el-select>
        </template>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
          <el-button type="default" @click="resetData()">清空</el-button>
          <el-button type="primary" @click="getExcel">导出报表</el-button>
        </el-form-item>
    </el-form-item></el-form>

    <el-table
      id="excel_table"
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
      <el-table-column prop="comName" label="实习公司" width="120"/>
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
          <el-tag v-if="scope.row.interState == 0" type="success">申请中</el-tag>
          <el-tag v-if="scope.row.interState == 1">实习中</el-tag>
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

  </div>
</template>

<script>
import internshipApi from '@/api/internship'
import studentApi from '@/api/student'
import classApi from '@/api/class'
import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
export default {
  data() {
    return {
      message: '',
      list: [], // 实习记录列表
      total: 0, // 总记录数
      page: 1, // 页码数
      limit: 5, // 每页记录数
      searchObj: {}, // 查询表单
      classList: []
    }
  },
  created() {
    this.fetchData()
    this.fetchClassData()
  },

  methods: {

    // 导出excel的方法
    getExcel() {
      var wb = XLSX.utils.table_to_book(document.querySelector('#excel_table'))
      wb['Sheets']['Sheet1']['!cols'] = [
        { wpx: 20 },
        { wpx: 99 },
        { wpx: 99 },
        { wpx: 99 },
        { wpx: 119 },
        { wpx: 119 },
        { wpx: 49 }
      ]
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          // Blob 对象表示一个不可变、原始数据的类文件对象。
          // Blob 表示的不一定是JavaScript原生格式的数据。
          // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: 'application/octet-stream' }),
          // 设置导出文件名称
          'sheetjs.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    // 调用api模块，加载实习记录列表
    fetchData() {
      const teaId = sessionStorage.getItem('teaId')
      internshipApi.getIngByTeaId(teaId, this.searchObj).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    },
    // 获取班级列表
    fetchClassData() {
      const teaId = sessionStorage.getItem('teaId')
      classApi.getClassByTeaId(teaId).then((response) => {
        this.List = response.data.rows
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
      studentApi.selectNameListByKey(queryString).then(response => {
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
