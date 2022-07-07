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
      />
      <van-field
        v-model="price"
        :label="'租' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '金'"
        placeholder="请输入租金/月"
        type="Number"
      >
        <template #extra>￥/月</template></van-field
      >
      <van-field
        v-model="size"
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
          :columns="roomTypeColumns"
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
          :columns="floorColumns"
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
          :columns="orientedColumns"
          @confirm="onConfirm"
          @cancel="showOriented = false"
        />
      </van-popup>
      <!-- 房屋标题 -->
      <div>
        <van-field label="房屋标题" readonly />
        <van-field
          v-model="title"
          rows="2"
          type="textarea"
          placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
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
          <li>
            <iconpark-icon name="yigui"></iconpark-icon>
            <p>衣柜</p>
          </li>
          <li>
            <iconpark-icon name="xiyiji"></iconpark-icon>
            <p>洗衣机</p>
          </li>
          <li>
            <iconpark-icon name="kongtiao"></iconpark-icon>
            <p>空调</p>
          </li>
          <li>
            <iconpark-icon name="tianranqi"></iconpark-icon>
            <p>天然气</p>
          </li>
          <li>
            <iconpark-icon name="bingxiang"></iconpark-icon>
            <p>冰箱</p>
          </li>
          <li>
            <iconpark-icon name="nuanqi"></iconpark-icon>
            <p>暖气</p>
          </li>
          <li>
            <iconpark-icon name="dianshi"></iconpark-icon>
            <p>电视</p>
          </li>
          <li>
            <iconpark-icon name="reshuiqi"></iconpark-icon>
            <p>热水器</p>
          </li>
          <li>
            <iconpark-icon name="kuandai"></iconpark-icon>
            <p>宽带</p>
          </li>
          <li>
            <iconpark-icon name="shafa"></iconpark-icon>
            <p>沙发</p>
          </li>
        </ul>
      </div>
      <!-- 房屋描述 -->
      <div>
        <van-field label="房屋描述" readonly />
        <van-field
          v-model="description"
          rows="5"
          autosize
          type="textarea"
          placeholder="请输入房屋描述信息"
        />
      </div>
      <!-- 表单底部按钮 -->
      <div class="btn">
        <van-button class="cancel">取消</van-button>
        <van-button class="submit" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { submitHouse } from '@/api/rental'
export default {
  created () { },
  data () {
    return {
      value: '',
      showPicker: false,
      uploader: [],
      community: '',
      price: '',
      size: '',
      showRoomType: false,
      roomType: '',
      roomTypeColumns: ['一室', '二室', '三室', '四室', '四室+'],
      showFloor: false,
      floor: '',
      floorColumns: ['高楼层', '中楼层', '低楼层'],
      showOriented: false,
      oriented: '',
      orientedColumns: ['东', '西', '南', '北', '东南', '东北', '西南', '西北'],
      title: '',
      supporting: [],
      description: ''
    }
  },
  methods: {
    onConfirm (value) {
      if (this.showRoomType) {
        this.roomType = value
        this.showRoomType = false
      } else if (this.showFloor) {
        this.floor = value
        this.showFloor = false
      } else if (this.showOriented) {
        this.oriented = value
        this.showOriented = false
      }
    },
    onSubmit () {
      submitHouse()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}

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
</style>
