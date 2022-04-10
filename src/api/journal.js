import request from '@/utils/request'

export default{
  list() {
    return request({
      url: '/admin/manage/journal/test',
      method: 'get'
    })
  },

  pageList(page, limit, searchObj) {
    return request({
      url: `/admin/manage/journal/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  batchRemove(idList) {
    return request({
      url: '/admin/manage/journal/batch-remove',
      method: 'delete',
      data: idList
    })
  },
  removeById(id) {
    return request({
      url: `/admin/manage/journal/remove/${id}`,
      method: 'delete'

    })
  },
  save(myjournal) {
    return request({
      url: '/admin/manage/journal/save',
      method: 'post',
      data: myjournal

    })
  },
  getById(id) {
    return request({
      url: `/admin/manage/journal/get/${id}`,
      method: 'get'

    })
  },
  updateById(myjournal) {
    return request({
      url: `/admin/manage/journal/update`,
      method: 'put',
      data: myjournal

    })
  },

  selectNameListByKey(key) {
    return request({
      url: `/admin/manage/journal/list/name/${key}`,
      method: 'get'

    })
  }

}
