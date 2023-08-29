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
    await this.requestAccountInfoToSpring();
    await this.requestMyPlaylistsToSpring();
    await this.requestMyLikedPlaylistsToSpring();
  },
};
</script>
<style></style>
  