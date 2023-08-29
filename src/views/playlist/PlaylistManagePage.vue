<template>
  <div>
    <PlaylistManageForm v-if="playlist" :playlist="playlist" :playlistId="playlistId" @submit="onSubmit"
      @submitPlaylist="submitPlaylist" />
  </div>
</template>
<script>
import PlaylistManageForm from "@/components/playlist/PlaylistManageForm.vue";
import { mapActions, mapState } from "vuex";

const playlistModule = "playlistModule";

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
    async submitPlaylist(payload) {
      const playlistId = this.playlistId
      console.log(playlistId)
      await this.requestPlaylistModifyToSpring({ ...payload, playlistId })
      await this.$router.push({
        name: 'PlaylistManagePage',
        params: { playlistId: this.playlistId }
      })
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
