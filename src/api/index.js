//这个模块用来API接口的统一管理
import requests from './request'
import mockRequests from './mockAjax'
//三级联动接口/api/product/getBaseCategoryList
export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'}) //向后端服务器发送请求
export const reqGetBannerList = () => mockRequests.get('/banner')  //获取首页轮播图
export const reqGetFloorList = () => mockRequests.get('/floor')  //获取家用电气数据
//获取搜索模块的数据，地址为：/api/list 需要携带参数
//当前获取搜索模块数据的接口，给服务器传递一个默认参数（至少是一个空对象）
export const reqGetSearchInfo = (params) => requests({url:'/list',method:'POST',data:params})
//获取产品详细信息的接口 地址为：/api/item/{ skuId }
export const reqGetGoodsInfo = (skuId) => requests({url:`/item/${skuId}`,method:'GET'})
//添加至购物车的接口（获取更新某一个产品的个数） 地址：/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqGetOrUpdateShopCar = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'POST'})
//获取购物车列表信息 地址：/api/cart/cartList  方式get
export const reqGetShopCarList = () => requests({url:'/cart/cartList',method:'GET'})
//删除购物车接口  地址/api/cart/deleteCart/{skuId} 方法DElETE
export const reqDeleteCart = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'DELETE'})
//切换购物车物品选中状态的接口 地址/api/cart/checkCart/{skuID}/{isChecked} 方法get
export const reqIsChecked = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'GET'})
//获取验证码  地址/api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'GET'})
//用户注册 地址/api/user/passport/register
export const reqUserRegister = (data) => requests({url:`/user/passport/register`,data,method:'POST'})
//用户登录 地址/api/user/passport/login
export const reqUserLogin = (data) => requests({url:'/user/passport/login',data,method:'POST'})
//获取用于信息【需要带着token向服务器要用户信息】 地址：/api/user/passport/auth/getUserInfo
export const reqGetUserInfo = ()  => requests({url:'/user/passport/auth/getUserInfo',method:'GET'})
//退出登录接口 地址/api/user/passport/logout
export const loginOut = () => requests({url:'/user/passport/logout',method:'GET'})
//获取用户地址信息  地址/api/user/userAddress/auth/findUserAddressList
export const reqGetUserAddress = () => requests({url:'/user/userAddress/auth/findUserAddressList',method:'GET'})
//获取订单交易信息 地址/api/order/auth/trade
export const reqGetOrderInfo = () => requests({url:'/order/auth/trade',method:'GET'})
//商品提交订单接口 地址/api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'POST'})
//获取订单支付信息 地址/api/payment/weixin/createNative/{orderId}
export const getOrderInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'GET'})