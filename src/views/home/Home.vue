<template>
    <div id="home">
        <nav-bar class="nav-home"><div slot="center">购物街</div></nav-bar>
        <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @changeGoods="changeGoods" ref="tabControl2"
            v-show="isShowTab"
        />

        <b-scroll class="content" ref="scroll" @thePosition="checkPos" @loadMore="loadMore">
            <home-swiper :banners="banners" @swiperImageLoad="getOffsetHeight"/>
            <recommends-view :recommends="recommends"/>
            <feature-view/>
            <tab-control :titles="['流行', '新款', '精选']" @changeGoods="changeGoods" ref="tabControl"/>
            <goods-list :goodsList="trueGoods"/>
        </b-scroll>
        <back-top @click.native="backTop" v-show="isShow"/>




    </div>
</template>

<script>
    import BScroll from "../../components/common/bscroll/BScroll";
    import NavBar from "../../components/common/navbar/NavBar";
    import BackTop from "../../components/content/backTop/BackTop";
    import TabControl from "../../components/content/tabControl/TabControl";
    import GoodsList from "../../components/content/goods/GoodsList";


    import HomeSwiper from "./childrenComps/HomeSwiper";
    import RecommendsView from "./childrenComps/RecommendsView";
    import FeatureView from "./childrenComps/FeatureView";

    import {getHomeMultidata, getGoodsData} from "../../network/home";
    import {debounce} from "../../components/common/utils/debounce";
    import {itemListenerMixin, goBackTop} from "../../components/common/utils/mixin";

    export default {
        name: "Home",
        data(){
            return{
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []},
                },
                currentType: 'pop',
                isShow: false,
                isLoad: false,
                isShowTab: false,
                tabOffsetHeight: 0,
                saveY: 0, // 保存离开界面时的位置
            }
        },
        //添加混入
        mixins: [itemListenerMixin, goBackTop],
        components: {
            NavBar,
            HomeSwiper,
            RecommendsView,
            FeatureView,
            TabControl,
            GoodsList,
            BScroll,
            BackTop

        },
        //创建后发送网络请求，请求数据
        created() {
            //请求组件图片数据
            this.getHomeMultidata()

            //请求商品数据
            this.getGoodsData('pop')
            this.getGoodsData('new')
            this.getGoodsData('sell')


        },
        //获取dom中的元素必须在mounted里进行
        mounted() {
            //图片加载完成后，通过时间总线监听请求，调用方法
            // let refresh = debounce(this.$refs.scroll.refresh, 50)
            // this.theRefresh = () => {
            //     //重新计算可滑动高度
            //     refresh()
            // }
            // this.$bus.$on('itemImgLoad', this.theRefresh)

            //获取tabControl的offsetTop
            //所有的组件都有一个属性$el:用于获取组件中的元素
            // console.log(this.$refs.tabControl.$el.offsetTop);
        },
        //回到界面时返回之前的位置
        activated() {
            this.$refs.scroll.scrollTo(0, this.saveY, 0)
            // console.log(this.$refs.scroll.refresh);
            this.$refs.scroll.refresh()
        },
        //离开界面时将当前位置保存
        deactivated() {
            //1.保存Y值
            this.saveY = this.$refs.scroll.scroll.y
            //2.取消全局事件监听
            this.$bus.$off('itemImgLoad', this.theRefresh)
        },
        methods: {
            // 事件监听相关代码
            changeGoods(index){
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                }
                this.$refs.tabControl.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
            },
            //实现回到顶部的功能
            backTop(){
                // this.$refs.scroll.scrollTo(0,0)
                // console.log('....');
                // console.log(this.$refs.scroll);
                // console.log(this.$refs.scroll.bScroll);
                // console.log(this.$refs.scroll.bScroll.scrollTo(0, 0));
                // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
                this.$refs.scroll.scrollTo(0,0)
            },
            checkIsShow(position){
                //1.下拉一定高度显示回到顶部按钮
                this.isShow = (-position.y) > 1000
            },
            //监控位置信息，根据position完成相应的操作
            checkPos(position){
                //1.下拉一定高度显示回到顶部按钮
                // this.isShow = (-position.y) > 1000
                this.checkIsShow(position)
                //2.position>tabOffsetHeight时将设置停留
                this.isShowTab = (-position.y) > this.tabOffsetHeight
                // console.log(this.isShowTab);
            },
            //拉到底部继续加载数据
            loadMore(){
                this.getGoodsData(this.currentType)

            },
            //获取要设置TabControl停留的高度tabOffsetHeight
            getOffsetHeight(){
                if(!this.isLoad){
                    this.tabOffsetHeight = this.$refs.tabControl.$el.offsetTop
                    this.isLoad = true
                }
            },




            //网络请求相关代码
            getHomeMultidata(){
                getHomeMultidata().then(res => {
                    this.banners = res.data.banner.list
                    this.recommends = res.data.recommend.list
                })
            },
            //获得商品数据
            getGoodsData(type){
                const thePage = this.goods[type].page + 1
                getGoodsData(type, thePage).then(res => {
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1
                    //使下拉加载更多数据可以再次触发
                    this.$refs.scroll.finishPullUp()
                })



                // 往数组里添加新数组:
                // totalNums = [1, 2, 6 ,4]
                // num1 = [5, 7, 8, 9]
                // totalNums.push(...num1)
            }
        },
        computed: {
            trueGoods(){
                return this.goods[this.currentType].list
            }
        }
    }
</script>

<style scoped>
    #home{
        padding-top: 44px;
        height: 100vh;
        position: relative;/*相对定位*/
    }
    .tab-control{
        /*margin-top: 44px;*/
        position: relative;
        z-index: 9;
    }

    .nav-home{
        background-color: var(--color-tint);
        color: white;


        /*使用原生滚动时设置*/
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9;
    }




    .content{
        /*绝对定位*/
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
        /*overflow: hidden;*/
    }

    /*.content{*/
    /*    height: calc(100% - 93px);*/
    /*    overflow: hidden;*/
    /*    margin-top: 44px;*/
    /*}*/
</style>
