<template>
  <div>
    <template v-if="!isEmpty">
      <div class="list-item" v-for="(item, prop) in budgetList" :key="prop">
        <span class="budget-comment">{{ item.comment}}</span>
        <span class="budget-value" :class="item.value < 0 ? 'outcome-value' : 'income-value'">
          <ElIcon :class="item.value < 0 ? 'el-icon-caret-bottom' : 'el-icon-caret-top'" />
          {{ item.value}}
        </span>
        <ElButton
          class="delete-btn"
          type="danger"
          size="mini"
          @click="onDeleteBtnClick(item.id)"
        >Удалить</ElButton>
        <ElDialog class="confirm-dialog" title="Подтверждение" :visible.sync="dialogVisible">
          <span>Вы уверены, что хотите удалить данную сумму?</span>
          <span slot="footer" class="dialog-footer">
            <ElButton @click="dialogVisible = false">Отмена</ElButton>
            <ElButton type="danger" @click="onConfirmDeletehandler()">Удалить</ElButton>
          </span>
        </ElDialog>
      </div>
    </template>
    <ElAlert v-else type="info" :title="emptyTitle" :closable="false" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "BudgetListItem",
  data() {
    return {
      emptyTitle: "Список пуст",
      dialogVisible: false,
      deleteItemId: 0
    };
  },
  computed: {
    isEmpty() {
      return !Object.keys(this.budgetList).length;
    },
    ...mapGetters("budget", ["budgetList"])
  },
  methods: {
    ...mapActions("budget", ["deleteListItem"]),
    onDeleteBtnClick(id) {
      this.deleteItemId = id;
      this.dialogVisible = true;
    },
    onConfirmDeletehandler() {
      this.dialogVisible = false;
      this.deleteListItem(this.deleteItemId);
    }
  }
};
</script>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}

.budget-value {
  font-weight: bold;
  margin-left: auto;
  margin-right: 20px;
}

.confirm-dialog {
  width: 60%;
  margin: auto;
}

.outcome-value {
  color: red;
}

.income-value {
  color: springgreen;
}
</style>