<template>
  <div class="budget-list-wrap">
    <ElCard :header="header">
      <ElForm :model="selectData">
        <ElFormItem prop="valuesType">
          <ElSelect
            @change="formSelected"
            class="values-type-select"
            v-model="selectData.valuesType"
          >
            <ElOption label="Доходы" value="INCOME" />
            <ElOption label="Расходы" value="OUTCOME" />
            <ElOption label="Показать всё" value="ALL" />
          </ElSelect>
        </ElFormItem>
      </ElForm>
      <BudgetListItem />
    </ElCard>
  </div>
</template>

<script>
import BudgetListItem from "@/components/BudgetListItem";

export default {
  name: "BudgetList",
  components: {
    BudgetListItem
  },
  data: () => ({
    header: "Лист бюджета",
    selectData: {
      valuesType: "ALL"
    }
  }),
  methods: {
    formSelected(type) {
      this.$emit("formSelected", type);
    }
  }
};
</script>

<style scoped>
.budget-list-wrap {
  max-width: 500px;
  margin: auto;
}

.values-type-select {
  width: 70%;
  margin: auto;
}
</style>