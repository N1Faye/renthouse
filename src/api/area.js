import request from '@/utiles/request'
/**
 *根据地区名称获取城市/区域/街道id
 * @param {*} name
 * @returns
 */
export const getAreaInfo = (name) => {
  return request({
    url: '/area/info',
    params: {
      name
    }
  })
}
/**
 * 获取城市/区域/街道房源数量
 * @param {*} id
 * @returns
 */
export const getAreaMap = (id) => {
  return request({
    url: '/area/map',
    params: {
      id
    }
  })
}

/**
 *获取总城市列表
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
 * 获取热门城市列表
 */
export const getHotCity = () => {
  return request({
    url: '/area/hot'
  })
}
/**
 * 获取城区/社区信息
 * @param {*} id
 * @returns
 */
export const getArea = (id) => {
  return request({
    url: '/area',
    params: {
      id
    }
  })
}
