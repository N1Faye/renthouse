<template>
  <div class="main">
    <van-nav-bar title="城市列表" left-arrow @click-left="$router.go(-1)" />
    <van-index-bar :index-list="indexList" :sticky-offset-top="46">
      <van-index-anchor v-for="(val, key) in firstName" :key="key" :index="key"
        >{{ key === "热" ? "热门城市" : key }}
        <template v-if="key === '#'">
          <van-cell title="北京" />
        </template>
        <template v-else-if="key === '热'">
          <van-cell title="你好" />
        </template>
        <template v-else>
          <template v-if="val.length !== 0">
            <van-cell
              v-for="(item, index) in val"
              :key="index"
              :title="item.label"
            />
          </template>
          <template v-else>
            <van-cell title="暂无城市" />
          </template>
        </template>
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
      indexList: ['#', '热', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
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
        this.cityNameList = res.data.body
        console.log(this.cityNameList)
        const firstName = {}
        this.indexList.forEach((item) => {
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
        console.log('hot', res)
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
