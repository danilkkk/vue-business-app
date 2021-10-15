<template>
  <app-loader v-if="loading"></app-loader>
  <app-page back v-else-if="request" title="Заявка">
    <p><strong>Имя:</strong> {{ request.name }}</p>
    <p><strong>Телефон:</strong> {{ request.phone }}</p>
    <p><strong>Сумма:</strong> {{ currencyFormatter(request.amount) }}</p>
    <p>
      <strong>Статус:</strong> <app-status :type="request.status"></app-status>
    </p>

    <div class="form-control">
      <label for="status">Статус</label>
      <select name="status" v-model="status" id="status">
        <option value="done">Завершена</option>
        <option value="cancelled">Отменена</option>
        <option value="active">Активна</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button class="btn" @click="update" v-if="hasChanges">Обновить</button>
    <button class="btn danger" @click="remove">Удалить</button>
  </app-page>
  <h3 v-else class="text-center text-white">
    Такой заявки с таким идентификатором нет.
  </h3>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppPage from "../components/ui/AppPage.vue";
import { useStore } from "vuex";
import AppLoader from "../components/ui/AppLoader.vue";
import AppStatus from "../components/ui/AppStatus.vue";
import { currencyFormatter } from "../utils/currency-formatter";

export default {
  components: { AppPage, AppLoader, AppStatus },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const loading = ref(true);
    const request = ref({});
    const status = ref();

    const hasChanges = computed(() => request.value.status !== status.value);

    onMounted(async () => {
      request.value = await store.dispatch(
        "request/loadRequestById",
        route.params.id
      );

      status.value = request.value?.status;

      loading.value = false;
    });

    const remove = async () => {
        await store.dispatch('request/removeRequestById', request.value.id);
        router.push('/')
    };

    const update = async () => {
        const data = { ...request.value, status: status.value, id: request.value.id};   
        console.log(data);  
        await store.dispatch('request/updateRequestById', data);
        request.value.status = status.value;        
    };

    return {
      request,
      loading,
      currencyFormatter,
      remove,
      update,
      status,
      hasChanges
    };
  },
};
</script>