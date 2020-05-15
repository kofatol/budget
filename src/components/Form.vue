<template>
  <ElCard class="form-card">
    <ElForm :model="formData" ref="addItemForm" :rules="rules" label-position="left">
      <ElFormItem label="Тип" prop="type">
        <ElSelect class="type-select" v-model="formData.type" placeholder="Выберите тип">
          <ElOption label="Доход" value="INCOME" />
          <ElOption label="Расход" value="OUTCOME" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Комментарии" prop="comment">
        <ElInput v-model="formData.comment" placeholder="Введите комментарий" />
      </ElFormItem>
      <ElFormItem label="Значение" prop="value">
        <ElInput v-model.number="formData.value" />
      </ElFormItem>
      <ElButton @click="onSubmit" type="primary" icon="el-icon-edit">Добавить</ElButton>
    </ElForm>
  </ElCard>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Form",
  data() {
    const validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Пожалуйста, введите значение больше ноля"));
      } else if (!Number.isInteger(value)) {
        callback(new Error("Значение должно быть целым числом"));
      } else {
        if (value < 0) {
          callback(new Error("Значение не должно быть меньше нуля"));
        } else {
          callback();
        }
      }
    };
    return {
      formData: {
        type: "INCOME",
        comment: "",
        value: 0
      },
      rules: {
        type: [
          {
            required: true,
            message: "Пожалуйста, выберите тип",
            trigger: "blur"
          }
        ],
        comment: [
          {
            required: true,
            message: "Пожалуйста, введите комментарий",
            trigger: "change"
          }
        ],
        value: [{ required: true, validator: validatePass, trigger: "change" }]
      }
    };
  },
  methods: {
    ...mapActions("budget", ["addNewValue"]),
    onSubmit() {
      this.$refs.addItemForm.validate(valid => {
        if (valid) {
          if (this.formData.type === "OUTCOME") {
            this.formData.value = -this.formData.value;
          }
          this.addNewValue(this.formData);
          this.$refs.addItemForm.resetFields();
        }
      });
    }
  }
};
</script>

<style scoped>
.form-card {
  max-width: 500px;
  margin: auto;
}

.type-select {
  width: 100%;
}
</style>