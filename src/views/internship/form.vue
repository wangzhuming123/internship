<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="实习公司">
        <template>
          <el-select v-model="internship.interComId" placeholder="请选择">
            <el-option
              v-for="item in List"
              :key="item.comId"
              :label="item.comName"
              :value="item.comId"/>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item label="实习开始时间">
        <el-date-picker v-model="internship.interStartTime" value-format="yyyy-MM-dd" />
      </el-form-item>

      <el-form-item label="实习职位">
        <el-input v-model="internship.interPosition"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">提交申请</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import internshipApi from '@/api/internship'
import companyApi from '@/api/company'
export default {
  data() {
    return {
      // 辅导员对象
      internship: {
        sort: 0,
        level: 1
      },
      // 实习公司名称列表
      List: [],

      saveBtnDisabled: false // 默认按钮可用
    }
  },
  created() {
    if (this.$route.params.id) {
      this.fetchDataById(this.$route.params.id)
    }
    this.internship.interStuId = sessionStorage.getItem('stuId')
    this.selectComName()
  },
  methods: {
    // 查询实习公司列表
    selectComName() {
      companyApi.nameList().then(response => {
        this.List = response.data.items
      })
    },
    saveOrUpdate() {
      console.log(this.internship)
      this.saveBtnDisabled = true
      if (this.internship.id) {
        this.updateData()
      } else { this.saveData() }
    },
    saveData() {
      internshipApi.save(this.internship).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/internship/list' })
      })
    },
    // 数据更新
    updateData() {
      internshipApi.updateById(this.internship).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/internship' })
      })
    },
    // 根据id查询数据
    fetchDataById(id) {
      internshipApi.getById(id).then(response => {
        this.internship = response.data.item
      })
    },
    // 文件上传成功执行
    handleAvatarSuccess(response) {
      if (response.success) {
        this.internship.avatar = response.data.url
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
