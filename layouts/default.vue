<template>
  <div>
      <CreateCounterModal/>
      <Header/>
      <Nuxt/>
      <Footer/>
      
  </div>
</template>

<script>
import Header from '../components/Partials/Header'
import Footer from '../components/Partials/Footer'
import CreateCounterModal from '../components/CreateCounterModal'
export default {
  components:{
    Header,
    Footer,
    CreateCounterModal
  },
  mounted(){
    if(process.client){
      if(localStorage.counters){
        this.$store.dispatch("counter/setAllCounters",JSON.parse(localStorage.counters));
      }
      if(sessionStorage.filters){
        console.log(sessionStorage.filters)
         this.$store.dispatch("counter/setAllFilters",JSON.parse(sessionStorage.filters));
      }
    }
  }
}

</script>

