<template>
  <ion-button @click="login">Log in</ion-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { Browser } from "@capacitor/browser";
import { IonButton } from "@ionic/vue";

export default defineComponent({
  components: {
    IonButton,
  },
  setup() {
    const { buildAuthorizeUrl } = useAuth0();

    const login = async () => {
      const url = await buildAuthorizeUrl();
      await Browser.open({ url, windowName: "_self" });
    };

    return { login };
  },
});
</script>
