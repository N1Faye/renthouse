<template>
  <div>
    <van-nav-bar title="标题" left-arrow @click-left="$router.go(-1)"
      ><template #title> <search-bar class="searchbar"></search-bar> </template
    ></van-nav-bar>
    <!-- 下弹出层 -->
    <van-popup
      v-model="showdown"
      v-if="showdown"
      :style="{ height: '53%', width: '100%' }"
    >
      <van-row class="tab">
        <van-col span="6" :class="{ active: tabid === 1 }" @click="tabid = 1"
          >区域<van-icon name="play" />
        </van-col>
        <van-col span="6" :class="{ active: tabid === 2 }" @click="tabid = 2"
          >方式<van-icon name="play" />
        </van-col>
        <van-col span="6" :class="{ active: tabid === 3 }" @click="tabid = 3"
          >租金<van-icon name="play"
        /></van-col>
        <van-col
          span="6"
          :class="{ active: tabid === 4 }"
          @click="
            swith(4);
            showdown = !showdown;
          "
          >筛选<van-icon name="play"
        /></van-col> </van-row
      ><van-picker
        v-if="tabid === 1"
        :columns="areaColumns"
        show-toolbar
        toolbar-position="bottom"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
      <van-picker
        v-if="tabid === 2"
        :columns="wayColumns"
        show-toolbar
        toolbar-position="bottom"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      /><van-picker
        v-if="tabid === 3"
        :columns="rentColumns"
        show-toolbar
        toolbar-position="bottom"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
    <!-- tab -->
    <van-row class="tab" v-else>
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
    <!-- 右弹出层 -->
    <van-popup
      v-model="showright"
      position="right"
      :style="{ height: '100%', width: '80%' }"
    >
      <div>
        <h3>户型</h3>
        <van-row>
          <van-col span="12">span: 8</van-col>
          <van-col span="12">span: 8</van-col>
          <van-col span="12">span: 8</van-col>
        </van-row>
      </div>
      <div>
        <h3>朝向</h3>
        <van-row>
          <van-col span="12">span: 8</van-col>
          <van-col span="12">span: 8</van-col>
          <van-col span="12">span: 8</van-col>
        </van-row>
      </div>
      <div>
        <h3>楼层</h3>
        <van-row>
          <van-col span="12">span: 8</van-col>
          <van-col span="12">span: 8</van-col>
          <van-col span="12">span: 8</van-col>
        </van-row>
      </div>
      <div class="last">
        <h3>房屋亮点</h3>
        <van-row>
          <van-col span="12">span: 8</van-col>
          <van-col span="12">span: 8</van-col>
          <van-col span="12">span: 8</van-col>
        </van-row>
      </div>
      <div class="btn" v-if="showright">
        <van-button class="cancel">清除</van-button>
        <van-button class="confirm">确定</van-button>
      </div>
    </van-popup>
    <!-- 租房信息 -->
    <house-card
      v-for="(item, index) in housesList"
      :key="index"
      :houseitem="item"
    ></house-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getHouses, getAreaInfo } from '@/api/search'
import SearchBar from '@/components/SearchBar.vue'
import HouseCard from '@/components/HouseCard.vue'
export default {
  name: 'Search',
  created () {
    this.getHouses()
    this.getAreaInfo()
  },
  data () {
    return {
      tabid: 0,
      showdown: false,
      showright: false,
      condition: { cityId: 'AREA|88cff55c-aaa4-e2e0', name: '北京' },
      housesList: [],
      areaColumns: [
        {
          text: '区域',
          children: [
            { text: '不限', children: [{ text: '' }] },
            {
              text: '杭州',
              children: [{ text: '西湖区' }, { text: '余杭区' }]
            },
            {
              text: '温州',
              children: [{ text: '鹿城区' }, { text: '瓯海区' }]
            }
          ]
        },
        {
          text: '地铁',
          children: [
            {
              text: '福州',
              children: [{ text: '鼓楼区' }, { text: '台江区' }]
            },
            {
              text: '厦门',
              children: [{ text: '思明区' }, { text: '海沧区' }]
            }
          ]
        }
      ],
      wayColumns: ['不限', '整租', '合租'],
      rentColumns: ['不限', '1000及以下', '1000 - 2000', '2000 - 3000', '3000 - 4000', '4000 - 5000', '5000 - 6000', '6000 - 7000', '7000及以上']
    }
  },
  methods: {
    swith (num) {
      if (num === 4) {
        this.tabid = num
        this.showright = !this.showright
      } else {
        this.tabid = num
        this.showdown = !this.showdown
      }
    },
    onConfirm (value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    onCancel () {
      this.showdown = !this.showdown
    },
    onChange (picker, value, index) {
      console.log(index)
    },
    async getHouses () {
      try {
        const res = await getHouses(this.condition
        )
        this.housesList = res.data.body.list
        console.log(res)
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
    }
  },
  computed: {
    ...mapState(['baseurl'])
  },
  watch: {},
  filters: {},
  components: { SearchBar, HouseCard }
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
.van-popup--center {
  position: sticky;
  top: 0;
  overflow: hidden;
  transform: none;
  /deep/.van-picker__toolbar {
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-top: 1px solid #e9e9e9;
    .van-picker__cancel {
      font-size: 18px;
      width: 125px;
      color: #21b97a;
    }
    .van-picker__confirm {
      font-size: 18px;
      width: 250px;
      color: #fff;
      background-color: #21b97a;
    }
  }
}
// 右弹出层
.van-popup--right {
  top: 0;
  transform: none;
  padding: 14px 15px 64px 15px;
  h3 {
    margin: 20px 0;
    font-size: 15px;
    font-weight: normal;
  }
  .van-row {
    height: 100%;
    margin-left: 40px;
    padding-bottom: 14px;
    border-bottom: 1px solid #e4e6f0;

    .van-col {
      display: inline-block;
      height: 32px;
      width: 70px;
      margin: 0 18px 15px 0;
      border: 1px solid #ddd;
      border-radius: 3px;
      line-height: 32px;
      text-align: center;
      font-size: 12px;
      color: #888;
    }
  }
  /deep/.btn {
    display: flex;
    position: fixed;
    bottom: 0;
    right: 0;
    width: 80%;
    height: 50px;
    .cancel {
      flex: 1 1;
      height: 50px;
      color: #21b97a;
      border: 0;
      border-radius: 0;
      font-size: 18px;
    }
    .confirm {
      height: 50px;
      flex: 2 1;
      color: #fff;
      background-color: #21b97a;
      border: 0;
      border-radius: 0;
      font-size: 18px;
    }
  }
  div {
    &:nth-last-child(2) {
      .van-row {
        border-bottom: none !important;
      }
    }
  }
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
