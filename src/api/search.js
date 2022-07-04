import request from '@/utiles/request'
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

export const getAreaInfo = (name) => {
  return request({
    url: '/area/info',
    params: {
      name
    }
  })
}
