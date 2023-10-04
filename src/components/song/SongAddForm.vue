<template>
  <v-card class="song-add-card">
    <v-card-title class="song-add-card-title">노래 추가하기</v-card-title>
    <v-card-text>
      <v-list class="song-add-list">
        <v-list-item v-for="playlist in myPlaylists" @click="addSongToPlaylist(playlist.playlistId)">
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
      <v-btn rounded @click="addPlaylist()" class="rec-add-playlist-button">✛ 새 재생목록</v-btn>
      <v-btn @click="cancelAddSong" class="cancel-button">취소</v-btn>
    </v-card-actions>
  </v-card>

  <v-dialog v-model="showAddPlaylistDialog" max-width="500px">
    <v-card style="border-radius: 0px;" class="playlist-dialog">
      <v-card-title class="playlist-dialog-title">새 재생목록</v-card-title>
      <v-card-text>
        <my-page-playlist-register-form v-if="showAddPlaylistDialog" @submit="onSubmitForm" />
      </v-card-text>
      <v-card-actions class="playlist-dialog-actions">
        <v-btn @click="cancelPlaylist" style="color: white; margin-right:70px; margin-bottom: 2px;">취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import MyPagePlaylistRegisterForm from '@/components/account/MyPagePlaylistRegisterForm.vue'

export default {
  props: {
    myPlaylists: {
      type: Array
    }
  },
  components: {
    MyPagePlaylistRegisterForm
  },
  data() {
    return {
      showAddPlaylistDialog: false,
    }
  },
  methods: {
    cancelAddSong() {
      this.$emit("cancel")
    },

    addSongToPlaylist(playlistId) {
      this.$emit("addSongToPlaylist", playlistId)
    },

    addPlaylist() {
      this.showAddPlaylistDialog = true
    },

    cancelPlaylist() {
      this.showAddPlaylistDialog = false
    },

    async onSubmitForm(payload) {
      await this.$emit("submit", payload);
      this.showAddPlaylistDialog = false
    },
  }
}
</script>

<style>
.song-add-card {
  background-color: rgba(23, 23, 23, 0.9);
  /* background-color: #212121; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 0px;
  padding: 10px;
  border: 1px solid rgba(46, 46, 46)
}

.song-add-card-title {
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
}

.song-add-list {
  background-color: transparent!important;
  color: white;
  max-height: 500px;
  scrollbar-width: thin;
  scrollbar-color: #888 transparent;
}

.song-add-list::-webkit-scrollbar {
  width: 8px;
}

.song-add-list::-webkit-scrollbar-track {
  display: none;
}

.song-add-list:not(:hover)::-webkit-scrollbar-thumb {
  background: transparent;
}

.song-add-list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.song-add-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.my-playlist-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  padding: 10px;
}

.song-add-actions {
  display: flex;
  justify-content: flex-end;
  color: white;
  padding: 15px;
}

.rec-add-playlist-button {
  border: 1px solid;
}

.playlist-dialog {
  background-color: rgba(0, 0, 0, 0.912) !important;
  padding: 10px;
  height: 400px;
}

.playlist-dialog-title {
  font-size: 20px;
  color: white;
  margin-left: 10px;
  margin-top: 10px;
}

.playlist-dialog-actions {
  justify-content: center;
}

.cancel-button {
  color: white;
  margin-right: 10px;
}
</style>