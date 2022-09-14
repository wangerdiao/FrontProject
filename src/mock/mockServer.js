import Mock from 'mockjs' //引入mockjs模块
//把JSON数据格式引入进来【JSON数据格式没有暴露，但是可以引入】
//原因是webpack默认对外暴露：图片，JSON数据格式
import banner from './banner.json'
import floor from './floor.json'
//mock数据：第一个参数为请求地址，第二个参数：请求数据
Mock.mock("/mock/banner",{code:200,data:banner})//模拟首页大的轮播图和数据
Mock.mock("/mock/floor",{code:200,data:floor})//模拟家用电气的数据