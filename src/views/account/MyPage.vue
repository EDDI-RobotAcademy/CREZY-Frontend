<template>
  <div>
    <MyPageForm :account="account" :myPlaylists="myPlaylists" :myLikedPlaylists="myLikedPlaylists" />
  </div>
</template>
<script>
import MyPageForm from "@/components/account/MyPageForm.vue";
import { mapActions, mapState } from "vuex";

const playlistModule = "playlistModule";
const accountModule = "accountModule";

export default {
  components: {
    MyPageForm,
  },
  methods: {
    ...mapActions(playlistModule, ["requestMyPlaylistsToSpring", "requestMyLikedPlaylistsToSpring"]),
    ...mapActions(accountModule, ["requestAccountInfoToSpring"]),
  },
  computed: {
    ...mapState(playlistModule, ["myPlaylists", "myLikedPlaylists"]),
    ...mapState(accountModule, ["account"]),
  },
  async mounted() {
    if (localStorage.getItem("roleType") === null) {
      if (confirm("로그인 후 이용 가능합니다.\n\n로그인 하시겠습니까?")) {
        this.$router.push({ name: "AccountLoginPage" })
      } else {
        this.$router.push({ name: "home" })
      }
    } else {
      await this.requestAccountInfoToSpring();
      await this.requestMyPlaylistsToSpring();
      await this.requestMyLikedPlaylistsToSpring();
    }
  }
}
</script>
<style></style>
  