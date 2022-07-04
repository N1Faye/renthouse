<template>
  <div class="main">
    <van-nav-bar title="城市列表" left-arrow @click-left="$router.go(-1)" />
    <van-index-bar :index-list="indexListAll" :sticky-offset-top="46">
      <van-index-anchor index="#"> #<van-cell title="北京" /></van-index-anchor>
      <van-index-anchor index="热"
        >热门城市
        <van-cell
          v-for="(item, index) in hotCity"
          :key="index"
          :title="item.label"
      /></van-index-anchor>

      <van-index-anchor v-for="(val, key) in firstName" :key="key" :index="key"
        >{{ key }}
        <van-cell
          v-for="(item, index) in val"
          :key="index"
          :title="item.label"
        />
      </van-index-anchor>
    </van-index-bar>
  </div>
</template>

<script>
import { getCityList, getHotCity } from '@/api/city'
export default {
  created () {
    this.getCityList()
    this.getHotCity()
  },
  data () {
    return {
      indexListAll: [],
      allCityNameList: [],
      cityNameList: [],
      firstName: {},
      hotCity: []
    }
  },
  mounted () {

  },
  methods: {
    async getCityList () {
      try {
        const res = await getCityList()
        console.log(this.cityNameList)
        this.cityNameList = res.data.body.filter(item => this.hotCity.every(item1 => item1.value !== item.value))
        console.log(this.cityNameList)
        const indexList = [...new Set(this.cityNameList.map(item => item.pinyin[0].toUpperCase()))].sort()
        this.indexListAll = ['#', '热', ...indexList]
        const firstName = {}
        indexList.forEach((item) => {
          firstName[item] = []
          this.cityNameList.forEach((item1) => {
            const first = item1.pinyin[0].toUpperCase()
            if (first === item) {
              firstName[item].push(item1)
            }
          })
        })
        this.firstName = firstName
      } catch (err) {
        console.log(err)
      }
    },
    async getHotCity () {
      try {
        const res = await getHotCity()
        this.hotCity = res.data.body
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.main {
  padding-top: 50px;
}
/deep/.van-nav-bar {
  width: 375px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
</style>
