<template>
  <div class="playlist-read-card">
    <div style="display: flex; justify-content: space-between">
      <v-row>
        <v-col cols="7">
          <div style="justify-content: space-between; display: flex;">
            <div class="playlist-read-title">{{ playlist.playlistName }}</div>
          </div>

          <div class="playlist-read-actions">
            <div class="playlist-read-writer">
              by {{ playlist.accountWriter }}
            </div>
            <div class="action-btn-container" align="center">
              <button @click="toggleLike">
                <v-icon v-if="isPlaylistLiked">mdi-heart</v-icon>
                <v-icon v-else>mdi-heart-outline</v-icon>

              </button>
              <div style="font-size: 18px; margin-top: 3px; margin-left: 5px;">
                {{ playlistLikes }}
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="5">
          <div style="display: flex; justify-content: flex-end; cursor: pointer;">
            <v-btn flat rounded class="report-btn" @click="reportAccountAndPlaylist()">
              🚨
            </v-btn>
          </div>
          <div class="song-btn-container">
            <button v-for="button in songButtons" :key="button.label" :class="button.class"
              @click="toggleBtn(button.label)">
              {{ button.label }}
            </button>
          </div>
        </v-col>
      </v-row>
    </div>

    <v-row class="playlist">
      <v-col cols="7">
        <div class="playlist-player">
          <v-sheet class="song-thumbnail-sheet">
            <v-img class="mx-auto" height="400" :src="getImage"> </v-img>
          </v-sheet>
          <iframe ref="ytPlayer" frameborder="0" allow="autoplay" width="0" height="0"></iframe>
          <div class="controls-container">
            <button style="color: white" @click="previousVideo()">
              <v-icon>mdi-skip-previous</v-icon>
            </button>
            <button class="play-btn" style="color: white" @click="togglePlay()">
              <v-icon v-if="isPlaying">mdi-pause</v-icon>
              <v-icon v-else>mdi-play</v-icon>
            </button>
            <button style="color: white" @click="nextVideo()">
              <v-icon>mdi-skip-next</v-icon>
            </button>
          </div>
          <div class="progress-container">
            <input id="progress-bar" type="range" min="0" max="100" value="0" step="0.1" @change="seekVideo"
              @input="seekVideo" />
            <div style="color: white">
              <span>{{ currentTimeText }}</span>
              <span> / </span>
              <span>{{ totalTimeText }}</span>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="5">
        <div class="playlist-table" v-if="currentBtn === 'LIST'">
          <table style="
              color: white;
              justify-content: space-between;
              width: 100%;
              border-collapse: separate;
              border-spacing: 0 15px;
            ">
            <tbody>
              <tr v-for="(song, index) in playlist.songlist" :key="index" @click="playSong(index)"
                :class="{ playing: index === currentIdx, 'not-playing': index !== currentIdx }" style="cursor: pointer">
                <td style="padding-right: 10px">{{ index + 1 }}</td>
                <td>{{ song.title }}</td>
                <td align="end">{{ song.singer }}</td>
                <td>
                  <div style="display: flex; justify-content: flex-end; cursor: pointer;">
                    <v-btn rounded flat class="report-btn" @click.stop="reportSong(song.songId)">
                      ⚑
                    </v-btn>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="lyrics" v-html="playlist.songlist[currentIdx].lyrics" v-if="currentBtn === 'LYRICS'"></div>
      </v-col>
    </v-row>
  </div>
  <!-- 계정 & 플레이리스트 신고 생성 팝업 -->
  <v-dialog v-model="showReportAccountPlaylistDialog" max-width="500px">
    <v-card style="border-radius: 0px;" class="report-dialog">
      <v-card-title class="report-dialog-title">계정 & 플레이리스트 신고</v-card-title>
      <v-card-text>
        <ReportAccountPlaylistForm v-if="showReportAccountPlaylistDialog" :playlistId="playlistId"
          @submit="onSubmitReportAccountPlaylistForm" />
      </v-card-text>
      <v-card-actions class="report-dialog-actions">
        <v-btn @click="cancelReportAccountPlalist" class="cancel-button">취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- 노래 신고 생성 팝업 -->
  <v-dialog v-model="showReportSongDialog" max-width="500px">
    <v-card style="border-radius: 0px;" class="report-dialog">
      <v-card-title class="report-dialog-title">노래 신고</v-card-title>
      <v-card-text>
        <ReportSongForm v-if="showReportSongDialog" :songId="songId" @submit="onSubmitReportSongForm" />
      </v-card-text>
      <v-card-actions class="report-dialog-actions">
        <v-btn @click="cancelReportAccountPlalist" class="cancel-button">취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ReportAccountPlaylistForm from '@/components/report/ReportAccountPlaylistForm.vue'
