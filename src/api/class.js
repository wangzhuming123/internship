import request from '@/utils/request'

export default{
  list() {
    return request({
      url: '/admin/manage/class/list',
      method: 'get'
    })
  },

  pageList(page, limit, searchObj) {
    return request({
      url: `/admin/manage/class/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  batchRemove(idList) {
    return request({
      url: '/admin/manage/class/batch-remove',
      method: 'delete',
      data: idList
    })
  },
  removeById(id) {
    return request({
      url: `/admin/manage/class/remove/${id}`,
      method: 'delete'

    })
  },
  save(myclass) {
    return request({
      url: '/admin/manage/class/save',
      method: 'post',
      data: myclass

    })
  },
  getById(id) {
    return request({
      url: `/admin/manage/class/get/${id}`,
      method: 'get'

    })
  },
  updateById(myclass) {
    return request({
      url: `/admin/manage/class/update`,
      method: 'put',
      data: myclass

    })
  },

  selectNameListByKey(key) {
    return request({
      url: `/admin/manage/class/list/name/${key}`,
      method: 'get'

    })
  },

  // 根据辅导员id查询班级列表
  getClassByTeaId(id) {
    return request({
      url: `/admin/manage/class/listByTeaId/${id}`,
      method: 'get'
    })
  }

}
