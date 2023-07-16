<template>
  <div class="home">
    <VTable />
  </div>
</template>

<script>
// @ is an alias to /src
import VTable from '@/components/VTable.vue';

export default {
  name: 'Home',
  components: {
    VTable,
  },
};
</script>
