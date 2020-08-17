<template>
    <div class="list">
        <b-scroll class="content" ref="scroll">
            <cart-list-item
                    v-for="(item, index) in getList"
                    :key="index"
                    :list-data="item"
            ></cart-list-item>
        </b-scroll>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import CartListItem from "./CartListItem";
    import BScroll from "../../../components/common/bscroll/BScroll";
    export default {
        name: "cartList",
        computed: {
            ...mapGetters(['getList'])
        },
        components:{
            CartListItem,
            BScroll
        },
        activated() {
            this.$refs.scroll.refresh()
        }
    }
</script>

<style scoped>
    .list{
        height: calc(100% - 44px - 49px - 40px);
    }
    .content{
        height: 100%;
        overflow: hidden;
    }
</style>