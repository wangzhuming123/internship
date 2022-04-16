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
      url: '/student/manage/addJournal',
      method: 'post',
      data: myjournal

    })
  },
  // 根据学生id查询周记
  getById(id) {
    return request({
      url: `/student/manage/journal/get/${id}`,
      method: 'get'

    })
  },
  // 根据周记id查询周记
  getByJouId(id) {
    return request({
      url: `manage/journal/get/${id}`,
      method: 'get'
    })
  },
  // 更新周记
  updateById(myjournal) {
    return request({
      url: `manage/journal/update`,
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
