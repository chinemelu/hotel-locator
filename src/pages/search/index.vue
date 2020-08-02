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

import { HotelLocation, Coordinates, HotelLocationResponse } from "@/types";

import DynamicComponentMixin from "@/mixins/dynamicComponents";

import axiosCalls from "@/services/AxiosCalls";

@Component({
  components: {
    Search,
    NavbarLayout
  }
})
export default class SearchIndex extends Mixins(DynamicComponentMixin) {
  private componentList = [Search, SearchResults];

  private isLoading = false;

  private hotelLocations: Array<HotelLocation> = [
    {
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
      resultType: "",
      scoring: {
        queryScore: 0,
        fieldScore: {
          city: 0
        }
      },
      title: "",
      vicinity: "",
      href: "",
      position: []
    }
  ];

  private coords: Coordinates = {
    lng: 0,
    lat: 0
  };

  public async searchLocation(location: string): Promise<void> {
    this.isLoading = true;
    let hotelLocationResponse: Partial<HotelLocationResponse>;

    hotelLocationResponse = await axiosCalls.get(
      `https://geocode.search.hereapi.com/v1/geocode?q=${location}&apiKey=${process.env.VUE_APP_API_KEY}`
    );
    this.isLoading = false;
    if (
      hotelLocationResponse.success &&
      hotelLocationResponse.response &&
      hotelLocationResponse.response.data.items.length > 0
    ) {
      this.coords = hotelLocationResponse.response.data.items[0].position;

      // @ts-ignore
      hotelLocationResponse = await axiosCalls.get(
        `https://places.sit.ls.hereapi.com/places/v1/discover/explore?at=${this.coords.lat},${this.coords.lng}&cat=hotel&apiKey=${process.env.VUE_APP_API_KEY}`
      );
      if (hotelLocationResponse.success && hotelLocationResponse.response) {
        this.hotelLocations = hotelLocationResponse.response.data.results.items;
        this.isLoading = false;
        this.handleNextSection();
      }
      return;
    }

    if (
      hotelLocationResponse.success &&
      hotelLocationResponse.response &&
      !hotelLocationResponse.response.data.items.length
    ) {
      this.$notify({
        title: "Search Results",
        text: "There are no results",
        type: "success"
      });
    }

    if (!hotelLocationResponse.success) {
      this.$notify({
        title: "Error",
        text: hotelLocationResponse.error,
        type: "error"
      });
    }
  }
}
</script>
