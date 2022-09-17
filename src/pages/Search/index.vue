<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-show="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <!-- keyword的面包屑 -->
            <li class="with-x" v-show="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyWord">×</i></li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-show="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removeTrademark">×</i></li>
            <!-- 平台属性面包屑 -->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">{{attrValue.split(":")[1]}}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <!-- 价格结构 -->
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active: isOne}" @click="changeOrder(1)">
                  <a >综合 <span v-show="isOne" class="iconfont" :class="{'icon-up':isAsc,'icon-down':isDesc}"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder(2)">
                  <a >价格  <span v-show="isTwo" class="iconfont" :class="{'icon-up':isAsc,'icon-down':isDesc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"><img :src="good.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
         <!-- 分页器 -->
         <Pagination></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import { mapGetters } from 'vuex'
import Pagination from '../../components/Pagination/index.vue'
  export default {
    name: 'Search',
    components: { SearchSelector, Pagination },
    data() {
      return {
        searchParams:{
        "category1Id": "", //一级分类id
        "category2Id": "",   //二级分类id
        "category3Id": "",  //三级分类id
        "categoryName": "", //分类名字
        "keyword": "",  //关键字
        "order": "1:desc", //排序 
        "pageNo": 1, //分页器：代表当前第几页
        "pageSize": 3, //每一个展示数据的个数
        "props": [], //平台售卖属性操作带的参数
        "trademark": "" //品牌
        }
      }
    },
    beforeMount(){
      // this.searchParams.category1Id = this.$route.query.category1Id
      // this.searchParams.categoryName = this.$route.query.categoryName  //复杂形写法
      Object.assign(this.searchParams,this.$route.query,this.$route.params) //简单写法  
    },
    mounted() {
      this.getData() //在发送请求之前要带给服务器参数【searchParams参数发生变化，数值带给服务器】
    },
    computed:{
      ...mapGetters(['goodsList']),
      isOne() { //排序样式
        return this.searchParams.order.indexOf('1') != -1
      },
      isTwo() {
        return this.searchParams.order.indexOf('2') != -1
      },
      isAsc() { //排序icon
        return this.searchParams.order.indexOf('asc') != -1
      },
      isDesc() {
        return this.searchParams.order.indexOf('desc') != -1
      }
    },
    methods:{
      getData() { //search模块需要经常发送请求，把请求封装成函数，需要时调用即可
        this.$store.dispatch('getSearchList',this.searchParams)
      },
      removeCategoryName() { //删除分类
        //带给服务器的参数可有可无，字符串为空还是会带给服务器，但undefined就不会带给服务器
        this.searchParams.categoryName = '' //会带给服务器
        this.searchParams.category1Id = undefined //不会带给服务器，提升性能
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
        this.getData()
       //修改地址栏：在当前路由组件下自己跳到自己的路由,删除query参数，params参数不删除
        this.$router.push({name:'search',params:this.$route.params})//没有params参数默认为空对象
      },
      removeKeyWord() { //删除keyword
        this.searchParams.keyword = undefined 
        this.getData() //删除后还要再发请求
        this.$bus.$emit('clearKeyWord') //通知兄弟组件Header删除keyword
        this.$router.push({name:'search',query:this.$route.query}) //路由重新跳转，删除params参数，不删除query参数
      },
      trademarkInfo(trademark) { //自定义事件
        this.searchParams.trademark = `${trademark.tmId} : ${trademark.tmName}` //整理参数
        this.getData() // 再次发送请求获取数据
      },
      removeTrademark() { //删除品牌面包屑
        this.searchParams.trademark = undefined || ''
        this.getData() // 再次发送请求
      },
      attrInfo(attr,value) { //收集平台属性值
        let props = `${attr.attrId}:${value}:${attr.attrName}` //整理平台属性的参数
        if(this.searchParams.props.indexOf(props)==-1)  this.searchParams.props.push(props)  //数组去重判断
        this.getData()
      },
      removeAttr(index) { //删除平台属性面包屑
        this.searchParams.props.splice(index,1) //删除对应索引的面包屑
        this.getData()
      },
      changeOrder(flag) { //传递参数flag,判断点击的综合还是价格
        let originOrder = this.searchParams.order
        let originFlag = this.searchParams.order.split(':')[0] //第一次默认为1
        let originSort = this.searchParams.order.split(':')[1] //第一次默认为desc
        let newOrder = ''
        if(originFlag==flag) { //第一次点击为综合时，修改排序     这里判断的是否点击了同一个按钮
          newOrder = `${originFlag}:${originSort==='desc'?'asc':'desc'}`
          console.log(newOrder)
        }else {  //第一次点击的是价格，默认为desc     判断点击不同的按钮
          newOrder = `${flag}:${'desc'}`
          console.log(newOrder) 
        }
        this.searchParams.order = newOrder  //修改order参数，后面重新修改了originFlag,originSort
        this.getData() //重新发送请求
      }
    },
    watch:{
      $route(newValue,oldValue) { //监听路由信息是否发生变化，变化重新发送请求
        //每一次请求之前， 要置空123级id，让他接受下一次的123级id
        this.searchParams.category1Id = ''
        this.searchParams.category2Id = ''
        this.searchParams.category3Id = ''
        Object.assign(this.searchParams,this.$route.query,this.$route.params) //再次发送请求带整理参数带给服务器
        this.getData()
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>