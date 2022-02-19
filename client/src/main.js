import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { faSkull } from "@fortawesome/free-solid-svg-icons";
library.add(faSkull);
import { faDice } from "@fortawesome/free-solid-svg-icons";
library.add(faDice);
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
library.add(faChevronLeft);
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
library.add(faChevronRight);
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
library.add(faArrowRightToBracket);
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
library.add(faArrowRightFromBracket);
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faUserPlus);
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
library.add(faUserAstronaut);
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelopeOpenText);


const app = createApp(App).use(store);
app.component('fai', FontAwesomeIcon);
app.use(router);
app.mount('#app');
