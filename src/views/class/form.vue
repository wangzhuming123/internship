<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="班级名称">
        <el-input v-model="Class.className" />
      </el-form-item>

      <el-form-item label="人数">
        <el-input v-model="Class.classNumber"/>
      </el-form-item>
      <el-form-item label="辅导员">
        <template>
          <el-select v-model="Class.classLeader" placeholder="请选择">
            <el-option
              v-for="item in List"
              :key="item.teaId"
              :label="item.teaName"
              :value="item.teaId"/>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import classApi from '@/api/class'
import teacherApi from '@/api/teacher'
export default {
  data() {
    return {
      // 班级对象
      Class: {

      },
      List: [], // 班级列表

      saveBtnDisabled: false // 默认按钮可用
    }
  },
  created() {
    this.getAllTeacher()
    if (this.$route.params.id) {
      this.fetchDataById(this.$route.params.id)
    }
  },
  methods: {
    getAllTeacher() {
      teacherApi.list().then(response => {
        this.List = response.data.items
      })
    },
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (this.Class.classId) {
        this.updateData()
      } else { this.saveData() }
    },
    saveData() {
      classApi.save(this.Class).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/class/list' })
      })
    },
    // 数据更新
    updateData() {
      classApi.updateById(this.Class).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/class' })
      })
    },
    // 根据id查询数据
    fetchDataById(id) {
      classApi.getById(id).then(response => {
        this.Class = response.data.item
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
