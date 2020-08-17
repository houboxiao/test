<template>
  <TabBar>
    <!--      父传子，:path=""  ,""为变量要加:,字符串不需要加:-->
    <TabBarItem path="/home">
<!--      在src中用别名要加  ~   -->
      <img src="../../../assets/img/tabbar/home.svg" alt="首页" slot="item-icon">
      <img src="../../../assets/img/tabbar/home_active.svg" alt="首页" slot="item-icon-active">
      <div slot="item-text">首页</div>
    </TabBarItem>
    <TabBarItem path="/category">
      <img src="../../../assets/img/tabbar/category.svg" alt="分类" slot="item-icon">
      <img src="../../../assets/img/tabbar/category_active.svg" alt="分类" slot="item-icon-active">
      <div slot="item-text">分类</div>
    </TabBarItem>
    <TabBarItem path="/shopcart">
      <img src="../../../assets/img/tabbar/shopcart.svg" alt="购物车" slot="item-icon">
      <img src="../../../assets/img/tabbar/shopcart_active.svg" alt="购物车" slot="item-icon-active">
      <div slot="item-text">购物车</div>
    </TabBarItem>
    <TabBarItem path="/profile">
      <img src="../../../assets/img/tabbar/profile.svg" alt="我的" slot="item-icon">
      <img src="../../../assets/img/tabbar/profile_active.svg" alt="我的" slot="item-icon-active">
      <div slot="item-text">我的</div>
    </TabBarItem>
  </TabBar>
</template>

<script>
  import TabBarItem from "../../common/tabbar/TabBarItem";
  import TabBar from "../../common/tabbar/TabBar";
    export default {
        name: "MainBar",
      components:{
          TabBar,
        TabBarItem
      }
    }
</script>

<style scoped>

</style>
