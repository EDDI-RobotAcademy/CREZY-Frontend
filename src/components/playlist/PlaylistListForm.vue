<template lang="">
  <v-container>
    <v-card class="playlist-list-card" flat>
      <div class="playlist-list-title">Playlists</div>
      <div class="playlist-list">
        <v-row>
          <v-col v-for="playlist in playlists" :key="playlist.id" cols="6">
            <div
              class="image-wrapper"
              @mouseover="showDescription = true"
              @mouseout="showDescription = false"
            >
              <v-sheet class="playlist-sheet">
                <v-img
                  class="mx-auto"
                  height="300"
                  :src="getImage(playlist.thumbnail)"
                  v-on="on"
                ></v-img>
                <div v-show="showDescription" class="image-description">
                  <div class="description-title">{{ playlist.name }}</div>
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
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showDescription: false,
    };
  },
  props: {
    playlists: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getImage(link) {
      return (
        "https://img.youtube.com/vi/" +
        link.substring(link.lastIndexOf("=") + 1) +
        "/mqdefault.jpg"
      );
    },
  },
};
</script>

<style>
.playlist-list-card {
  margin-top: 10rem;
  padding: 18px;
  width: 750px;
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
