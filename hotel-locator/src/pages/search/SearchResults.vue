<template>
  <div class="map-section">
    <base-map
      :lat="coordinates.lat"
      :long="coordinates.lng"
      className="search-map"
      :hotelLocations="hotelLocations"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import BaseMap from "@/components/ui/BaseMap.vue";

@Component({
  components: {
    BaseMap
  }
})
export default class Search extends Vue {
  @Prop() readonly coordinates!: object;
  @Prop() readonly hotelLocations!: object;
}
</script>

<style>
.search-map {
  width: 100%;
  height: 100vh;
}
</style>
