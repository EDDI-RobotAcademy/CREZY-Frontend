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
        <router-view v-slot="{ Component }">
          <transition name="slide" mode="out-in">
            <Component :is="Component" />
          </transition>
        </router-view>
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

  --v-layout-top: 0px !important;
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

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: 0.3s ease-out;
}
</style>
