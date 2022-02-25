<template>
  <div class="counters-list">
    <h3>Listado de contadores ({{counters.length}})</h3>
    <table>
      <tr>
        <th>Nombre</th>
        <th>Valor</th>
        <th>Eliminar</th>
      </tr>
      <CounterItem :counter="counter" v-for="(counter, index) in counters" :key="index+'counter'" />
    </table>
  </div>
</template>

<script>
import CounterItem from "./CounterItem";
export default {
  components: {
    CounterItem,
  },
  computed:{
      counters(){
          return this.$store.getters['counter/getCounters']
      }
  }
};
</script>

<style>
.counters-list {
  flex: 4;
  padding: 20px;
  min-height: calc(100vh - 188px);
}

table {
  border-collapse: collapse;
  width: 100%;
  background-color: #fafafa;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 15px;
}

</style>
