import request from '@/utiles/request'

/**
 *获取城市列表
 * @returns
 */
export const getCityList = () => {
  return request({
    url: '/area/city',
    params: {
      level: 1
    }
  })
}
/**
 * 获取热门城市
 */
export const getHotCity = () => {
  return request({
    url: '/area/hot'
  })
}
