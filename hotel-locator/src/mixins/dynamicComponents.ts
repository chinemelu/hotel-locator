import { Component, Vue } from "vue-property-decorator";

@Component
class DynamicComponentMixin extends Vue {
  public activeComponentIndex = 0;
  public handleNextSection(): void {
    this.activeComponentIndex += 1;
  }
  public handlePreviousSection(): void {
    this.activeComponentIndex -= 1;
  }
}

export default DynamicComponentMixin;
