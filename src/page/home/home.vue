<template>
  <div id="Home">
    <top-bar></top-bar>
    <div class="wrapper">
      <div class="main">
        <div class="container">
          <transition name="move" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/axios/api/commonAPI";
import topBar from "../../components/topBar/topBar";
import { mapMutations } from "vuex";
export default {
  name: "Home",
  components: {
    topBar
  },
  data() {
    return {};
  },
  mounted() {
    this.queryCitys();
  },
  methods: {
    ...mapMutations(["saveCityList"]),
    //查询
    queryCitys() {
      const ctx = this;
      API.queryCitys().then(function(result) {
        ctx.saveCityList(result.data);
        ctx.loading = false;
      });
    }
  }
};
</script>
<style scoped>
</style>
