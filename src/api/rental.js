import request from '@/utiles/request'
/**
 *发布房源
 * @param {*} body
 * @returns
 */
export const submitHouse = (body) => {
  return request({
    method: 'POST',
    url: '/user/houses',
    data: {
      body
    }
  })
}
