<template>
  <div>
    <PlaylistListForm :playlists="playlists" :playlistListCount="playlistListCount" @requestPlaylist="getPlaylists"
      @searchPlaylist="searchPlaylist" />
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
    ...mapActions(playlistModule, ["requestPlaylistsToSpring", "requestSearchPlaylistsToSpring"]),
    async getPlaylists(payload) {
      const { page, sortType } = payload
      await this.requestPlaylistsToSpring({ page, sortType })
    },
    async searchPlaylist(payload) {
      await this.requestSearchPlaylistsToSpring(payload)
    }

  },
  computed: {
    ...mapState(playlistModule, ["playlists", "playlistListCount"]),
  },
};
</script>

<style></style>
