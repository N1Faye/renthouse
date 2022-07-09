import request from '@/utiles/request'
/**
 *根据ID查找房源具体信息
 * @param {*} id
 * @returns
 */
export const getHouse = (id) => {
  return request({
    url: `/houses/${id}`
  })
}

/**
 *根据条件查询房屋
 * @param {*} params
 * @returns
 */
export const getHouses = (params) => {
  return request({
    url: 'houses',
    params
  })
}

/**
 *获取房屋查询条件
 * @param {*} id
 * @returns
 */
export const getHouseCondition = (id) => {
  return request({
    url: '/houses/condition',
    params: {
      id
    }
  })
}

/**
 *发布房屋条件
 * @param {*} id
 * @returns
 */
export const getPublishCondition = () => {
  return request({
    url: '/houses/params'
  })
}

/**
 *图像图片上传
 * @param {*} id
 * @returns
 */
export const imgPubilsh = (formData) => {
  return request({
    method: 'POST',
    url: '/houses/image',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}
