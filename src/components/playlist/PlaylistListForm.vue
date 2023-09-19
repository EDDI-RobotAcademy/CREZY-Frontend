<template lang="">
  <v-container>
    <v-card class="playlist-list-card" flat>
      <div class="playlist-list-title">Playlists</div>
      <div class="playlist-list">
        <v-row>
          <v-col
            v-for="playlist in playlists"
            :key="playlist.playlistId"
            cols="6"
          >
            <div
              class="image-wrapper"
              @mouseover="showDescription = true"
              @mouseout="showDescription = false"
            >
              <v-sheet
                class="playlist-sheet"
                @click="toPlaylist(playlist.playlistId)"
              >
                <v-img
                  class="mx-auto"
                  height="300"
                  :src="getImage(playlist.thumbnailName)"
                ></v-img>
                <div v-show="showDescription" class="image-description">
                  <div class="description-title">
                    {{ playlist.playlistName }}
                  </div>
                  <div class="description-writer">{{ playlist.writer }}</div>
                  <div class="description-counts">
                    <v-icon class="description-icons">mdi-thumb-up</v-icon
                    >{{ playlist.likeCount }}
                    <v-icon class="description-icons">mdi-music</v-icon
                    >{{ playlist.songCount }}
                  </div>
                </div>
              </v-sheet>
            </div>
          </v-col>
        </v-row>
        <v-pagination 
              style="color: white; bottom: 0;" 
              v-model="currentPage" 
              :length="playlistListCount" 
              @click="getPaginatedPlaylist">
            </v-pagination>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showDescription: false,
      currentPage: 1,

      awsBucketName: process.env.VUE_APP_AWS_BUCKET_NAME,
      awsBucketRegion: process.env.VUE_APP_AWS_BUCKET_REGION,
      awsIdentityPoolId: process.env.VUE_APP_AWS_IDENTITY_POOLID,
    };
  },
  props: {
    playlists: {
      type: Array,
      required: true,
    },
    playlistListCount: {
      type: Number,
      required: true,
    }
  },
  methods: {
    getImage(thumbnailName) {
      if (this.isYoutubeLink(thumbnailName)) {
        return (
          "https://img.youtube.com/vi/" +
          thumbnailName.substring(thumbnailName.lastIndexOf("=") + 1) +
          "/mqdefault.jpg"
        );
      }
      else {
        return `https://${this.awsBucketName}.s3.${this.awsBucketRegion}.amazonaws.com/${thumbnailName}`;
      }

    },
    toPlaylist(playlistId) {
      this.$router.push({
        name: "PlaylistReadPage",
        params: { playlistId: playlistId.toString() },
      });
    },
    getPaginatedPlaylist() {
      const page = this.currentPage
      this.$emit("requestPlaylist", page)
    },
    isYoutubeLink(link) {
      const youtubeUrlPattern = /^https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9_-]{11}$/;

      return youtubeUrlPattern.test(link);
    }
  },
  mounted() {
    this.getPaginatedPlaylist()
  }
};
</script>

<style>
.playlist-list-card {
  margin-top: 6rem;
  padding: 18px;
  width: 900px;
  background-color: rgba(0, 0, 0, 0.4) !important;
}

.playlist-list-title {
  font-size: 22px;
  color: #ccff00;
}

.playlist-list {
  margin-top: 30px;
}

.playlist-img {
  background-position: center;
  background-size: cover;
}

.image-wrapper {
  position: relative;
  max-width: 100%;
  max-height: 100%;
}

.image-description {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-wrapper:hover .image-description {
  opacity: 1;
}

.playlist-sheet {
  background-color: rgba(0, 0, 0, 0.7);
}

.description-title {
  font-size: 32px;
}

.description-writer {
  font-size: 16px;
}

.description-counts {
  position: absolute;
  font-size: 16px;
  bottom: 0;
  margin-bottom: 10px;
}

.description-icons {
  font-size: 16px;
  margin: 5px;
}
</style>
