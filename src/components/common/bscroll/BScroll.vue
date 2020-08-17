<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "bScroll",
        data(){
            return{
                scroll: null
            }
        },
        // props: {
        //   probeType: {
        //       type: Number,
        //       default(){
        //           return 0
        //       }
        //   }
        // },
        mounted() {
            //1.创建scroll对象
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: 3,
                pullUpLoad: true,
                click: true
            })
            this.scroll.scrollTo(0, 0)
            //2.监控滚动的位置
            this.scroll.on('scroll', (position) => {
                // console.log(position);
                this.$emit('thePosition', position)
            })
            //3.添加下拉到底部出发的事件
            this.scroll.on('pullingUp', () => {
                // console.log('下拉加载更多');
                this.$emit('loadMore')
            })
        },
        methods: {
            scrollTo(x, y, time=300){
                this.scroll && this.scroll.scrollTo(x, y, time)
            },
            finishPullUp(){
                this.scroll && this.scroll.finishPullUp()
            },
            refresh(){
                this.scroll && this.scroll.refresh()

            }
        }

    }
</script>

<style scoped>

</style>