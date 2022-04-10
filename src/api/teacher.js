import request from '@/utils/request'

export default{
  list() {
    return request({
      url: '/admin/manage/teacher/list',
      method: 'get'
    })
  },

  pageList(page, limit, searchObj) {
    return request({
      url: `/admin/manage/teacher/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  batchRemove(idList) {
    return request({
      url: '/admin/manage/teacher/batch-remove',
      method: 'delete',
      data: idList
    })
  },
  removeById(id) {
    return request({
      url: `/admin/manage/teacher/remove/${id}`,
      method: 'delete'

    })
  },
  save(teacher) {
    return request({
      url: '/admin/manage/teacher/save',
      method: 'post',
      data: teacher

    })
  },
  getById(id) {
    return request({
      url: `/admin/manage/teacher/get/${id}`,
      method: 'get'

    })
  },
  updateById(teacher) {
    return request({
      url: `/admin/manage/teacher/update`,
      method: 'put',
      data: teacher

    })
  },

  selectNameListByKey(key) {
    return request({
      url: `/admin/manage/teacher/list/name/${key}`,
      method: 'get'

    })
  }

}
