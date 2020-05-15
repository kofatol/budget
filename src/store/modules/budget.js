import Vue from 'vue';

const budgetStore = {
  namespaced: true,
  state: {
    list: {
      1: {
        type: 'INCOME',
        value: 100,
        comment: 'Доходный коммент :)',
        id: 1,
      },
      2: {
        type: 'OUTCOME',
        value: -50,
        comment: 'Расходный коммент :(',
        id: 2,
      },
    },
    balance: {
      total: 0,
    },
  },
  getters: {
    budgetList: ({ list }) => list,
    totalBalance: ({ list, balance }) => {
      balance.total = Object.values(list).reduce(
        (acc, item) => acc + item.value,
        0
      );
      return balance.total;
    },
  },
  mutations: {
    ADD_VALUE(state, data) {
      Vue.set(state.list, data.id, data);
    },
    DELETE_VALUE(state, id) {
      Vue.delete(state.list, id);
    },
    ADD_BALANCE(state, balance) {
      Vue.set(state.balance, 'total', balance);
    },
  },
  actions: {
    addNewValue({ commit }, data) {
      const newObj = {
        ...data,
        id: String(Math.random()),
      };
      commit('ADD_VALUE', newObj);
    },
    deleteListItem({ commit }, id) {
      commit('DELETE_VALUE', id);
    },
    countBalance({ commit, state }) {
      const balance = Object.values(state.list).reduce(
        (acc, item) => acc + item.value,
        0
      );
      commit('ADD_BALANCE', balance);
    },
  },
};

export default budgetStore;
