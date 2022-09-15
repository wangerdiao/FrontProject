<!-- 全局组件轮播图 -->
<template>
   <div class="swiper-container" ref="mySwiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="carousel in list"
              :key="carousel.id"
             >
              <img :src="carousel.imgUrl" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
</template>

<script>
    import Swiper from "swiper";
export default {
    name:'Carousel',
    props:['list'],
    watch: {
        list: {
      //监听bannerList发生变化，由空数组转化为数组里有四个元素
      immediate:true,
      handler(newValue, oldValue) {
        //执行handler时只能保证bannerList数据有了，不能保证v-for执行结束了，只有v-for执行结束了才有结构
        this.$nextTick(() => {//在下次DOM更新循环结束之后，执行延迟函调。在修改数据之后，立即使用这个方法获取更新后的DOM
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true, //点击小球可以切换
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
}
</script>

<style>

</style>