import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSpinner, faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faSpinner, faSearch);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("Loader", () => import("./components/ui/Loader.vue"));
Vue.component("BaseButton", () => import("./components/ui/BaseButton.vue"));
Vue.component("BaseInputField", () =>
  import("./components/ui/BaseInputField.vue")
);
