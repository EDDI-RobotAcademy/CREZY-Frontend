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
    ...mapActions(accountModule, ["requestAccountToSpring"]),
  },
  computed: {
    ...mapState(playlistModule, ["myPlaylists", "myLikedPlaylists"]),
    ...mapState(accountModule, ["account"]),
  },
  async mounted() {
    await this.requestMyPlaylistsToSpring();
    await this.requestMyLikedPlaylistsToSpring();
    await this.requestAccountToSpring();
  },
};
</script>
<style></style>
  