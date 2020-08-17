import BackTop from "../../content/backTop/BackTop";
import {debounce} from "./debounce";

//混入
export const itemListenerMixin = {
    data(){
        return {
            theRefresh: null,
            refresh: null
        }
    },
    methods: {

    },
    component: {

    },
    mounted(){
        this.refresh = debounce(this.$refs.scroll.refresh, 50)
        this.theRefresh = () => {
            //重新计算可滑动高度
            this.refresh()
        }
        this.$bus.$on('itemImgLoad', this.theRefresh)
        // console.log('我是混入的数据');
    }
}


//通过混入实现 返回顶部按钮
export const goBackTop = {
    data(){
        return{
            isShow: false
        }
    },
    components: {
        BackTop
    },
    methods: {
        checkIsShow(position){
            //1.下拉一定高度显示回到顶部按钮
            this.isShow = (-position.y) > 1000
        },
        backTop(){
            //返回顶部
            this.$refs.scroll.scrollTo(0,0)
        },
    }
}