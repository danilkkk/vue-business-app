<template>
  <div class="filter">
    <div class="form-control">
      <input v-model="name" type="text" placeholder="Введите имя" />
    </div>

    <div class="form-control">
      <select v-model="status">
        <option disabled selected>Выберите статус</option>
        <option value="done">Готово</option>
        <option value="cancelled">Отменена</option>
        <option value="active">Активна</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>
    <button v-if="isActive" class="btn" @click="clearFilter">Очистить</button>
  </div>
</template>

<script>
import {computed, ref, watch} from 'vue'

export default {
    emits: ['update:modelValue'],
    props: ['modelValue'],

    setup(_, {emit}) {
        const name = ref();
        const status = ref();

        watch([name, status], values =>{
            emit('update:modelValue', {
                name: values[0],
                status: values[1]
            })
        });

        const isActive = computed(() => name.value || status.value);

        return {
            name, status, isActive,
            clearFilter: () => {
                name.value = '',
                status.value = null
            }
        }

    }
    
};
</script>