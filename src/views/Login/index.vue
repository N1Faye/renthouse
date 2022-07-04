<template>
  <div>
    <!-- header -->
    <van-nav-bar title="账号登录" left-arrow @click-left="$router.back()" />
    <!-- 登录表单 -->
    <van-form @submit="Login" class="login">
      <van-field
        name="username"
        v-model="username"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        name="password"
        v-model="password"
        type="password"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <div class="register">
      <router-link to="/register">还没账号，去注册~</router-link>
    </div>
  </div>
</template>

<script>
import { Login } from '@/api/login'
export default {
  name: 'Login',
  created () { },
  data () {
    return {
      username: '',
      password: ''

    }
  },
  methods: {
    async Login (values) {
      try {
        const res = await Login(values)
        console.log(res)
        if (res.data.status === 200) {
          this.$store.commit('setUser', res.data.body)
          this.$toast.success('登录成功')
          this.$router.push({ name: 'my' })
        }
        this.$toast.fail(res.data.description)
      } catch (err) {
        console.log(err)
        this.$toast.fail('登录失败')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login {
  margin-top: 20px;
  .van-cell {
    height: 60px;
    width: 100%;
    font-size: 17px;
    line-height: 40px;
  }
  .van-button {
    background-color: #1cb676;
    font-size: 18px;
    width: 345px;
    height: 50px;
    line-height: 50px;
    border-radius: 2px;
    border: none;
  }
}
.register {
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
}
</style>
