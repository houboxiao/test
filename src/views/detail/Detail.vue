<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav-bar" @goThere="goThere" ref="debar"></detail-nav-bar>
        <b-scroll class="content" ref="scroll" @thePosition="contentScroll">
<!--            <ul>-->
<!--                <li v-for="item in $store.state.cartGoodsList">{{item}}</li>-->
<!--            </ul>-->
            <detail-swiper :top-image="images"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imgLoad="getRefresh"></detail-goods-info>
            <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
            <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
            <goods-list :goods-list="recommend" ref="recommend"></goods-list>

        </b-scroll>
        <back-top @click.native="backTop" v-show="isShow"/>
        <detail-bottom-bar @addShopCart="addTheCart"></detail-bottom-bar>
    </div>
</template>

<script>
    import DetailNavBar from "./childrenComps/DetailNavBar";
    import DetailSwiper from "./childrenComps/DetailSwiper";
    import DetailBaseInfo from "./childrenComps/DetailBaseInfo";
    import DetailShopInfo from "./childrenComps/DetailShopInfo";
    import DetailGoodsInfo from "./childrenComps/DetailGoodsInfo";
    import DetailParamInfo from "./childrenComps/DetailParamInfo";
    import DetailCommentInfo from "./childrenComps/DetailCommentInfo";
    import DetailBottomBar from "./childrenComps/DetailBottomBar";
    import GoodsList from "../../components/content/goods/GoodsList";

    import BScroll from "../../components/common/bscroll/BScroll";


    import {getDetail, getRecommend} from "../../network/detail";
    import {Goods ,Shop, GoodsParam} from "../../network/detail";
    import {debounce} from "../../components/common/utils/debounce";
    import {itemListenerMixin, goBackTop} from "../../components/common/utils/mixin";

    import {mapActions} from 'vuex'

    export default {
        name: "Detail",
        data(){
            return {
                iid: null,
                images: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommend: [],
                offSetTopList: [],
                scrollIndex: 0
            }
        },
        mixins: [itemListenerMixin, goBackTop],
        created() {
            //1.保存传入的iid
            this.iid = this.$route.params.iid
            //2.根据iid请求详情数据
            getDetail(this.iid).then(res => {
                //1.获取顶部轮播图信息
                const data = res.result;
                this.images = data.itemInfo.topImages

                //2.获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

                //3.获取店铺信息
                this.shop = new Shop(data.shopInfo)

                //4.获取商品详情信息
                this.detailInfo = data.detailInfo

                //5.获取商品尺寸信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

                //6.获取评论信息
                if(data.rate.cRate !== 0){
                    this.commentInfo = data.rate.list[0]
                }

            })
            //3.请求推荐数据
            getRecommend().then(res => {
                // console.log(res);
                this.recommend = res.data.list
            })

            //获取offSetTop方式一:错误  当前$el还未渲染
            // this.offSetTopList = []
            // this.offSetTopList.push(0);
            // this.offSetTopList.push(this.$refs.params.$el.offsetTop)
            // this.offSetTopList.push(this.$refs.comment.$el.offsetTop)
            // this.offSetTopList.push(this.$refs.recommend.$el.offsetTop)
            // console.log(this.offSetTopList);

            //获取offSetTop方式二:错误  当前图片还未加载完成
            // $nextTick中$el已经加载完成
           // this.$nextTick(() => {
           //     this.offSetTopList = []
           //     this.offSetTopList.push(0);
           //     this.offSetTopList.push(this.$refs.params.$el.offsetTop)
           //     this.offSetTopList.push(this.$refs.comment.$el.offsetTop)
           //     this.offSetTopList.push(this.$refs.recommend.$el.offsetTop)
               // console.log(this.offSetTopList);
           // })

        },
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
            // console.log('mounted');

            //获取offSetTop方式三: 错误 数据还未获取到
            // this.offSetTopList = []
            // this.offSetTopList.push(0);
            // this.offSetTopList.push(this.$refs.params.$el.offsetTop)
            // this.offSetTopList.push(this.$refs.comment.$el.offsetTop+10)
            // this.offSetTopList.push(this.$refs.recommend.$el.offsetTop-44)
        },
        activated() {

       },
        destroyed() {
            this.$bus.$off(this.$bus.$off('itemImgLoad', this.theRefresh))
        },
        methods: {
            ...mapActions(['addCartGoodsList']),
            addTheCart(){
                // console.log('加入了购物车!!!!!!');
                //1. 获取购物车需要展示的信息
                const product = {}
                product.image = this.images[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                product.iid = this.iid;

                //2. 将商品展示在购物车里
                //2.1 添加完成后，弹出弹窗(1.Promise,2.mapActions)
                // this.$store.dispatch('addCartGoodsList', product).then(res => {
                //     console.log(res);
                // })
                this.addCartGoodsList(product).then(res => {
                    console.log(res);
                    console.log(this.$toast);
                    this.$toast.showToast(res, 2000)

                })

                // console.log(this.$store.state.cartGoodsList);
            },
            getRefresh(){
                this.refresh()

                //获取offSetTop方式四: 正确  在所有图片加载完成后进行获取
                //实现点击标题，滚动到标题对应的展示位置
                this.offSetTopList = []
                this.offSetTopList.push(0);
                this.offSetTopList.push(this.$refs.params.$el.offsetTop-44)
                this.offSetTopList.push(this.$refs.comment.$el.offsetTop-44)
                this.offSetTopList.push(this.$refs.recommend.$el.offsetTop-44)
                //Number.MAX_VALUE可用的最大值
                this.offSetTopList.push(Number.MAX_VALUE)
            },
            goThere(index){
                this.$refs.scroll.scrollTo(0, -this.offSetTopList[index], 200)
            },
            //根据滑动位置更改标题
            contentScroll(position){
                //调用混入的checkIsShow方法
                this.checkIsShow(position)

                //根据滑动位置动态确定标题
                let positionY = -position.y
                const length = this.offSetTopList.length
                //判断方法一:
                // for (let i=0;i<length;i++){
                //     if (this.scrollIndex !== i && i<length-1 && positionY>=this.offSetTopList[i]&&positionY<this.offSetTopList[i+1] ||
                //         i==length-1 && positionY>this.offSetTopList[i]){
                //         this.scrollIndex = i
                //         console.log(this.scrollIndex);
                //         this.$refs.debar.currentIndex = this.scrollIndex
                //     }
                // }
                //判断方法二:
                //在offSetTopList中添加一个最大值并且遍历条件改为i<length-1   防止遍历溢出
                for (let i=0;i<length-1;i++){
                    if (this.scrollIndex!==i && positionY>this.offSetTopList[i] && positionY<this.offSetTopList[i+1]){
                        this.scrollIndex = i
                        this.$refs.debar.currentIndex = this.scrollIndex
                    }
                }
            }
        },
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,
            GoodsList,
            BScroll
        }
    }
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 11;
        background-color: white;
        height: 100vh;
    }
    .content{
        height: calc(100% - 44px - 49px);
    }
    .detail-nav-bar{
        background-color: white;
        /*使用原生滚动时设置*/
        position: relative;

        z-index: 11;
    }
</style>