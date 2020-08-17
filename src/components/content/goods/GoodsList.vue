<template>
    <div class="good-list">
       <goods-list-item v-for="item in goodsList" :goodsItem="item" class="goodsitem">

       </goods-list-item>


    </div>
</template>

<script>
    import GoodsListItem from "./GoodsListItem";
    export default {
        name: "GoodsList",
        components: {
            GoodsListItem
        },
        props: {
            goodsList: {
                type: Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style scoped>
    .good-list {
        display: flex;
        /*避免往一行里面塞*/
        /*根据宽度决定一行显示几个*/
        flex-wrap: wrap;
        justify-content: space-around;
        background-color: var(--color-background);

        padding: 2px;
    }
</style>