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
import { Component, Mixins } from "vue-property-decorator";

import Search from "@/pages/search/Search.vue";
import SearchResults from "@/pages/search/SearchResults.vue";
import NavbarLayout from "@/components/layout/NavbarLayout.vue";

import { HotelLocation, Position } from "../../types";

import DynamicComponentMixin from "../../mixins/dynamicComponents";

import axiosCalls from "../../services/AxiosCalls";

@Component({
  components: {
    Search,
    NavbarLayout
  }
})
export default class SearchIndex extends Mixins(DynamicComponentMixin) {
  private componentList = [Search, SearchResults];

  private isLoading = false;

  private hotelLocations: HotelLocation = {
    distance: 0,
    address: {
      label: "",
      countryCode: "",
      countryName: "",
      city: "",
      postalCode: "",
      state: ""
    },
    id: "",
    localityType: "",
    mapView: {
      west: 0,
      south: 0,
      east: 0,
      north: 0
    },
    position: {
      lng: 0,
      lat: 0
    },
    resultType: "",
    scoring: {
      queryScore: 0,
      fieldScore: {
        city: 0
      }
    },
    title: ""
  };

  private coords: Position = {
    lng: 0,
    lat: 0
  };

  public async searchLocation(location: string) {
    try {
      this.isLoading = true;
      const hotelCoordsResponse = await axiosCalls.get(
        `https://geocode.search.hereapi.com/v1/geocode?q=${location}&apiKey=${process.env.VUE_APP_API_KEY}`
      );
      this.coords = hotelCoordsResponse.data.items[0].position;
      if (hotelCoordsResponse.status === 200) {
        // @ts-ignore
        const hotelLocationResponse = await axiosCalls.get(
          `https://places.sit.ls.hereapi.com/places/v1/discover/explore?at=${this.coords.lat},${this.coords.lng}&cat=hotel&apiKey=${process.env.VUE_APP_API_KEY}`
        );
        if (hotelLocationResponse.status === 200) {
          this.hotelLocations = hotelLocationResponse.data.results.items;
          this.isLoading = false;
          this.handleNextSection();
        }
      }
    } catch (error) {
      this.isLoading = false;
      this.$emit("error", error.message);
    }
  }
}
</script>
