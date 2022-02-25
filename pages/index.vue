<template>
  <main>
     <Filters class="filters"/>
     <CountersList class="counter-list"/>
  </main>
</template>

<script>
import Filters from '../components/Filters'
import CountersList from '../components/CountersList'
export default {
  name: 'IndexPage',
  components:{
    Filters,
    CountersList
  }
}
</script>

<style>
main {
  display:flex
}
</style>
