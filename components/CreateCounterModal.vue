<template>
  <div v-if="showModal" class="modal">
    <div class="dialog">
      <h4>Crear nuevo contador</h4>
      <div>
        <label for="name">Nombre:</label>
        <input v-model="name" maxlength="20" type="text" />
      </div>
      <p class="error" v-if="error">El nombre "{{name}}" ya existe.</p>
      <div class="dialog-footer">
        <button @click="toggleModal" class="btn">Cancelar</button>
        <button :class="{disabled: !this.name}" :disabled="!this.name" @click="saveCounter" class="btn">Agregar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      error:false
    };
  },
  computed: {
    showModal() {
      return this.$store.getters["counter/getShowModal"];
    },
  },
  methods: {
    saveCounter() {
      if (!this.findCounter(this.name)) {
        this.$store.dispatch("counter/setNewCounter", this.name);
        this.name = ""
        this.error = false
        this.toggleModal();
      }else{
        this.error = true
      }
    },
    toggleModal() {
      this.$store.dispatch("counter/setShowModal");
    },
    findCounter(name) {
      if (
        this.$store.getters["counter/getCounters"].find((c) => c.name == name)
      )
        return true;
      return false;
    },
  },
  watch:{
    name: function(val){
      if(this.error){
        this.error = false
      }
    }
  },
  mounted() {
    //   console.log(this.$store.getters['counter/getShowModal'])
  },
};
</script>

<style scoped>
.modal {
  z-index: 2;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.623);
}
.dialog {
  padding: 20px;
  background: white;
  border-radius: 20px;
  border: solid 1px;
  margin-top: 30vh;
  width: 320px;
  margin: 30vh auto;
}
.dialog h4 {
  font-weight: bold;
}
input {
  border-radius: 20px;
  padding: 6px 10px;
  border: 0.5px solid;
  width: 60%;
}
.dialog-footer {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
}
.error{
  font-size: 14px;
  color: red;
}
</style>
