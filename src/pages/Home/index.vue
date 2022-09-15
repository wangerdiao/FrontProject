<template>
  <div>
    <!-- 三级联动----全局组件,所以不需要注册 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :floorList="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "./Recommend/index.vue";
import Rank from "./Rank/index.vue";
import Like from "./Like/index.vue";
import Floor from "./Floor/index.vue";
import Brand from "./Brand/index.vue";
import { mapState } from 'vuex';
export default {
  name: "",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() { //不能再floor组件内派发action,因为需要v-for来遍历内容不同的floor组件
    this.$store.dispatch('getFloorList') //派发actions，获取家用电气的数据
  },
  computed:{
    ...mapState({
      floorList:(state) => state.home.floorList
    })
  }
};
</script>

<style>
</style>