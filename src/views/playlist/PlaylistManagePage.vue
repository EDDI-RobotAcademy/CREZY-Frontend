<template>
  <div>
    <PlaylistManageForm v-if="playlist" :playlist="playlist" :playlistId="playlistId" @submit="onSubmit"
      @submitPlaylist="submitPlaylist" @submitSong="submitSong" />
  </div>
</template>
<script>
import PlaylistManageForm from "@/components/playlist/PlaylistManageForm.vue";
import { mapActions, mapState } from "vuex";

const playlistModule = "playlistModule";
const songModule = "songModule";

export default {
  props: {
    playlistId: {
      type: String,
      required: true,
    },
  },
  components: {
    PlaylistManageForm,
  },
  methods: {
    ...mapActions(playlistModule, ["requestPlaylistToSpring", "requestPlaylistModifyToSpring"]),
    ...mapActions(songModule, ["requestSongRegisterToSpring"]),
    async submitPlaylist(payload) {
      const playlistId = this.playlistId
      console.log(playlistId)
      await this.requestPlaylistModifyToSpring({ ...payload, playlistId })
      await this.$router.push({
        name: 'PlaylistManagePage',
        params: { playlistId: this.playlistId }
      })
    },
    async submitSong(payload) {
      const playlistId = this.playlistId
      await this.requestSongRegisterToSpring({ ...payload, playlistId })
      await this.requestPlaylistToSpring(playlistId)
    },
    async onSubmit(payload) {
      await this.requestDeleteSelectedSongsToSpring(payload)
    }
  },
  computed: {
    ...mapState(playlistModule, ["playlist"]),
  },
  async created() {
    await this.requestPlaylistToSpring(this.playlistId);
  },
};
</script>
<style></style>
