<template>
  <div style="display: flex; justify-content: space-between;">
    <div class="d-flex">
      <div class="admin-song-img-wrapper">
        <v-img class="mx-auto" height="200" :src="songThumbnail"> </v-img>
      </div>
      <div style="margin: 8px">
        <div>{{ songInfo.title }}</div>
        <div>{{ songInfo.singer }}</div>
        <div>{{ songInfo.createDate }}</div>
        <a :href="songInfo.link" target="_blank" style="color: white;">{{ songInfo.link }}</a>
      </div>
    </div>
    <div>
      <div class="lyrics" align="center" v-html="songInfo.lyrics" v-if="!isLyricModify"></div>
      <div v-else>
        <v-textarea 
          class="lyric-modify"
          v-model="modifiedLyrics"
          rows="7"
          >
        </v-textarea>
      </div>
    </div>
    <div align="end">
      <div>
        <v-btn v-if="songInfo.songStatus === 'BLOCK'" class="particular-song-btn" @click="openSong">노래 열기</v-btn>
        <v-btn v-else class="particular-song-btn" @click="blockSong">노래 막기</v-btn>
      </div>
      <div v-if="!isLyricModify">
        <v-btn 
          class="particular-song-btn" 
          @click="isLyricModify = !isLyricModify">
          가사 수정
        </v-btn>
      </div>
      <div v-if="isLyricModify">
        <v-btn 
          class="particular-song-btn" 
          @click="cancelModify">
          수정 취소
        </v-btn>
      </div>
      <div v-if="isLyricModify">
        <v-btn 
          class="particular-song-btn" 
          @click="modifyLyrics">
          수정 완료
        </v-btn>
      </div>
      <div>
        <v-btn 
          class="particular-song-btn"
          @click="deleteSong">
          삭제
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songInfo: {
      type: Object,
      required: true,
    },
    songThumbnail: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLyricModify: false,
      modifiedLyrics: ""
    }
  },
  methods: {
    cancelModify() {
      this.modifiedLyrics = this.songInfo.lyrics
      this.isLyricModify = false
    },
    getImage(link) {
      return (
        "https://img.youtube.com/vi/" +
        link.substring(link.lastIndexOf("=") + 1) +
        "/mqdefault.jpg"
      );
    },
    modifyLyrics() {
      const songId = this.songInfo.songId
      const lyrics = this.modifyForHtml(this.modifiedLyrics)
      this.$emit('modifyLyrics', { songId, lyrics })
      this.isLyricModify = false
    },

    modifyForHtml(lyrics) {
      const convertedLyrics = lyrics.replace(/\n/g, '<br>')
      return convertedLyrics
    },

    deleteSong() {
      const selectedSongId = this.songInfo.songId
      this.$emit('deleteSong', selectedSongId)
    },

    openSong() {
      const selectedSongId = this.songInfo.songId
      this.$emit('openSong', selectedSongId)
    },

    blockSong() {
      const selectedSongId = this.songInfo.songId
      this.$emit('blockSong', selectedSongId)
    }
  },
  watch: {
    isLyricModify(newVal) {
      if (newVal) {
        const convertedLyrics = this.songInfo.lyrics.replace(/<br\s*\/?>/, '\n')
        this.modifiedLyrics = convertedLyrics
      }
    },
  },
}
</script>

<style scoped>
.particular-song-btn{
  background-color: #5F6871;
  width: 100px;
  margin: 8px;
}

.admin-song-img-wrapper{
  height: 200px; 
  width: 300px; 
  background-color: black;
}

.lyrics {
  padding-right: 15px;
  color: white;
  width: 250px;
  height: 200px !important;
  overflow: scroll;
}

.lyric-modify{
  width: 250px;
}

a:visited {
    color: white;
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
</style>