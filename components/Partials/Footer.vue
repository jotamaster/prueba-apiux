<template>
  <footer>
    <p>Cantidad Total:  <span class="span-count">{{allCountCounter}} </span></p>
  </footer>
</template>

<script>
export default {
  computed: {
    allCountCounter() {
        return this.$store.getters['counter/allCountCounter']
    },
  },
};
</script>

<style >
footer {
  bottom: 0;
  padding: 10px 20px;
  background-color: #ffce00;
}
.span-count{
    font-weight: bold;
    font-size: 18px;
}
@media only screen and (max-width: 600px) {
  footer {
    width: 100%;
  }
}
</style>
