import request from '@/utiles/request'
/**
 *登录
 * @param {*} param0
 * @returns
 */
export const Login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'user/login',
    data: {
      username,
      password
    }
  })
}
/**
 *根据token获取用户信息
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: 'user'

  })
}

/**
 *发布房源
 * @param {*} data
 * @returns
 */
export const publishHouse = (data) => {
  return request({
    method: 'POST',
    url: '/user/houses',
    data
  })
}

/**
 *查看已发布房源
 * @returns
 */
export const pubishedHouses = () => {
  return request({
    url: '/user/houses'
  })
}

/**
 *根据房屋 id 判断是否被收藏
 * @param {*} id
 * @returns
 */
export const checkCollect = (id) => {
  return request({
    url: `/user/favorites/${id}`
  })
}

/** 收藏
 * @param {*}
 * @returns
 */
export const addCollect = (id) => {
  return request({
    method: 'POST',
    url: `/user/favorites/${id}`,
    data: {
      id
    }
  })
}
/**
 *取消收藏
 * @param {*} id
 * @returns
 */
export const delCollect = (id) => {
  return request({
    method: 'DELETE',
    url: `user/favorites/${id}`
  })
}

/**
 *查看已收藏房源
 * @returns
 */
export const favoriteHouse = () => {
  return request({
    url: '/user/favorites'
  })
}
