<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- Footer组件在登录和注册的时候隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

export default {
    name: "App",
    components: { Header,Footer },
    mounted() { //派发actions,获取服务器数据，在一开始页面加载完毕就获取数据且执行一次，提升性能优化
      this.$store.dispatch("categoryList");
    }
}
</script>

