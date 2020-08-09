<template>
  <div class="search-hotel-section">
    <div class="background">
      <img
        src="@/assets/background-image-min.jpg"
        alt="background image"
        class="search-background-image"
      />
      <div class="search-section">
        <div class="search-input-container">
          <BaseInputField
            type="search"
            placeholder="Enter hotel location"
            className="search-input"
            v-model="location"
          />
          <font-awesome-icon icon="search" class="search-icon" />
        </div>
        <div class="button-container">
          <BaseButton
            buttonText="Search"
            className="search-btn"
            :isLoading="isLoading"
            @button-clicked="handleButtonClick"
            :disabled="conditionsForSearchButtonToBeDisabled"
          />
        </div>
      </div>
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
  @Prop({ default: false }) readonly isLoading!: boolean;

  private location = "";

  public handleButtonClick() {
    this.$emit("search-button-clicked", this.location);
  }

  get conditionsForSearchButtonToBeDisabled() {
    const conditionsForSearchButtonToBeDisabled =
      !this.location || this.isLoading;
    return conditionsForSearchButtonToBeDisabled;
  }
}
</script>

<style>
.background {
  margin: 0 auto;
}
.search-hotel-section {
  height: 100vh;
  font-size: 1.5rem;
  position: relative;
  background-color: #f5f5f5;
  text-align: center;
}
.search-background-image {
  object-fit: contain;
  object-position: center;
  max-width: 100%;
  width: 100%;
}

.search-section {
  background-color: #fff;
  margin: 0 auto;
  border-radius: 4px;
  box-shadow: 0px 1px 15px rgba(63, 63, 68, 0.15);
  padding: 2rem 2rem;
  position: absolute;
  left: 50%;
  width: 15rem;
  top: 40%;
  transform: translateX(-50%);
  z-index: 2;
  display: inline-block;
}

.search-input-container {
  margin-bottom: 2rem;
  display: flex;
  flex-grow: 2;
  align-items: center;
}
.search-input {
  width: 100%;
  padding: 0.5rem 1.9rem;
  display: inline-block;
  margin-left: 0.18rem;
}

.search-icon {
  font-size: 1rem;
  margin-left: -14rem;
  color: #ccc;
}

.search-btn {
  width: 97%;
  padding: 0.5rem 1.5rem;
  background-color: #f7941d;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 2rem;
  cursor: pointer;
  font-size: 1rem;
}

.search-btn:disabled {
  background-color: #ccc;
}
</style>
