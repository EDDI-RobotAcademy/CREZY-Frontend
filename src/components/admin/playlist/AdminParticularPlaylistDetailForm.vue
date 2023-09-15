<template>
  <div style="margin-top: 15px">
    <v-card class="particular-playlist-card">
      <div style="display: flex; align-items: center;">
        <div style="background-color: black; height: 200px; width: 300px">
          이미지 넣을 곳
        </div>
        <div style="margin: 15px">
          <div style="color: white; font-size: 36px;">제목</div>
          <div style="font-size: 22px">생성자</div>
          <div>생성일자</div>
          <div style="display: flex; justify-content: space-between;">
            <div>곡 수</div>
            <div>좋아요 수</div>
          </div>
          <div style="display: flex; align-items: center;">
            <v-btn>사진 변경</v-btn>
            <v-btn>이름 변경</v-btn>
            <v-btn>플레이리스트 삭제</v-btn>
          </div>
        </div>
      </div>
    </v-card>
    
    <v-card class="particular-playlist-card">
      <div>
        <table class="playlist-songlist-table">
          <tr class="playlist-songlist-header">
            <th align="start">index</th>
            <th style="width: 100px;"></th>
            <th align="start">title</th>
            <th align="start">artist</th>
            <th align="end">registered date</th>
            <th align="end">status</th>
          </tr>
          <tr class="playlist-songlist-row" 
            v-for="(song, index) in playlist.songlist">
            <td>{{ index + 1 }}</td>
            <td>이미지</td>
            <td align="start">{{ song.title }}</td>
            <td align="start">{{ song.artist }}</td>
            <td align="end">{{ song.createDate }}</td>
            <td align="end"><v-icon style="color: gray; font-size: 56px;">mdi-circle-small</v-icon></td>
          </tr>
        </table>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playlist: {
        songlist: [ 
          {title: "이름", artist: "가수", createDate: "23-09-14"} 
        ]
      }
    }
  }
}
</script>

<style scoped>
.particular-playlist-card {
  background-color: #292E37;
  border-radius: 5px;
  color: white;
  margin: 15px;
  padding: 15px;
} 

.playlist-songlist-table{
  width: 100%; 
  border-collapse: separate;
  border-spacing: 0 15px;
}

.playlist-songlist-header{
  color: #5F6871; 
  height: 75px;
  padding: 15px;
}

.playlist-songlist-row{
  background-color: #485463;
  color: white; 
  height: 100px; 
}

td:first-child,
th:first-child {
  border-radius: 10px 0 0 10px;
  padding-left: 15px;
}

td:last-child,
th:last-child {
  border-radius: 0 10px 10px 0;
  padding-right: 15px;
}
</style>