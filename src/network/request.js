import axios from 'axios'


//Promise2:
export function request(config) {
  //1.创建axios实例
  const instance1 = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/z8',
    timeout: 5000
  })
  //2.创建拦截器
  //2.1 请求拦截器
  instance1.interceptors.request.use(config => {
    // console.log(config);
    //拦截后可以进行下列操作
    //1.比如config中的一些信息不符合服务器的要求

    //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标

    //3.某些网络请求(比如登录(token), 必须要携带一些特殊的信息)
    //拦截后必须将请求返回
    return config;
  },error => {
    console.log(error);
  })
  //2.2相应拦截器
  instance1.interceptors.response.use(res => {
    // console.log(res);
    //拦截后必须把res返回
    return res.data
  },error => {
    console.log(error);
  })


//因为axios会返回一个Promise，所以不用promise包装，
//   可以直接返回
//
// 3.发送真正的网络请求
  return instance1(config)
}
