<template>
  <div class="main">
    <!-- navbar -->
    <van-nav-bar
      :title="house.community"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <!-- 轮播图 -->
    <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in house.houseImg" :key="index">
          <img v-lazy="baseurl + image"
        /></van-swipe-item>
      </van-swipe>
      <!-- 房屋信息 -->
    </div>
    <!-- 房屋重点信息 -->
    <div class="info">
      <div class="keyinfo">
        <h3>{{ house.title }}</h3>
        <div class="tags">
          <span class="tag" v-for="(item, index) in house.tags" :key="index">{{
            item
          }}</span>
        </div>
        <div class="housedetial">
          <div class="detial">
            <div>{{ house.price }} <span>元/月</span></div>
            <div>租金</div>
          </div>
          <div class="detial">
            <div>{{ house.roomType }} <span></span></div>
            <div>房型</div>
          </div>
          <div class="detial">
            <div>{{ house.size }} <span>元/月</span></div>
            <div>面积</div>
          </div>
        </div>
      </div>
      <!-- 房屋其他信息 -->
      <div class="elseinfo">
        <div class="info">装修：<span>精装</span></div>
        <div class="info">
          朝向：<span v-for="(item, index) in house.oriented" :key="index">{{
            item
          }}</span>
        </div>
        <div class="info">
          楼层：<span>{{ house.floor }}</span>
        </div>
        <div class="info">类型：<span>普通住宅</span></div>
      </div>
    </div>
    <!-- 地址 -->
    <div class="address">
      <div>
        小区：<span> {{ house.community }}</span>
      </div>
      <div id="container"></div>
    </div>
    <!-- 房屋配套 -->
    <div class="support">
      <h3>房屋配套</h3>
      <van-grid :border="false" :column-num="5">
        <van-grid-item
          v-for="(item, index) in house.supporting"
          :key="index"
          :text="item"
        >
          <template #icon>
            <iconpark-icon
              :name="item | toPinyin"
              size="2em"
            ></iconpark-icon></template
        ></van-grid-item>
      </van-grid>
    </div>
    <!-- 房屋概述 -->
    <div class="introduce">
      <h3>房屋介绍</h3>
      <div class="user">
        <div class="avatar">
          <img src="http://liufusong.top:8080/img/avatar.png" alt="" />
        </div>
        <div class="name">
          <div>王女士</div>
          <div><van-icon name="diamond-o" /> 已认证房主</div>
        </div>
        <van-button type="default">发消息</van-button>
      </div>
      <div class="text">
        {{ house.description }}
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <div class="guess"><h3>猜你喜欢</h3></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getHouse } from '@/api/house'
import { getIconPinyin } from '@/utiles/icon'
export default {
  name: 'House',
  props: {
    id: {
      type: [String, Number],
      required: true,
      latitude: '',
      longitude: ''

    }
  },
  async created () {
    try {
      const res = await getHouse(this.id)
      console.log(res)
      this.house = res.data.body
      this.latitude = this.house.coord.latitude
      this.longitude = this.house.coord.longitude
      this.getmap()
    } catch (err) {
      console.log(err)
    }
  },
  mounted () {
  },
  data () {
    return {
      house: {}
    }
  },
  methods: {
    getmap () {
      const { BMapGL } = window
      const map = new BMapGL.Map('container')
      // 创建地图实例
      const point = new BMapGL.Point(this.longitude, this.latitude)
      // 创建点坐标
      map.centerAndZoom(point, 15)
      // 初始化地图，设置中心点坐标和地图级别
      const marker1 = new BMapGL.Marker(point)
      map.addOverlay(marker1)
    }
  },
  computed: {
    ...mapState(['baseurl'])
  },
  watch: {},
  filters: {
    toPinyin (item) {
      return getIconPinyin(item)
    }
  }
}
</script>

<style scoped lang='less'>
.main {
  background-color: hsl(210, 25%, 97%);
}
// 轮播图
.my-swipe {
  width: 375px;
  height: 252px;
  background: rgb(246, 245, 246);
}
// 房屋信息
.info {
  padding: 15px;
  background: #fff;
  .keyinfo {
    h3 {
      margin: 16px 0 16px 0;
      font-weight: 400;
      font-size: 16px;
      color: #333;
    }
    .tags {
      display: flex;
      height: 22px;
      .tag {
        display: inline-block;
        font-size: 12px;
        border-radius: 3px;
        padding: 4px 5px;
        margin-right: 5px;
        line-height: 12px;
        color: #39becd;
        background: #e1f5f8;
      }
    }
    .housedetial {
      display: flex;
      width: 345px;
      height: 84px;
      border-top: 1px solid #cecece;
      border-bottom: 1px solid #cecece;
      margin: 15px 0;
      padding: 15px 0;
      align-items: center;
      .detial {
        width: 110px;
        text-align: center;
        div {
          &:nth-child(1) {
            color: #fa5741;
            font-size: 18px;
            font-weight: bolder;
            span {
              font-size: 12px;
              font-weight: 400;
            }
          }
          &:nth-child(2) {
            color: #999;
            font-size: 14px;
          }
        }
      }
    }
  }
  .elseinfo {
    div {
      width: 168.5px;
      // height: 26px;
      font-size: 13px;
      display: inline-block;
      color: #999;
      line-height: 26px;
      padding: 0;
      span {
        color: #333;
      }
    }
  }
}
// 地址
.address {
  width: 375px;
  height: 189px;
  margin-top: 10px;
  background-color: #fff;
  div {
    &:nth-child(1) {
      height: 44px;
      line-height: 44px;
      color: #666;
      font-size: 14px;
      margin: 0 11.25px;
      span {
        color: #333;
      }
    }
  }
}
#container {
  width: 375px;
  height: 145px;
  background: hsl(210, 25%, 97%);
}
// 房屋配套
.support {
  margin-bottom: 10px;
  padding: 0 10px;
  background: #fff;
  font-size: 14px;
  .van-grid {
    /deep/ .van-grid-item__content {
      padding: 0 !important;
      width: 70px;
      height: 50px;
      margin: 10px 0 !important;
      line-height: 23px;
      font-size: 14px;
    }
  }
}
// 房屋概述
.introduce {
  margin: 10px 0;
  padding: 0 10px;
  background: #fff;
  .user {
    display: flex;
    height: 62px;
    margin-bottom: 10px;
    align-items: center;
    vertical-align: middle;
    .avatar {
      width: 52px;
      height: 52px;
      margin-top: 10px;
      margin-right: 10px;
    }
    .name {
      padding-top: 15px;
      padding-left: 5px;
      width: 81px;
      font-size: 14px;
      color: #333;
      // line-height: 150%;
      div {
        &:nth-child(2) {
          font-size: 12px;
          color: #fa5741;
        }
      }
    }
    .van-button {
      width: 74px;
      height: 29px;
      position: absolute;
      right: 15px;
      color: #33be85;
      border: 1px solid #33be85;
      border-radius: 3px;
      padding: 3px 15px;
      font-size: 14px;
    }
  }
  /deep/.text {
    font-size: 14px !important;
    line-height: 1.6;
    padding: 10px 0;
    color: #333;
  }
}
.guess {
  margin: 10px 0 0;
  padding: 0 15px;
  background: #fff;
}
h3 {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 10px;
  padding: 15px 0;
  border-bottom: 1px solid #cecece;
}
</style>
