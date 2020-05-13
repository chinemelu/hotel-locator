<template>
  <div>
    <input
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :class="className"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.checked)"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class BaseInputField extends Vue {
  @Prop({ default: "text" }) readonly type!: string;
  @Prop({ default: "" }) readonly placeholder!: string;
  @Prop({ default: "" }) readonly value!: string | number;
  @Prop({ default: false }) readonly disabled!: boolean;
  @Prop({ default: false }) readonly required!: boolean;
  @Prop({ default: "" }) readonly className!: string;
}
</script>

<style></style>
