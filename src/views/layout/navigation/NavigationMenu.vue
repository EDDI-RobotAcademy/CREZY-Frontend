<template>
  <div>
    <v-app-bar flat class="nav-bar">
      <div class="nav-content">
        <button class="icon-btn">
          <div class="logo-container">
            <v-img
              src="@/assets/images/Logo_only_small-removebg-preview.png"
              height="55"
              width="55"
              contain
              @click="test"
            ></v-img>
            <v-img
              style="margin-left: -55px"
              src="@/assets/images/Logo_Text-removebg-preview.png"
              height="100"
              width="270"
              contain
            ></v-img>
          </div>
        </button>
        <div class="nav-btn-container">
          <button
            v-for="button in buttons"
            :key="button.label"
            :class="button.class"
            @click="toggleBtn(button.name)"
          >
            {{ button.label }}
          </button>
        </div>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttons: [
        { label: "Home", class: "clicked-nav-btn", name: "home" },
        { label: "Playlists", class: "nav-btn", name: "PlaylistListPage" },
        { label: "My Page", class: "nav-btn", name: "MyPage" },
        { label: "Login", class: "nav-btn", name: "AccountLoginPage" },
      ],
    };
  },
  methods: {
    toggleBtn(currentRoute) {
      this.buttons.forEach((button) => {
        button.class =
          button.name === currentRoute ? "clicked-nav-btn" : "nav-btn";
      });
      if (this.$route.name !== currentRoute) {
        this.$router.push({ name: currentRoute });
      }
    },
  },
  watch: {
    $route(to) {
      this.toggleBtn(to.name);
      console.log(to.name);
    },
  },
  computed() {
    this.toggleBtn(this.$route.name);
  },
};
</script>

<style>
.nav-bar {
  background-color: rgba(255, 255, 255, 0.2) !important;
  position: sticky !important;
  top: 0;
  margin-top: 15px;
  z-index: 1000;
  width: 100%;
}

.icon-btn {
  display: flex;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 850px;
  margin: 0 auto;
}

.nav-btn-container {
  margin-right: 20px;
}
.nav-btn {
  font-size: 12px;
  padding: 10px;
  margin: 8px;
  margin-top: 30px;
  color: white;
  border-top: solid 3px white;

  &:hover {
    color: #ccff00;
    border-top: solid 3px #ccff00;
  }
}
.clicked-nav-btn {
  font-size: 12px;
  padding: 10px;
  margin: 8px;
  margin-top: 30px;
  color: #ccff00;
  border-top: solid 3px #ccff00;
}
</style>
