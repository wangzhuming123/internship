import request from '@/utils/request'
export const stuListByTeaId = (page, limit, teaId, searchObj) => {
  return request({
    url: `/teacher/manage/listByTeaId/list/${page}/${limit}/${teaId}`,
    method: 'get',
    params: searchObj
  })
}
