<template>
  <div class="map" id="map">
    <div ref="map" :class="className"></div>
    <a target="_blank" href="https://icons8.com/icons/set/3-star-hotel"
      >Hotel Star icon</a
    >
    icon by <a target="_blank" href="https://icons8.com">Icons8</a> Icons made
    by
    <a href="https://www.flaticon.com/authors/turkkub" title="turkkub"
      >turkkub</a
    >
    from
    <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import hotelPlaceholder from "@/assets/hotel-placeholder.png";

import axiosCalls from "../../services/AxiosCalls";

import {
  Platform,
  HotelLocation,
  ensurePossiblyNullValueReturnsObject
} from "@/types";

import greyHomeIcon from "@/assets/grey-home-icon.svg";
import blackHomeIcon from "@/assets/black-home-icon.svg";
import locationIcon from "@/assets/location-marker.png";
import iconForHotelWithAtLeastOneImage from "@/assets/hotel-with-image-icon.png";

/* eslint-disable no-undef */
/* eslint-disable  @typescript-eslint/no-explicit-any */

@Component
export default class BaseMap extends Vue {
  private apiKey = process.env.VUE_APP_API_KEY;
  private activeBubbleElement = "";
  private map = {
    addObject: Function,
    addObjects: Function
  };
  private ui = {
    addBubble: Function
  };
  private group: EventTarget | any = {
    addEventListener: Function,
    dispatchEvent: Function,
    removeEventListener: Function,
    getBoundingBox: Function
  };
  private icon = "";
  private activeMarker: any = {};

  // @ts-ignore: H is not defined
  private blackHomeIconInstance = new H.map.Icon(blackHomeIcon);
  // @ts-ignore: H is not defined
  private locationIconInstance = new H.map.Icon(locationIcon);
  // @ts-ignore: H is not defined
  private greyHomeIconInstance = new H.map.Icon(greyHomeIcon);

  private activeIcon = "";

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
  @Prop() readonly hotelLocations!: Array<HotelLocation>;

  public created(): void {
    // @ts-ignore: H is not defined
    this.platform = new H.service.Platform({
      apikey: this.apiKey
    });
  }

  public isCustomEvent(event: Event): event is CustomEvent {
    return "detail" in event;
  }

  public async mounted() {
    const defaultLayers = this.platform.createDefaultLayers();

    // @ts-ignore: H is not defined
    this.map = new H.Map(this.$refs.map, defaultLayers.vector.normal.map, {
      zoom: 10,
      center: {
        lat: this.lat,
        lng: this.long
      }
    });
    window.addEventListener("keydown", this.handleEscapeKeyPress);
    window.addEventListener("resize", this.onResize);
    this.map.addEventListener("tap", this.addInfoBubble);

    // @ts-ignore: H is not defined
    new H.mapevents.Behavior(
      // @ts-ignore: H is not defined
      new H.mapevents.MapEvents(this.map)
    );

    // @ts-ignore: H is not defined
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);

