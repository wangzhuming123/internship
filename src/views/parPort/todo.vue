<template>
  <div class="app-container">
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
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="openDialog(scope.row.interId)">同意</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="dialogVisible"
      :close="handleClose"
      title="您是否同意以下协议"
      width="50%">
      <div>
        <h2>西安邮电大学计算机学院学生校外实习安全责任书</h2>
        <section>
          <p>为保障学生安全，根据国家有关法律法规和学校的规章制度，特签订如下安全责任协议书。 </p>
          <p>一、学生在校外实习须本人提出书面申请，征得家长和学校同意后并和学院签订安全责任协议书后方可外出实习，
          学生自行承担因申请理由不实或未履行告知家长义务的一切后果。</p>
          <p>二、学生外出实习应严格遵守校外实习单位制定的安全生产及各项管理制度，并严格遵守
          《西安邮电大学学生手册》及学校其他各项安全管理规定，有义务听从单位和学校指挥，
          服从管理，遵守实习纪律。增强安全防范意识，提高自我保护能力，并向学院做出安全承诺；</p>
          <p>三、学生在校外应自觉维护单位的稳定，不得参与危害单位和社会稳定的活动
          （如传销组织、法轮功及其它邪教组织），不得做出有损单位和学校声誉或危害国家、
          社会和他人利益的行为。因学生本人违反国家法律法规和单位、学校规章制度，
          发生违法犯罪、扰乱社会治安行为，将依法依规承担相关责任和后果；</p>
          <p>四、学生在校外实习过程中或外出应注意人身和财产安全的自我保护，严格遵守各项安全规章制度，
          由于个人过失或过错，导致人身、财产安全遭受损害或产生其他不良的后果，责任自负。
          学生外出要遵守交通法规，因违反规定发生交通事故或出现其他意外事件，造成人身伤亡或经济损失的，
          由学生本人负责；学生应在取得卫生许可证的食堂、餐馆及其它饮食场所或销售食品的地方用餐、
          购买食品，注意食品卫生及安全；</p>
          <p>五、学生在校外实习期间应每周向辅导员报告一次个人情况。如遇到突发事件和意外情况时必须及时报告辅导员。</p>
          <p>六、学生违反上述禁止性条款，由此发生的一切后果由本人承担，违反校纪校规的按相关制度给予纪律处分。</p>
          <p>七、此安全责任书自签订之日起，即具有法律效力；</p>
          <p>八、此安全责任书壹式两份，学生本人、学院各执一份，具有同等效力。</p>
        </section>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="parAgree(id)">确 定</el-button>
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
      list: [], // 实习记录列表
      total: 0, // 总记录数
      page: 1, // 页码数
      limit: 5, // 每页记录数
      searchObj: {}, // 查询表单
      multipleSelection: [], // 批量删除选中的记录列表
      dialogVisible: false,
      id: ''
    }
  },
  created() {
    this.fetchData()
  },
  // @click="parAgree(scope.row.interId)"
  methods: {
    // 调用api模块，加载实习记录列表
    fetchData() {
      const parId = sessionStorage.getItem('parId')
      internshipApi.getToDoByParId(parId).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    },
    openDialog(data) {
      this.dialogVisible = true
      this.id = data
    },

    handleClose() {
      this.dialogVisible = false
    },

    parAgree(id) {
      internshipApi.parAgree(id).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.dialogVisible = false
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
