<template>
  <div id="top-bar">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      text-color="#2C2F37"
      active-text-color="#6595F4"
      :default-active="$route.path"
      router
    >
      <template v-for="(item) in topBarInfo">
        <el-submenu :index="item.index" :key="item.index" v-if="item.subNav">
          <template slot="title">
            <span>{{item.title}}</span>
          </template>
          <el-menu-item
            @click="removeSession()"
            :index="list.index"
            v-for="(list) in item.subNav"
            :key="list.index"
          >{{list.title}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
    <div class="user-button">
      <div class="refresh-button" @click="refresh()">
        <img class="refresh-icon" src="@/assets/image/icon-refresh@2x.png" />
        <span class="refresh-text">刷新</span>
      </div>
      <div class="grey-bar"></div>
      <div class="user-login">
        <img class="user-img" src="@/assets/image/img-head@3x.png" />
        <el-dropdown @command="userMake()">
          <span class="el-dropdown-link" style="font-size: 14px;color: #475266;">
            用户名
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人资料</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "topBar",
  data() {
    return {
      topBarInfo: [
        {
          index: "1",
          title: "房源匹配",
          subNav: [
            {
              index: "/home/autoMate",
              title: "自动匹配房源"
            },
            {
              index: "/home/peopleMate",
              title: "人工匹配房源"
            },
            {
              index: "/home/houseStatistic",
              title: "基准房源统计"
            }
          ]
        },
        {
          index: "2",
          title: "房源管理",
          subNav: [
            {
              index: "/home/manageList",
              title: "房源管理"
            }
          ]
        },
        {
          index: "3",
          title: "下架记录",
          subNav: [
            {
              index: "/home/positionReason",
              title: "下架原因统计"
            },
            // 暂时隐藏下架原因
            // {
            //   index: "/home/underReason",
            //   title: "下架原因统计"
            // },
            {
              index: "/home/underRecode",
              title: "房源下架记录"
            },
            {
              index: "/home/underSticky",
              title: "置顶下架记录"
            },
            {
              index: "/home/underPosition",
              title: "展位下架记录"
            }
          ]
        },
        {
          index: "4",
          title: "数据统计",

          subNav: [
            {
              index: "/home/totalStatistic",
              title: "房源数据概览"
            },
            {
              index: "/home/grabStatistic",
              title: "抓取量统计"
            },
            {
              index: "/home/mateStatistic",
              title: "匹配量统计"
            },
            {
              index: "/home/claimStatistic",
              title: "认领统计"
            },
            {
              index: "/home/stickyStatistic",
              title: "置顶统计"
            }
          ]
        }
      ],
      userImg: "@/assets/image/img-head@3x.png"
    };
  },
  methods: {
    // 点击tab进去页面时删除锚点
    removeSession() {
      sessionStorage.clear();
    },
    refresh() {
      location.reload();
    },
    userMake() {
      console.log("用户操作");
    }
  }
};
</script>
<style lang='scss' scoped>
.user-button {
  position: absolute;
  top: 20px;
  right: 20px;
  .refresh-button {
    display: inline-block;
    vertical-align: middle;
    .refresh-icon {
      width: 14px;
      height: 14px;
      margin-right: 8px;
    }
    .refresh-text {
      color: #6595f4;
    }
  }
  .grey-bar {
    background: #edeff0;
    border-radius: 1px;
    width: 2px;
    height: 20px;
    display: inline-block;
    margin: 0 20px;
    vertical-align: middle;
  }
  .user-login {
    display: inline-block;
    vertical-align: middle;
    .user-img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 8px;
      vertical-align: middle;
    }
  }
}
</style>




