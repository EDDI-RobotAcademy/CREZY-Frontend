<template>
  <div>
    <AdminParticularPlaylistDetailForm 
    :playlist="playlist"
    :songInfo="songInfo"
    @openManage="getSongInfo"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import AdminParticularPlaylistDetailForm from "@/components/admin/playlist/AdminParticularPlaylistDetailForm.vue"

const adminPlaylistModule = "adminPlaylistModule"
const adminSongModule = "adminSongModule"

export default {
  props: {
    selectedPlaylistId: {
      type: String,
      required: true
    }
  },
  components: {
    AdminParticularPlaylistDetailForm
  },
  methods: {
    ...mapActions(adminPlaylistModule, ['requestPlaylistForAdminToSpring']),
    ...mapActions(adminSongModule, ['requestSongInfoForAdminToSpring']),

    async getSongInfo(selectedSongId) {
      const songId = selectedSongId;
      await this.requestSongInfoForAdminToSpring(songId)
    }
  },
  computed: {
    ...mapState(adminPlaylistModule, ["playlist"]),
    ...mapState(adminSongModule, ["songInfo"])
  },
  async mounted() {
    await this.requestPlaylistForAdminToSpring(this.selectedPlaylistId)
  }
}
</script>

<style>
    
</style>