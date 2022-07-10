<template>
  <div>
    <!-- 右弹出层 -->
    <div v-show="tabid === 4">
      <IsLoading v-show="isLoading"></IsLoading>
      <div class="showright" v-show="isLoading === false">
        <template>
          <div>
            <h3>户型</h3>
            <van-row>
              <van-col
                span="12"
                v-for="(item, index) in columns.roomTypeColumns"
                :key="index"
                @click="onSelect(0, index)"
                :class="{ select: selectArr[0].includes(index) }"
                >{{ item }}</van-col
              >
            </van-row>
          </div>
          <div>
            <h3>朝向</h3>
            <van-row>
              <van-col
                span="12"
                v-for="(item, index) in columns.orientedColumns"
                :key="index"
                @click="onSelect(1, index)"
                :class="{ select: selectArr[1].includes(index) }"
                >{{ item }}</van-col
              >
            </van-row>
          </div>
          <div>
            <h3>楼层</h3>
            <van-row>
              <van-col
                span="12"
                v-for="(item, index) in columns.floorColumns"
                :key="index"
                @click="onSelect(2, index)"
                :class="{ select: selectArr[2].includes(index) }"
                >{{ item }}</van-col
              >
            </van-row>
          </div>
          <div class="last">
            <h3>房屋亮点</h3>
            <van-row>
              <van-col
                span="12"
                v-for="(item, index) in columns.tagsColumns"
                :key="index"
                @click="onSelect(3, index)"
                :class="{ select: selectArr[3].includes(index) }"
                >{{ item }}</van-col
              >
            </van-row>
          </div>
          <div class="btn">
            <van-button class="cancel" @click="onClear">清除</van-button>
            <van-button class="confirm" @click="onConfirm1">确定</van-button>
          </div>
        </template>
      </div>
    </div>
    <!-- 下弹出层 -->
    <div class="showdown" v-show="tabid !== 4">
      <van-row class="tab">
        <van-col
          span="6"
          :class="{ active: tabid === 1 || activeds[0] }"
          @click="$emit('swith', 1)"
          >区域<van-icon name="play" />
        </van-col>
        <van-col
          span="6"
          :class="{ active: tabid === 2 || activeds[1] }"
          @click="$emit('swith', 2)"
          >方式<van-icon name="play" />
        </van-col>
        <van-col
          span="6"
          :class="{ active: tabid === 3 || activeds[2] }"
          @click="$emit('swith', 3)"
          >租金<van-icon name="play"
        /></van-col>
        <van-col
          span="6"
          :class="{ active: tabid === 4 || activeds[3] }"
          @click="$emit('swith', 4)"
          >筛选<van-icon name="play"
        /></van-col>
      </van-row>
      <!-- 区域 -->
      <template>
        <IsLoading v-show="isLoading"></IsLoading>
        <van-picker
          v-show="tabid === 1 && isLoading === false"
          :columns="columns.areaColumns"
          value-key="label"
          show-toolbar
          toolbar-position="bottom"
          @confirm="onConfirm"
          @cancel="$emit('cancel')"
        />
        <!-- 方式 -->
        <van-picker
          v-show="tabid === 2 && isLoading === false"
          :columns="columns.rentTypeColumns"
          show-toolbar
          toolbar-position="bottom"
          @confirm="onConfirm"
          @cancel="$emit('cancel')"
        />
        <!-- 租金 -->
        <van-picker
          v-show="tabid === 3 && isLoading === false"
          :columns="columns.priceColumns"
          show-toolbar
          toolbar-position="bottom"
          @confirm="onConfirm"
          @cancel="$emit('cancel')"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { getHouseCondition } from '@/api/house'
let areaArr = []
let subwayArr = []
let rentTypeArr = []
let priceArr = []
let roomTypeArr = []
let floorArr = []
let orientedArr = []
let characteristicArr = []
// 放所有的筛选像
const moreList = {
  area: null,
  rentType: null,
  price: null,
  more: null
}
export default {
  name: 'PopUp',
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
      columns: {
        areaColumns: [],
        rentTypeColumns: [],
        priceColumns: [],
        orientedColumns: [],
        floorColumns: [],
        roomTypeColumns: [],
        tagsColumns: []
      },
      selectArr: { 0: [], 1: [], 2: [], 3: [] },
      isLoading: true,
      activeds: []

    }
  },
  methods: {
    async getHouseCondition () {
      try {
        const res = await getHouseCondition(this.$store.state.cityId)
        areaArr = res.data.body.area
        subwayArr = res.data.body.subway
        areaArr.children[0].children = [{ label: '' }]
        subwayArr.children[0].children = [{ label: '' }]
        this.columns.areaColumns = [areaArr, subwayArr]
        rentTypeArr = res.data.body.rentType
        this.getInfo(rentTypeArr, this.columns.rentTypeColumns)
        priceArr = res.data.body.price
        this.getInfo(priceArr, this.columns.priceColumns)
        roomTypeArr = res.data.body.roomType
        this.getInfo(roomTypeArr, this.columns.roomTypeColumns)
        floorArr = res.data.body.floor
        this.getInfo(floorArr, this.columns.floorColumns)
        orientedArr = res.data.body.oriented
        this.getInfo(orientedArr, this.columns.orientedColumns)
        characteristicArr = res.data.body.characteristic
        this.getInfo(characteristicArr, this.columns.tagsColumns)
        this.isLoading = false
      } catch (err) {
        console.log(err)
      }
    },
    onConfirm (value, index) {
      this.areaIndex = index
      // area筛选
      if (this.tabid === 1) {
        if (index[0] === 0) {
          moreList.area = index[2] !== 0 ? (areaArr.children[index[1]].children[index[2]].value) : (index[1] !== 0 ? (areaArr.children[index[1]].value) : null)
        } else {
          moreList.area = index[2] !== 0 ? (subwayArr.children[index[1]].children[index[2]].value) : (index[1] !== 0 ? (subwayArr.children[index[1]].value) : null)
        }
      } else if (this.tabid === 2) {
        moreList.rentType = rentTypeArr[index].value
      } else {
        moreList.price = priceArr[index].value
      }
      this.activeds = Object.values(moreList).map(item => item ? (item !== 'null') : false)
      this.$emit('confirm', moreList)
    },
    onConfirm1 () {
      const roomTypeId = this.selectArr[0].map(item => roomTypeArr[item].value)
      const orientedId = this.selectArr[1].map(item => orientedArr[item].value)
      const floorId = this.selectArr[2].map(item => floorArr[item].value)
      const characteristicId = this.selectArr[3].map(item => characteristicArr[item].value)
      const moreArr = [roomTypeId, orientedId, floorId, characteristicId].filter(item => item.length !== 0)
      moreList.more = moreArr.toString() === '' ? null : moreArr.toString()
      this.$emit('confirm', moreList)
    },
    getInfo (arr, newArr) {
      arr.forEach(item => newArr.push(item.label))
    },
    // 筛选 选择
    onSelect (num, index) {
      if (this.selectArr[num].includes(index)) {
        this.selectArr[num] = this.selectArr[num].filter((item) => {
          return item !== index
        })
      } else {
        this.selectArr[num].push(index)
      }
    },
    // 筛选 清除
    onClear () {
      this.selectArr = { 0: [], 1: [], 2: [], 3: [] }
      moreList.more = 'null'
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  components: {},
  beforeDestroy () {
  }
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
.select {
  border: 1px solid #21b97a !important;
  color: #21b97a !important;
  background-color: #defaef;
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
