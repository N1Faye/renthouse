<template>
  <div>
    <van-nav-bar title="标题" left-arrow @click-left="$router.go(-1)"
      ><template #title> <search-bar class="searchbar"></search-bar> </template
    ></van-nav-bar>
    <div class="tabbar">
      <van-row class="tab">
        <van-col
          span="6"
          :class="{ active: tabid === 1 || activeds[0] }"
          @click="swith(1)"
          >区域<van-icon name="play" />
        </van-col>
        <van-col
          span="6"
          :class="{ active: tabid === 2 || activeds[1] }"
          @click="swith(2)"
          >方式<van-icon name="play" />
        </van-col>
        <van-col
          span="6"
          :class="{ active: tabid === 3 || activeds[2] }"
          @click="swith(3)"
          >租金<van-icon name="play"
        /></van-col>
        <van-col
          span="6"
          :class="{ active: tabid === 4 || activeds[3] }"
          @click="swith(4)"
          >筛选<van-icon name="play"
        /></van-col>
      </van-row>
      <!-- 弹出层 -->
      <van-popup
        class="popup"
        v-model="show"
        :position="tabid === 4 ? 'right' : 'top'"
        v-show="show === true"
      >
        <pop-up
          :tabid="tabid"
          @swith="swith"
          @cancel="onCancel"
          @confirm="onConfirm"
        ></pop-up>
      </van-popup>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
      >
        <!-- 租房信息 -->
        <template>
          <IsLoading
            v-if="
              housesList.length === 0 &&
              isLoading === false &&
              finished === false &&
              pictureShow === false
            "
          ></IsLoading>
          <div class="prompt" v-else-if="pictureShow && loading === false">
            <div class="picture">
              <img src="http://liufusong.top:8080/img/not-found.png" />
            </div>
            <p>暂无房源</p>
          </div>
          <house-card
            v-for="(item, index) in housesList"
            :key="index"
            :houseitem="item"
            v-else
          ></house-card>
        </template>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getHouses } from '@/api/house'
import SearchBar from '@/components/SearchBar.vue'
import HouseCard from '@/components/HouseCard.vue'
import PopUp from './components/PopUp.vue'
// import { getItem } from '@/utiles/storage'
// const MORE = 'MORE'
export default {
  name: 'Search',
  created () {
    this.getHouses(this.obj)
  },
  data () {
    return {
      tabid: '',
      housesList: [],
      show: false,
      loading: false,
      finished: false,
      isLoading: false,
      pictureShow: false,
      obj: {
        cityId: this.$store.state.cityId,
        start: 1,
        end: 20
      },
      activeds: []

    }
  },
  methods: {
    async getHouses () {
      try {
        const res = await getHouses(this.obj)
        if (res.data.body.list.length === 0) {
          if (this.housesList.length === 0) {
            this.pictureShow = true
            return
          } else {
            this.finished = true
            return
          }
        }
        this.housesList.push(...res.data.body.list)
        this.loading = false
        this.isLoading = false
      } catch (err) {
        console.log(err)
      }
    },

    swith (num) {
      this.tabid = num
      this.show = true
    },
    onCancel () {
      this.show = false
    },
    onConfirm (e) {
      this.activeds = Object.values(e).map(item => item ? (item !== 'null') : false)
      this.pictureShow = false
      this.housesList = []
      this.show = false
      this.obj = { ...this.obj, ...e }
      this.getHouses()
    },
    onLoad () {
      this.obj.start += 20
      this.obj.end += 20
      this.getHouses()
    },
    onRefresh () {
      this.obj.start = 1
      this.obj.end = 20
      this.housesList = []
      this.loading = true
      this.getHouses()
      if (this.housesList.length === 0) {
        this.pictureShow = true
      }
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  components: { SearchBar, HouseCard, PopUp }
}
</script>

<style scoped lang='less'>
/deep/.van-nav-bar__content {
  height: 50px !important;
}
/deep/.van-nav-bar__title {
  max-width: unset;
}
/deep/.searchbar {
  margin-left: 30px;
  width: 339px;
  .van-search__content {
    .van-icon {
      color: #333;
    }
  }
}

// tab
.tabbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  .tab {
    background: white;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 17px;
    border-bottom: 1px solid #e4e6f0;
    z-index: 1;
    .van-icon {
      &::before {
        font-size: 12px;
        padding-right: 5px;
        padding-bottom: 3px;
        color: #bbb;
        transform: rotate(90deg);
      }
    }
  }
  // 下弹出层
  .van-popup--top {
    position: absolute;
    height: 353.15px;
    max-height: none;
    // transform: translate3d(-50%, -50%, 0);
    top: 0;
    transform: none;
    left: 0;
  }
  .van-popup--right {
    width: 295px;
    height: 1020px;
  }
}
// 右弹出层
/deep/.van-popup--right {
  top: 0;
  transform: none;
  padding: 14px 15px 64px 15px;
}
.isLoading {
  position: fixed;
}
.prompt {
  width: 150px;
  margin: 0 auto;
  .picture {
    height: 158px;
    text-align: center;
    img {
      width: 150px;
      margin: 30px 0;
    }
  }
  p {
    text-align: center;
    font-size: 14px;
  }
}

// 点击切换
.active {
  color: #21b97a;
  /deep/ .van-icon {
    &::before {
      color: rgb(33, 185, 122) !important;
    }
  }
}
</style>
