<template>
  <div>
    <PlaylistListForm :playlists="playlists" :playlistListCount="playlistListCount" @requestPlaylist="getPlaylists" />
  </div>
</template>

<script>
import PlaylistListForm from "@/components/playlist/PlaylistListForm.vue";
import { mapActions, mapState } from "vuex";

const playlistModule = "playlistModule";

export default {
  components: {
    PlaylistListForm,
  },
  methods: {
    ...mapActions(playlistModule, ["requestPlaylistsToSpring"]),
    async getPlaylists(payload) {
      const page = payload
      await this.requestPlaylistsToSpring(page)
    }
  },
  computed: {
    ...mapState(playlistModule, ["playlists", "playlistListCount"]),
  },
};
</script>

<style></style>
