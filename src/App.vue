<template>
  <v-app class="app-container" v-if="!isAdmin">
    <VideoBackground
      :src="require(`@/assets/vids/vid-background2_1080.mp4`)"
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
      <Component :is="currentNavComponent"/>
      <div class="centered">
        <router-view v-slot="{ Component }">
          <transition name="slide" mode="out-in">
            <Component :is="Component" />
          </transition>
        </router-view>
      </div>
    </v-main>
  </v-app>
  <v-app class="admin-container" v-else>
    <Component :is="currentNavComponent"/>
    <v-main>
      <div>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <Component :is="Component" />
          </transition>
        </router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import NavigationMenu from "./views/layout/navigation/NavigationMenu.vue";
import AdminNavigation from "./views/layout/navigation/AdminNavigation.vue"
import VideoBackground from "vue-responsive-video-background-player";

export default {
  components: {
    NavigationMenu,
    VideoBackground,
  },

  data: () => ({
    currentNavComponent: null,
    // currentVideoBackground: null,
    isAdmin: null,
  }),
  watch: {
    $route(to) {
      // 라우트 변경 시 네비게이션 및 배경을 설정합니다.
      if (to.path.startsWith('/admin')) {
        if (localStorage.getItem("roleType") !== "ADMIN") {
          this.currentNavComponent = null
          this.isAdmin = true
        } else {
          this.currentNavComponent = AdminNavigation;
          // this.currentVideoBackground = require(`@/assets/vids/vid-background.mp4`);
          this.isAdmin = true
        }
      } else {
        this.currentNavComponent = NavigationMenu;
        // this.currentVideoBackground = require(`@/assets/vids/vid-background2_1080.mp4`);
        this.isAdmin = false
      }
    },
  },
};
</script>

<style>
.app-container {
  position: fixed;
  width: 100%;
  height: 100%;
}

.admin-container{
  background-color: #26292E;
  padding-bottom: 150px;
}

.main {
  padding-bottom: 150px;
  z-index: 1;
  overflow: auto;
  height: 100%;

  /* --v-layout-left: 0px !important; */
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
