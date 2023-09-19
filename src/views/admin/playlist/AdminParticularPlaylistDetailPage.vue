<template>
  <div>
    <AdminParticularPlaylistDetailForm 
    :playlist="playlist"
    :songInfo="songInfo"
    @openManage="getSongInfo"
    @deleteThumbnail="removeThumbnail"
    @changePlaylistName="changePlaylistName"
    @deletePlaylist="deletePlaylist"
    @modifyLyrics="modifyLyrics"
    @deleteSong="deleteSong"
    @openSong="openSong"
    @blockSong="blockSong"
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

    ...mapActions(adminSongModule, [
      'requestSongInfoForAdminToSpring',
      'requestModifyLyricsToSpring',
      'requestDeleteSongToSpring',
      'removeSongFromState',
      'requestOpenSongToSpring',
      'requestBlockSongToSpring'
    ]),


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
    },

    async modifyLyrics(payload) {
      const songId = payload.songId
      await this.requestModifyLyricsToSpring(payload)
      await this.requestSongInfoForAdminToSpring(songId)
    },

    async deleteSong(selectedSongId) {
      await this.requestDeleteSongToSpring(selectedSongId)
      await this.removeSongFromState()
      await this.requestPlaylistForAdminToSpring(this.selectedPlaylistId)
    },

    async openSong(selectedSongId) {
      await this.requestOpenSongToSpring(selectedSongId)
      await this.requestPlaylistForAdminToSpring(this.selectedPlaylistId)
      await this.getSongInfo(selectedSongId)
    },

    async blockSong(selectedSongId) {
      await this.requestBlockSongToSpring(selectedSongId)
      await this.requestPlaylistForAdminToSpring(this.selectedPlaylistId)
      await this.getSongInfo(selectedSongId)
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