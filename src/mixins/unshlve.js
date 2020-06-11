import COMMON from "@/axios/api/manageAPI";

export default {
  data() {
    return {
      dialogDetail: {}, // 弹出框信息
      showTip: false
    }
  },
  methods: {
    openDialog(row) {
      this.dialogDetail = row;
      this.getTip(this.dialogDetail.id);
    },
    closeDialog() {
      this.showTip = false;
      this.dialogDetail.unshelveReason = null;
    },
    // 下架房源
    showListCommit() {

      this.$confirm(
          `（房源ID ${this.dialogDetail.websiteHouseId})，确认要下架此房源吗？`,
          "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }
        )
        .then(() => {
          let {
            ...unshelveDetai
          } = {
            id: this.dialogDetail.id,
            operatorId: this.dialogDetail.operatorId || "yves",
            desc: this.dialogDetail.desc || null,
            unshelveReason: this.dialogDetail.unshelveReason
          };
          // 下架其他原因判断有无输入
          if (unshelveDetai.unshelveReason == "OTHER" && !unshelveDetai.desc) {
            this.$message({
              type: "info",
              message: "请输入下架原因！"
            });
            return;
          }
          // 下架房源接口
          this.unshelveHouse(unshelveDetai);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下架"
          });
        });
    },
    // 下架认领房源
    claimListCommit() {
      this.$confirm(
          `（房源ID ${this.dialogDetail.websiteHouseId})，确认要下架此房源吗？`,
          "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }
        )
        .then(() => {
          let {
            ...unshelveDetai
          } = {
            id: this.dialogDetail.id,
            operatorId: this.dialogDetail.brokerId || "yves",
            desc: this.dialogDetail.desc || null,
            unshelveReason: this.dialogDetail.unshelveReason
          };
          // 下架其他原因判断有无输入
          if (unshelveDetai.unshelveReason == "OTHER" && !unshelveDetai.desc) {
            this.$message({
              type: "info",
              message: "请输入下架原因！"
            });
            return;
          }
          // 下架房源接口
          this.unshelveClaimHouse(unshelveDetai);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下架"
          });
        });
    },
    // 下架置顶房源
    stickyListCommit() {
      this.$confirm(
          `（房源ID ${this.dialogDetail.websiteHouseId})，确认要下架此房源吗？`,
          "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }
        )
        .then(() => {
          let {
            ...unshelveDetai
          } = {
            id: this.dialogDetail.id,
            operatorId: this.dialogDetail.operatorId || "yves",
            desc: this.dialogDetail.desc || null,
            unshelveReason: this.dialogDetail.unshelveReason
          };
          // 下架其他原因判断有无输入
          if (unshelveDetai.unshelveReason == "OTHER" && !unshelveDetai.desc) {
            this.$message({
              type: "info",
              message: "请输入下架原因！"
            });
            return;
          }
          // 下架房源接口
          this.unshelveTopHouse(unshelveDetai);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下架"
          });
        });
    },
    // 获取下架提示
    getTip(id) {
      let ctx = this,
        {
          ...parme
        } = {
          id: id
        };
      // 下架房源提示
      if (this.name == 'showList') {
        COMMON.getUnshelveHouseTip(parme).then(function (result) {
          if (result.code == 'C0000') {
            ctx.dialogDetail.claimCount = result.data.claimCount || 0;
            ctx.dialogDetail.topCount = result.data.topCount || 0;
            ctx.showTip = true
          }
        });
        // 下架置顶提示
      } else if (this.name == 'stickyList') {
        COMMON.getUnshelveTopHouseTip(parme).then(function (result) {
          if (result.code == 'C0000') {
            ctx.dialogDetail.shortId = result.data.websiteHouseId || 0;
            ctx.showTip = true
          }
        });
      }
      this.dialogFormVisible = true;
    },
    // 提交房源下架
    unshelveHouse(info) {
      let ctx = this;
      COMMON.unshelveHouse(info).then(function (result) {
        if (result.success) {
          ctx.dialogFormVisible = false;
          ctx.$message({
            type: "success",
            message: "下架成功!"
          });
          ctx.getListData(ctx.condiction);
        } else {
          ctx.$message({
            type: "fail",
            message: "下架失败，请重试！"
          });
        }
      });
    },
    // 认领展位下架
    unshelveClaimHouse(info) {
      let ctx = this;
      COMMON.unshelveClaimHouse(info).then(function (result) {
        if (result.success) {
          ctx.dialogFormVisible = false;
          ctx.$message({
            type: "success",
            message: "下架成功!"
          });
          ctx.getListData(ctx.condiction);
        } else {
          ctx.$message({
            type: "fail",
            message: "下架失败，请重试！"
          });
        }
      });
    },
    // 置顶房源下架
    unshelveTopHouse(info) {
      let ctx = this;
      COMMON.unshelveTopHouse(info).then(function (result) {
        if (result.success) {
          ctx.dialogFormVisible = false;
          ctx.$message({
            type: "success",
            message: "下架成功!"
          });
          ctx.getListData(ctx.condiction);
        } else {
          ctx.$message({
            type: "fail",
            message: "下架失败，请重试！"
          });
        }
      });
    },
    tongihtDown() {
      this.$message({
        type: "fail",
        message: "此房源将在当天24点下架，请勿重复下架！"
      });
    }
  }
}
