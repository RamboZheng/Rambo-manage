/**
 * Created by  Rambo on 2019/10/22.
 */
//
import Vue from "vue";
import Router from "vue-router";
// 匹配
const Home = resolve => require(["../page/home/home"], resolve);
const AutoMate = resolve => require(["../page/mate/autoMate"], resolve);
const HouseStatistic = resolve =>
  require(["../page/mate/houseStatistic"], resolve);
const PeopleMate = resolve => require(["../page/mate/peopleMate"], resolve);
// 管理
const ManageList = resolve => require(["../page/manage/manageList"], resolve);
// 下架
const PositionReason = resolve =>
  require(["../page/underList/positionReason"], resolve);
// 暂时隐藏下架原因
// const UnderReason = resolve =>
//   require(["../page/underList/underReason"], resolve);
const UnderRecode = resolve =>
  require(["../page/underList/underRecode"], resolve);
const UnderSticky = resolve =>
  require(["../page/underList/underSticky"], resolve);
const UnderPosition = resolve =>
  require(["../page/underList/underPosition"], resolve);
// 统计
const ClaimStatistic = resolve =>
  require(["../page/statistic/claimStatistic"], resolve);
const GrabStatistic = resolve =>
  require(["../page/statistic/grabStatistic"], resolve);
const MateStatistic = resolve =>
  require(["../page/statistic/mateStatistic"], resolve);
const StickyStatistic = resolve =>
  require(["../page/statistic/stickyStatistic"], resolve);
const TotalStatistic = resolve =>
  require(["../page/statistic/totalStatistic"], resolve);

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [{
      path: "",
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home,
      meta: {
        title: "房源管理平台"
      },
      children: [{
          path: "/home/autoMate",
          component: AutoMate,
          meta: {
            title: "自动匹配房源"
          }
        },
        {
          path: "/home/peopleMate",
          component: PeopleMate,
          meta: {
            title: "人工匹配房源"
          }
        },
        {
          path: "/home/houseStatistic",
          component: HouseStatistic,
          meta: {
            title: "基准房源统计"
          }
        },
        {
          path: "/home/manageList",
          component: ManageList,
          meta: {
            title: "房源管理列表"
          }
        },
        {
          path: "/home/positionReason",
          component: PositionReason,
          meta: {
            title: "下架原因统计"
          }
        },
        // 暂时隐藏下架原因
        // {
        //   path: "/home/underReason",
        //   component: UnderReason,
        //   meta: {
        //     title: "下架原因统计"
        //   }
        // },
        {
          path: "/home/underRecode",
          component: UnderRecode,
          meta: {
            title: "房源下架记录"
          }
        },
        {
          path: "/home/underSticky",
          component: UnderSticky,
          meta: {
            title: "置顶下架记录"
          }
        },
        {
          path: "/home/underPosition",
          component: UnderPosition,
          meta: {
            title: "展位下架记录"
          }
        },
        {
          path: "/home/totalStatistic",
          component: TotalStatistic,
          meta: {
            title: "房源数据概览"
          }
        },
        {
          path: "/home/grabStatistic",
          component: GrabStatistic,
          meta: {
            title: "抓取量统计"
          }
        },
        {
          path: "/home/mateStatistic",
          component: MateStatistic,
          meta: {
            title: "匹配量统计"
          }
        },
        {
          path: "/home/claimStatistic",
          component: ClaimStatistic,
          meta: {
            title: "认领统计"
          }
        },
        {
          path: "/home/stickyStatistic",
          component: StickyStatistic,
          meta: {
            title: "置顶统计"
          }
        }
      ]
    }
  ]
});
