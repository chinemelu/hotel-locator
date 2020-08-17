<template>
  <div id="app">
    <notifications position="top center" />
    <div ref="internetStatus"></div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  private internetConnectionStatus = navigator.onLine;
  public hasInternetConnection(this.internetConnectionStatus) {
    
  }

  mounted() {
    const internetStatus = this.$refs.internetStatus;
  }
}
</script>

<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
}
</style>
