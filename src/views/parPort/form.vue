<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="学生家长姓名">
        <el-input v-model="parent.parName" />
      </el-form-item>

      <el-form-item label="登录账号">
        <el-input v-model="parent.parCode" />
      </el-form-item>
      <el-form-item label="登陆密码">
        <el-input v-model="parent.parPassword" />
      </el-form-item>

      <el-form-item label="电子邮箱">
        <el-input v-model="parent.parEmail" />
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import studentApi from '@/api/student'
export default {
  data() {
    return {
      // 家长对象
      parent: {

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

      this.updateData()
    },
    // 数据更新
    updateData() {
      studentApi.updateParById(this.parent).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/student/parentList' })
      })
    },
    // 根据id查询数据
    fetchDataById(id) {
      studentApi.getParById(id).then(response => {
        this.parent = response.data.item
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
