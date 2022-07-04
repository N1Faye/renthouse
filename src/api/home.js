import request from '@/utiles/request'
// 轮播图
export const getSwiper = () => {
  return request({
    url: 'home/swiper'
  })
}

// 租房小组
export const getGTeam = (area) => {
  return request({
    url: 'home/groups',
    data: {
      area
    }
  })
}