import ReportSongForm from '@/components/report/ReportSongForm.vue'
import { mapActions } from 'vuex';

const reportModule = "reportModule"

export default {
  props: {
    playlist: {
      type: Object,
      required: true,
    },
    isPlaylistLiked: {
      type: Boolean,
      required: true,
    },
    playlistLikes: {
      type: String,
      required: true
    },
    playlistId: {
      type: String,
      required: true
    }
  },
  components: {
    ReportAccountPlaylistForm,
    ReportSongForm
  }
  ,
  data() {
    return {
      reportedSongIndex: null,
      showReportSongDialog: false,
      showReportAccountPlaylistDialog: false,
      currentBtn: "LIST",
      currentIdx: 0,

      videoIds: [],

      isPlaying: false,
      currentIframe: {},

      duration: 0,
      currentTime: 0,
      currentTimeText: "00:00",
      totalTimeText: "0000",

      progressInterval: null,
      isDataLoaded: false,

      isYouTubeApiLoaded: false,

      songButtons: [
        { label: "LIST", class: "clicked-song-btn" },
        { label: "LYRICS", class: "song-btn" },
      ],
    };
  },
  beforeUnmount() {
    clearInterval(this.progressInterval);
    this.progressInterval = null;

    if (this.ytPlayer) {
      this.ytPlayer.destroy();

      console.log("destroy");
    }
  },
  methods: {
    ...mapActions(reportModule, ["requestReportAccountAndPlaylistAndSongToSpring"]),

    reportSong(songId) {
      this.songId = songId
      this.showReportSongDialog = true;
      // alert(songId)
    },
    async onSubmitReportSongForm(payload) {
      await this.requestReportAccountAndPlaylistAndSongToSpring(payload)
      this.showReportSongDialog = false
      console.log('신고 폼이 제출되었습니다:', payload);
    },

    async onSubmitReportAccountPlaylistForm(payload) {
      // 신고 폼 전달 작성(계정 & 플레이리스트 신고)
      await this.requestReportAccountAndPlaylistAndSongToSpring(payload)
      this.showReportAccountPlaylistDialog = false
      console.log('신고 폼이 제출되었습니다:', payload);

    },
    cancelReportAccountPlalist() {
      this.showReportAccountPlaylistDialog = false;
      this.showReportSongDialog = false;
    },

    reportAccountAndPlaylist() {
      this.showReportAccountPlaylistDialog = true
      console.log('계정 또는 플레이리스트가 신고되었습니다')
    },

    async getSongs() {
      console.log("getSongs");

      if (this.playlist.songlist) {
        this.initializeVideos();
      } else {
        return false;
      }
    },
    async initializeVideos() {
      const videoLinks = await this.playlist.songlist.map((song) => song.link);
      this.videoIds = await videoLinks.map((url) => this.extractVideoId(url));

      this.$refs.ytPlayer.src = `https://www.youtube.com/embed/${this.videoIds[this.currentIdx]
        }?autoplay=0&mute=0&enablejsapi=1`;

      this.setupPlayer();
    },

    extractVideoId(url) {
      const regex =
        /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#&?]*).*/;
      const match = url.match(regex);
      return match && match[1].length === 11 ? match[1] : null;
    },

    loadYouTubeApi() {
      if (!this.isYouTubeApiLoaded) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
          this.isYouTubeApiLoaded = true;
          this.setupPlayer();
        };

        tag.onload = () => {
          this.isYouTubeApiLoaded = true;
          this.setupPlayer();
        };
      }
    },
    setupPlayer() {
      if (this.isYouTubeApiLoaded) {
        console.log("setupPlayer");
        this.ytPlayer = new YT.Player(this.$refs.ytPlayer, {
          events: {
            onReady: this.onPlayerReady,
          },
        });
      }
    },

    onPlayerReady(event) {
      console.log("onPlayerReady");
      this.currentIframe = event.target;

      if (this.progressInterval) {
        clearInterval(this.progressInterval);
      }

      this.progressInterval = setInterval(() => {
        this.updateProgressBar();
        this.currentTimeText = this.formatTime(this.currentTime);
        this.totalTimeText = this.formatTime(this.duration);
      }, 1000);
    },

    playSong(index) {
      this.currentIdx = index;
      this.$refs.ytPlayer.src = `https://www.youtube.com/embed/${this.videoIds[index]}?autoplay=1&mute=0&enablejsapi=1`;
      this.isPlaying = true;
    },

    onPlayerStateChange() {
      console.log("onPlayerStateChange");
      this.currentIdx++;
      if (this.currentIdx >= this.videoIds.length) {
        this.currentIdx = 0;
      }
      this.playSong(this.currentIdx);
    },

    togglePlay() {
      if (this.totalTimeText !== "0000") {
        if (this.isPlaying) {
          this.currentIframe.pauseVideo();
        } else {
          this.currentIframe.playVideo();
        }
        this.isPlaying = !this.isPlaying;
      }
    },
    async nextVideo() {
      this.currentIdx++;
      if (this.currentIdx >= this.videoIds.length) {
        this.currentIdx = 0;
      }
      await this.playSong(this.currentIdx);
    },

    async previousVideo() {
      this.currentIdx--;
      if (this.currentIdx < 0) {
        this.currentIdx = this.videoIds.length - 1;
      }
      await this.playSong(this.currentIdx);
    },
    seekVideo(event) {
      const seekBarValue = event.target.value;
      const seekTime = (seekBarValue / event.target.max) * this.duration;
      this.currentIframe.seekTo(seekTime, true);
    },
    updateProgressBar() {
      if (!this.ytPlayer) return;
      if (this.ytPlayer.getPlayerState() == 0) {
        this.onPlayerStateChange();
      }
      const duration = this.ytPlayer.getDuration();
      const currentTime = this.ytPlayer.getCurrentTime();
      if (!isNaN(duration)) {
        this.duration = duration;

        this.currentTime = currentTime;
        const progressBar = document.getElementById("progress-bar");
        if (progressBar) {
          progressBar.max = Math.round(duration * 10) / 10;
          progressBar.value = Math.round(currentTime * 10) / 10;
        }
      }
    },
    formatTime(time) {
      if (!time || time === 0) return "00:00";
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time - minutes * 60);
      return ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
    },
    toggleBtn(label) {
      if (label === "LIST") {
        this.songButtons = [
          { label: "LIST", class: "clicked-song-btn" },
          { label: "LYRICS", class: "song-btn" },
        ];
        this.currentBtn = label;
      }
      if (label === "LYRICS") {
        this.songButtons = [
          { label: "LIST", class: "song-btn" },
          { label: "LYRICS", class: "clicked-song-btn" },
        ];
        this.currentBtn = label;
      }
    },
    async toggleLike() {
      if (this.isPlaylistLiked) {
        const isLike = false
        this.$emit("like", isLike);
      }
      else {
        const isLike = true
        this.$emit("like", isLike);
      }
    }
  },
  computed: {
    getImage() {
      if (this.playlist && this.playlist.songlist) {
        const link = this.playlist.songlist[this.currentIdx].link;
        return (
          "https://img.youtube.com/vi/" +
          link.substring(link.lastIndexOf("=") + 1) +
          "/mqdefault.jpg"
        );
      } else {
        return ""; // 데이터를 아직 불러오지 않았을 때의 처리
      }
    },
  },

  watch: {
    playlist: {
      immediate: true,
      async handler() {
        await this.getSongs();
      },
    },
  },
  mounted() {
    if (localStorage.getItem("userToken") !== null) {
      this.loadYouTubeApi();
    }
  },
};
</script>

