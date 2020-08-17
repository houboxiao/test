<template>
    <div class="goods-item" @click="clickGoods">
        <img v-lazy="showImg" alt="" @load="imageLoad"><!--@load="function" 图片加载完成后调用函数-->
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
        props: {
            goodsItem: {
                type: Object,
                default(){
                    return{}
                }
            }
        },
        methods: {
            imageLoad(){
                //图片加载完成后，通过事件总线发送请求
                this.$bus.$emit('itemImgLoad')
            },
            clickGoods(){
                this.$router.push('/detail/' + this.goodsItem.iid)
            }
        },
        computed:{
            showImg(){
                return this.goodsItem.image || this.goodsItem.show.img
            }
        }
    }
</script>

<style scoped>
    .goods-item {
        padding-bottom: 40px;
        position: relative;

        width: 48%;
    }

    .goods-item img {
        width: 100%;
        border-radius: 5px;
        border:3px solid var(--color-tint);
    }

    .goods-info {
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }

    .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis;/*显示省略符号来代表被修剪的文本。*/
        white-space: nowrap;/*文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。*/
        margin-bottom: 3px;
    }

    .goods-info .price {
        color: var(--color-high-text);
        margin-right: 20px;
    }

    .goods-info .collect {
        position: relative;
    }

    .goods-info .collect::before {
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
    }
</style>