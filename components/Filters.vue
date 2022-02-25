<template>
  <div class="filters">
    <h3>Filtros</h3>
    <div class="vertical-menu">
      <div @click="orderBy('name')" class="option">
        Ordenar por Nombre
        <img
          v-if="getFilters"
          :class="{
            arrowAsc:
              getFilters.orderByName.status &&
              getFilters.orderByName.type == 'asc',
            arrowActive: getFilters.orderByName.status,
          }"
          class="arrow"
          src="~/assets/img/arrow.png"
        />
      </div>
      <div @click="orderBy('value')" class="option">
        Ordenar por Valor
        <img
          v-if="getFilters"
          :class="{
            arrowAsc:
              getFilters.orderByvalue.status &&
              getFilters.orderByvalue.type == 'asc',
            arrowActive: getFilters.orderByvalue.status,
          }"
          class="arrow"
          src="~/assets/img/arrow.png"
        />
      </div>
      <div class="option">
        Por Nombre
        <input v-model="byName" min="1" maxlength="20" type="text" />
      </div>
      <div class="option">
        Desde
        <input
          @keypress="validateNumber($event, 'from')"
          v-model="from"
          min="1"
          max="20"
          type="number"
        />
      </div>
      <div class="option">
        Hasta
        <input
          @keypress="validateNumber($event, 'toValue')"
          v-model="toValue"
          min="1"
          max="20"
          type="number"
        />
      </div>
      <div class="option btn-option" href="#">
        <button @click="filterRange" class="btn">Aplicar Filtros</button>
        <button @click="clearFilters" class="btn">Limpiar Filtros</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      from: null,
      toValue: null,
      byName: null,
    };
  },
  methods: {
    orderBy(type) {
      this.$store.dispatch("counter/setOrderBy", type);
    },
    validateNumber(event, type) {
      console.log(type);
      let keyCode = event.keyCode;
      if (this[type]) {
        let newVal = this[type] + event.key;
        if (newVal > 20) {
          event.preventDefault();
        }
      }
      if (keyCode < 48 || keyCode > 57) {
        event.preventDefault();
      }
    },
    clearFilters() {
      this.from = null;
      this.toValue = null;
      this.byName = null;
      this.$store.dispatch("counter/clearFilters");
    },
    filterRange() {
      let range = {
        from: this.from,
        toValue: this.toValue,
        byName: this.byName,
      };
      this.$store.dispatch("counter/showWithRange", range);
    },
  },
  computed: {
    getFilters() {
      return this.$store.getters["counter/getFilters"];
    },
  },
  mounted() {
    let filters = JSON.parse(sessionStorage.filters)
    if (filters) {
      console.log(filters);
      this.from = parseInt(filters.from);
      this.toValue = parseInt(filters.toValue);
      this.byName = filters.byName;
    }
  },
};
</script>

<style>
.arrow {
  width: 15px;
  opacity: 0.3;
  padding-top: 10px;
}
.arrowActive {
  opacity: 1;
}
.arrowAsc {
  transform: rotate(180deg);
}
.filters {
  flex: 1;
  padding: 30px;
  border-collapse: collapse;
  width: 100%;
}
.vertical-menu a,
.option {
  background-color: #eee;
  color: black;
  display: block;
  padding: 15px;
  text-decoration: none;
}
@media only screen and (max-width: 600px) {
  .filters {
    padding: 18px;
  }
}
.option {
  padding: 10px;
}
.option.btn-option {
  text-align: center;
  padding: 10px;
}

.option input {
  padding: 5px;
  width: 80%;
}

.vertical-menu .option:hover {
  background-color: #ccc;
}

.vertical-menu a.active {
  background-color: #ffce00;
  color: black;
}
</style>
