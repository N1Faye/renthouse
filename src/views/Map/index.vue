<template>
  <div>
    <van-nav-bar title="地图找房" left-arrow @click-left="$router.go(-1)" />
    <!-- 地图 -->
    <div id="container"></div>
    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
      <div class="title">
        <h3>房屋列表</h3>
        <router-link to="/search">更多房源</router-link>
      </div>
      <div class="housecard">
        <house-card
          v-for="(item, index) in houseList"
          :key="index"
          :houseitem="item"
        ></house-card>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getAreaMap } from '@/api/area'
import { getHouses } from '@/api/house'
import { mapState } from 'vuex'
import HouseCard from '@/components/HouseCard.vue'
let level = 10
let itemid = null
export default {
  created () {
  },
  mounted () {
    const { BMapGL } = window
    const map = new BMapGL.Map('container')
    // 鼠标滚动缩放
    map.enableScrollWheelZoom(true)
    // 缩放控件
    const zoomCtrl = new BMapGL.ZoomControl()
    map.addControl(zoomCtrl)
    // 定位控件
    const locationControl = new BMapGL.LocationControl({
      // 控件基于停靠位置的偏移量（可选）
      offset: new BMapGL.Size(20, 20),
      enableGeolocation: true
    })
    locationControl.addEventListener('locationSuccess', function (e) {
      console.log(111)
    })
    // 城市选择控件
    const cityControl = new BMapGL.CityListControl({
      offset: new BMapGL.Size(10, 5)
    })
    map.addControl(cityControl)
    // 根据ip定位
    const that = this
    if (this.$store.state.area === this.$store.state.ipArea || this.$store.state.area === '') {
      const myCity = new BMapGL.LocalCity()
      myCity.get(function (result) {
        const point = new BMapGL.Point(result.center.lng, result.center.lat)
        const marker = new BMapGL.Marker(point)
        map.addOverlay(marker)
        map.centerAndZoom(point, level)
      })
      // 根据选择城市定位
    } else {
      function theLocation () {
        const city = that.$store.state.area + '市'
        // 用城市名设置地图中心点
        if (city !== '') {
          map.centerAndZoom(city, level)
        }
      }
      theLocation()
    }
    // 添加文本标注
    this.getMaLabel(this.$store.state.cityId, BMapGL, map)
  },
  data () {
    return {
      cityMapInfo: [],
      areaMapInfo: [],
      show: false,
      houseList: []

    }
  },
  methods: {
    async getMaLabel (code, BMapGL, map) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 6000
      })
      const res = await getAreaMap(code)
      const that = this
      if (res.data.body.length > 0) {
        res.data.body.forEach(item => {
          const point = new BMapGL.Point(item.coord.longitude, item.coord.latitude)
          const content = item.label + '\n' + (item.count + '套')
          const label = new BMapGL.Label(content, {
            position: point,
            offset: new BMapGL.Size(10, 10)
          })
          map.addOverlay(label)
          label.setStyle({
            width: '70px',
            height: '70px',
            color: '#fff',
            fontSize: '10px',
            borderRadius: '50%',
            backgroundColor: 'rgba(12, 181, 106, 0.9)',
            textAlign: 'center',
            border: '2px solid hsla(0,0%,100%,.8)',
            paddingRight: '13px',
            paddingLeft: '13px',
            paddingTop: '10px',
            whiteSpace: 'unset',
            worldBreak: 'keep-all'
          })
          label.addEventListener('click', function () {
            itemid = item.value
            map.centerAndZoom(point, level += 2)
            that.getMaLabel(item.value, BMapGL, map)
            map.clearOverlays()
          })
        })
      } else {
        this.show = true
        this.getHouses()
      }
    },
    async getHouses () {
      const res = await getHouses({ cityId: itemid })
      this.houseList = res.data.body.list
    }
  },
  computed: {
    ...mapState(['area', 'ipArea'])
  },
  watch: {},
  filters: {},
  components: { HouseCard }
}
</script>

<style scoped lang='less'>
#container {
  width: 100vw;
  height: calc(100vh - 46px);
}
.title {
  position: fixed;
  display: flex;
  justify-content: space-between;
  padding: 0 10px 0 15px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #c0c0c2;
  border-top: 1px solid #c8c8c8;
  h3 {
    font-size: 16px;
  }
  a {
    font-size: 13px;
  }
}
/deep/.housecard {
  padding: 40px 5px 10px 5px !important;
}
</style>
