<template>
  <div id="app">
    <notifications position="top center" />
    <div
      ref="internetStatus"
      :class="[hasInternetConnection ? 'online' : 'offline', 'internet-status']"
    >
      {{ internetStatusText }}
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  private hasInternetConnection = navigator.onLine;
  private internetStatusText = navigator.onLine ? "Online" : "Offline";

  public updateInternetConnectionStatus() {
    this.hasInternetConnection = navigator.onLine;
    this.internetStatusText = this.hasInternetConnection ? "Online" : "Offline";
  }

  mounted() {
    window.addEventListener("online", this.updateInternetConnectionStatus);
    window.addEventListener("offline", this.updateInternetConnectionStatus);
  }

  beforeDestroy() {
    window.removeEventListener("online", this.updateInternetConnectionStatus);
    window.removeEventListener("offline", this.updateInternetConnectionStatus);
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

.internet-status {
  padding: 0.2rem 1.5rem;
  width: 90%;
  text-align: center;
  font-size: 1.2rem;
  border-radius: 4px;
  top: 5%;
  left: 50%;
  color: #fff;
  transform: translate(-50%, -50%);
  box-shadow: 0px 1px 15px rgba(63, 63, 68, 0.15);
  position: absolute;
}

.internet-status.online {
  background-color: #41a700;
}
.internet-status.offline {
  background-color: #f15c4f;
}
</style>
