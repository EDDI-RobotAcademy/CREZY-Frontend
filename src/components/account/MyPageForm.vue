<template>
  <div class="my-page-card">
    <div class="my-page-title">
      <div>
        <v-row class="nickname">
          <v-col cols="5">
            {{ account.nickname }}의 MUSE
            <!-- 닉네임의 MUSE -->
          </v-col>
        </v-row>
        <v-col cols="5">
          <v-btn rounded @click="addPlaylist()" class="add-playlist-button">✛ 새 재생목록</v-btn>
        </v-col>
        <v-row class="playlist">
          <v-col cols="6">
            My Playlist🎵 {{ account.myPlaylistCount }}
            <!-- My Playlist🎵 -->
          </v-col>
          <v-col cols="6">
            My Favorite Playlist❤️ {{ account.myLikedPlaylistCount }}
            <!-- My Favorite Playlist❤️ -->
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
              width: 100%;
              border-collapse: separate;
              border-spacing: 0 15px;
            ">
                  <tbody>
                    <td>{{ myPlaylist.playlistName }}</td>
                  </tbody>
                </table>
              </div>
            </v-col>
            <v-col cols="6">
              <div v-for="(myLikedPlaylist, index) in myLikedPlaylists" :key="index">
                <table style="
              color: white;
              justify-content: space-between;
              width: 100%;
              border-collapse: separate;
              border-spacing: 0 15px;
            ">
                  <tbody>
                    <td>{{ myLikedPlaylist.playlistName }}</td>
                    <td style="position: relative; left: 40px;">{{ myLikedPlaylist.accountWriter }}</td>
                  </tbody>
                </table>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
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

  // data() {
  //   return {
  //     account: {
  //       nickname: "닉네임",
  //       myPlaylistCount: 5,
  //       myLikedPlaylistCount: 7,
  //     },
  //     myPlaylists: [
  //       {
  //         playlistName: "이름1",
  //       },
  //       {
  //         playlistName: "이름2",
  //       },
  //       {
  //         playlistName: "이름3",
  //       },
  //       {
  //         playlistName: "이름4",
  //       },
  //       {
  //         playlistName: "이름5",
  //       },
  //     ],
  //     myLikedPlaylists: [
  //       {
  //         playlistName: "이름1",
  //         accountWriter: "작성자1"
  //       },
  //       {
  //         playlistName: "이름2",
  //         accountWriter: "작성자2"
  //       },
  //       {
  //         playlistName: "이름3",
  //         accountWriter: "작성자3"
  //       },
  //       {
  //         playlistName: "이름4",
  //         accountWriter: "작성자4"
  //       },
  //       {
  //         playlistName: "이름5",
  //         accountWriter: "작성자5"
  //       },
  //       {
  //         playlistName: "이름6",
  //         accountWriter: "작성자6"
  //       },
  //       {
  //         playlistName: "이름7",
  //         accountWriter: "작성자7"
  //       }
  //     ]
  //   }
  // },

  methods: {
    addPlaylist() {
      // 팝업으로
      // 플레이리스트 이름
      // 플레이리스트 썸네일 지정
      // 생성버튼 누르면 PlaylistModifyPage로 이동
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
</style>