<template>
  <div class="map">
    <div ref="map" :class="className"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import { Platform } from "../../types";

// @ts-ignore
import houseIcon from '@/assets/map-home-icon.svg'

@Component
export default class BaseMap extends Vue {
  @Prop() readonly lat!: string;
  @Prop() readonly long!: string;
  @Prop() readonly className!: string;
  @Prop() readonly hotelLocations!: any;

  // @ts-ignore
  private apiKey ='-2hIw_SN-mA-eof073Z6YWUQRMQLnSdXhuJpmkgxRX4';
  private map = {};

  private platform: Platform = {
    createDefaultLayers: () => ({
      vector: {
        normal: {
          map: {}
        }
      }
    })
  };

  public created(): void {

    // @ts-ignore: H is not defined
    this.platform = new H.service.Platform({ // eslint-disable-line no-undef
      apikey: this.apiKey
    });
  }

  public mounted(): void {
    console.log('wooooo', this.apiKey)
    const defaultLayers = this.platform.createDefaultLayers();

    // @ts-ignore: H is not defined
    this.map = new H.Map(this.$refs.map, defaultLayers.vector.normal.map, { // eslint-disable-line no-undef
      zoom: 10,
      center: {
        lat: this.lat,
        lng: this.long
      }
    });

    window.addEventListener('resize', this.onResize);
    // @ts-ignore: H is not defined
    // const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map)); // eslint-disable-line no-undef
    this.addMarkersAndSetViewBounds(this.map);
  }

  public onResize() {
    // @ts-ignore
    this.map.getViewPort().resize()
  }

  public addMarkersAndSetViewBounds(map: object) {
    // @ts-ignore
    const arrayOfHotels = []
    // create map objects
    // @ts-ignore: H is not defined
    this.hotelLocations.forEach((hotel, index) => {
        const hotelCoordinate = hotel.position
        // @ts-ignore: H is not defined
        const icon = new H.map.Icon(houseIcon); // eslint-disable-line no-undef

          // @ts-ignore: H is not defined
          const location = new H.map.DomMarker({lat:hotelCoordinate.lat,  lng: hotelCoordinate.lng}, {icon}) // eslint-disable-line no-undef
          arrayOfHotels.push(location)
    })


    // @ts-ignore: H is not defined
    const group = new H.map.Group(); // eslint-disable-line no-undef
      // @ts-ignore
    group.addObjects(arrayOfHotels);
    // @ts-ignore
    this.map.addObject(group);

    // @ts-ignore
    this.map.getViewModel().setLookAtData({
      bounds: group.getBoundingBox()
    });
  }

  public beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }

}
</script>

<style scoped></style>
