<template>
  <v-app class="app-container">
    <VideoBackground
      :src="require(`@/assets/vids/vid-background.mp4`)"
      style="
        height: 100vh;
        width: 100%;
        position: absolute;
        z-index: -1;
        background-size: cover;
      "
    >
    </VideoBackground>

    <v-main class="main">
      <NavigationMenu style="z-index: 1" />
      <div class="centered">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import NavigationMenu from "./views/layout/navigation/NavigationMenu.vue";
import VideoBackground from "vue-responsive-video-background-player";

export default {
  components: {
    NavigationMenu,
    VideoBackground,
  },

  data: () => ({}),
};
</script>

<style>
.app-container {
  position: fixed;
  width: 100%;
  height: 100%;
}
.main {
  padding-bottom: 150px;
  z-index: 1;
  overflow: auto;
  height: 100%;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
}

.main::-webkit-scrollbar {
  display: none; /* 크롬, 사파리, 오페라, 엣지 */
}
.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
