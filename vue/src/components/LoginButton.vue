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
    const { loginWithRedirect } = useAuth0();

    const login = async () => {
      await loginWithRedirect({
        openUrl: (url: string) =>
          Browser.open({
            url,
            windowName: "_self",
          }),
      });
    };

    return { login };
  },
});
</script>
