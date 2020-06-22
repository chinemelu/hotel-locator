<template>
  <div class="map" id="map">
    <div ref="map" :class="className"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import hotelPlaceholder from "@/assets/hotel-placeholder.png";

import { Platform, HotelLocation } from "../../types";

// @ts-ignore
import houseIcon from "@/assets/map-home-icon.svg";

@Component
export default class BaseMap extends Vue {
    // @ts-ignore
  private apiKey = process.env.VUE_APP_API_KEY;
  private map = {};
  private group = {};
  private ui = {};
  private icon = '';

  private platform: Platform = {
    createDefaultLayers: () => ({
      vector: {
        normal: {
          map: {}
        }
      }
    })
  };

  @Prop() readonly lat!: string;
  @Prop() readonly long!: string;
  @Prop() readonly className!: string;
  @Prop() readonly hotelLocations!: HotelLocation;

  public created(): void {
    // @ts-ignore: H is not defined
    this.platform = new H.service.Platform({ // eslint-disable-line no-undef
      apikey: this.apiKey
    });
  }

  public mounted(): void {
    const defaultLayers = this.platform.createDefaultLayers();

    // @ts-ignore: H is not defined
    this.map = new H.Map(this.$refs.map, defaultLayers.vector.normal.map, { // eslint-disable-line no-undef
      zoom: 10,
      center: {
        lat: this.lat,
        lng: this.long
      }
    });

    window.addEventListener("resize", this.onResize);

    // @ts-ignore: H is not defined
    new H.mapevents.Behavior( // eslint-disable-line no-undef
      // @ts-ignore: H is not defined
      new H.mapevents.MapEvents(this.map) // eslint-disable-line no-undef
    );

    // @ts-ignore: H is not defined
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers); // eslint-disable-line no-undef

    this.addMarkersAndSetViewBounds();
  }

  public onResize() {
    // @ts-ignore
    this.map.getViewPort().resize();
  }

  public addMarkersAndSetViewBounds() {
    // @ts-ignore
    const arrayOfHotels = [];
    // create map objects
    // @ts-ignore: H is not defined
    this.hotelLocations.forEach(hotel => {
      const hotelCoordinate = hotel.position;
      // @ts-ignore: H is not defined
      const icon = new H.map.Icon(houseIcon); // eslint-disable-line no-undef

      // @ts-ignore: H is not defined
      const marker = new H.map.Marker( // eslint-disable-line no-undef
        { lat: hotelCoordinate.lat, lng: hotelCoordinate.lng },
        { icon }
      );
      marker.setData(`
            <div class="hotel-card-wrapper">
                <div class="hotel-card">
                  <div class="hotel-image-wrapper">
                    <img src="${
                      hotel.image ? hotel.image : hotelPlaceholder
                    }" class="selected-hotel-image" alt="Image of selected hotel">
                  </div>
                  <div class="hotel-info-section">
                    <div class="hotel-info-name-distance">
                      <h3 class="hotel-name">${hotel.address.label}</h3>
                      <p class="hotel-distance">${
                        hotel.distance
                      } km from location</p>
                    </div>
                    <div class="hotel-info-price-text">
                      <p class="hotel-price">&pound;98</p>
                      <p class="hotel-additional-text">Designs may vary</p>
                    </div>
                  </div>
                </div>
                <button class="book-hotel-btn">Book</button>
            </div>`);
          marker.dispatchEvent("tap");
          arrayOfHotels.push(marker);
    });


    // @ts-ignore: H is not defined
    const group = new H.map.Group(); // eslint-disable-line no-undef
    // @ts-ignore
    group.addObjects(arrayOfHotels);
    // @ts-ignore
    this.map.addObject(group);

    group.addEventListener("tap", this.addInfoBubble, false);

    // @ts-ignore
    this.map.getViewModel().setLookAtData({
      bounds: group.getBoundingBox()
    });
  }

/* eslint-disable  @typescript-eslint/no-explicit-any */
  public addInfoBubble(evt: any) {
    // @ts-ignore: H is not defined
    const bubble = new H.ui.InfoBubble(evt.target.getGeometry(), { // eslint-disable-line no-undef
      // read custom data
      content: evt.target.getData()
    });
    // @ts-ignore: H is not defined
    this.ui.getBubbles().forEach(bubble => this.ui.removeBubble(bubble))
    // @ts-ignore: H is not defined
    this.ui.addBubble(bubble); // eslint-disable-line no-undef
  }

  public beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("tap", this.addInfoBubble); // eslint-disable-line no-undef
  }
}
</script>

<style>
.H_ib_body {
  width: 20rem;
  margin-bottom: 2rem;
}
.hotel-card-wrapper {
  background-color: #fff;
  border-radius: 4px;
  margin: 0 auto;
  max-width: 100%;
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
  font-size: 0.8rem;
}

.hotel-distance {
  text-transform: uppercase;
  margin-top: 0.5rem;
  font-size: 0.6rem;
  color: #b3b7bb;
}

.hotel-price {
  font-weight: bolder;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.hotel-additional-text {
  font-size: 0.7rem;
  color: #b3b7bb;
}

.hotel-image-wrapper {
  width: 18rem;
  height: 12rem;
}

.selected-hotel-image {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.H_ib_tail {
  visibility: hidden;
}

.book-hotel-btn {
  background-color: #f7941d;
  color: #fff;
  height: 2rem;
  border: none;
  width: 100%;
  margin-bottom: 0.5rem;
}
</style>
