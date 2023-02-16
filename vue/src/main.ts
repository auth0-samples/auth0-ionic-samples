import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import { createAuth0 } from "@auth0/auth0-vue";
import { domain as auth0Domain, clientId, callbackUri } from "./auth.config";

const app = createApp(App).use(IonicVue).use(router);

app.use(
  createAuth0({
    domain: auth0Domain,
    clientId: clientId,
    authorizationParams: {
      redirect_uri: callbackUri,
    },
    // For using Auth0-Vue with Ionic on Android and iOS,
    // it's important to use refresh tokens without the falback
    useRefreshTokens: true,
    useRefreshTokensFallback: false
  })
);

router.isReady().then(() => {
  app.mount("#app");
});
