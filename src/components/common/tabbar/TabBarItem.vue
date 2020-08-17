<template>

    <div class="tab-bar-item">
<!--      <img src="../../assets/img/tabbar/home.png" alt="首页">-->
<!--      <div>首页</div>-->
      <div @click="clickIt">
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active"></slot></div>
      </div>
      <div :style="activeStyle">
        <slot name="item-text"></slot>
      </div>
    </div>


</template>

<script>
    export default {
        name: "TabBarItem",
      data(){
          return{
            flag: true
          }
      },
      methods: {
          clickIt(){
            this.$router.push(this.path)
          }
      },
      props: {
          path: String,
          activeColor: {
            type: String,
            default: 'red'
        }
      },
      computed: {
          isActive(){
            //检查当前活跃的组件路径和此组件路径是否匹配，不匹配贼为-1
            return this.$route.path.indexOf(this.path) !== -1
          },
          activeStyle(){
            // 动态绑定活跃样式
            return this.isActive ? {color: this.activeColor} : {}
          }
      }

    }
</script>

<style scoped>
  .tab-bar-item {
    /*让所有弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容*/
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .active{
    color: red;
  }
</style>
