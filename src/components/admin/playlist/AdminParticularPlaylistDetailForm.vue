<template>
  <div style="margin-top: 15px">
    <v-card class="particular-playlist-card">
      <div style="display: flex; align-items: center;">
        <div style="background-color: black; height: 200px; width: 300px">
          <v-img :src="getImage(playlist)" height="200"/>
        </div>
        <div style="margin: 15px">
          <div style="color: white; font-size: 36px;">{{ playlist.playlistName }}</div>
          <div style="font-size: 22px">{{ playlist.playlistWriter }}</div>
          <div>{{ playlist.playlistCreateDate }}</div>
          <div style="display: flex; justify-content: space-between;">
            <div>노래 {{ playlist.songCounts }}곡</div>
            <div>좋아요 {{ playlist.likeCounts }}개</div>
          </div>
          <div style="display: flex; align-items: center;">
            <v-btn class="particular-playlist-btn" @click="deletePlaylistThumbnail">사진 변경</v-btn>
            <v-btn class="particular-playlist-btn" @click="changePlaylistName">이름 변경</v-btn>
            <v-btn class="particular-playlist-btn" @click="deletePlaylist">삭제</v-btn>
          </div>
        </div>
      </div>
    </v-card>
    
    <v-card class="particular-playlist-card">
      <div>
        <table class="playlist-songlist-table">
          <tr class="playlist-songlist-header">
            <th align="start">index</th>
            <th align="start">title</th>
            <th align="start">artist</th>
            <th align="end">registered date</th>
            <th align="end">status</th>
          </tr>
          <template v-for="(song, index) in playlist.songDetail">
            <tr class="playlist-songlist-row" @click="manageSong(song.songId)">
              <td>{{ index + 1 }}</td>
              <td align="start">{{ song.title }}</td>
              <td align="start">{{ song.singer }}</td>
              <td align="end">{{ song.createDate }}</td>
              <td align="end">
                <v-icon v-if="song.songStatus === 'BLOCK'" style="color: gray; font-size: 56px;">mdi-circle-small</v-icon>
                <v-icon v-else style="color: greenyellow; font-size: 56px;">mdi-circle-small</v-icon>
              </td>
            </tr>
            <tr v-if="selectedSongId === song.songId">
              <td colspan="6">
                <ParticularSongDetailForm :songInfo="songInfo" :songThumbnail="songThumbnail"/>
              </td>
            </tr>
          </template>
        </table>
      </div>
    </v-card>
  </div>
</template>

<script>
import AWS from "aws-sdk";

import ParticularSongDetailForm from "@/components/admin/song/ParticularSongDetailForm.vue"

export default {
  props: {
    playlist: {
      type: Object,
      required: true
    },
    songInfo: {
      type: Object
    }
  },
  data() {
    return {
      songThumbnail: '',

      selectedSongId: '',
      awsBucketName: process.env.VUE_APP_AWS_BUCKET_NAME,
      awsBucketRegion: process.env.VUE_APP_AWS_BUCKET_REGION,
      awsIdentityPoolId: process.env.VUE_APP_AWS_IDENTITY_POOLID,
      s3: null,
    }
  },
  components: {
    ParticularSongDetailForm
  },
  methods: {
    manageSong(songId) {
      if (this.selectedSongId == songId.toString()) {
        this.selectedSongId = ''
      } else {
        this.selectedSongId = songId;
        this.$emit("openManage", this.selectedSongId)
      }
    },
    getImage(playlist) {
      if (!playlist.thumbnailName) {
        return require("@/assets/images/Logo_Text-removebg-preview.png");
      }
      return `https://${this.awsBucketName}.s3.${this.awsBucketRegion}.amazonaws.com/${this.playlist.thumbnailName}`;
    },
    getSongImage(link) {
      return (
        "https://img.youtube.com/vi/" +
        link.substring(link.lastIndexOf("=") + 1) +
        "/mqdefault.jpg"
      );
    },
    awsS3Config() {
      AWS.config.update({
        region: this.awsBucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.awsIdentityPoolId
        })
      });

      this.s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: {
            Bucket: this.awsBucketName
        }
      })
    },

    async deletePlaylistThumbnail() {
      this.awsS3Config();

      const fileName = this.playlist.thumbnailName

      await this.s3.deleteObject({
        Key: fileName
      }, (err, data) => {
        if (err) {
          return alert("문제 발생" + err.message)
        }
      })
      this.$emit("deleteThumbnail")
    },

    changePlaylistName() {
      this.$emit("changePlaylistName")
    },

    deletePlaylist() {
      this.$emit("deletePlaylist")
    }
  },
  watch: {
    songInfo: {
      handler(newVal) {
        this.songThumbnail = this.getSongImage(newVal.link)
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

.particular-playlist-btn {
  background-color: #5F6871;
  width: 120px;
  margin: 8px;
}
</style>