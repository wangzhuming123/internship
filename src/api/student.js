import request from '@/utils/request'

export default{
  list() {
    return request({
      url: '/admin/manage/student/list',
      method: 'get'
    })
  },
  parPageList(page, limit, searchObj) {
    return request({
      url: `/admin/manage/parent/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  updateParById(parent) {
    return request({
      url: `/admin/manage/parent/update`,
      method: 'put',
      data: parent

    })
  },

  getParById(id) {
    return request({
      url: `/admin/manage/parent/get/${id}`,
      method: 'get'

    })
  },

  pageList(page, limit, searchObj) {
    return request({
      url: `/admin/manage/student/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  pageListByTea(page, limit, teaId, searchObj) {
    return request({
      url: `/teacher/manage/listByTeaId/${page}/${limit}/${teaId}`,
      method: 'get',
      params: searchObj
    })
  },
  parPageListByTea(page, limit, teaId, searchObj) {
    return request({
      url: `/teacher/manage/parListByTeaId/${page}/${limit}/${teaId}`,
      method: 'get',
      params: searchObj
    })
  },

  batchRemove(idList) {
    return request({
      url: '/admin/manage/student/batch-remove',
      method: 'delete',
      data: idList
    })
  },
  removeById(id) {
    return request({
      url: `/admin/manage/student/remove/${id}`,
      method: 'delete'

    })
  },
  save(student) {
    return request({
      url: '/admin/manage/student/save',
      method: 'post',
      data: student

    })
  },
  getById(id) {
    return request({
      url: `/admin/manage/student/get/${id}`,
      method: 'get'

    })
  },
  updateById(student) {
    return request({
      url: `/admin/manage/student/update`,
      method: 'put',
      data: student

    })
  },

  selectNameListByKey(key) {
    return request({
      url: `/admin/manage/student/list/name/${key}`,
      method: 'get'

    })
  }

}
