<template lang="">
  <nav>
    <v-navigation-drawer app class="navigation-drawer" v-model="navigation_drawer">
      <v-list-item>
        <div class="logo-container">
          <v-img
            src="@/assets/images/Logo_only_small-removebg-preview.png"
            height="55"
            width="55"
            contain
            ></v-img>
            <v-img
              style="margin-left: -55px"
              src="@/assets/images/Logo_Text-removebg-preview.png"
              height="100"
              width="270"
              contain
            ></v-img>
        </div>
      </v-list-item>

      <v-list nav dense>
        <v-list-item v-for="(link, index) in links" :key="link.index" @click="handleNav(link.route)" :class="link.class">
        <v-list-item-action>
            <v-icon>
            {{ link.icon }}
            </v-icon>
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title>
            {{ link.text }}
            </v-list-item-title>
        </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar flat app class="admin-nav-bar">
      <v-btn @click="navigation_drawer = !navigation_drawer" class="drawer-btn" rounded>
        <v-icon v-if="navigation_drawer">mdi-menu-left-outline</v-icon>
        <v-icon v-else>mdi-menu-right-outline</v-icon>
      </v-btn>
      <div class="admin-nav-content">
        <div class="nav-page-title">
          대충 페이지 제목
        </div>
        <div style="color: white; margin-right: 50px;">
          대충 프로필
        </div>
      </div>
    </v-app-bar>


  </nav>
</template>
<script>
export default {
  data() {
    return {
      navigation_drawer: true,
      links: [
        { icon: "mdi-developer-board", text: "Dashboard", class: "clicked-nav-drawer-item", route: "AdminMainPage"},
        { icon: "mdi-music-box-multiple", text: "Playlists", class: "nav-drawer-items", route: "AdminOverallPlaylistPage"},
        { icon: "mdi-account-box-multiple-outline", text: "Accounts", class: "nav-drawer-items", route: ""},
        { icon: "mdi-music-circle-outline", text: "Songs", class: "nav-drawer-items", route: ""},
        { icon: "mdi-alert-circle-outline", text: "Reports", class: "nav-drawer-items", route: ""}
      ]
    }
  },
  methods: {
    handleNav(currentRoute) {
      this.links.forEach((link) => {
        link.class = 
          link.route === currentRoute ? "clicked-nav-drawer-item" : "nav-drawer-items";
      });
      if (this.$route.name !== currentRoute) {
        this.$router.push({ name: currentRoute });
      }
    }
  },
  watch: {
    $route(to) {
      this.handleNav(to.name);
    },
  },
  created() {
    this.handleNav(this.$route.name);
  }
}
</script>
<style>
.navigation-drawer{
  background-color: #31363F;
}

.admin-nav-bar{
  background-color: #26292E !important;
  height: 80px;
}

.v-toolbar__content{
  height: 80px !important;
}

.admin-nav-content{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nav-page-title{
  color: white;
  font-size: 20px;
  margin-left: 24px;
}

.drawer-btn{
  color: white !important;
  font-size: 24px !important;
}

.nav-drawer-items{
  color: white;
  padding: 20px;
  margin-bottom: 20px !important;
}

.clicked-nav-drawer-item{
  border-right: solid 5px #2DA793;
  background: linear-gradient(to right, transparent 20%, rgba(45, 167, 147, 0.1) 60%, rgba(45, 167, 147, 0.3) 100%); 
  color: white;
  padding: 20px;
  margin-bottom: 20px !important;
}
    
</style>