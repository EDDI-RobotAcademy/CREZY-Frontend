<template>
  <div style="display: flex; justify-content: space-between;">
    <div class="d-flex">
      <div class="admin-song-img-wrapper">
        <v-img class="mx-auto" height="200" :src="getImage(song.link)"> </v-img>
      </div>
      <div style="margin: 8px">
        <div>{{ song.title }}</div>
        <div>{{ song.artist }}</div>
        <div>{{ song.createDate }}</div>
        <a :href="song.link" target="_blank" style="color: white;">{{ song.link }}</a>
      </div>
    </div>
    <div>
      <div class="lyrics" align="center" v-html="song.lyrics" v-if="!isLyricModify"></div>
      <div v-else>
        <v-textarea 
          class="lyric-modify"
          v-model="modifiedLyrics"
          >
        </v-textarea>
      </div>
    </div>
    <div align="end">
      <div><v-btn class="particular-song-btn">상태 설정</v-btn></div>
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
      <div><v-btn class="particular-song-btn">삭제</v-btn></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      song: {
        lyrics: "asdfasdf asdfadsfasdf asdfasdfasdf<br> asdfasdf <br> asdfasdf <br> asdfasdf <br> asdfasdf <br> asdfasdf <br> asdfasdf <br> asdfasdf <br> asdfasdf <br> asdfasdf <br> asdfasdf <br> ",
        title: "제목 1",
        artist: "가수 1",
        link: "https://www.youtube.com/watch?v=orJSJGHjBLI"
      },
      isLyricModify: false,
      modifiedLyrics: ""
    }
  },
  methods: {
    cancelModify() {
      this.modifiedLyrics = this.song.lyrics
      this.isLyricModify = false
    },
    getImage(link) {
      return (
        "https://img.youtube.com/vi/" +
        link.substring(link.lastIndexOf("=") + 1) +
        "/mqdefault.jpg"
      );
    },
  },
  watch: {
    isLyricModify(newVal) {
      if (newVal) {
        const convertedLyrics = this.song.lyrics.replace(/<br\s*\/?>/g, '\n')
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