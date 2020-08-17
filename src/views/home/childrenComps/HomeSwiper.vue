<template>
    <div>
        <swiper>
            <swiper-item v-for="item in banners" :key="item.image" >
                <a :href="item.link">
                    <img :src="item.image" alt="" @load="imgLoad">
                </a>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    import {Swiper, SwiperItem} from '../../../components/common/swiper'
    export default {
        name: "HomeSwiper",
        components: {
            SwiperItem,
            Swiper
        },
        props: {
            banners: {
                type :Array,
                default(){
                    return []
                }
            }
        },
        methods: {
            imgLoad(){
                this.$emit('swiperImageLoad')
            }
        }
    }
</script>

<style scoped>

</style>