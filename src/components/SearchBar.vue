<template>
  <van-search v-model="value" show-action placeholder="请输入小区或地址" disabled>
    <template #label>
      <router-link to="/city">
        <span
          >{{ $store.state.area ? $store.state.area : $store.state.ipArea
          }}<van-icon name="arrow-down" /> </span
      ></router-link>
    </template>
    <template #action>
      <router-link class="map" to="/map"
        ><van-icon name="location-o"
      /></router-link>
    </template>
  </van-search>
</template>

<script>

export default {
  created () { },
  data () {
    return {
      value: ''
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
div {
  display: flex;
  justify-content: space-around;
}
.van-search {
  width: 355px;
  height: 34px;
  padding: 5 10px;
  background: rgba(0, 0, 0, 0);
  border-radius: 3px;
  margin: 0 10px;
  span {
    color: #333;
    border-right: 1px solid #e5e5e5;
    padding-right: 8px;
  }
  .search {
    width: 297px;
    height: 24px;
  }
  .van-search__content {
    overflow: hidden;
    background: #fff;
    height: 34px;
    width: 310px !important;
    padding-left: 3px;
  }
  .map {
    font-size: 24px;
    color: #fff;
  }
}
</style>