<style>
.report-btn {
  background-color: transparent !important;
}

.playlist-read-card {
  margin-top: 6rem;
  padding: 18px;
  width: 900px;
  background-color: rgba(0, 0, 0, 0.4) !important;
}

.playlist-read-title {
  padding-top: 20px;
  padding-left: 20px;
  font-size: 32px;
  color: #ccff00;

}

.playlist-read-actions {
  display: flex;
  justify-content: space-between;
}

.action-btn {
  margin-right: 12px;
}

.action-btn-container {
  display: flex;
  color: #f1484e;

}

.playlist-read-writer {
  padding-left: 20px;
  font-size: 22px;
  color: #11c979;

}

.playlist {
  padding: 20px;
}

.playlist-table {
  overflow: scroll;
  padding-right: 15px;
  height: 450px !important;
}

.playlist-table::-webkit-scrollbar {
  width: 8px;
}

.playlist-table::-webkit-scrollbar-track {
  display: none;
}

.playlist-table::-webkit-scrollbar-corner {
  display: none;
}

.playlist-table::-webkit-scrollbar-horizontal {
  display: none;
}

.playlist-table:not(:hover)::-webkit-scrollbar-thumb {
  background: transparent;
}

.playlist-table:hover::-webkit-scrollbar-thumb {
  background: #888;
}

