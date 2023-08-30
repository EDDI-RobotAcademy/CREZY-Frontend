<template>
  <div>
    <PlaylistManageForm v-if="playlist" :playlist="playlist" :playlistId="playlistId" @submitPlaylist="submitPlaylist"
      @submitSong="submitSong" @deleteSubmit="deleteSubmit" />
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
    ...mapActions(songModule, ["requestSongRegisterToSpring", "requestDeleteSelectedSongsToSpring"]),
    async submitPlaylist(payload) {
      const playlistId = this.playlistId
      console.log(playlistId)
      await this.requestPlaylistModifyToSpring({ ...payload, playlistId })
      await this.requestPlaylistToSpring(playlistId)
    },
    async submitSong(payload) {
      const playlistId = this.playlistId
      await this.requestSongRegisterToSpring({ ...payload, playlistId })
      await this.requestPlaylistToSpring(playlistId)
    },
    async deleteSubmit(payload) {
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
