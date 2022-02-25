export const state = () => ({
  showModal: false,
  counters: [],
  filters: {
    orderByName: {
      status: false,
      type: null,
    },
    orderByvalue: {
      status: false,
      type: null,
    },
    from: null,
    toValue: null,
    byName:null
  },
});

export const getters = {
  getShowModal: (state) => {
    return state.showModal;
  },
  getCounters: (state) => {
    return state.counters.filter((c) => c.status == true);
  },
  getFilters: (state) => {
    return state.filters;
  },
  allCountCounter: (state) => {
    let allValues = 0;
    state.counters.map((c) => {
      allValues = allValues + c.value;
    });
    return allValues;
  },
};

export const mutations = {
  setShowModal: (state) => {
    state.showModal = !state.showModal;
  },
  setNewCounter: (state, name) => {
    state.counters.push({
      name,
      value: 0,
      status: true,
    });
    localStorage.setItem('counters', JSON.stringify(state.counters))
  },
  setAllCounters: (state, counters) => {
    state.counters = counters
  },
  deleteCounter: (state, counter) => {
    state.counters = state.counters.filter((c) => {
      return c.name != counter.name;
    });
    localStorage.setItem('counters', JSON.stringify(state.counters))
  },
  setOrderBy: (state, type) => {
    state.counters = state.counters.sort((a, b) => (a.name > b.name ? 1 : -1));
    localStorage.setItem('counters', JSON.stringify(state.counters))
    if (type == "name") {
      state.filters.orderByvalue.status = false;

      if (state.filters.orderByName.type) {
        if (state.filters.orderByName.type == "asc") {
          state.filters.orderByName.type = "desc";
          state.filters.orderByName.status = true;
          state.counters = state.counters.sort((a, b) =>
            a.name > b.name ? -1 : 1
          );
          sessionStorage.setItem('filters', JSON.stringify(state.filters))
        } else {
          state.filters.orderByName.type = "asc";
          state.filters.orderByName.status = true;
          state.counters = state.counters.sort((a, b) =>
            a.name > b.name ? 1 : -1
          );
          sessionStorage.setItem('filters', JSON.stringify(state.filters))
        }
      } else {
        state.filters.orderByName.type = "asc";
        state.filters.orderByName.status = true;
        state.counters = state.counters.sort((a, b) =>
          a.name > b.name ? 1 : -1
        );
        sessionStorage.setItem('filters', JSON.stringify(state.filters))
      }
    }
    if (type == "value") {
      state.filters.orderByName.status = false;

      if (state.filters.orderByvalue.type) {
        if (state.filters.orderByvalue.type == "asc") {
          state.filters.orderByvalue.type = "desc";
          state.filters.orderByvalue.status = true;
          state.counters = state.counters.sort((a, b) =>
            a.value > b.value ? -1 : 1
          );
        } else {
          state.filters.orderByvalue.type = "asc";
          state.filters.orderByvalue.status = true;
          state.counters = state.counters.sort((a, b) =>
            a.value > b.value ? 1 : -1
          );
        }
      } else {
        state.filters.orderByvalue.type = "asc";
        state.filters.orderByvalue.status = true;
        state.counters = state.counters.sort((a, b) =>
          a.value > b.value ? 1 : -1
        );
      }
    }
  },
  editValue: (state, counter) => {
    state.counters = state.counters.map((c) => {
      if (c.name === counter.name) {
        c.value = counter.value;
      }
      return c;
    });
    localStorage.setItem('counters', JSON.stringify(state.counters))
  },
  clearFilters: (state) => {
    state.filters.from = null;
    state.filters.toValue = null;
    state.filters.byName = null;
    state.counters = state.counters.map( c => {
        c.status = true
        return c
    })
    localStorage.setItem('counters', JSON.stringify(state.counters))
    sessionStorage.setItem('filters', JSON.stringify(state.filters))
  },
  showWithRange: (state, range) => {
    let fromValue = range.from ? range.from : 0;
    let toValue = range.toValue ? range.toValue : 20;

    state.counters = state.counters.map((c) => {
      if (c.value < fromValue || c.value > toValue) {
        c.status = false;
      }else{
        c.status = true; 
      }
      if(range.byName){
          let  search = new RegExp(range.byName , 'i');
          if(!search.test(c.name)){
            
            c.status = false;
          }else{
            c.status = true;   
          }

      }
      return c;
    });
    localStorage.setItem('counters', JSON.stringify(state.counters))
    sessionStorage.setItem('filters', JSON.stringify(state.filters))
  }
};

export const actions = {
  setShowModal({ commit }) {
    commit("setShowModal");
  },
  clearFilters({ commit }) {
    commit("clearFilters");
  },
  setNewCounter({ commit }, name) {
    commit("setNewCounter", name);
  },
  setAllCounters({ commit }, counters) {
    commit("setAllCounters", counters);
  },
  setOrderBy({ commit }, type) {
    commit("setOrderBy", type);
  },
  deleteCounter({ commit }, counter) {
    commit("deleteCounter", counter);
  },
  editValue({ commit }, counter) {
    commit("editValue", counter);
  },
  showWithRange({ commit }, ranges) {
    commit("showWithRange", ranges);
  }
};
