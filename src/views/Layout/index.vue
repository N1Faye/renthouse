<template>
  <div>
    <keep-alive :include="['Search']">
      <router-view class="main"></router-view>
    </keep-alive>
    <van-tabbar route v-model="active">
      <van-tabbar-item replace to="/home" icon="wap-home-o">
        首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/search" icon="search">找房</van-tabbar-item>
      <van-tabbar-item replace to="/news" icon="newspaper-o"
        >咨询</van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return { active: 'home' }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.main {
  margin-bottom: 50px;
}
</style>
