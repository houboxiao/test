<template>
    <div class="cartBottom">
        <div class="cartBottomLeft" @click="selectAll">
            <check-button class="checkButton" :is-checked="isCheckedAll"></check-button>
            <span class="text">全选</span>
        </div>
        <div class="cartBottomCenter">合计:￥{{totalPrice}}</div>
        <div class="cartBottomRight" @click="payFor">去结算({{goodsCount}})</div>
    </div>
</template>

<script>
    import CheckButton from "../../../components/content/checkButton/CheckButton";
    import { mapGetters } from 'vuex'
    import {itemListenerMixin} from "../../../components/common/utils/mixin";
    export default {
        name: "CartBottomBar",
        components: {
            CheckButton
        },
        methods: {
            // 点击全选按钮
            selectAll(){
                console.log('------');
                if(this.isCheckedAll){
                    //全部选中
                    this.$store.state.cartGoodsList.forEach(item => item.checked = false)
                }else{
                    //部分或全部不选中
                    this.$store.state.cartGoodsList.forEach(item => item.checked = true)
                }
            },
            payFor(){
                if (this.$store.state.cartGoodsList.filter(item => item.checked).length ===0){
                    this.$toast.showToast('请选择要结算的商品', 2000)
                }
            }
        },
        computed: {
            ...mapGetters["getList"],
            totalPrice(){
                return this.$store.state.cartGoodsList.filter(item => {
                    return item.checked
                }).reduce((preValue, item) => {
                    return preValue + item.count*item.price
                }, 0).toFixed(2)
            },
            goodsCount(){
                return this.$store.state.cartGoodsList.filter(item => {
                    return item.checked
                }).length
            },
            //全选功能
            isCheckedAll(){
                // 判断购物车内是否有商品
                if (this.$store.state.cartGoodsList.length === 0) return false
                //有商品再继续进行判断
                //方法一: 数字取反为false
                // return !(this.$store.state.cartGoodsList.filter(item => !item.checked).length)
                //方法二:
                // return !this.$store.state.cartGoodsList.find(item => !item.checked)
                //方法三:
                for (let item of this.$store.state.cartGoodsList){
                    if (!item.checked){
                        return false
                    }
                }
                return true
            }
        },

    }
</script>

<style scoped>
    .cartBottom{
        position: relative;
        background-color: #eee;
        font-size: 14px;
        /*bottom: 40px;*/
        height: 40px;
        display: flex;
    }
    .cartBottomLeft{
        display: flex;
        padding-top: 10px;
        padding-left: 5px;
        width: 60px;
        /*align-items: center;*/
    }
    .checkButton{
        width: 20px;
        height: 20px;
    }
    .cartBottomCenter{
        flex: 1;
        text-align: center;
        padding-top: 11px;
    }
    .cartBottomRight{
        width: 80px;
        padding-top: 11px;
        text-align: center;
        background-color: orange;
    }
.text{
    margin-left: 2px;
    padding-top: 1px;
}


</style>