<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{ invalid: nameError }">
      <label for="name">ФИО</label>
      <input v-model="name" type="text" id="name" @blur="nameBlur" />
      <small v-if="nameError">{{ nameError }}</small>
    </div>

    <div class="form-control" :class="{ invalid: phoneError }">
      <label for="phone">Номер телефона</label>
      <input type="tel" id="phone" v-model="phone" />
      <small v-if="phoneError">{{ phoneError }}</small>
    </div>

    <div class="form-control" :class="{ invalid: amountError }">
      <label for="amount">Сумма</label>
      <input v-model="amount" type="number" id="amount" />
      <small v-if="amountError">{{ amountError }}</small>
    </div>

    <div class="form-control">
      <label for="status">Статус</label>
      <select name="status" v-model="status" id="status">
        <option value="done">Завершена</option>
        <option value="cancelled">Отменена</option>
        <option value="active">Активна</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button class="btn primary" :disabled="isSubmitting">Создать</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRequestForm } from "../../use/request-form";
import { useStore } from 'vuex';

export default {
  emits: ["created"],
  setup(_, { emit }) {
    const store = useStore();

    const submit = async (values) => { 
      await store.dispatch('request/create', values)
      emit("created");
    };

    return {
      ...useRequestForm(submit),
    };
  },
};
</script>