<template>
  <tr>
    <td>{{ counter.name }}</td>
    <td class="counterValue">
      <button 
        @click="editValue(1)" 
        class="btn"
        :disabled="counter.value >= 20"
        :class="{disabled: counter.value >= 20}"
        >
        +
        </button>
      {{ counter.value }}
      <button 
        @click="editValue(-1)" 
        class="btn"
        :disabled="counter.value <= 0"
        :class="{disabled: counter.value <= 0}"
      >
        -
      </button>
    </td>
    <td><button  @click="deleteCounter" class="btn ">Eliminar</button></td>
  </tr>
</template>

<script>
export default {
  props: {
    counter: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    deleteCounter() {
      this.$store.dispatch("counter/deleteCounter", this.counter);
    },
    editValue(value){
      let newCounter = this.counter
      newCounter.value = newCounter.value + value
      this.$store.dispatch("counter/editValue", newCounter);
    }
  },
};
</script>

<style scoped>
.counterValue{
  text-align: center;
  font-size: 20px;
}
</style>
