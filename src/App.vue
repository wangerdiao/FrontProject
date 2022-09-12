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
    components: { Header,Footer }
}
</script>

