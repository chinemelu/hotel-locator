<template>
  <div class="map-section">
    <base-map 
      :lat="coordinates.lat" 
      :long="coordinates.lng" 
      className="search-map"
      :hotelLocations="hotelLocations"
    />
    <div class="hotel-card-wrapper">
      <div class="hotel-card">
        <div class="hotel-image-wrapper">
          <img src="@/assets/background-image-min.jpg" class="selected-hotel-icon" alt="Image of selected hotel">
        </div>
        <div class="hotel-info-section">
          <div class="hotel-info-name-distance">
            <h3 class="hotel-name">Berlin Tauentzienstrasse</h3>
            <p class="hotel-distance">3.4 km from the city center</p>
          </div>
          <div class="hotel-info-price-text">
            <p class="hotel-price">&pound;98</p>
            <p class="hotel-additional-text">Designs may vary</p>
          </div>
        </div>
      </div>
      <BaseButton
        buttonText="Book"
        className="book-hotel-btn"
      />
    </div>
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
    @Prop() readonly coordinates!: object
    @Prop() readonly hotelLocations!: object
}
</script>

<style>
  .search-map {
    width: 100%;
    height: 100vh;
  }

  .hotel-card-wrapper {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 1px 15px rgba(63, 63, 68, 0.15);
    padding: 0 1rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 2%;
    margin-left: auto;
    margin-right: auto;
  }

  .hotel-card {
    display: flex;
    margin: 0 auto;
    padding: 1.5rem 0;
  }

.hotel-info-section {
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hotel-name {
  font-size: .8rem;
}

.hotel-distance {
  text-transform: uppercase;
  margin-top: .5rem;
  font-size: .6rem;
  color: #B3B7BB;
}

.hotel-price {
  font-weight: bolder;
  margin-bottom: .5rem;
  font-size: 1.2rem;
}

.hotel-additional-text {
  font-size: .7rem;
  color: #B3B7BB;
}

.selected-hotel-icon {
  width: 6rem;
  height: 8rem;
  object-fit: cover;
}

.book-hotel-btn {
  background-color: #F7941D;
  color: #fff;
  padding: .7rem 1.5rem;
  border: none;
  width: 100%;
  margin-bottom: .5rem;
}
</style>
