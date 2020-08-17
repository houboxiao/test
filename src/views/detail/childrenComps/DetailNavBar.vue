<template>
    <div>
        <nav-bar>
            <div slot="left" class="back" @click="goBack">
                <img src="../../../assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="nav-bar">
                <div v-for="(item, index) in items" class="nav-item" :class="{active: index === currentIndex}" @click="changeItem(index)">
                    <span>{{item}}</span>
                </div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
    import NavBar from "../../../components/common/navbar/NavBar";
    export default {
        name: "DetailNavBar",
        components: {
            NavBar
        },
        data(){
            return {
                items: ['商品', '参数', '评论', '推荐'],
                currentIndex: 0
            }
        },
        methods: {
            changeItem(index){
                this.currentIndex = index
                this.$emit('goThere',index)
            },
            goBack(){
                this.$router.back()
            }
        }

    }
</script>

<style scoped>
    .nav-bar{
        display: flex;
        font-size: 14px;
    }
    .nav-item {
        flex: 1;
    }
    .active{
        color: var(--color-high-text);
    }
    .active span {
        padding-bottom: 5px;
        border-bottom: 2px solid var(--color-high-text);
    }
    .back{
        margin-top: 7px;
    }

</style>