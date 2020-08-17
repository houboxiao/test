<template>
    <div class="Tab">
<!--        <div v-for="(item, index) in titles" class="Tab-item" :class="{active: index === currentIndex}" @click="clickIt(index)">-->
<!--            <span>{{item}}</span>-->
<!--        </div>-->
        <div  v-for="(item, index) in titles"
              class="Tab-item" :class="{active: index === currentIndex}"
             @click="clickIt(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        props: {
            titles: {
                type: Array,
                default(){
                    return []
                }
            }
        },
        data(){
            return{
                currentIndex: 0
            }
        },
        methods: {
            clickIt(index){
                this.currentIndex = index;
                this.$emit('changeGoods', index)

            }
        }
    }
</script>

<style scoped>
    .Tab{
        display: flex;
        text-align: center;
        font-size: 18px;
        height: 40px;
        line-height: 40px;
        background-color: white;

    }
    .Tab-item{
        flex: 1;
    }
    .Tab-item span{
        padding-bottom: 5px;
    }
    .active {
        color: var(--color-high-text);
    }
    .active span {

        border-bottom: 3px solid var(--color-high-text);
    }
</style>