<template>
  <div>
    <van-nav-bar title="收藏列表" left-arrow @click-left="$router.go(-1)" />
    <IsLoading v-if="isLoading"></IsLoading>
    <template v-else
      ><div class="prompt" v-if="pictureShow">
        <div class="picture">
          <img src="http://liufusong.top:8080/img/not-found.png" />
        </div>
        <p>您的收藏夹空空如也~</p>
      </div>
      <house-card
        v-for="(item, index) in favoriteList"
        :key="index"
        :houseitem="item"
        v-else
      ></house-card>
    </template>
  </div>
</template>

<script>
import { favoriteHouse } from '@/api/ueser'
import HouseCard from '@/components/HouseCard.vue'
export default {
  created () {
    console.log(1)
    this.getfavoriteList()
    console.log(2)
  },
  data () {
    return {
      pictureShow: false,
      isLoading: true,
      favoriteList: []
    }
  },
  methods: {
    async getfavoriteList () {
      try {
        console.log(3)
        const res = await favoriteHouse()
        this.isLoading = false
        if (res.data.body.length === 0) {
          this.pictureShow = true
          return
        }
        this.favoriteList = res.data.body
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { HouseCard }
}
</script>

<style scoped lang='less'>
.prompt {
  width: 375px;
  margin: 0 auto;
  .picture {
    height: 158px;
    text-align: center;
    img {
      width: 150px;
      margin: 30px 0;
    }
  }
  p {
    text-align: center;
    font-size: 14px;
    a {
      color: #21b97a;
    }
  }
}
</style>
