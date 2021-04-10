<template>
  <section class="page-media">
    <aplayer
      v-if="complete"
      autoplay
      :music="{
        title: audioList[0].title,
        src: audioList[0].src,
      }"
      :list="audioList"
    />
  </section>
</template>

<script>
import Aplayer from 'vue-aplayer';
import axios from 'axios';
const url = `http://${process.env.VUE_APP_HOST}:8089`;
export default {
  components: {
    Aplayer,
  },
  data() {
    return {
      complete: false,
      audioList: [],
    };
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    async fetchList() {
      let resp = await axios.get(url + '/api/list');
      this.complete = true;
      this.audioList = resp.data;
    },
  },
};
</script>
