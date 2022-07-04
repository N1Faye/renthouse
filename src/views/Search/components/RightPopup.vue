<template>
  <div class="main">
    <!-- 右弹出层 -->
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
        <van-col span="12" v-for="(item, index) in floorColumns" :key="index">{{
          item
        }}</van-col>
      </van-row>
    </div>
    <div class="last">
      <h3>房屋亮点</h3>
      <van-row>
        <van-col span="12" v-for="(item, index) in tagsColumns" :key="index"
      >{{item}}</van-col
        >
      </van-row>
    </div>
    <div class="btn">
      <van-button class="cancel" @click="$emit('cancel')">清除</van-button>
      <van-button class="confirm">确定</van-button>
    </div>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      orientedColumns: ['东', '西', '南', '北', '东南', '东北', '西南', '西北'],
      floorColumns: ['高楼层', '中楼层', '低楼层'],
      roomTypeColumns: ['一室', '二室', '三室', '四室', '四室+'],
      tagsColumns: ['集中供暖', '双卫生间', '近地铁', '随时看房', '精装', '公寓', '独立卫生间', '押一付一', '独立阳台', '月租', '限女生', '限男生', '新上']
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
// 右弹出层
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
.main {
  div {
    &:nth-last-child(2) {
      .van-row {
        border-bottom: none;
      }
    }
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
</style>
