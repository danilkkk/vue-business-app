<template>
  <component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import MainLayout from "./layout/MainLayout.vue";
import LoginLayout from "./layout/LoginLayout.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    return {
      layout: computed(() => route.meta.layout),
    };
  },

  components: {
    MainLayout,
    LoginLayout,
  },
};
</script>


<style>
</style>
