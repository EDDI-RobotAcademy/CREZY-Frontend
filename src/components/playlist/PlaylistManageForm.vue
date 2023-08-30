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
              노래 {{ playlist.songCount }} 0곡
            </div>
            <div class="playlist-modify-icon">
              <!-- <div style="cursor: pointer; margin-right: 10px;"><v-btn rounded variant="outlined"
                  class="playlist-modifybtn"><v-icon>mdi-pencil-outline</v-icon>재생목록수정</v-btn>
              </div> -->
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
    <div class="delete-button-container">
      <v-btn v-if="this.checkedSongs.length > 0" @click="openDeleteDialog" class="delete-button" rounded
        variant="outlined" color="white"><v-icon>mdi-delete</v-icon>삭제</v-btn>
      <v-btn v-else class="delete-button-invisible">삭제</v-btn>
    </div>
    <div v-if="showSongModificationForm" class="modal">
      <v-card class="modal-content">
        <PlaylistModifyForm :playlist="playlist" @submit="onSubmit" @cancel="showSongModificationForm = false" />
      </v-card>
    </div>
    <v-row>
      <v-col cols="12">
        <table style="color: white;
                justify-content: space-between;
                width: 100%;
                border-collapse: separate;
                border-spacing: 0 15px">
          <tbody style="border:">
            <tr v-if="!playlist || (Array.isArray(playlist) && playlist.length === 0)">
              <td colspan="8" class="inform">
                현재 등록된 노래가 없습니다!
              </td>
            </tr>
            <tr v-else v-for="(song, index) in playlist.songlist" :key="song.songId"
              :class="{ playing: checkedSongs.includes(song.songId) }" style="cursor: pointer"
              @mouseover="showCheckbox(index)" @mouseleave="hideCheckbox(index)">
              <td align="center" style="width: 10%;">
                <v-img src="@/assets/images/Logo_only_small-removebg-preview.png" height="50" width="50"></v-img>
              </td>
              <td align="center" style="width: 50%;">
                {{ song.title }}
              </td>
              <td align="center" style="width: 30%;">
                {{ song.singer }}
              </td>
              <td v-if="hoverIndex == index || checkedSongs.includes(song.songId)" style="width: 10%;">
                <input type="checkbox" :id="'song-' + song.songId" v-model="checkedSongs" :value="song.songId"
                  class="checkbox">
              </td>
              <td v-else style="width: 10%;">
                <input type="checkbox" :id="'song-' + song.songId" v-model="checkedSongs" :value="song.songId"
                  class="checkbox invisible-checkbox">
              </td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>
    <v-dialog v-model="confirmDeleteDialog" persistent max-width="290">
      <v-card class="confirmDeleteDialog">
        <v-card-text class="headline" style="color: white">선택된 곡: {{ checkedSongs.length }}곡</v-card-text>
        <v-card-text style="color: white">삭제하시겠습니까?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="white" text @click="deleteSelectedSongs">확인</v-btn>
          <v-btn color="white" text @click="confirmDeleteDialog = false">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PlaylistModifyForm from '@/components/playlist/PlaylistModifyForm.vue'
import { mapActions } from "vuex";
import SongRegisterForm from '../song/SongRegisterForm.vue';
const playlistModule = "playlistModule";
export default {
  components: {
    PlaylistModifyForm,
    SongRegisterForm
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
      checkedSongs: [],
      hoverIndex: null,
      confirmDeleteDialog: false,
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
    async deleteSelectedSongs() {
      this.playlist.songlist = this.playlist.songlist.filter(song => !this.checkedSongs.includes(song.songId));
      this.checkedSongs = [];
      this.confirmDeleteDialog = false;
      let songlist = this.playlist.songlist
      await this.$emit('submit', songlist)
    },
    cancelDeletion() {
      this.checkedSongs = [];
    },
    deleteSong(songId) {
      if (this.checkedSongs.includes(songId)) {
        this.confirmDeleteDialog = true;
      }
    },
    showCheckbox(index) {
      this.hoverIndex = index;
    },
    hideCheckbox(index) {
      if (!this.checkedSongs.includes(this.playlist.songlist[index].songId)) {
        this.hoverIndex = null;
      }
    },
    openDeleteDialog() {
      if (this.checkedSongs.length > 0) {
        this.confirmDeleteDialog = true;
      }
    },
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

input[type=checkbox] {
  visibility: hidden;
  width: 18px;
  height: 18px;
}

tr:hover .checkbox,
tr.playing .checkbox {
  visibility: visible;
}

.delete-button-container {
  display: flex;
  justify-content: flex-end;
}

.delete-button {
  color: white;
}

.invisible-checkbox {
  opacity: 0;
}

.delete-button-invisible {
  opacity: 0;
}

.confirmDeleteDialog {
  background-color: rgba(0, 0, 0, 0.7) !important;
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
