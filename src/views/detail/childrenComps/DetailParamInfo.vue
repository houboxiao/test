<template>
  <div class="param-info">
    <p>参数信息</p>
    <div>
      <table v-for="(itemOne, indexOne) in paramInfo.sizes">
        <tr v-for="(item, index) in itemOne">
          <td v-for="(secItem, secIndex) in item">{{secItem}}</td>
        </tr>
      </table>
    </div>
    <div>
      <table class="info-param">
        <tr v-for="(item, index) in paramInfo.infos">
          <td class="info-param-key">{{item.key}}</td>
          <td class="param-value">{{item.value}}</td>
        </tr>
      </table>
      <div class="info-img" v-if="paramInfo.length !== 0">
        <img :src="paramInfo.image" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.param-info {
  font-size: 14px;
  padding: 20px 15px;
  border-bottom: 5px solid #f2f5f8;
}

.param-info p {
  font-size: 15px;
  margin-bottom: 10px;
}

.param-info table {
  width: 100%;
  border-collapse: collapse;
}

.param-info table tr {
  height: 42px;
}

.param-info table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.info-param-key {
  /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
  width: 95px;
}

.info-param {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.param-value {
  color: #eb4868;
}


.info-img img {
  width: 100%;
}
</style>
