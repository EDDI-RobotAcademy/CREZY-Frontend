<template>
    <div>
      <v-row>
        <v-col cols="8">
          <v-card v-if= "accountReportDetail.reportedCategoryType === 'ACCOUNT'" class="custom-card">
            <div class="card-title" style="margin-bottom: 15px;">신고 사항</div>
            <div class="card-content" style="display: flex; align-items: flex-start; margin-left: 100px;">
              <div style="margin-right: 15px;">
                <img :src="getProfileImage(accountReportDetail.reportedProfileImageName)" style="height: 250px;">
              </div>
              <table class="info-table" style="margin-left: 20px;">
                <div>
                      <div class="playlist-title">
                        {{ accountReportDetail.reportedProfileName }}
                      </div>                      
                </div>
              </table>
            </div>
          </v-card>
          <v-card v-if="accountReportDetail.reportedCategoryType === 'PLAYLIST'" class="custom-card">
            <div class="card-title" style="margin-bottom: 15px;">신고 사항</div>
            <div class="card-content" style="display: flex; align-items: flex-start; margin-left: 100px;">
              <div style="margin-right: 15px;">
                <img :src="getPlaylistImage(playlistReportDetail.thumbnailName)" style="height: 250px;">
              </div>
              <table class="info-table" style="margin-left: 20px;">
                <div>
                      <div class="playlist-title">
                        {{ playlistReportDetail.playlistName }}
                      </div>
                      <div class="playlist-accountWriter">
                        {{ playlistReportDetail.reportedProfileName }}
                      </div>
                </div>
              </table>
            </div>
          </v-card>
          <v-card v-if="accountReportDetail.reportedCategoryType === 'SONG'" class="custom-card">
            <div class="card-title" style="margin-bottom: 15px;">신고 사항</div>
            <div class="card-content" style="display: flex;">
              <div style="margin-right: 15px;">
                <img :src="getSongImage(songReportDetail.link)" style="height: 250px;">
              </div>
              <div class="song-info">                
                <pre class="lyrics-container"><span v-html="formatLyrics(songReportDetail.lyrics)"></span></pre>
              </div>                
            </div>
            <table class="info-table">
                  <tr>
                    <td>가수:</td>
                    <td>{{ songReportDetail.singer }}</td>
                  </tr>
                  <tr>
                    <td>노래 제목:</td>
                    <td>{{ songReportDetail.title }}</td>
                  </tr>
                  <tr> 
                    <td>노래 주소:</td> 
                    <a :href="songReportDetail.link" target="_blank" style="color: white;">{{ songReportDetail.link }}</a> 
                  </tr>
            </table>
          </v-card>          
          <v-card class="custom-card">
            <div class="card-title">신고 정보</div>
            <table class="info-table">
              <tr>
                <td>신고자 닉네임:</td>
                <td>{{ accountReportDetail.reporterProfileName }}</td>
              </tr>
              <tr>
                <td>피신고자 닉네임:</td>
                <td>{{ accountReportDetail.reportedProfileName }}</td>
              </tr>             
            </table>
          </v-card>
        </v-col>
        <v-col cols="4" > 
          <v-card class="button-container">
            <div class="button-wrapper">
                <v-btn class="custom-btn" >approve 버튼</v-btn>
                <v-btn class="custom-btn" style="width: 300px;">return 버튼</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </template>
   
  
  <script>
  
  export default {
    props: {
        accountReportDetail: {
            type: Object,
            required: false,
        },
        playlistReportDetail: {
            type: Object,
            required: false,
        },
        songReportDetail: {
            type: Object,
            required: false,
        },
      
    },
    components: {
      
    },

    methods: {
        getProfileImage(profileImageName) {
            if (!profileImageName) {
                return require('@/assets/images/Logo_only_small-removebg-preview.png');
            } else {
                return `https://${this.awsBucketName}.s3.${this.awsBucketRegion}.amazonaws.com/${profileImageName}`;
            }
        },
        getPlaylistImage(playlistImageName) {
            if (!playlistImageName) {
              return require("@/assets/images/Logo_Text-removebg-preview.png");
            }
            return `https://${this.awsBucketName}.s3.${this.awsBucketRegion}.amazonaws.com/${playlistImageName}`;
        },
        getSongImage(link) {
          return (
            "https://img.youtube.com/vi/" +
            link.substring(link.lastIndexOf("=") + 1) +
            "/mqdefault.jpg"
          );
        },
        formatLyrics(lyrics) {
          return lyrics.replace(/<br>/g, '\n');
        },
        
        
          
    },

    data() {
      return {
        awsBucketName: process.env.VUE_APP_AWS_BUCKET_NAME,
        awsBucketRegion: process.env.VUE_APP_AWS_BUCKET_REGION,
        awsIdentityPoolId: process.env.VUE_APP_AWS_IDENTITY_POOLID,
     
        
      }
    },
    computed: {
      
    },

    mounted() {
      
    }
  }
  </script>

<style>
.custom-card {
  margin: 15px;
  padding: 20px;
  background-color: #485463;
  color: #ffffff;
}

.info-table {
  width: 100%;
}

.button-container {
  background-color: #485463;
  color: #ffffff;
  text-align: center; 
  height: 100%; 
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
}

.button-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  
}

.custom-btn {
  background-color: #5b6775c5;
  color: #ffffff; 
  width: 300px;
  
}
.song-info {
  flex-grow: 1;
}

.lyrics-container {
  max-height: 250px;
  overflow-y: auto;
}
</style>
  
