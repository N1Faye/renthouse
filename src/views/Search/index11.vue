<template>
  <div>
    <van-nav-bar title="标题" left-arrow @click-left="$router.go(-1)"
      ><template #title> <search-bar class="searchbar"></search-bar> </template
    ></van-nav-bar>
    <!-- tab -->
    <van-row class="tab" v-if="show === false || tabid === 4">
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
    <!-- 下弹出层 -->
    <van-popup
      v-model="show"
      :style="{ height: '53%', width: '100%' }"
      v-if="show === true && tabid !== 4"
    >
      <down-popup :tabid="tabid" @swith="swith" @cancel="onCancel"></down-popup>
    </van-popup>
    <!-- 右弹出层 -->
    <van-popup
      v-if="show === true && tabid === 4"
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '80%' }"
    >
      <right-popup v-model="show" @cancel="onCancel"></right-popup>
    </van-popup>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      class="housecard"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 租房信息 -->
        <house-card
          v-for="(item, index) in housesList"
          :key="index"
          :houseitem="item"
        ></house-card>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getHouses, getAreaInfo } from '@/api/search'
import SearchBar from '@/components/SearchBar.vue'
import HouseCard from '@/components/HouseCard.vue'
import RightPopup from './components/RightPopup.vue'
import DownPopup from './components/DownPopup.vue'
export default {
  name: 'Search',
  created () {
    this.getHouses()
    this.getAreaInfo()
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
      end: 20,
      condition: { cityId: 'AREA|88cff55c-aaa4-e2e0', name: '北京' }

    }
  },
  methods: {
    async getHouses () {
      try {
        const res = await getHouses({ condition: this.condition, start: this.start, end: this.end }
        )
        if (res.data.body.list.length === 0) {
          this.finished = true
          return
        }
        this.housesList.push(...res.data.body.list)
        console.log(this.housesList)
        this.loading = false
        this.isLoading = false
      } catch (err) {
        console.log(err)
      }
    },
    async getAreaInfo () {
      try {
        const res = await getAreaInfo(this.condition.name)
        console.log(res)
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
    onLoad () {
      this.start += 20
      this.end += 20
      this.getHouses()
    },
    onRefresh () {
      this.start = 1
      this.end = 20
      this.housesList = []
      this.getHouses()
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  components: { SearchBar, HouseCard, RightPopup, DownPopup }
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
.tab {
  position: sticky;
  top: 0;
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
/deep/.van-popup--center {
  position: sticky;
  top: 0;
  overflow: hidden;
  transform: none;
}
// 右弹出层
/deep/.van-popup--right {
  top: 0;
  transform: none;
  padding: 14px 15px 64px 15px;
}
.housecard {
  // margin-top: 90px;
  // overflow: auto;
  // height: calc(100vh - 140px);
  // position: fixed;
  top: 0;
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
