<template>
  <v-card class="song-add-card">
    <v-card-title class="song-add-card-title">노래 추가하기</v-card-title>
    <v-card-text>
      <v-list lines="three" class="song-add-list">
        <v-list-item 
          v-for="playlist in myPlaylists" 
          @click="addSongToPlaylist(playlist.playlistId)"
          >
          <div class="my-playlist-item">
            <div style="font-size: 20px;">{{ playlist.playlistName }}</div>
            <div style="font-size: 14px;">
              <div>{{ playlist.songCount }} 곡</div>
              <div>{{ playlist.likeCount }} 좋아요</div>
            </div>
          </div>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions class="song-add-actions">
      <v-btn @click="cancelAddSong" class="cancel-button">취소</v-btn>
    </v-card-actions>
  </v-card>    
</template>

<script>
export default {
  props: {
    myPlaylists: {
      type: Array
    }
  },
  methods: {
    cancelAddSong() {
      this.$emit("cancel")
    },

    addSongToPlaylist(playlistId) {
      this.$emit("addSongToPlaylist", playlistId)
    }
  }
}
</script>

<style>
.song-add-card {
  background-color: #3a3838;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0px;
}    

.song-add-card-title {
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
}

.song-add-list {
  background-color: #3a3838 !important;
  color: white;
}

.my-playlist-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.song-add-actions {
  display: flex;
  justify-content: flex-end;
  color: white;
}
</style>