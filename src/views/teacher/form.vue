<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="辅导员姓名">
        <el-input v-model="teacher.teaName" />
      </el-form-item>
      <el-form-item label="性别">
        <template>
          <el-radio v-model="teacher.teaGender" :label="true">男</el-radio>
          <el-radio v-model="teacher.teaGender" :label="false">女</el-radio>
        </template>
      </el-form-item>

      <el-form-item label="账号">
        <el-input v-model="teacher.teaCode"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="teacher.teaPassword"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="teacher.teaEmail"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from '@/api/teacher'
export default {
  data() {
    return {
      // 辅导员对象
      teacher: {

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
      if (this.teacher.teaId) {
        this.updateData()
      } else { this.saveData() }
    },
    saveData() {
      teacherApi.save(this.teacher).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/teacher/list' })
      })
    },
    // 数据更新
    updateData() {
      teacherApi.updateById(this.teacher).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/teacher' })
      })
    },
    // 根据id查询数据
    fetchDataById(id) {
      teacherApi.getById(id).then(response => {
        this.teacher = response.data.item
      })
    },
    // 文件上传成功执行
    handleAvatarSuccess(response) {
      if (response.success) {
        this.teacher.avatar = response.data.url
        // 强制重新渲染
        this.$forceUpdate()
      } else {
        this.$message.error('上传失败')
      }
    },
    handleAvatarError() {
      this.$message.error('服务器好像挂掉了')
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
