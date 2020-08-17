import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/common/toast/index'
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

//定义事件总线
Vue.prototype.$bus = new Vue()
//use之后会执行toast的install方法
Vue.use(toast)
//解决移动端300ms延迟
FastClick.attach(document.body)
//图片懒加载，将img标签的 src 改为 v-lazy
Vue.use(VueLazyload, {
  //占位图
  loading: require('./assets/img/common/placeholder.png')
})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
