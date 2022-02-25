<template>
    <header class="header">
        <h1 class="title">Administrador de contadores</h1>
        <button 
            :disabled="counters.length >=20"  
            :class="{disabled: counters.length >=20}"
            @click="toggleModal" 
            class="btn"
            >
           + Agregar Contador
        </button>
    </header>
</template>

<script>
import Navbar from './Navbar'
export default {
    components:{
        Navbar
    },
    methods:{
        toggleModal(){
            this.$store.dispatch('counter/setShowModal')
        }
    },
    computed:{
      counters(){
          return this.$store.getters['counter/getCounters']
      }
  }
}
</script>

<style scoped>
.header{
    padding: 20px;
    background-color: #ffce00;
    display: flex;
    justify-content: space-between;
}
.title{
    padding: 0;
    margin:0;
    font-size: 20px;
}
</style>
