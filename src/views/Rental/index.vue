<template>
  <div class="main">
    <van-nav-bar title="发布房源" left-arrow @click-left="$router.go(-1)" />
    <van-form @submit="onSubmit">
      <van-field class="info" label="房源信息" readonly />
      <van-field
        v-model="community"
        label="小区名称"
        placeholder="请输入小区名称"
        is-link
        input-align="right"
        readonly
        @click="showFind = true"
      />
      <van-field
        v-model.number="bodyObj.price"
        :label="'租' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '金'"
        placeholder="请输入租金/月"
        type="Number"
      >
        <template #extra>￥/月</template></van-field
      >
      <van-field
        v-model.number="bodyObj.size"
        label="建筑面积"
        placeholder="请输入建筑面积"
        type="Number"
        ><template #extra>㎡</template></van-field
      >
      <!-- 户型 -->
      <van-field
        readonly
        clickable
        name="picker"
        :value="roomType"
        :label="'户' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '型'"
        placeholder="请选择"
        @click="showRoomType = true"
        input-align="right"
        is-link
      />
      <van-popup v-model="showRoomType" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns.roomTypeColumns"
          @confirm="onConfirm"
          @cancel="showRoomType = false"
        />
      </van-popup>
      <!-- 所在楼层 -->
      <van-field
        readonly
        clickable
        name="picker"
        :value="floor"
        label="所在楼层"
        placeholder="请选择"
        @click="showFloor = true"
        input-align="right"
        is-link
      />
      <van-popup v-model="showFloor" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns.floorColumns"
          @confirm="onConfirm"
          @cancel="showFloor = false"
        />
      </van-popup>
      <!-- 朝向 -->
      <van-field
        readonly
        clickable
        name="picker"
        :value="oriented"
        :label="'朝' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '向'"
        placeholder="请选择"
        @click="showOriented = true"
        input-align="right"
        is-link
      />
      <van-popup v-model="showOriented" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns.orientedColumns"
          @confirm="onConfirm"
          @cancel="showOriented = false"
        />
      </van-popup>
      <!-- 房屋标题 -->
      <div>
        <van-field label="房屋标题" readonly />
        <van-field
          v-model.trim="bodyObj.title"
          rows="2"
          type="textarea"
          placeholder="请输入标题（例如：整租 小区名 2室 5000元)"
        />
      </div>
      <!-- 房屋图像 -->
      <div>
        <van-field label="房屋图像" readonly />
        <van-field name="uploader">
          <template #input>
            <van-uploader v-model="uploader" />
          </template>
        </van-field>
      </div>
      <!-- 房屋配置 -->
      <div class="furniture">
        <van-field label="房屋配置" readonly />
        <ul class="support">
          <li
            v-for="(val, key, i) in iconName"
            :key="i"
            @click="clickSupport(val)"
            :class="{ active: supporting.includes(val) }"
          >
            <iconpark-icon :name="key"></iconpark-icon>
            <p>{{ val }}</p>
          </li>
        </ul>
      </div>
      <!-- 房屋描述 -->
      <div>
        <van-field label="房屋描述" readonly />
        <van-field
          v-model.trim="bodyObj.description"
          rows="5"
          autosize
          type="textarea"
          placeholder="请输入房屋描述信息"
        />
      </div>
    </van-form>
    <!-- 表单底部按钮 -->
    <div class="btn">
      <van-button class="cancel" @click.stop="onCancel">取消</van-button>
      <van-button class="submit" @click.stop="onSubmit">
        <van-loading v-if="isLoading" /><span v-else>提交</span></van-button
      >
    </div>
    <van-popup v-model="showFind" position="bottom" :style="{ height: '100%' }"
      ><find-community
        @cancel="showFind = false"
        @pickup="onPickup"
      ></find-community>
    </van-popup>
  </div>
</template>

