import request from '@/utils/request'

export default{
  list() {
    return request({
      url: '/admin/manage/internship/list',
      method: 'get'
    })
  },

  pageList(page, limit, searchObj) {
    return request({
      url: `/admin/manage/internship/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  batchRemove(idList) {
    return request({
      url: '/admin/manage/internship/batch-remove',
      method: 'delete',
      data: idList
    })
  },
  removeById(id) {
    return request({
      url: `/admin/manage/internship/remove/${id}`,
      method: 'delete'

    })
  },
  save(myinternship) {
    return request({
      url: '/admin/manage/internship/save',
      method: 'post',
      data: myinternship

    })
  },
  // 根据学生id查询实习记录
  getByStuId(id) {
    return request({
      url: `/admin/manage/internship/getByStu/${id}`,
      method: 'get'

    })
  },
  // 根据公司id查询学生实习记录
  getByComId(id) {
    return request({
      url: `/admin/manage/internship/getByCom/${id}`,
      method: 'get'

    })
  },
  // 根据公司id查询已完成的实习记录
  getEdByComId(id) {
    return request({
      url: `/admin/manage/internship/getEdByCom/${id}`,
      method: 'get'

    })
  },
  // 根据辅导员id查询已完成的实习记录
  getEdByTeaId(id) {
    return request({
      url: `/admin/manage/internship/getEdByTea/${id}`,
      method: 'get'

    })
  },
  // 根据辅导员id查询实习中的实习记录
  getIngByTeaId(id) {
    return request({
      url: `/admin/manage/internship/getIngByTea/${id}`,
      method: 'get'

    })
  },
  // 根据公司id查询已完成的实习记录
  getIngByComId(id) {
    return request({
      url: `/admin/manage/internship/getIngByCom/${id}`,
      method: 'get'

    })
  },
  // 根据公司id查询未处理的消息
  getToDoByComId(id) {
    return request({
      url: `/admin/manage/internship/getToDoByCom/${id}`,
      method: 'get'
    })
  },

  // 根据辅导员id查询未处理的消息
  getToDoByTeaId(id) {
    return request({
      url: `/admin/manage/internship/getToDoByTea/${id}`,
      method: 'get'
    })
  },

  getByTeaId(page, limit, teaId, searchObj) {
    return request({
      url: `/teacher/manage/interByTeaId/${page}/${limit}/${teaId}`,
      method: 'get',
      data: 'searchObj'
    })
  },

  // 公司同意实习申请
  comAgree(id) {
    return request({
      url: `/company/manage/agree/${id}`,
      method: 'get'
    })
  },

  // 家长同意实习申请
  parAgree(id) {
    return request({
      url: `/parent/manage/agree/${id}`,
      method: 'get'
    })
  },
  // 公司同意实习申请
  teaAgree(id) {
    return request({
      url: `/teacher/manage/agree/${id}`,
      method: 'get'
    })
  },
  // 根据学生id查询实习记录
  getByParId(id) {
    return request({
      url: `/admin/manage/internship/getByPar/${id}`,
      method: 'put'

    })
  },
  // 公司完成实习
  complete(id) {
    return request({
      url: `/company/manage/complete/${id}`,
      method: 'get'
    })
  },
  // 根据家长id查询需要处理的记录
  getToDoByParId(parId) {
    return request({
      url: `/parent/manage/internship/getToDoByPar/${parId}`,
      method: 'get'
    })
  },
  // 根据实习记录id查询实习记录
  getById(id) {
    return request({
      url: `/admin/manage/internship/getById/${id}`,
      method: 'get'
    })
  },

  // 根据实习记录id更新实习记录
  updateById(myinternship) {
    return request({
      url: `/admin/manage/internship/update`,
      method: 'put',
      data: myinternship

    })
  },

  selectNameListByKey(key) {
    return request({
      url: `/admin/manage/internship/list/name/${key}`,
      method: 'get'

    })
  }

}
