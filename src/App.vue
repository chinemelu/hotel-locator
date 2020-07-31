<template>
  <div id="app">
    <notifications position="top center" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
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
