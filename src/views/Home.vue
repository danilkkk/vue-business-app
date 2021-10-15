<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else title="Список заявок">
    <template #header>
      <button class="btn primary" @click="openModal">Создать</button>
    </template>

    <request-filter v-model="filter"></request-filter>

    <request-table :requests="requests"></request-table>

    <teleport to="body">
      <app-modal v-if="modal" title="Создание заявки" @close="closeModal">
        <request-modal @created="closeModal"></request-modal>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import AppPage from "../components/ui/AppPage.vue";
import AppLoader from "../components/ui/AppLoader.vue";
import AppModal from "../components/ui/AppModal.vue";
import RequestTable from "../components/request/RequestTable.vue";
import RequestModal from "../components/request/RequestModal.vue";
import RequestFilter from "../components/request/RequestFilter.vue";

export default {
  name: "Home",
  components: {
    AppPage,
    RequestTable,
    AppModal,
    RequestModal,
    AppLoader,
    RequestFilter,
  },
  setup() {
    const modal = ref(false);
    const store = useStore();
    const loading = ref(false);
    const filter = ref({});

    onMounted(async () => {
      loading.value = true;
      await store.dispatch("request/loadRequests");
      loading.value = false;
    });

    const requests = computed(() =>
      store.getters["request/getRequests"]
        .filter((request) => {
          if (filter.value.name) {
            return request.name.includes(filter.value.name);
          }

          return request;
        })
        .filter((request) => {
          if (filter.value.status) {
            return request.status === filter.value.status;
          }

          return request;
        })
    );

    return {
      requests,
      loading,
      filter,
      modal,
      openModal: () => (modal.value = true),
      closeModal: () => (modal.value = false),
    };
  },
};
</script>
