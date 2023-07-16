<script>
import { defineComponent, onBeforeUpdate, onUpdated, ref } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const rowCount = ref(100);
    const colCount = ref(30);
    const data = ref([]);
    const costTime = ref(0);
    let startTime = Date.now();
    const handleStartRender = () => {
      data.value = Array.from({ length: rowCount.value }).map((_, idx) => ({
        id: idx + '-' + Date.now(),
        cols: Array.from({ length: colCount.value }).map((_, colIdx) => ({
          id: `${idx}-${colIdx}-${Date.now()}`,
          colspan: Math.floor(Math.random() * 2) + 1,
        })),
      }));
      startTime = Date.now();
    };
    window.onscroll = () => {
      handleStartRender();
      console.time('render');
      requestAnimationFrame(() => {
        console.timeEnd('render');
      });
    };
    onBeforeUpdate(() => {
      console.time('updated');
    });
    onUpdated(() => {
      console.timeEnd('updated');
    });
    return {
      costTime,
      startTime,
      rowCount,
      colCount,
      data,
      handleStartRender,
    };
  },
});
</script>

<template>
  <div>
    <div>cost time: {{ costTime }}</div>
    <div>row: <input v-model="rowCount" /></div>
    <div>col: <input v-model="colCount" /></div>
    <div>
      <button @click="handleStartRender">开始渲染</button>
    </div>
    <div class="table-wrap">
      <table :key="rowCount + '-' + colCount">
        <tr v-for="row in data" :key="row.id">
          <td v-for="col in row.cols" :key="col.id" :colspan="col.colspan">{{ col.id }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-wrap {
  width: 100vw;
}
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
}
td {
  border: 1px solid #ccc;
}
</style>
