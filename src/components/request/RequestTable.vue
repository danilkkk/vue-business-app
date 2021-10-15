<template>
  <h4 v-if="requests.length === 0" class="text-center">
    У Вас пока нет ни одной заявки
  </h4>
  <table v-else class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>ФИО</th>
        <th>Телефон</th>
        <th>Сумма</th>
        <th>Статус</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(request, idx) of requests" :key="request.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ request.name }}</td>
        <td>{{ request.phone }}</td>
        <td>{{ currencyFormatter(request.amount) }}</td>
        <td>
            <app-status :type="request.status"></app-status>
        </td>
        <td>
          <router-link
            v-slot="{ navigate }"
            custom
            :to="{ name: 'Request', params: { id: request.id } }"
          >
            <button class="btn" @click="navigate">Открыть</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {currencyFormatter} from '../../utils/currency-formatter'
import AppStatus from '../ui/AppStatus.vue'
export default {
  props: {
    requests: {
      type: Array,
      required: true,
    },
  },

  components: {
      AppStatus
  },

  setup() {
      return {
          currencyFormatter
      }
  }
};
</script>