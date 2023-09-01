<template>
  <div class="my-page-card">
    <div class="my-page-title">
      <div>
        <v-row class="nickname">
          <v-col cols="5">
            <div class="profile-image-container">
              <div class="profile-image-circle">
                <v-img @click="goToModifyAccountPage(account.accountId)" :src="getProfileImage(account.profileImageName)"
                  width="100%" height="100%"></v-img>
              </div>
              <div class="profile-name">{{ account.nickname }}의 MUSE</div>
            </div>
          </v-col>
        </v-row>
        <v-col cols="5">
          <v-btn rounded @click="addPlaylist()" class="add-playlist-button">✛ 새 재생목록</v-btn>
        </v-col>
        <v-row class="playlist">
          <v-col cols="6">
            <div style="margin-left: 50px;">
              My Playlist🎵 {{ account.myPlaylistCount }}
            </div>
          </v-col>
          <v-col cols="6">
            <div style="margin-left: 50px;">
              My Favorite Playlist❤️ {{ account.myLikedPlaylistCount }}
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="my-page-title">
        <div class="my-page-playlist">
          <v-row class="playlist">
            <v-col cols="6">
              <div v-for="(myPlaylist, index) in myPlaylists" :key="index">
                <table style="
              color: white;
              justify-content: space-between;
              border-collapse: separate;
              border-spacing: 0 15px;
            ">
                  <tbody>
                    <td>
                      <v-img class="playlist-img" src="@/assets/images/free-icon-playlist-3567882.png"></v-img>
                    </td>
                    <div class="playlist-name-button">
                      <td @click="goToModifyPage(myPlaylist.playlistId)">{{
                        truncateText(myPlaylist.playlistName, 20) }}
                      </td>
                    </div>
                  </tbody>
                </table>
              </div>
            </v-col>
            <v-col cols="6">
              <div v-for="(myLikedPlaylist, index) in myLikedPlaylists" :key="index">
                <table style="
              color: white;
              justify-content: space-between;
              border-collapse: separate;
              border-spacing: 0 15px;
            ">
                  <tbody>
                    <td>
                      <v-img class="playlist-img" src="@/assets/images/free-icon-playlist-3567882.png"></v-img>
                    </td>
                    <div @click="goToReadPage(myLikedPlaylist.playlistId)" style="margin-top: -10px;"
                      class="playlist-like-card">
                      <td>{{
                        truncateText(myLikedPlaylist.playlistName, 15) }}</td>
                      <td style="margin-top: 4px; margin-left: 40px; font-size: 13px;">{{
                        myLikedPlaylist.accountWriter }}</td>
                    </div>
                  </tbody>
                </table>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </div>

  <!-- 플레이리스트 생성 팝업 -->
  <v-dialog v-model="showAddPlaylistDialog" max-width="500px">
    <v-card style="border-radius: 0px;" class="playlist-dialog">
      <v-card-title class="playlist-dialog-title">새 재생목록</v-card-title>
      <v-card-text>
        <my-page-playlist-register-form v-if="showAddPlaylistDialog" @submit="onSubmitForm" />
      </v-card-text>
      <v-card-actions class="playlist-dialog-actions">
        <v-btn @click="cancelPlaylist" class="cancel-button">취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
  
<script>
import MyPagePlaylistRegisterForm from '@/components/account/MyPagePlaylistRegisterForm.vue'
import { mapActions } from "vuex";

const playlistModule = "playlistModule";

export default {
  props: {
    account: {
      type: Object,
      required: true,
    },
    myPlaylists: {
      type: Array,
      required: true,
    },
    myLikedPlaylists: {
      type: Array,
      required: true,
    },
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
    ...mapActions(playlistModule, ["requestPlaylistRegisterToSpring"]),

    addPlaylist() {
      this.showAddPlaylistDialog = true
    },

    async onSubmitForm(payload) {
      const responseId = await this.requestPlaylistRegisterToSpring(payload)
      await this.$router.push({ name: 'PlaylistManagePage', params: { playlistId: responseId } });
      this.showAddPlaylistDialog = false
    },

    cancelPlaylist() {
      this.showAddPlaylistDialog = false
    },

    goToModifyPage(playlistId) {
      this.$router.push({
        name: "PlaylistManagePage",
        params: { playlistId: playlistId.toString() },
      });
    },

    goToReadPage(playlistId) {
      this.$router.push({
        name: "PlaylistReadPage",
        params: { playlistId: playlistId.toString() },
      });
    },

    truncateText(text, maxLength) {
      if (!text) {
        return "";
      }

      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    },

    getProfileImage(profileImageName) {
      if (profileImageName) {
        (profileImageName.includes('k.kakaocdn.net'))
        return profileImageName;
      } else {
        return require('@/assets/images/Logo_only_small-removebg-preview.png');
      }
    },

    goToModifyAccountPage(accountId) {
      this.$router.push({
        name: "AccountModifyPage",
        params: { accountId: accountId.toString() },
      });
    },
  }
}
</script>
  
<style scoped>
.nickname {
  padding: 20px;
  font-size: 22px;
}

.my-page-title {
  color: white;
}

.my-page-card {
  margin-top: 6rem;
  padding: 18px;
  width: 900px;
  background-color: rgba(0, 0, 0, 0.4) !important;
}

.playlist {
  padding: 20px;
}

.my-page-playlist {
  margin-top: -30px;
}

.add-playlist-button {
  background-color: rgba(32, 31, 31, 0.8) !important;
}

.playlist-dialog {
  background-color: rgba(0, 0, 0, 0.912) !important;
  padding: 10px;
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
  margin-right: 90px;
  margin-bottom: 11px;
}

.playlist-name-button {
  position: relative;
  margin-top: -10px;
  border: solid 1px white;
  padding: 10px;
  border-radius: 5px;
  font-weight: normal;
  max-width: 300px;
  margin-left: 20px;
  cursor: pointer;
  height: 46px;
  display: flex;
}

.playlist-like-card {
  margin-top: -10px;
  border: solid 1px white;
  padding: 10px;
  border-radius: 5px;
  font-weight: normal;
  margin-left: 20px;
  height: 46px;
  display: flex;
  justify-content: space-between;
  max-width: 300px;
  position: relative;
  cursor: pointer;
}

.playlist-img {
  width: 30px;
  margin-top: -15px;
  position: relative;
}

.profile-image-container {
  display: flex;
  align-items: center;
}

.profile-image-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  cursor: pointer;
  border: 2px solid white;
}

.profile-image-circle v-img {
  object-fit: cover;
}
</style>