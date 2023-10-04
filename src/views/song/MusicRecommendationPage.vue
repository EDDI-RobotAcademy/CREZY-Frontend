<template>
  <div>
    <MusicRecommendationForm :musicList="musicList" :myPlaylists="myPlaylists" @addSongToPlaylist="addSongToPlaylist"
      @openAddSongDialog="openAddSongDialog" @submit="onSubmitForm" />
  </div>
</template>

<script>
import MusicRecommendationForm from "@/components/music/MusicRecommendationForm.vue";

import { mapActions, mapState } from "vuex";

const songModule = "songModule";
const playlistModule = "playlistModule"

export default {
  components: {
    MusicRecommendationForm
  },
  props: {
    sentence: {
      type: String,
      required: true
    },
  },
  computed: {
    ...mapState(songModule, ["musicList"]),
    ...mapState(playlistModule, ["myPlaylists"])
  },
  methods: {
    ...mapActions(songModule, [
      "requestRecommendationToSpring",
      "removeRecommendations",
      "requestSongRegisterToSpring"
    ]),

    ...mapActions(playlistModule, ["requestMyPlaylistsToSpring",
      "requestPlaylistRegisterToSpring"]),

    async getRecommendation(inputedSentence) {
      const sentence = inputedSentence
      await this.removeRecommendations()
      await this.requestRecommendationToSpring(sentence)
    },

    async addSongToPlaylist(payload) {
      await this.requestSongRegisterToSpring(payload)
      alert("노래가 플레이리스트에 추가됐습니다")
    },

    async openAddSongDialog() {
      await this.requestMyPlaylistsToSpring()
    },

    async onSubmitForm(payload) {
      await this.requestPlaylistRegisterToSpring(payload)
      await this.requestMyPlaylistsToSpring()
    }
  },
  mounted() {
    this.getRecommendation(this.sentence)
  }
}
</script>

<style></style>