<template>
  <div
    class="rentInfo"
    @click="
      $router.push({
        name: 'house',
        params: { id: houseitem.houseCode },
      })
    "
  >
    <div class="left">
      <img :src="houseitem.houseImg" alt="" />
    </div>
    <div class="right">
      <h3>{{ houseitem.title }}</h3>
      <div class="desc">{{ houseitem.desc }}</div>
      <div class="tags">
        <span
          class="tag"
          v-for="(item, index) in houseitem.tags"
          :key="index"
          >{{ item }}</span
        >
      </div>
      <div class="price">{{ houseitem.price }} <span>元/月</span></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    houseitem: {
      type: [Object, Array],
      requied: true
    }
  },
  created () {
  },
  data () {
    return {}
  },
  methods: {},
  computed: {
    ...mapState(['baseurl'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.rentInfo {
  margin: 0 20px;
  display: flex;
  padding-top: 18px;
  height: 120px !important;
  width: 345px;
  border-bottom: 1px solid #e5e5e5;
  justify-content: space-around;
  .left {
    img {
      width: 106px;
      height: 80px;
    }
  }
  .right {
    padding-left: 12px;
    line-height: 22px;
    h3 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
      width: 227px;
      font-size: 15px;
      color: #394043;
    }
    .desc {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
      font-size: 12px;
      color: #afb2b3;
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
    .price {
      color: red;
      font-size: 16px;
      font-weight: bolder;
      span {
        font-size: 12px;
        font-weight: normal;
      }
    }
  }
}
</style>
