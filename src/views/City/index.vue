<template>
  <div class="main">
    <van-nav-bar title="城市列表" left-arrow @click-left="$router.go(-1)" />
    <template>
      <IsLoading v-if="isLoading"></IsLoading>
      <van-index-bar :index-list="indexListAll" :sticky-offset-top="46" v-else>
        <van-index-anchor
          v-for="(val, key) in firstName"
          :key="key"
          :index="key"
          >{{ key === "热" ? "热门城市" : key }}
          <!-- 当前城市 -->
          <van-cell
            v-if="key === '#'"
            :value="$store.state.area ? $store.state.area : $store.state.ipArea"
            @click="onClick(item)"
          />
          <!-- 热门城市 -->
          <van-cell
            v-else-if="key === '热'"
            v-for="(item, index) in hotCity"
            :key="index"
            :value="item.label"
            clickable
            @click="onClick(item)"
          />
          <!-- 全部城市 -->
          <van-cell
            v-else
            v-for="(item, index) in val"
            :key="index"
            :value="item.label"
            @click="onClick(item)"
          />
        </van-index-anchor>
      </van-index-bar>
    </template>
  </div>
</template>

<script>
import { getCityList, getHotCity } from '@/api/area'
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
      hotCity: [],
      isLoading: true
    }
  },
  mounted () {

  },
  methods: {
    async getCityList () {
      try {
        const res = await getCityList()
        this.cityNameList = res.data.body.filter(item => this.hotCity.every(item1 => item1.value !== item.value))
        const indexList = [...new Set(this.cityNameList.map(item => item.pinyin[0].toUpperCase()))].sort()
        this.indexListAll = ['#', '热', ...indexList]
        const firstName = {}
        this.indexListAll.forEach((item) => {
          firstName[item] = []
          this.cityNameList.forEach((item1) => {
            const first = item1.pinyin[0].toUpperCase()
            if (first === item) {
              firstName[item].push(item1)
            }
          })
        })
        this.firstName = firstName
        this.isLoading = false
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
    },
    async onClick (item) {
      this.$store.commit('setArea', item.label)
      this.$store.commit('setCityId', item.value)
      this.$router.back(-1)
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
