<template>
  <div id="app">
    <Form />
    <TotalBalance />
    <BudgetList @formSelected="onFormSelected" />
  </div>
</template>

<script>
import BudgetList from "@/components/BudgetList";
import TotalBalance from "@/components/TotalBalance";
import Form from "@/components/Form";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    BudgetList,
    TotalBalance,
    Form
  },
  computed: {
    ...mapGetters("budget", ["budgetList"])
  },
  watch: {
    budgetList: "countBalance"
  },
  methods: {
    ...mapActions("budget", ["countBalance"]),
    onFormSelected(type) {
      const listItems = document.querySelectorAll(".list-item");
      const listItemsValues = document.querySelectorAll(
        ".list-item .budget-value"
      );
      this.formSelectedHandler(type, listItems, listItemsValues);
    },
    formSelectedHandler(type, listItems, listItemsValues) {
      for (let i = 0; i < listItemsValues.length; i++) {
        if (type === "INCOME") {
          listItemsValues[i].classList.contains("outcome-value")
            ? (listItems[i].style.display = "none")
            : (listItems[i].style.display = "");
        } else if (type === "OUTCOME") {
          listItemsValues[i].classList.contains("income-value")
            ? (listItems[i].style.display = "none")
            : (listItems[i].style.display = "");
        } else {
          listItems[i].style.display = "";
        }
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
