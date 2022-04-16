<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="journal.jourTitle" />
      </el-form-item>

      <el-form-item label="周报内容">
        <el-input v-model="journal.jourContent" :rows="10" type="textarea"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import journalApi from '@/api/journal'
export default {
  data() {
    return {
      // 辅导员对象
      journal: {

      },

      saveBtnDisabled: false // 默认按钮可用
    }
  },
  created() {
    if (this.$route.params.id) {
      this.fetchDataById(this.$route.params.id)
    }
  },
  methods: {
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (this.journal.jourId) {
        this.updateData()
      } else { this.saveData() }
    },
    saveData() {
      this.journal.jourStuId = sessionStorage.getItem('stuId')
      journalApi.save(this.journal).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/journal/list' })
      })
    },
    // 数据更新
    updateData() {
      journalApi.updateById(this.journal).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/journal' })
      })
    },
    // 根据id查询数据
    fetchDataById(id) {
      journalApi.getByJouId(id).then(response => {
        this.journal = response.data.item
      })
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
