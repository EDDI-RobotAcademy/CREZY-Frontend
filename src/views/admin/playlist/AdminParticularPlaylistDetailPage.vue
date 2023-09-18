<template>
  <div>
    <AdminParticularPlaylistDetailForm 
    :playlist="playlist"
    :songInfo="songInfo"
    @openManage="getSongInfo"
    @deleteThumbnail="removeThumbnail"
    @changePlaylistName="changePlaylistName"
    @deletePlaylist="deletePlaylist"
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
    ...mapActions(adminPlaylistModule, [
      'requestPlaylistForAdminToSpring',
      'requestRemovePlaylistThumbnailToSpring',
      'requestChangePlaylistNameToSpring',
      'requestDeletePlaylistToSpring'
    ]),
    ...mapActions(adminSongModule, ['requestSongInfoForAdminToSpring']),

    async getSongInfo(selectedSongId) {
      const songId = selectedSongId;
      await this.requestSongInfoForAdminToSpring(songId)
    },
    async removeThumbnail() {
      await this.requestRemovePlaylistThumbnailToSpring(this.selectedPlaylistId)
      await this.requestPlaylistForAdminToSpring(this.selectedPlaylistId)
    },
    async changePlaylistName() {
      await this.requestChangePlaylistNameToSpring(this.selectedPlaylistId)
      await this.requestPlaylistForAdminToSpring(this.selectedPlaylistId)
    },
    async deletePlaylist() {
      await this.requestDeletePlaylistToSpring(this.selectedPlaylistId)
      await this.$router.push({
        name: "AdminOverallPlaylistPage"
      })
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