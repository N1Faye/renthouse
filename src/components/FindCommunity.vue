<template>
  <div>
    <form action="/">
      <van-search
        v-model="name"
        show-action
        placeholder="请输入小区地址"
        @search="onSearch"
        @cancel="$emit('cancel', false)"
        @input="onInput"
      />
    </form>
    <div class="findsuggest">
      <van-cell-group>
        <van-cell
          :title="item.communityName"
          v-for="(item, index) in communityNameList"
          :key="index"
          @click="onClick(item)"
        />
      </van-cell-group>
    </div>
    <div class="findresult"></div>
  </div>
</template>

<script>
import { findCommunity } from '@/api/area'
export default {
  props: {
  },
  created () {
    console.log(this.name)
  },
  data () {
    return {
      name: '',
      communityNameList: []
    }
  },
  methods: {
    async findCommunity () {
      console.log(this.name)
      const res = await findCommunity({ name: this.name, id: this.$store.state.cityId })
      this.communityNameList = res.data.body
      console.log(res)
    },
    onInput () {
      this.findCommunity()
    },
    onSearch () {
      this.findCommunity()
    },
    onClick (item) {
      console.log(item)
      this.$emit('pickup', item)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
