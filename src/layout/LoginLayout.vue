<template>
<AppMessage/>
  <div class="container">
    <router-view></router-view>
  </div>
</template>


<script>
import AppMessage from '../components/ui/AppMessage.vue'

export default {
  components: {AppMessage},
}
</script>