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
              @click="goHome"
            ></v-img>
            <v-img
              style="margin-left: -55px"
              src="@/assets/images/Logo_Text-removebg-preview.png"
              height="100"
              width="270"
              contain
              @click="goHome"
            ></v-img>
          </div>
        </button>
        <div class="nav-btn-container">
          <button
            v-for="(button, index) in [...buttons, loginButton]"
            :key="index"
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
import { mapState, mapActions } from 'vuex';

const accountModule = 'accountModule';


export default {
  data() {
    return {
      buttons: [
        { label: "Home", class: "nav-btn", name: "home", secondName: "MusicRecommendationPage" },
        { label: "Playlists", class: "nav-btn", name: "PlaylistListPage", secondName: "PlaylistReadPage" },
        { label: "My Page", class: "nav-btn", name: "MyPage", secondName: "PlaylistManagePage" },
      ],
    };
  },
  computed: {
    ...mapState(accountModule, ['isLoggedIn']),
    

    loginButton() {
      let buttonClass = this.$route.name === "AccountLoginPage" ? "clicked-nav-btn" : "nav-btn"; 
      if (this.isLoggedIn) {
        return { label: "Logout", class: buttonClass, name: "AccountLoginPage" }
      } else {
        return { label: "Login", class: buttonClass, name: "AccountLoginPage" }
      }
    },
  },
  
  methods: {
    ...mapActions(accountModule, ['requestUserLogoutToSpring']),
    goHome() {
      this.$router.push('/');
    },
    toggleBtn(currentRoute) {
      this.buttons.forEach((button) => {
        button.class =
          button.name === currentRoute ? "clicked-nav-btn" : "nav-btn";
      });
      if (this.loginButton.name === currentRoute) {
        if (this.loginButton.label === 'Logout') {
          this.signOut();
        }
        else {
          this.isLoggedIn = !this.isLoggedIn;
          this.loginButton.class = 'clicked-nav-btn';
        }
      }
      if (this.$route.name !== currentRoute) {
        this.$router.push({ name: currentRoute });
      }
    },

    checkSecondName(currentRoute) {
      this.buttons.forEach((button) => {
        button.class =
          button.secondName === currentRoute ? "clicked-nav-btn" : "nav-btn";
      });
    },

    async signOut() {
      await this.requestUserLogoutToSpring()
      localStorage.removeItem("userToken")
      localStorage.removeItem("nickname")
      localStorage.removeItem("roleType")
      await this.$router.push("/")
    }
  },
  watch: {
    $route: {
      handler(to) {
        this.toggleBtn(to.name);
        const isAllNavButtons = this.buttons.every(button => button.class === "nav-btn");

        if (isAllNavButtons) {
          this.checkSecondName(to.name); // 새로고침하면 풀림 수정 필요
        }
      },
      immediate: true
    }
  },
  created() {
    this.toggleBtn(this.$route.name);
    this.isLoggedIn = this.$store.state.isLoggedIn
  }
};
</script>

<style>
.nav-bar {
  background-color: transparent !important;
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
