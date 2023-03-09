import axios from 'axios'

//创建axios的一个实例

let request = axios.create({
    baseURL: 'http://127.0.0.1:3000/',//接口统一域名
    timeout: 5000,//设置超时
    withCredentials: true,//关键
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
})

//------------------- 一、请求拦截器 忽略
request.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//----------------- 二、响应拦截器 忽略
request.interceptors.response.use(function (response) {
    // console.log(response.data)
    // if (response.data.code === 302) {
    //     window.location.href = '/login';
    // }
    console.log(response)
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    console.log('拦截器报错');
    console.log(error)
    return new Promise(error);
});

export default request;