    await this.addMarkersAndSetViewBounds();
  }

  public evt!: {
    target: {
      getData(): string;
      setIcon(): string;
    };
  };

  public onResize() {
    // @ts-ignore
    this.map.getViewPort().resize();
  }

  public handleEscapeKeyPress(evt: KeyboardEvent) {
    const key = evt.keyCode;
    const isEscapeKey = key === 27;
    if (isEscapeKey) {
      this.clearOpenInformationBubble();
      this.resetIconToOriginalState();
    }
  }

  public replaceBreakHTMLTagsWithEmptySpace(str: string) {
    const regex = /(&nbsp;|<([^>]+)>)/gi;
    return str.replace(regex, " ");
  }

  public async addMarkersAndSetViewBounds() {
    // @ts-ignore
    const arrayOfHotels = [];
    // @ts-ignore: H is not defined

    // @ts-ignore: H is not defined
    const locationMarker = new H.map.Marker(
      { lat: this.lat, lng: this.long },
      { icon: this.locationIconInstance }
    );
    // create map objects
    await Promise.all(
      this.hotelLocations.map(async hotel => {
        const additionalHotelDetailsResponse = await axiosCalls.get(hotel.href);

        const hotelCoordinate = hotel.position;
        const numberOfHotelImagesAvailable =
          additionalHotelDetailsResponse.data.media.images.available;

        const hotelImageArray =
          additionalHotelDetailsResponse.data.media.images.items;

        const selectedIcon =
          numberOfHotelImagesAvailable > 0
            ? iconForHotelWithAtLeastOneImage
            : greyHomeIcon;

        // @ts-ignore: H is not defined
        const icon = new H.map.Icon(selectedIcon);

        // @ts-ignore: H is not defined
        const marker = new H.map.Marker(
          { lat: hotelCoordinate[0], lng: hotelCoordinate[1] },
          { icon }
        );
        marker.setData(`
            <div class="hotel-card-wrapper">
                <div class="hotel-card">
                  <div class="hotel-image-wrapper">
                    <img src="${
                      numberOfHotelImagesAvailable > 0
                        ? hotelImageArray[0].src
                        : hotelPlaceholder
                    }" class="selected-hotel-image" alt="Image of selected hotel">
                  </div>
                  <div class="hotel-info-section">
                    <div class="hotel-info-name-distance">
                      <h4 class="hotel-name">${
                        hotel.title
                      }, ${this.replaceBreakHTMLTagsWithEmptySpace(
          hotel.vicinity
        )}</h4>
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
      })
    );
    // @ts-ignore: H is not defined
    this.group = new H.map.Group();
    // @ts-ignore
    this.group.addObjects(arrayOfHotels);

    this.map.addObject(this.group);

    this.map.addObject(locationMarker);

    // @ts-ignore
    this.map.getViewModel().setLookAtData({
      bounds: this.group.getBoundingBox()
    });
  }

  public setTappedMarkerToBlackHomeIcon(evt: Event) {
    ensurePossiblyNullValueReturnsObject(evt.target).setIcon(
      this.blackHomeIconInstance
    );
  }

  public setActiveMarker(evt: Event) {
    this.activeMarker = ensurePossiblyNullValueReturnsObject(evt.target);
  }

  public isFirstMarkerClick() {
    return Object.keys(this.activeMarker).length === 0;
  }

  public setPreviousIconWhenThereAreTwoOrMoreTapsOnMarkers() {
    if (!this.isFirstMarkerClick()) {
      this.activeMarker.setIcon(this.activeIcon);
    }
  }

  public resetIconToOriginalState() {
    this.activeMarker.setIcon(this.activeIcon);
  }

  public getCurrentIconAssociatedWithMarker(evt: Event) {
    this.activeIcon = ensurePossiblyNullValueReturnsObject(
      evt.target
    ).getIcon();
  }

  public unselectBlackIconAndSetToOriginalIconWhenInfoBubbleCloses(evt: Event) {
    if (
      ensurePossiblyNullValueReturnsObject(evt.target).getState() ===
      // @ts-ignore: H is not defined
      H.ui.InfoBubble.State.CLOSED
    ) {
      this.resetIconToOriginalState();
    }
  }

  public isAnIconClicked(evt: Event) {
    if (ensurePossiblyNullValueReturnsObject(evt.target).getData) return true;
    return false;
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  public addInfoBubble(evt: Event) {
    if (!this.isAnIconClicked(evt)) {
      this.clearOpenInformationBubble();

      if (!this.isFirstMarkerClick()) {
        this.resetIconToOriginalState();
      }
      return;
    }

    this.setPreviousIconWhenThereAreTwoOrMoreTapsOnMarkers();

    this.getCurrentIconAssociatedWithMarker(evt);

    this.setTappedMarkerToBlackHomeIcon(evt);

    // @ts-ignore: H is not defined
    const bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
      // read custom data
      content: ensurePossiblyNullValueReturnsObject(evt.target).getData()
    });

    bubble.addEventListener(
      "statechange",
      this.unselectBlackIconAndSetToOriginalIconWhenInfoBubbleCloses
    );

    this.clearOpenInformationBubble();
    this.ui.addBubble(bubble);
    this.activeBubbleElement = bubble.getElement();
    this.setActiveMarker(evt);
  }

  public clearOpenInformationBubble() {
    // @ts-ignore: H is not defined
    this.ui.getBubbles().forEach(bubble => this.ui.removeBubble(bubble));
  }

  public beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("keydown", this.handleEscapeKeyPress);
    window.removeEventListener("tap", this.addInfoBubble);
    window.removeEventListener(
      "statechange",
      this.unselectBlackIconAndSetToOriginalIconWhenInfoBubbleCloses
    );
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
