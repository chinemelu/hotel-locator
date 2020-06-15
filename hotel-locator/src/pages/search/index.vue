<template>
  <navbar-layout>
    <component
      :is="componentList[activeComponentIndex]"
      @search-button-clicked="searchLocation"
      :coordinates="this.coords"
      :isLoading="isLoading"
      :hotelLocations="hotelLocations"
    />
  </navbar-layout>
</template>

<script lang="ts">
import { Vue, Component, Prop, Mixins } from "vue-property-decorator";

import Search from "@/pages/search/Search.vue";
import SearchResults from '@/pages/search/SearchResults.vue';
import NavbarLayout from '@/components/layout/NavbarLayout.vue';

import DynamicComponentMixin from '../../mixins/dynamicComponents';

import axiosCalls from '../../services/AxiosCalls';

@Component({
  components: {
    Search,
    NavbarLayout
  }
})
export default class SearchIndex extends Mixins(DynamicComponentMixin) {
  private componentList = [
    Search,
    SearchResults
  ]

  private isLoading=false;

  private hotelLocations = {};

  private coords = {};

  public async searchLocation(location: string) {
    try {
      this.isLoading = true
      const hotelCoordsResponse = await axiosCalls.get(`https://geocode.search.hereapi.com/v1/geocode?q=${location}&apiKey=${process.env.VUE_APP_API_KEY}`)
      this.coords = hotelCoordsResponse.data.items[0].position
      if (hotelCoordsResponse.status === 200) {
            // @ts-ignore
        const hotelLocationResponse = await axiosCalls.get(`https://discover.search.hereapi.com/v1/discover?at=${this.coords.lat},${this.coords.lng}&q=hotels&apiKey=${process.env.VUE_APP_API_KEY}`)
        if (hotelLocationResponse.status === 200) {
          this.hotelLocations = hotelLocationResponse.data.items;
          this.isLoading = false
          this.handleNextSection();
        }
      }
    } catch(error) {
      this.isLoading = false
      this.$emit('error', error.message)
    }
  }
}
</script>
