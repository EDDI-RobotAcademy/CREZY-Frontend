<template>
  <div>
    <PlaylistReadForm :playlist="playlist" :playlistId="playlistId" :isPlaylistLiked="isPlaylistLiked" @like="toggleLike"
      :playlistLikes="playlistLikes" :myPlaylists="myPlaylists" @addSongToPlaylist="addSongToPlaylist"
      @openAddSongDialog="openAddSongDialog" />
  </div>
</template>
<script>
import PlaylistReadForm from "@/components/playlist/PlaylistReadForm.vue";
import { mapActions, mapState } from "vuex";

const playlistModule = "playlistModule";
const songModule = "songModule";

export default {
  data() {
    return {
      isPlaylistLiked: false,
      playlistLikes: '',
    };
  },
  props: {
    playlistId: {
      type: String,
      required: true,
    }
    // ,
    // myPlaylists: {
    //   type: Array
    // }
  },
  components: {
    PlaylistReadForm,
  },
  methods: {
    ...mapActions(playlistModule, [
      "requestPlaylistExceptBlockSongToSpring",
      "checkIsPlaylistLikedToSpring",
      "requestLikePlaylistToSpring",
      "requestUnlikePlaylistToSpring",
      "requestMyPlaylistsToSpring"
    ]),
    ...mapActions(songModule, ["requestSongRegisterToSpring"]),
    async checkIsPlaylistLiked() {
      this.isPlaylistLiked = await this.checkIsPlaylistLikedToSpring(
        this.playlistId
      );
    },
    async toggleLike(isLike) {
      if (isLike == true) {
        this.isPlaylistLiked = true
        this.playlistLikes = await this.requestLikePlaylistToSpring(this.playlistId)
      }
      else if (isLike == false) {
        this.isPlaylistLiked = false
        this.playlistLikes = await this.requestUnlikePlaylistToSpring(this.playlistId)
      }
    },
    async addSongToPlaylist(payload) {
      await this.requestSongRegisterToSpring(payload)
      alert("노래가 플레이리스트에 추가됐습니다")
    },

    async openAddSongDialog() {
      await this.requestMyPlaylistsToSpring()
    }
  },
  computed: {
    ...mapState(playlistModule, ["playlist", "myPlaylists"]),
  },
  beforeMount() {
    if (localStorage.getItem("userToken") === null) {
      if (confirm("로그인 이후 이용 가능합니다 \n로그인으로 이동 하시겠습니까?")) {
        this.$router.push({ name: "AccountLoginPage" })
      }
      else {
        this.$router.push({ name: "PlaylistListPage" })
      }
    }
  },
  async mounted() {
    this.playlistLikes = await this.requestPlaylistExceptBlockSongToSpring(this.playlistId);
    if (localStorage.getItem("userToken") != null) {
      await this.checkIsPlaylistLiked();
    }
  },
};
</script>
<style></style>
