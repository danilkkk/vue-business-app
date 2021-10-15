<template>
  <div v-if="message" :class="['alert', message.type]">
    <p class="alert-title" v-if="title">{{title}}</p>
    <p>{{message.value}}</p>    
    <span class="alert-close">&times;</span>
  </div>
</template>

<script>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const TITLES = {
        primary: 'Успешно',
        danger: 'Ошибка',
        warning: 'Предупреждение'
    }
    const message = computed(() => store.state.message);    
    const title = computed(() => { 
        console.log(message)
        return message ? TITLES[message.value.type] : '' });
    return {
        message,
        title,
        close: () => store.commit('deleteMessage')
        
    };
  },
};
</script>

<style scoped>
</style>