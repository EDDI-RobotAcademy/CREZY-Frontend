<template>
  <div>
    <PlaylistListForm :playlists="playlists" />
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
  },
  computed: {
    ...mapState(playlistModule, ["playlists"]),
  },
  async mounted() {
    await this.requestPlaylistsToSpring();
  },
};
</script>

<style></style>
