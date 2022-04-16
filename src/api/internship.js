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
