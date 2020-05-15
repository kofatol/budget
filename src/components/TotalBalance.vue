<template>
  <div class="total-value" :class="totalBalanceClass">Баланс: {{ totalBalance }}</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TotalBalance",
  computed: {
    ...mapGetters("budget", ["totalBalance"]),
    totalBalanceClass() {
      if (this.totalBalance > 0) {
        return "positive-balance";
      } else if (this.totalBalance < 0) {
        return "negative-balance";
      } else {
        return "zero-balance";
      }
    }
  }
};
</script>

<style scoped>
.total-value {
  font-size: 26px;
  text-transform: uppercase;
  padding: 20px;
  text-align: center;
}

.positive-balance {
  color: springgreen;
}

.negative-balance {
  color: red;
}

.zero-balance {
  color: black;
}
</style>