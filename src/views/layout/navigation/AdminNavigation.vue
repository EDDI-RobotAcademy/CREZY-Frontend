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

      <v-list class="logout-btn-container" nav dense>
        <v-list-item class="logout-btn" @click="logout">
          <v-list-item-action>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
            Logout
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
          어서 오세요 {{ nickname }}님
        </div>
      </div>
    </v-app-bar>


  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';

const accountModule = 'accountModule';

export default {
  data() {
    return {
      navigation_drawer: true,
      links: [
        { icon: "mdi-developer-board", text: "Dashboard", class: "clicked-nav-drawer-item", route: "AdminMainPage" },
        { icon: "mdi-music-box-multiple", text: "Playlists", class: "nav-drawer-items", route: "AdminOverallPlaylistPage" },
        { icon: "mdi-account-box-multiple-outline", text: "Accounts", class: "nav-drawer-items", route: "AdminOverallAccountsPage" },
        { icon: "mdi-music-circle-outline", text: "Songs", class: "nav-drawer-items", route: "AdminOverallSongsPage" },
        { icon: "mdi-alert-circle-outline", text: "Reports", class: "nav-drawer-items", route: "AdminOverallReportsPage" },
        { icon: "mdi-file-document-edit-outline", text: "Inquiries", class: "nav-drawer-items", route: "AdminOverallInquiriesPage" }
      ]
    }
  },
  methods: {
    ...mapActions(accountModule, ['requestUserLogoutToSpring']),

    handleNav(currentRoute) {
      this.links.forEach((link) => {
        link.class =
          link.route === currentRoute ? "clicked-nav-drawer-item" : "nav-drawer-items";
      });
      if (this.$route.name !== currentRoute) {
        this.$router.push({ name: currentRoute });
      }
    },
    async logout() {
      await this.requestUserLogoutToSpring()
      localStorage.removeItem("userToken")
      localStorage.removeItem("nickname")
      localStorage.removeItem("roleType")
      await this.$router.push({ name: "home" })
    }
  },
  watch: {
    $route(to) {
      this.handleNav(to.name);
    },
  },
  created() {
    this.handleNav(this.$route.name);
  },
  computed: {
    ...mapState(accountModule, ['isLoggedIn']),

    nickname() {
      if (this.isLoggedIn) {
        return localStorage.getItem('nickname')
      }
    }
  }
}
</script>
<style>
.navigation-drawer {
  background-color: #31363F;
}

.admin-nav-bar {
  background-color: #26292E !important;
  height: 80px;
}

.v-toolbar__content {
  height: 80px !important;
}

.admin-nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nav-page-title {
  color: white;
  font-size: 20px;
  margin-left: 24px;
}

.drawer-btn {
  color: white !important;
  font-size: 24px !important;
}

.nav-drawer-items {
  color: white;
  padding: 20px;
  margin-bottom: 20px !important;
}

.clicked-nav-drawer-item {
  border-right: solid 5px #2DA793;
  background: linear-gradient(to right, transparent 20%, rgba(45, 167, 147, 0.1) 60%, rgba(45, 167, 147, 0.3) 100%);
  color: white;
  padding: 20px;
  margin-bottom: 20px !important;
}

.logout-btn-container {
  position: absolute;
  bottom: 24px;
  width: 100%;
}

.logout-btn {
  color: white;
  padding: 20px;
}
</style>