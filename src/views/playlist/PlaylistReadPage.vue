<template>
  <div>
    <PlaylistReadForm :playlist="playlist" />
  </div>
</template>
<script>
import PlaylistReadForm from "@/components/playlist/PlaylistReadForm.vue";
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
    PlaylistReadForm,
  },
  methods: {
    ...mapActions(playlistModule, ["requestPlaylistToSpring"]),
  },
  computed: {
    ...mapState(playlistModule, ["playlist"]),
  },
  async mounted() {
    await this.requestPlaylistToSpring(this.playlistId);
  },
};
</script>
<style></style>
