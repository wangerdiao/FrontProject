import { v4 as uuidv4 } from 'uuid'; //生成一个随机字符串作为游客身份持久存储
export const getUUid = () => {
    let uuid_token = localStorage.getItem('UUIDTOKEN') //先从本地获取uuid
    if(!uuid_token) { //没有uuid执行以下代码
        uuid_token = uuidv4() //生成游客临时身份
        localStorage.setItem('UUIDTOKEN',uuid_token) //进行本地存储
    }
    return uuid_token
}