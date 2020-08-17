<template>
    <div class="shopCart">
        <nav-bar class="shopCartBar">
            <div slot="center">购物车({{getLength}})</div>
        </nav-bar>
        <cart-list></cart-list>
        <cart-bottom-bar></cart-bottom-bar>

    </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";
    import CartBottomBar from "./childrenComps/CartBottomBar";
    import CartList from "./childrenComps/CartList";
    import { mapGetters } from 'vuex'
    export default {
        name: "ShopCart",
        components: {
            NavBar,
            CartList,
            CartBottomBar
        },
        computed: {
            // mapGetters可以将getters中的属性部分映射到computed中
            // 写法一:
            // ...mapGetters(["getLength", "getList"])
            //写法二: 可以自己命名
            ...mapGetters({
                getLength: 'getLength',
                getList: 'getList'
            })
            // cartLength(){
            //     return this.$store.getters.getLength
            // }
        }
    }
</script>

<style scoped>
    .shopCartBar{
        background-color: var(--color-tint);
        color: white;
        font-weight: 700;
    }
    .shopCart{
        height: 100vh;
    }
</style>