.playlist-table::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.lyrics {
  padding-right: 15px;
  color: white;
  height: 450px !important;
  overflow: scroll;
}

.lyrics::-webkit-scrollbar {
  width: 8px;
}

.lyrics::-webkit-scrollbar-track {
  display: none;
}

.lyrics::-webkit-scrollbar-corner {
  display: none;
}

.lyrics::-webkit-scrollbar-horizontal {
  display: none;
}

.lyrics:not(:hover)::-webkit-scrollbar-thumb {
  background: transparent;
}

.lyrics:hover::-webkit-scrollbar-thumb {
  background: #888;
}

.lyrics::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.song-thumbnail-sheet {
  background-color: rgba(0, 0, 0, 0.7);
}

.song-btn-container {
  margin-top: 30px;
  padding: 20px;
  padding-right: 35px;
  justify-content: space-between;
  display: flex;
  width: 100%;
}

.song-btn {
  color: #9b9797;
  margin: 20px;
  width: 100%;
}

.clicked-song-btn {
  color: #ffffff;
  margin: 20px;
  border-bottom: #f9f9f7 solid 1px;
  width: 100%;
}

.controls-container {
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
}

.progress-container {
  background-color: transparent;
  padding: 10px;
}

#progress-bar {
  all: initial;
  width: 100%;
  height: 5px;
  border: none;
}

#progress-bar::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background: #ccff00;
  border-radius: 50%;
  cursor: pointer;
  margin-top: -2.5px;
}

#progress-bar::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  background-color: #666;
  border-radius: 5px;
}

.playing {
  color: #ffffff;
}

.not-playing {
  color: #9b9797;
}

/* 신고폼 스타일 시작 */
.report-dialog {
  background-color: #3a3838;
  /* 다이얼로그 배경색 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* 그림자 효과 */
}

.report-dialog-title {
  color: #ffffff;
  font-size: 18px;
  /* 다이얼로그 제목 폰트 크기 */
  font-weight: bold;
  /* 다이얼로그 제목 폰트 굵기 */
}

.report-dialog-actions {
  display: flex;
  justify-content: flex-end;
  color: white;
}

/* 신고폼 스타일 끝 */</style>
