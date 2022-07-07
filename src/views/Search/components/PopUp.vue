<template>
  <!-- 下弹出层 -->
  <div class="showdown" v-if="tabid !== 4">
    <van-row class="tab">
      <van-col
        span="6"
        :class="{ active: tabid === 1 }"
        @click="$emit('swith', 1)"
        >区域<van-icon name="play" />
      </van-col>
      <van-col
        span="6"
        :class="{ active: tabid === 2 }"
        @click="$emit('swith', 2)"
        >方式<van-icon name="play" />
      </van-col>
      <van-col
        span="6"
        :class="{ active: tabid === 3 }"
        @click="$emit('swith', 3)"
        >租金<van-icon name="play"
      /></van-col>
      <van-col
        span="6"
        :class="{ active: tabid === 4 }"
        @click="$emit('swith', 4)"
        >筛选<van-icon name="play"
      /></van-col>
    </van-row>
    <!-- 区域 -->
    <template>
      <IsLoading v-if="isLoading"></IsLoading>
      <template v-else>
        <van-picker
          v-if="tabid === 1"
          :columns="areaColumns"
          show-toolbar
          toolbar-position="bottom"
          @confirm="onConfirm"
          @cancel="$emit('cancel')"
        />
        <!-- 方式 -->
        <van-picker
          v-if="tabid === 2"
          :columns="rentTypeColumns"
          show-toolbar
          toolbar-position="bottom"
          @confirm="onConfirm"
          @cancel="$emit('cancel')"
        />
        <!-- 租金 -->
        <van-picker
          v-if="tabid === 3"
          :columns="priceColumns"
          show-toolbar
          toolbar-position="bottom"
          @confirm="onConfirm"
          @cancel="$emit('cancel')"
        />
      </template>
    </template>
  </div>
  <div class="showright" v-else>
    <IsLoading v-if="isLoading"></IsLoading>
    <!-- 右弹出层 -->
    <template v-else>
      <div>
        <h3>户型</h3>
        <van-row>
          <van-col
            span="12"
            v-for="(item, index) in roomTypeColumns"
            :key="index"
            >{{ item }}</van-col
          >
        </van-row>
      </div>
      <div>
        <h3>朝向</h3>
        <van-row>
          <van-col
            span="12"
            v-for="(item, index) in orientedColumns"
            :key="index"
            >{{ item }}</van-col
          >
        </van-row>
      </div>
      <div>
        <h3>楼层</h3>
        <van-row>
          <van-col
            span="12"
            v-for="(item, index) in floorColumns"
            :key="index"
            >{{ item }}</van-col
          >
        </van-row>
      </div>
      <div class="last">
        <h3>房屋亮点</h3>
        <van-row>
          <van-col
            span="12"
            v-for="(item, index) in tagsColumns"
            :key="index"
            >{{ item }}</van-col
          >
        </van-row>
      </div>
      <div class="btn">
        <van-button class="cancel" @click="$emit('cancel')">清除</van-button>
        <van-button class="confirm">确定</van-button>
      </div>
    </template>
  </div>
</template>

<script>
import { getHouseCondition } from '@/api/house'
import IsLoading from '@/components/IsLoading.vue'
export default {
  props: {
    tabid: {
      type: Number,
      required: true
    }

  },
  created () {
    this.getHouseCondition()
  },
  data () {
    return {
      areaColumns: [],
      rentTypeColumns: [],
      priceColumns: [],
      orientedColumns: [],
      floorColumns: [],
      roomTypeColumns: [],
      tagsColumns: [],
      isLoading: true,
      selectObj: {}
    }
  },
  methods: {
    async getHouseCondition () {
      try {
        const res = await getHouseCondition(this.$store.state.cityId)
        // 地区信息加载
        const areaChildren = []
        res.data.body.area.children.forEach((item1, index1) => {
          areaChildren[index1] = { text: item1.label, children: [] }
          if (item1.children !== undefined) {
            item1.children.forEach((item, index) => {
              areaChildren[index1].children[index] = { text: item.label }
            })
          }
        })
        // 地铁加载
        const subwayChildren = []
        res.data.body.subway.children.forEach((item1, index1) => {
          subwayChildren[index1] = { text: item1.label, children: [] }
          if (item1.children !== undefined) {
            item1.children.forEach((item, index) => {
              subwayChildren[index1].children[index] = { text: item.label }
            })
          }
        })
        this.areaColumns = [{ text: '区域', children: areaChildren }, { text: '地铁', children: subwayChildren }]
        // 户型
        // res.data.body.rentType.forEach(item => {
        //   that.rentTypeColumns.push(item.label)
        // })
        this.getInfo(res.data.body.rentType, this.rentTypeColumns)
        this.getInfo(res.data.body.price, this.priceColumns)
        this.getInfo(res.data.body.roomType, this.roomTypeColumns)
        this.getInfo(res.data.body.floor, this.floorColumns)
        this.getInfo(res.data.body.oriented, this.orientedColumns)
        this.getInfo(res.data.body.characteristic, this.tagsColumns)
        this.isLoading = false
      } catch (err) {
        console.log(err)
      }
    },
    onConfirm (value, index) {
      console.log(index)
      this.$emit('confirm', this.selectObj)
    },
    getInfo (arr, newArr) {
      arr.forEach(item => newArr.push(item.label))
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { IsLoading }
}
</script>

<style scoped lang='less'>
.tab {
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
.showright {
  h3 {
    margin: 20px 0;
    font-size: 15px;
    font-weight: normal;
  }
  div {
    &:nth-last-child(2) {
      .van-row {
        border-bottom: none;
      }
    }
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
    width: 295px;
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
