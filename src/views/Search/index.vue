<template>
  <div>
    <van-nav-bar title="标题" left-arrow @click-left="$router.go(-1)"
      ><template #title> <search-bar class="searchbar"></search-bar> </template
    ></van-nav-bar>
    <div class="tabbar">
      <van-row class="tab">
        <van-col span="6" :class="{ active: tabid === 1 }" @click="swith(1)"
          >区域<van-icon name="play" />
        </van-col>
        <van-col span="6" :class="{ active: tabid === 2 }" @click="swith(2)"
          >方式<van-icon name="play" />
        </van-col>
        <van-col span="6" :class="{ active: tabid === 3 }" @click="swith(3)"
          >租金<van-icon name="play"
        /></van-col>
        <van-col span="6" :class="{ active: tabid === 4 }" @click="swith(4)"
          >筛选<van-icon name="play"
        /></van-col>
      </van-row>
      <!-- 弹出层 -->
      <van-popup
        class="popup"
        v-model="show"
        :position="tabid === 4 ? 'right' : 'top'"
        v-if="show === true"
      >
        <keep-alive>
          <pop-up
            :tabid="tabid"
            @swith="swith"
            @cancel="onCancel"
            @confirm="onConfirm"
          ></pop-up>
        </keep-alive>
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
            v-if="housesList.length === 0 &&isLoading===false"
          ></IsLoading>
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

export default {
  name: 'Search',
  created () {
    this.getHouses()
  },
  data () {
    return {
      tabid: '',
      housesList: [],
      show: false,
      loading: false,
      finished: false,
      isLoading: false,
      start: 1,
      end: 20

    }
  },
  methods: {
    async getHouses () {
      try {
        const res = await getHouses({ condition: this.$store.state.cityId, start: this.start, end: this.end })
        if (res.data.body.list.length === 0) {
          this.finished = true
          return
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
    onConfirm () {
      this.show = false
      // this.getHouses()
    },
    onLoad () {
      this.start += 20
      this.end += 20
      this.getHouses()
    },
    onRefresh () {
      this.start = 1
      this.end = 20
      this.housesList = []
      this.loading = true
      this.getHouses()
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

// 点击切换
.active {
  color: #21b97a;
  /deep/ .van-icon {
    &::before {
      color: #21b97a !important;
    }
  }
}
</style>
