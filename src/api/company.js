import request from '@/utils/request'

export default{
  list() {
    return request({
      url: '/admin/manage/company/list',
      method: 'get'
    })
  },
  nameList() {
    return request({
      url: '/admin/manage/company/nameList',
      method: 'get'
    })
  },

  pageList(page, limit, searchObj) {
    return request({
      url: `/admin/manage/company/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  batchRemove(idList) {
    return request({
      url: '/admin/manage/company/batch-remove',
      method: 'delete',
      data: idList
    })
  },
  removeById(id) {
    return request({
      url: `/admin/manage/company/remove/${id}`,
      method: 'delete'

    })
  },
  save(company) {
    return request({
      url: '/admin/manage/company/save',
      method: 'post',
      data: company

    })
  },
  getById(id) {
    return request({
      url: `/admin/manage/company/get/${id}`,
      method: 'get'

    })
  },
  updateById(mycompany) {
    return request({
      url: `/admin/manage/company/update`,
      method: 'put',
      data: mycompany

    })
  },

  selectNameListByKey(key) {
    return request({
      url: `/admin/manage/company/list/name/${key}`,
      method: 'get'

    })
  }

}
