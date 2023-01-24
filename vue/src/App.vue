<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { App as CapApp } from "@capacitor/app";
import { Browser } from "@capacitor/browser";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    const { handleRedirectCallback } = useAuth0();

    CapApp.addListener("appUrlOpen", async ({ url }) => {
      if (
        url.includes("state") &&
        (url.includes("code") || url.includes("error"))
      ) {
        await handleRedirectCallback(url);
      }
      // No-op on Android
      await Browser.close();
    });
  },
});
</script>
