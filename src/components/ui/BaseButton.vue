<template>
  <button :class="className" @click.prevent="handleClick" :disabled="disabled">
    <slot></slot>
    {{ buttonText }}
    <Loader v-if="isLoading" />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class BaseButton extends Vue {
  @Prop({ default: false }) readonly disabled!: boolean;
  @Prop({ default: "" }) readonly className!: string;
  @Prop({ default: "" }) readonly buttonText!: string;
  @Prop({ default: "NORMAL" }) readonly status!: string;
  @Prop({ default: false }) readonly isLoading!: boolean;

  public handleClick() {
    this.$emit("button-clicked");
  }
}
</script>

<style></style>
