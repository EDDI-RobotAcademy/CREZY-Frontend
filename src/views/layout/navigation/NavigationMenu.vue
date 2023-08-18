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
            @click="toggleBtn(button.label)"
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
        { label: "Home", class: "clicked-nav-btn" },
        { label: "Playlists", class: "nav-btn" },
        { label: "My Page", class: "nav-btn" },
        { label: "Login", class: "nav-btn" },
      ],
    };
  },
  methods: {
    toggleBtn(label) {
      if (label === "Home") {
        this.buttons = [
          { label: "Home", class: "clicked-nav-btn" },
          { label: "Playlists", class: "nav-btn" },
          { label: "My Page", class: "nav-btn" },
          { label: "Login", class: "nav-btn" },
        ];
        if (this.$route.path !== "/") {
          this.$router.push({ name: "home" });
        }
      }
      if (label === "Playlists") {
        this.buttons = [
          { label: "Home", class: "nav-btn" },
          { label: "Playlists", class: "clicked-nav-btn" },
          { label: "My Page", class: "nav-btn" },
          { label: "Login", class: "nav-btn" },
        ];
        if (this.$route.path !== "/playlist-list-page") {
          this.$router.push({ name: "PlaylistListPage" });
        }
      }
      if (label === "My Page") {
        this.buttons = [
          { label: "Home", class: "nav-btn" },
          { label: "Playlists", class: "nav-btn" },
          { label: "My Page", class: "clicked-nav-btn" },
          { label: "Login", class: "nav-btn" },
        ];
      }
      if (label === "Login") {
        this.buttons = [
          { label: "Home", class: "nav-btn" },
          { label: "Playlists", class: "nav-btn" },
          { label: "My Page", class: "nav-btn" },
          { label: "Login", class: "clicked-nav-btn" },
        ];
      }
    },
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
