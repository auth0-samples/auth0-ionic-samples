<template>
  <ion-page v-if="!isLoading">
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Auth0 Vue Sample</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Auth0 Vue Sample</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="container">
        <user-profile />
        <logout-button v-if="isAuthenticated" />
        <login-button v-else />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";

import { useAuth0 } from "@auth0/auth0-vue";

import UserProfile from "@/components/UserProfile.vue";
import LogoutButton from "@/components/LogoutButton.vue";
import LoginButton from "@/components/LoginButton.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    UserProfile,
    LogoutButton,
    LoginButton,
  },
  setup() {
    const { isLoading, isAuthenticated } = useAuth0();

    return { isLoading, isAuthenticated };
  },
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}

.profile-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
