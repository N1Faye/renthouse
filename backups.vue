<template>
  <div>
    <van-nav-bar title="标题" left-arrow @click-left="$router.go(-1)"
      ><template #title> <search-bar class="searchbar"></search-bar> </template
    ></van-nav-bar>
    <!-- tab -->
    <!-- <van-row>
      <van-col span="6" @click="show = !show"
        >区域<van-icon name="play" />
        <van-popup v-model="show" position="top" :style="{ height: '30%' }"
          >内容</van-popup
        ></van-col
      >
      <van-col span="6">方式<van-icon name="play" /></van-col>
      <van-col span="6">租金<van-icon name="play" /></van-col>
      <van-col span="6">筛选<van-icon name="play" /></van-col>
    </van-row> -->
    <div class="tab">
      <van-dropdown-menu>
        <van-dropdown-item title="区域"
          ><van-picker
            :columns="areaColumns"
            show-toolbar
            toolbar-position="bottom"
        /></van-dropdown-item>
        <van-dropdown-item title="方式">
          <van-picker
            :columns="wayColumns"
            show-toolbar
            toolbar-position="bottom"
        /></van-dropdown-item>
        <van-dropdown-item title="租金">
          <van-picker
            :columns="rentColumns"
            show-toolbar
            toolbar-position="bottom"
        /></van-dropdown-item>
        <!-- <van-dropdown-item title="筛选" >
        <van-picker
          :columns="rentColumns"
          show-toolbar
          toolbar-position="bottom"/>
          </van-dropdown-item> -->
      </van-dropdown-menu>
      <div class="filter"><span>筛选</span></div>
    </div>
    <!-- 租房信息 -->
    <div class="rentInfo">
      <a
        class="news"
        v-for="(item, index) in housesList"
        :key="index"
        :href="'http://liufusong.top/hkzf/#/detail/' + item.houseCode"
      >
        <div class="left"><img :src="baseurl + item.houseImg" alt="" /></div>
        <div class="right">
          <h3>{{ item.title }}</h3>
          <div class="desc">{{ item.desc }}</div>
          <div class="tags">
            <span class="tag" v-for="(item, index) in item.tags" :key="index">{{
              item
            }}</span>
          </div>
          <div class="price">{{ item.price }} <span>元/月</span></div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
export default {
  created () { },
  data () {
    return {
      show: false,
      areaColumns: [
        {
          text: '区域',
          children: [
          ]
        },
        {
          text: '地铁',
          children: [
          ]
        }
      ],
      wayColumns: ['不限', '整租', '合租'],
      rentColumns: []
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: { SearchBar }
}
</script>

<style scoped lang='less'>
/deep/.van-nav-bar__title {
  max-width: unset;
}
.searchbar {
  zoom: 0.9;
  margin-left: 40px;
  /deep/ .van-icon {
    color: #333;
  }
}

// 下拉菜单
.tab {
  display: flex;
  height: 48px;
  line-height: 48px;
  .filter {
    span {
      position: relative;
      box-sizing: border-box;
      max-width: 100%;
      padding: 0 0.21333rem;
      color: #323233;
      font-size: 0.4rem;
      line-height: 0.58667rem;
      &::after {
        position: absolute;
        top: 50%;
        right: -0.10667rem;
        margin-top: -0.13333rem;
        border: 0.08rem solid;
        border-color: transparent transparent #dcdee0 #dcdee0;
        transform: rotate(-45deg);
        opacity: 0.8;
        content: "";
      }
    }
  }
  .van-icon {
    transform: rotate(90deg);
    margin-left: 3px;
    color: #bbb;
    font-size: 8.49px;
  }
}
/deep/.van-dropdown-menu__bar {
  width: 281.25px !important;
  font-size: 17px;
  border: none !important;
}
/deep/.van-picker__toolbar {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  border-top: 1px solid #e9e9e9;
  .van-picker__cancel {
    width: 125px;
    color: #21b97a;
  }
  .van-picker__confirm {
    width: 250px;
    color: #fff;
    background-color: #21b97a;
  }
}
.filter {
  display: inline-block;
  width: 93px;
  height: 48px;

  text-align: center;
  font-size: 17px;

  .van-popup {
    position: fixed;
    top: 86px;
  }
}

.tab {
  position: sticky;
  top: 0;
  background: white;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 17px;
  border-bottom: 1px solid #e4e6f0;
  .van-icon {
    &::before {
      font-size: 12px;
      padding-right: 5px;
      padding-bottom: 3px;
      color: #bbb;
      transform: rotate(90deg);
    }
  }
}

// 租房信息
.rentInfo {
  margin: 0 20px;
  .news {
    display: flex;
    padding-top: 18px;
    height: 120px !important;
    width: 345px;
    border-bottom: 1px solid #e5e5e5;
    justify-content: space-around;
    .left {
      img {
        width: 106px;
        height: 80px;
      }
    }
    .right {
      padding-left: 12px;
      line-height: 22px;
      h3 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
        width: 227px;
        font-size: 15px;
        color: #394043;
      }
      .desc {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
        font-size: 12px;
        color: #afb2b3;
      }
      .tags {
        display: flex;
        height: 22px;
        .tag {
          display: inline-block;
          font-size: 12px;
          border-radius: 3px;
          padding: 4px 5px;
          margin-right: 5px;
          line-height: 12px;
          color: #39becd;
          background: #e1f5f8;
        }
      }

      .price {
        color: red;
        font-size: 16px;
        font-weight: bolder;
        span {
          font-size: 12px;
          font-weight: normal;
        }
      }
    }
  }
}
</style>
