<template>
  <div>
    <!-- head 登录 -->
    <div class="head login" v-if="user.token">
      <!-- 背景 -->
      <van-image class="back" fit="cover" :src="baseurl + UserInfo.avatar" />
      <!-- 个人信息 -->
      <div class="userinfo">
        <van-image class="avatar" :src="baseurl + UserInfo.avatar" />
        <div class="myname">{{ UserInfo.nickname }}</div>
        <van-button type="primary" size="small" @click="logout"
          >退出</van-button
        >
        <div>
          <router-link to="/edit"
            >编辑个人资料<van-icon name="play"
          /></router-link>
        </div>
      </div>
    </div>
    <!-- head 未登录-->
    <div class="head not-login" v-else>
      <!-- 背景 -->
      <van-image
        class="back"
        fit="cover"
        src="http://liufusong.top:8080/img/profile/bg.png"
      />
      <!-- 个人信息 -->
      <div class="userinfo">
        <van-image
          class="avatar"
          src="http://liufusong.top:8080/img/profile/avatar.png"
        />
        <div class="myname">游客</div>
        <van-button type="primary" size="small" to="/login">去登录</van-button>
      </div>
    </div>
    <!-- My icon -->
    <van-grid clickable :column-num="3" :border="false">
      <van-grid-item icon="star-o" text="我的收藏" to="/favorite" />
      <van-grid-item icon="home-o" text="我的出租" to="/manage" />
      <van-grid-item icon="clock-o" text="看房记录"  />
      <van-grid-item icon="credit-pay" text="成为房主"  />
      <van-grid-item icon="contact" text="个人资料"  />
      <van-grid-item icon="phone-circle-o" text="联系我们"  />
    </van-grid>
    <!-- 底部banner -->
    <div class="foot">
      <van-image
        fit="cover"
        src="http://liufusong.top:8080/img/profile/join.png"
      />
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/ueser'
import { mapState } from 'vuex'
export default {
  name: 'My',
  async created () {
    if (this.user.token) {
      try {
        const res = await getUserInfo()
        this.UserInfo = res.data.body
      } catch (err) {
      }
    }
  },
  data () {
    return {
      UserInfo: []
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({
          message: '是否确认退出'
        })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user', 'baseurl'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.head {
  width: 100%;
  height: 310px;
  .back {
    width: 100%;
  }
  .userinfo {
    position: absolute;
    top: 85px;
    left: 50%;
    transform: translate(-50%);
    margin-top: 50px;
    width: 318px;
    height: 165px;
    background-color: #fff;
    box-shadow: 0 0 10px 3px #ddd;
    text-align: center;
    font-size: 13px;
    .avatar {
      top: -35px;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 5px solid #f5f5f5;
      box-shadow: 0 2px 2px #bdbdbd;
    }
    .myname {
      margin-top: -20px;
    }
    button {
      margin-top: 20px;
      background-color: #21b97a;
      height: 30px;
      line-height: 30px;
      padding: 0 15px;
      border-radius: 5px;
    }
  }
}

.login {
  height: 390px;
  .userinfo {
    height: 208px;
    top: 118px;
    button {
      height: 20px;
      border-radius: 30px;
      font-size: 12px;
      margin-top: -20px;
      margin-bottom: 20px;
    }
    a {
      color: #999;
      font-size: 12px;
    }
  }
}

.foot {
  text-align: center;
  .van-image {
    margin-top: 10px;
    width: 345px;
    height: 85px;
  }
}
</style>
