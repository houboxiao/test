import Toast from "./Toast";

const obj = {}

obj.install = function (Vue) {
    // console.log('执行了install函数', Vue);

    //1.创建组建构造器
    const toastContrustor = Vue.extend(Toast)

    //2.通过new的方式，根据组建构造器，可以创建出来一个组件对象
    const toast = new toastContrustor()

    //3.将组件对象，手动挂载到某一个元素上
    //将toast组件挂载到一个div上
    toast.$mount(document.createElement('div'))

    //4.toast.$el对应的就是上面的div，再将toast.$el添加到body里
    document.body.appendChild(toast.$el)


    Vue.prototype.$toast = toast;

}



export default obj