<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="公司名称">
        <el-input v-model="company.comName" />
      </el-form-item>

      <el-form-item label="账号">
        <el-input v-model="company.comCode"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="company.comPassword"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="company.comEmail"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import companyApi from '@/api/company'
export default {
  data() {
    return {
      // 公司对象
      company: {

      },

      saveBtnDisabled: false // 默认按钮可用
    }
  },
  created() {
    if (this.$route.params.id) {
    //   console.log(this.$route.params.id)
      this.fetchDataById(this.$route.params.id)
    }
  },
  methods: {
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (this.company.comId) {
        this.updateData()
      } else { this.saveData() }
    },
    saveData() {
      companyApi.save(this.company).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/company/list' })
      })
    },
    // 数据更新
    updateData() {
      companyApi.updateById(this.company).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/company' })
      })
    },
    // 根据id查询数据
    fetchDataById(id) {
      companyApi.getById(id).then(response => {
        this.company = response.data.item
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
