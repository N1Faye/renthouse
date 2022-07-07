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
