<template>
  <div>
    <AdminParticularPlaylistDetailForm :playlist="playlist" :songInfo="songInfo" @openManage="getSongInfo"
      @deleteThumbnail="removeThumbnail" @changePlaylistName="changePlaylistName" @deletePlaylist="deletePlaylist"
      @modifyLyrics="modifyLyrics" @deleteSong="deleteSong" @openSong="openSong" @blockSong="blockSong" />
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

<style></style>