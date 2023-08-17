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
          <button v-for="button in buttons" :key="button.label" class="nav-btn">
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
        { label: "Home" },
        { label: "Playlists" },
        { label: "My Page" },
        { label: "Login" },
      ],
    };
  },
};
</script>

<style>
.nav-bar {
  background-color: rgba(255, 255, 255, 0.2) !important;
  position: sticky !important;
  top: 0;
  margin-top: 20px;
  z-index: 1000;
  width: 100%;
}

.icon-btn {
  display: flex;
  align-items: center;
  position: static;
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
</style>
