<template>
  <div>
    <PlaylistReadForm :playlist="playlist" :isPlaylistLiked="isPlaylistLiked" @like="toggleLike" :playlistLikes="playlistLikes"/>
  </div>
</template>
<script>
import PlaylistReadForm from "@/components/playlist/PlaylistReadForm.vue";
import { mapActions, mapState } from "vuex";

const playlistModule = "playlistModule";

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
    },
  },
  components: {
    PlaylistReadForm,
  },
  methods: {
    ...mapActions(playlistModule, [
      "requestPlaylistToSpring",
      "checkIsPlaylistLikedToSpring",
      "requestLikePlaylistToSpring",
      "requestUnlikePlaylistToSpring"
    ]),
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
    }
  },
  computed: {
    ...mapState(playlistModule, ["playlist"]),
  },
  beforeMount() {
    if (localStorage.getItem("userToken") === null) {
      if (confirm("로그인 이후 이용 가능합니다 \n로그인으로 이동 하시겠습니까?")) {
        this.$router.push({ name: "AccountLoginPage" })
      }
      else {
        this.$router.push({name: "PlaylistListPage"})
      }
    }
  },
  async mounted() {
    this.playlistLikes = await this.requestPlaylistToSpring(this.playlistId);
    if (localStorage.getItem("userToken") != null) {
      await this.checkIsPlaylistLiked();
    }
  },
};
</script>
<style></style>
