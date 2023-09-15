<template>
  <div>
    <div v-if="!musicList || (Array.isArray(musicList) && musicList.length === 0)">
        <VideoBackground
          :src="require(`@/assets/vids/song-loading-video.mp4`)"
          style="
          height: 350px;
          width: 300px;
          top: 125px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          position: absolute;
          background-size: cover;
          "
        ></VideoBackground>
      </div>
    <v-card class="recommendation-list-card" flat v-else>
      <div>
        <div class="recommendation-list-title">Recommendations</div>
        <v-row style="margin-top: 30px;">
          <v-col 
            v-for="(song, index) in musicList" 
            :cols="selectedSong(song.labeledSongId)" >
              <v-card 
                v-if="selectedSongId !== song.labeledSongId"
                @click="selectSong(song.labeledSongId, index)"
                @mouseover="showDescription = true"
                @mouseout="showDescription = false"
                class="song-card">
                <v-img
                  class="mx-auto"
                  height="300"
                  :src="getImage(song.link)"
                ></v-img>
                <div v-show="showDescription" class="song-description">
                  <div class="description-title">
                    {{ song.title }}
                  </div>
                  <div class="description-writer">by {{ song.singer }}</div>
                </div>
              </v-card>
              <v-card v-else class="selected-song-card">
                <v-row>
                  <v-col cols="5">
                    <v-img
                      class="mx-auto"
                      height="250"
                      :src="getImage(song.link)"
                      @click="selectSong(song.songId, index)"
                    ></v-img>
                    <div class="controls-container">
                      <button></button>
                      <button style="color: white" @click="togglePlay()">
                        <v-icon v-if="isPlaying">mdi-pause</v-icon>
                        <v-icon v-else>mdi-play</v-icon>
                      </button>
                      <button style="color: white">
                        <v-icon>mdi-playlist-music</v-icon>
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
                  </v-col>
                  <v-col cols="3">
                    <div class="description-title">
                      {{ song.title }}
                    </div>
                    <div class="description-writer">by {{ song.singer }}</div>
                  </v-col>
                  <v-col cols="4">
                    <div class="lyrics" v-html="song.lyrics"></div>
                  </v-col>
                </v-row>
              </v-card>
          </v-col>
        </v-row>
      </div>
    </v-card>
    <iframe ref="ytPlayer" frameborder="0" allow="autoplay" width="0" height="0"></iframe>
  </div>
</template>

<script>
import VideoBackground from "vue-responsive-video-background-player";

export default {
  components: {
    VideoBackground,
  },
  props: {
    musicList: {
      type: Array
    }
  },
  data() {
    return {

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

      selectedSongId: '',
      showDescription: false,
    }
  },
  methods: {
    selectSong(songId, index) {
      if (this.selectedSongId != songId) {
         this.selectedSongId = songId;
         this.playSong(index)
      }
      else {
        this.selectedSongId = ''
      } 
    },
    selectedSong(songId) {
      return this.selectedSongId === songId ? 12 : 6;
    },
    selectedCardHeight(songId) {
      return this.selectedSongId === songId ? '400px' : '300px';
    },
    getImage(link) {
      return (
        "https://img.youtube.com/vi/" +
        link.substring(link.lastIndexOf("=") + 1) +
        "/mqdefault.jpg"
      );
    },


    async getSongs() {
      console.log("getSongs"); 

      if (this.musicList) {
        this.initializeVideos();
      } else {
        return false;
      }
    },
    async initializeVideos() {
      const videoLinks = await this.musicList.map((song) => song.link);
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
      // if (this.ytPlayer.getPlayerState() == 0) {
      //   this.onPlayerStateChange();
      // }
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
  },
  watch: {
    musicList: {
      immediate: true,
      async handler() {
        await this.getSongs();
      },
    },
    selectedSongId: {
      handler(newSongId) {
        if (newSongId === '') {
          this.currentIframe.pauseVideo()
          this.isPlaying = false
        }
      }
    }
  },
  mounted() {
    this.loadYouTubeApi();
  }
};
</script>

<style>
.recommendation-list-card {
  margin-top: 6rem;
  padding: 18px;
  width: 900px;
  background-color: rgba(0, 0, 0, 0.4) !important;
}

.recommendation-list-title {
  font-size: 22px;
  color: #ccff00;
}

.song-card {
  width: 100%;
  height: 300px;
  background-color: black
}

.song-card:hover .song-description {
  opacity: 1;
}

.song-description {
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.selected-song-card {
  width: 100%;
  height: 400px;
  color: white;
  background-color: black
}


</style>