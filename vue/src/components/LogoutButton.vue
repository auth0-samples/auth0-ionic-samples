<template>
  <ion-button @click="onLogout">Log out</ion-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { Browser } from "@capacitor/browser";
import { IonButton } from "@ionic/vue";
import { callbackUri } from "../auth.config";

export default defineComponent({
  components: {
    IonButton,
  },
  setup() {
    const { buildLogoutUrl, logout } = useAuth0();

    const onLogout = async () => {
      await Browser.open({
        url: buildLogoutUrl({ returnTo: callbackUri }),
        windowName: "_self",
      });

      logout({ localOnly: true });
    };

    return {
      onLogout,
    };
  },
});
</script>
