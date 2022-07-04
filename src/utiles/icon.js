const support = {
  yigui: '衣柜',
  xiyiji: '洗衣机',
  kongtiao: '空调',
  tianranqi: '天然气',
  bingxiang: '冰箱',
  nuanqi: '暖气',
  dianshi: '电视',
  reshuiqi: '热水器',
  kuandai: '宽带',
  shafa: '沙发'

}
export const getIconPinyin = (str) => {
  const index = Object.values(support).findIndex((item) => item === str)
  const iconname = Object.keys(support)[index]
  return iconname
}
