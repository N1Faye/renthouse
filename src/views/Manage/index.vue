<template>
  <div>
    <van-nav-bar title="房屋管理" left-arrow @click-left="$router.go(-1)" />
    <IsLoading v-if="isLoading"></IsLoading>
    <template v-else
      ><div class="prompt" v-if="pictureShow">
        <div class="picture">
          <img src="http://liufusong.top:8080/img/not-found.png" />
        </div>
        <p>
          您还没有房源， <router-link to="/rental">去发布房源</router-link>吧~
        </p>
      </div>
      <house-card
        v-for="(item, index) in publishedList"
        :key="index"
        :houseitem="item"
        v-else
      ></house-card>
    </template>
  </div>
</template>

<script>
import { pubishedHouses } from '@/api/ueser'
import HouseCard from '@/components/HouseCard.vue'
export default {
  created () {
    this.getPublishedList()
  },
  data () {
    return {
      pictureShow: false,
      isLoading: true,
      publishedList: []
    }
  },
  methods: {
    async getPublishedList () {
      try {
        const res = await pubishedHouses()
        this.isLoading = false
        console.log(res)
        if (res.data.body.length === 0) {
          this.pictureShow = true
          return
        }
        this.publishedList = res.data.body
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
