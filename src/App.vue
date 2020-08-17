<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-bar class="main"></main-bar>


  </div>
</template>

<script>
  import MainBar from "./components/content/mainBar/MainBar";

  export default {
    name: 'App',
    components:{
      MainBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
  .main{
    z-index: 10;
  }

</style>
