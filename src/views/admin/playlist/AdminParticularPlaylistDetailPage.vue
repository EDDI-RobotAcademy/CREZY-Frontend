<template>
  <div>
    <AdminParticularPlaylistDetailForm :playlist="playlist" :songInfo="songInfo" @openManage="getSongInfo"
      @deleteThumbnail="removeThumbnail" @changePlaylistName="changePlaylistName" @deletePlaylist="deletePlaylist"
      @modifyLyrics="modifyLyrics" @deleteSong="deleteSong" @openSong="openSong" @blockSong="blockSong" @giveSongWarning="giveSongWarning"/>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import AdminParticularPlaylistDetailForm from "@/components/admin/playlist/AdminParticularPlaylistDetailForm.vue"

const adminPlaylistModule = "adminPlaylistModule"
const adminSongModule = "adminSongModule"
const adminWarningModule = "adminWarningModule"

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

    ...mapActions(adminWarningModule, [
      'requestGiveWarningToSpring',
    ]),


    async getSongInfo(selectedSongId) {
      const songId = selectedSongId;
      await this.requestSongInfoForAdminToSpring(songId)
    },

    async removeThumbnail() {
      if (confirm("플레이리스트 사진을 지우시겠습니까?")) {
        await this.requestRemovePlaylistThumbnailToSpring(this.selectedPlaylistId)
      }
      await this.requestPlaylistForAdminToSpring(this.selectedPlaylistId)
    },

    async changePlaylistName() {
      if (confirm("플레이리스트 이름을 바꾸시겠습니까?")) {
        await this.requestChangePlaylistNameToSpring(this.selectedPlaylistId)
      }
      await this.requestPlaylistForAdminToSpring(this.selectedPlaylistId)
    },

    async deletePlaylist() {
      if (confirm("플레이리스트를 삭제하겠습니까?")) {
        await this.requestDeletePlaylistToSpring(this.selectedPlaylistId)
        await this.$router.push({
          name: "AdminOverallPlaylistPage"
        })
      }
    },

    async modifyLyrics(payload) {
      const songId = payload.songId
      await this.requestModifyLyricsToSpring(payload)
      await this.requestSongInfoForAdminToSpring(songId)
    },

    async deleteSong(selectedSongId) {
      if (confirm("노래를 지우시겠습니까?")) {
        await this.requestDeleteSongToSpring(selectedSongId)
        await this.removeSongFromState()
      }
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
    },

    async giveSongWarning(payload) {
      const songId = payload.reportedId
      await this.requestGiveWarningToSpring(payload)
      await this.requestPlaylistForAdminToSpring(this.selectedPlaylistId)
      await this.getSongInfo(songId)
    }
  },
  computed: {
    ...mapState(adminPlaylistModule, ["playlist"]),
    ...mapState(adminSongModule, ["songInfo"])
  },
  async mounted() {
    if (!localStorage.getItem("roleType") === "ADMIN" || localStorage.getItem("roleType") === null) {
      this.$router.push({ name: "home" });
    }
    await this.requestPlaylistForAdminToSpring(this.selectedPlaylistId)
  }
}
</script>

<style></style>