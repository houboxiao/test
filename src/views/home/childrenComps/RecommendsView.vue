<template>
    <div class="rec">
        <div class="rec-item" v-for="item in recommends">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RecommendsView",
        props: {
            recommends: {
                type: Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style scoped>
    .rec{
        display: flex;
        text-align: center;
        width: 100%;
        font-size: 12px;

        padding: 10px 0 20px;
        border-bottom: 8px solid #eee;
    }
    .rec-item{
        flex: 1;
    }
    .rec-item img{
        width: 70px;
        height: 70px;
        margin-bottom: 5px;
    }
</style>