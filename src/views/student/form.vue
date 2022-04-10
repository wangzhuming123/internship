<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="学生姓名">
        <el-input v-model="student.stuName" />
      </el-form-item>

      <el-form-item label="学生学号">
        <el-input v-model="student.stuNumber" />
      </el-form-item>
      <el-form-item label="登陆密码">
        <el-input v-model="student.stuPassword" />
      </el-form-item>

      <el-form-item label="性别">
        <template>
          <el-radio v-model="student.stuGender" :label="true">男</el-radio>
          <el-radio v-model="student.stuGender" :label="false">女</el-radio>
        </template>
      </el-form-item>

      <el-form-item label="班级">
        <template>
          <el-select v-model="student.stuClass" placeholder="请选择">
            <el-option
              v-for="item in List"
              :key="item.classId"
              :label="item.className"
              :value="item.classId"/>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item label="电子邮箱">
        <el-input v-model="student.stuEmail" />
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import studentApi from '@/api/student'
import classApi from '@/api/class'
export default {
  data() {
    return {
      // 学生对象
      student: {

      },
      List: [], // 班级列表

      saveBtnDisabled: false // 默认按钮可用
    }
  },
  created() {
    this.getAllClass()
    if (this.$route.params.id) {
      // console.log(this.$route.params.id)
      this.fetchDataById(this.$route.params.id)
    }
  },
  methods: {

    getAllClass() {
      classApi.list().then(response => {
        this.List = response.data.items
      })
    },
    saveOrUpdate() {
      console.log(this.student)
      this.saveBtnDisabled = true
      if (this.student.id) {
        this.updateData()
      } else { this.saveData() }
    },
    saveData() {
      studentApi.save(this.student).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/student/list' })
      })
    },
    // 数据更新
    updateData() {
      studentApi.updateById(this.student).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/student' })
      })
    },
    // 根据id查询数据
    fetchDataById(id) {
      studentApi.getById(id).then(response => {
        this.student = response.data.item
      })
    },
    // 文件上传成功执行
    handleAvatarSuccess(response) {
      if (response.success) {
        this.student.avatar = response.data.url
        // 强制重新渲染
        this.$forceUpdate()
      } else {
        this.$message.error('上传失败')
      }
    },
    handleAvatarError() {
      this.$message.error('服务器好像挂掉了')
    },
    // 文件上传前的校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
