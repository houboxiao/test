<template>
    <div class="check" :class="{'active': isChecked}">
        <img src="../../../assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
    export default {
        name: "CheckBotton",
        props: {
            isChecked: {
                type: Boolean,
                default: false
            }
        }

    }
</script>

<style scoped>
    .check{

        border-radius: 50%;
        border: 2px solid #cccccc;
        background-color: white;
    }
    .active{
        background-color: var(--color-tint);
        border: 2px solid var(--color-tint);
    }
</style>