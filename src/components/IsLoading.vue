<template>
  <!-- 加载中 -->
  <van-loading
    type="spinner"
    color="#1cb676"
    size="50px"
    vertical
    class="isLoading"
    >加载中...</van-loading
  >
</template>

<script>
export default {
  name: 'IsLoading',
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped  lang='less'>
.isLoading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
