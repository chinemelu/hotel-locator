<template>
  <header class="navbar">
    <nav class="navigation">
      <div class="limehome-icon-container">
        <img
          src="@/assets/limehome-logo.svg"
          class="limehome-icon"
          alt="limehome logo"
        />
      </div>
      <div class="burger-icon">
        <img
          src="@/assets/map-burger-icon.svg"
          class="map-burger-icon"
          alt="burger icon"
        />
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Navbar extends Vue {}
</script>

<style>
.navigation {
  display: flex;
  padding: 1.5rem 2rem;
  justify-content: space-between;
  align-items: center;
  background-color: #ebeae6;
}
</style>
