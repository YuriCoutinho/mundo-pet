import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faUser,
  faKey,
  faPaw,
  faBars,
  faTimes,
  faUserTie,
  faPen,
  faTrash,
  faIdCard,
  faPhone,
  faEnvelope,
  faSpinner,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faUser,
  faKey,
  faPaw,
  faBars,
  faTimes,
  faUserTie,
  faPen,
  faTrash,
  faIdCard,
  faPhone,
  faEnvelope,
  faSpinner,
  faArrowRightFromBracket
);

Vue.component("font-awesome-icon", FontAwesomeIcon);
