<template>
  <div class="playlist-read-card">
    <div style="display: flex; justify-content: space-between">
      <v-row>
        <v-col cols="4">
          <v-img class="mx-auto" height="200" :src="getImage(playlist)" v-on="on"></v-img>
        </v-col>
        <v-col cols="4">
          <div>
            <div class="playlist-title">
              {{ playlist.playlistName }}
            </div>
            <div class="playlist-accountWriter">{{ playlist.accountWriter }}</div>
            <div class="playlist-counts">
              노래 {{ playlist.songlist?.length }}곡
            </div>
            <div class="playlist-modify-icon">
              <div style="cursor: pointer;"><v-btn rounded variant="outlined" class="playlist-modifybtn"
                  @click="songRegister"><v-icon>mdi-pencil-outline</v-icon>노래추가</v-btn>
              </div>
            </div>
          </div>
        </v-col>
        <div v-if="showSongRegisterForm" class="modal">
          <v-card class="modal-content">
            <SongRegisterForm @submit="songRegisterForm" @cancelRegister="showSongRegisterForm = false" />
          </v-card>
        </div>
        <v-col cols="4" style="display: flex; justify-content: flex-end;">
          <v-menu offset-y v-model="isPlaylistButton">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-show="!isPlaylistButton" small @click="playlistButton" class="description-btn" icon v-bind="attrs"
                v-on="on" depressed>
                <v-icon style="color: white;">mdi-dots-vertical</v-icon>
              </v-btn>
              <div v-if="isPlaylistButton">
                <v-list style="background-color: rgba(0, 0, 0, 0) !important;">
                  <v-list-item @click="playlistModify" style="color: white;">
                    <v-list-item-icon>
                      <v-icon small>mdi-pencil-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content style="font-size: 13px;">수정</v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="playlistDelete" style="color: white;">
                    <v-list-item-icon>
                      <v-icon small>mdi-delete</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content style="font-size: 13px;">삭제</v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>
            </template>
          </v-menu>
        </v-col>
      </v-row>
    </div>
    <div v-if="showSongModificationForm" class="modal">
      <v-card class="modal-content">
        <PlaylistModifyForm :playlist="playlist" @submit="onSubmit" @cancel="showSongModificationForm = false" />
      </v-card>
    </div>
    <SonglistForm :playlist="playlist" @deleteSubmit="deleteSubmit" />
  </div>
</template>

<script>
import PlaylistModifyForm from '@/components/playlist/PlaylistModifyForm.vue'
import SonglistForm from '@/components/song/SonglistForm.vue'
import { mapActions } from "vuex";
import SongRegisterForm from '../song/SongRegisterForm.vue';
const playlistModule = "playlistModule";
export default {
  components: {
    PlaylistModifyForm,
    SongRegisterForm,
    SonglistForm
  },
  props: {
    playlist: {
      type: Object,
      required: true,
    },
    playlistId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isPlaylistButton: false,
      showSongModificationForm: false,
      showSongRegisterForm: false,
      awsBucketName: process.env.VUE_APP_AWS_BUCKET_NAME,
      awsBucketRegion: process.env.VUE_APP_AWS_BUCKET_REGION,
      awsIdentityPoolId: process.env.VUE_APP_AWS_IDENTITY_POOLID,
    };
  },
  methods: {
    ...mapActions(playlistModule, ["requestPlaylistDeleteToSpring"]),
    getImage(playlist) {
      if (!playlist || playlist.length === 0) {
        return require('@/assets/images/Logo_Text-removebg-preview.png');
      }
      if (!playlist.thumbnailName) {
        return require('@/assets/images/Logo_Text-removebg-preview.png')
      }
      return `https://${this.awsBucketName}.s3.${this.awsBucketRegion}.amazonaws.com/${this.playlist.thumbnailName}`
    },
    playlistModify() {
      this.showSongModificationForm = true
    },
    songRegister() {
      this.showSongRegisterForm = true
    },
    songRegisterForm(payload) {
      this.$emit('submitSong', payload)
      this.showSongRegisterForm = false;
    },
    onSubmit(payload) {
      this.$emit('submitPlaylist', payload)
      this.showSongModificationForm = false;
    },
    playlistDelete() {
      this.requestPlaylistDeleteToSpring(this.playlistId)
    },

    playlistButton() {
      this.isPlaylistButton = !this.isPlaylistButton
    },
    cancelDeletion() {
      this.checkedSongs = [];
    },
    deleteSong(songId) {
      if (this.checkedSongs.includes(songId)) {
        this.confirmDeleteDialog = true;
      }
    },
    deleteSubmit(payload) {
      this.$emit("deleteSubmit", payload)
      console.log("Sdfsf", payload)
    }
  }
};
</script>

<style>
.playlist-read-card {
  margin-top: 6rem;
  padding: 18px;
  width: 900px;
  background-color: rgba(0, 0, 0, 0.4) !important;
}

.playlist-title {
  font-size: 32px;
  color: #ffffff;
}

.playlist-accountWriter {
  font-size: 16px;
  color: #e1e0e0;
}

.playlist-counts {
  color: #e1e0e0;
  font-size: 16px;
}

.playlist-modifybtn {
  color: #ffffff !important;
}

.playlist-icon {
  background-color: rgba(0, 0, 0, 0.4) !important;
}

.inform {
  color: #e1e0e0;
  font-size: 16px;
  text-align: center;
}

.playlist-modify-icon {
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 50px;
}

.description-btn {
  background-color: rgba(0, 0, 0, 0) !important;
}


.modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5) !important;
}

.modal-content {
  position: relative;
  width: 600px;
  height: 450px;
  margin: auto;
  padding: 20px;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.8) !important;

}
</style>
