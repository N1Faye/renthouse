<template>
  <!-- 下弹出层 -->
  <div class="showdown">
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
    <van-picker
      v-if="tabid === 1"
      :columns="areaColumns"
      show-toolbar
      toolbar-position="bottom"
      @confirm="onConfirm"
      @cancel="$emit('cancel')"
      @change="onChange"
    />
    <van-picker
      v-if="tabid === 2"
      :columns="wayColumns"
      show-toolbar
      toolbar-position="bottom"
      @confirm="onConfirm"
      @cancel="$emit('cancel')"
      @change="onChange"
    /><van-picker
      v-if="tabid === 3"
      :columns="rentColumns"
      show-toolbar
      toolbar-position="bottom"
      @confirm="onConfirm"
      @cancel="$emit('cancel')"
    />
  </div>
</template>

<script>
export default {
  props: {
    tabid: {
      type: Number,
      required: true
    }

  },
  created () { },
  data () {
    return {
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
    onConfirm (value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    onChange (picker, value, index) {
      console.log(index)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.tab {
  // position: sticky;
  // top: 0;
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