<script>
import { publishHouse } from '@/api/ueser'
import { getPublishCondition, imgPubilsh } from '@/api/house'
import FindCommunity from '@/components/FindCommunity.vue'
let roomTypeArr = []
let floorArr = []
let orientedArr = []
export default {
  async created () {
    if (this.$store.state.user && this.$store.state.user.token) {
      const res = await getPublishCondition()
      roomTypeArr = res.data.body.roomType
      this.getInfo(roomTypeArr, this.columns.roomTypeColumns)
      floorArr = res.data.body.floor
      this.getInfo(floorArr, this.columns.floorColumns)
      orientedArr = res.data.body.oriented
      this.getInfo(orientedArr, this.columns.orientedColumns)
    } else {
      this.$dialog.confirm({
        message: '此页面需要登录才能访问，请先登录'
      }).then(() => this.$router.push('/login')).catch(() => this.$router.go(-1))
    }
  },
  data () {
    return {
      showPicker: false,
      showFind: false,
      uploader: [],
      showRoomType: false,
      showFloor: false,
      showOriented: false,
      isLoading: false,
      columns: {
        areaColumns: [],
        rentTypeColumns: [],
        priceColumns: [],
        orientedColumns: [],
        floorColumns: [],
        roomTypeColumns: [],
        tagsColumns: []
      },
      roomType: '',
      floor: '',
      oriented: '',
      community: '',
      supporting: [],
      bodyObj: {
        title: null,
        description: null,
        houseImg: null,
        oriented: null,
        supporting: null,
        price: null,
        roomType: null,
        size: null,
        floor: null,
        community: null
      },
      iconName: {
        yigui: '衣柜',
        xiyiji: '洗衣机',
        kongtiao: '空调',
        tianranqi: '天然气',
        bingxiang: '冰箱',
        nuanqi: '暖气',
        dianshi: '电视',
        reshuiqi: '热水器',
        kuandai: '宽带',
        shafa: '沙发'
      }
    }
  },
  methods: {
    onConfirm (value, index) {
      if (this.showRoomType) {
        this.roomType = value
        this.bodyObj.roomType = roomTypeArr[index].value
        this.showRoomType = false
      } else if (this.showFloor) {
        this.floor = value
        this.bodyObj.floor = floorArr[index].value
        this.showFloor = false
      } else if (this.showOriented) {
        this.oriented = value
        this.bodyObj.oriented = orientedArr[index].value
        this.showOriented = false
      }
    },
    getInfo (arr, newArr) {
      arr.forEach(item => newArr.push(item.label))
    },
    onPickup (e) {
      console.log(e)
      this.community = e.communityName
      this.showFind = false
      this.bodyObj.community = e.community
    },
    clickSupport (val) {
      if (this.supporting.includes(val)) {
        this.supporting = this.supporting.filter((item) => {
          return item !== val
        })
      } else {
        this.supporting.push(val)
      }
      this.bodyObj.supporting = this.supporting.join('|')
    },
    async onSubmit () {
      this.isLoading = true
      if (this.uploader.length === 0) {
        this.$toast.fail('请上传图片')
        console.log('obj', this.bodyObj)
        this.isLoading = false
        return
      }
      const formData = new FormData()
      this.uploader.forEach(item => formData.append('file', item.file))
      console.log(this.uploader[0].file)
      const res1 = await imgPubilsh(formData)
      console.log('img', res1.data.body)
      this.bodyObj.houseImg = res1.data.body.join('|')
      console.log('img1', this.bodyObj.houseImg)
      console.log('1', this.bodyObj)
      if (!Object.values(this.bodyObj).every(item => Boolean(item))) {
        this.$toast.fail('请输入完整信息')
        console.log('obj', this.bodyObj)
        this.isLoading = false
        return
      }
      try {
        const res = await publishHouse(this.bodyObj)
        const that = this
        if (res.data.status === 200) {
          this.$dialog.confirm({
            message: '发布成功,是否查看发布房源'
          }).then(() => { that.$router.push('/manage') }).catch(() => {
            that.bodyObj = {
              title: null,
              description: null,
              houseImg: null,
              oriented: null,
              supporting: null,
              price: null,
              roomType: null,
              size: null,
              floor: null,
              community: null
            }
            this.community = this.roomType = this.floor = this.oriented = null
            this.supporting = this.uploader = []
          })
        } else {
          this.$toast.fail('发布失败，请重试')
        }
        this.isLoading = false
      } catch (err) {
        console.log(err)
      }
      this.isLoading = false
    },
    async onCancel () {
      await this.$dialog.confirm({
        message: '放弃发布房源'
      })
      this.$router.go(-1)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { FindCommunity }

}
</script>

<style scoped lang='less'>
.main {
  background-color: #f5f5f9;
  padding-bottom: 70px;
}
.info {
  /deep/.van-field__label {
    font-size: 15px;
    color: #1cb676 !important;
  }
}
// 房屋配置
.furniture {
  background-color: #f6f5f6;
  padding-bottom: 20px;
  .support {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    width: 375px;
    height: 161px;
    background-color: #fff;
    /deep/li {
      display: list-item !important;
      width: 75px !important;
      height: 50px !important;
      margin-top: 10px;
      margin-bottom: 10px;
      text-align: center;
      .iconpark-icon {
        width: 23px;
        height: 23px;
      }
      p {
        font-size: 14px;
        margin-top: -5px;
      }
    }
  }
}

// 底部按钮
.btn {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  height: 45px;
  line-height: 45px;
  z-index: 1;
  color: #fff;
  font-size: 15px;
  background-color: #fff;
  .cancel {
    color: #21b97a;
    width: 183.5px;
    height: 100%;
    border: none;
  }
  .submit {
    margin-left: 10px;
    width: 183.5px;
    height: 100%;
    background-color: #21b97a;
    color: #fff;
  }
}
.van-picker {
  .van-picker__toolbar {
    /deep/ .van-picker__confirm {
      color: #108ee9 !important;
      font-size: 17px;
    }
  }
}
.active {
  color: #21b97a;
}
</style>
