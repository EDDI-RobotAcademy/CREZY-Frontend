<template>
  <v-container>
    <v-card class="login-card" flat>
      <div class="login-title">로그인</div>
      <v-img class="mx-auto" height="300" :src="require('@/assets/images/blackpeoplewithheadphone.png')">
      </v-img>
      <div class="login-icons">
        <v-img class="icon" :src="require('@/assets/images/google_icon.png')" height="50" @click="onGoogleLogin"></v-img>

      </div>
    </v-card>
  </v-container>
</template>
<script>
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const onGoogleLogin = async () => {
      await store.dispatch("accountModule/requestGoogleOauthRedirectUrlToSpring");
    };

    return {
      onGoogleLogin
    };
  }
}
</script>

<style>
.login-card {
  margin-top: 6rem;
  padding: 18px;
  width: 900px;
  background-color: rgba(0, 0, 0, 0.4) !important;
}

.login-title {
  font-size: 22px;
  color: #ffffff;
}

.login-icons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.icon {
  cursor: pointer;
}
</style>