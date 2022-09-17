<template>
    <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
      <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
      <button v-if="startNumAndEndNum.start > 2"> ···</button>
      <!-- 遍历中间部分 -->
      <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page >= startNumAndEndNum.start" @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{page}}</button>
     
      
      <button v-if="startNumAndEndNum.end < totalPage-1 ">···</button>
      <button v-if="startNumAndEndNum.end < totalPage " @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
      <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
      
      <button style="margin-left: 30px">共{{total}}条</button>
    </div>
  </template>
  
  <script>
    export default {
      name: "Pagination",
      data() {
        return {
          startNum:{}
        }
      },
      props:['total','pageNo','pageSize','continues'],
      computed:{
        totalPage() { //计算总共多少页
          return Math.ceil(this.total/this.pageSize) //向上取整
        },
        startNumAndEndNum() {
          const {continues,pageNo,totalPage} = this //解构赋值
          let start = 0, end = 0 //先定义两变量存储起始页 与结束页
          if(continues > totalPage) { //不正常情况 总的页数小于连续页数
            start = 1
            end = totalPage
          } else { //正常情况
            start = pageNo - parseInt(continues/2)  //起始数字  例如pageNo =8  起始数字为6
            end = pageNo + parseInt(continues/2)   //结束数字   结束数字为10
            if(start <1) {  //不正常情况 pageNo为1时 start会出现0和负数
              start = 1
              end = continues
            }
            if(end > totalPage){  //不正常情况 end >总页数
              end = totalPage
              start = end - continues + 1
            }
          }
          return {start,end}
        }
      }
    }
  </script> 
  
  <style lang="less" scoped>
    .pagination {
        text-align: center;
      button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;
  
        &[disabled] {
          color: #c0c4cc;
          cursor: not-allowed;
        }
  
        &.active {
          cursor: not-allowed;
          background-color: #409eff;
          color: #fff;
        }
      }
    }
    .active {
      background-color: skyblue;
    }
  </style>