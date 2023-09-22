<template>
    <div>
      <v-row>
        <v-col cols="8" style="margin: auto;">
          <v-card v-if= "foundReport.reportedCategoryType === 'ACCOUNT'" class="custom-card">
            <div class="card-title" style="margin-bottom: 15px;">신고 사항</div>
            <div class="card-content" style="display: flex; align-items: flex-start; margin-left: 100px;">
              <div style="margin-right: 15px;">
                <img :src="getProfileImage(accountReportDetail.reportedProfileImageName)" style="max-height: 250px; max-width:400px;">
              </div>
              <table class="info-table" style="margin-left: 20px;">
                <div>
                      <div class="playlist-title">
                        {{ accountReportDetail.reportedProfileName }}
                      </div>      
                      <tr>                         
                          <td>신고 수 {{ accountReportDetail.reportedCounts }} 개</td>
                      </tr>                                        
                      <tr>
                          <td>경고 수 {{ accountReportDetail.warningCounts }} 곡</td>
                      </tr>                                       
                      <tr>                          
                          <td>문의 수 {{ accountReportDetail.inquiryCounts }} 개</td>
                      </tr>                
                </div>
              </table>
              <table class="info-table" style="margin-left: 20px;">
                <div>
                      <div>
                        신고 내용
                      </div>     
                      <div>
                        {{ foundReport.reportContent }}                        
                      </div>                 
                </div>
              </table>
            </div>
          </v-card>
          <v-card v-else-if="foundReport.reportedCategoryType === 'PLAYLIST'" class="custom-card">
            <div class="card-title" style="margin-bottom: 15px;">신고 사항</div>
            <div class="card-content" style="display: flex; align-items: flex-start; margin-left: 100px;">
              <div style="margin-right: 15px;">
                <img :src="getPlaylistImage(playlistReportDetail.thumbnailName)" style="max-height: 250px; max-width:400px;">
              </div>
              <table class="info-table" style="margin-left: 20px;">
                <div>
                      <div class="playlist-title">
                        {{ playlistReportDetail.playlistName }}
                      </div>                      
                        <tr>                       
                          <td>제작자 :{{ playlistReportDetail.reportedProfileName }}</td>
                        </tr>                                        
                        <tr>
                          <td>노래 {{ playlistReportDetail.songCounts }} 곡</td>
                        </tr>                                       
                        <tr>                          
                          <td>좋아요 {{ playlistReportDetail.likeCounts }} 개</td>
                        </tr>                     
                </div>
              </table>
              <table class="info-table" style="margin-left: 20px;">
                <div>
                      <div>
                        신고 내용
                      </div>     
                      <div>
                        {{ foundReport.reportContent }}                        
                      </div>                 
                </div>
              </table>
            </div>
          </v-card>
          <v-card v-else-if="foundReport.reportedCategoryType === 'SONG'" class="custom-card">
            <div class="card-title" style="margin-bottom: 15px;">신고 사항</div>
            <div class="card-content" style="display: flex;">
              <div style="margin-right: 15px;">
                <img :src="getSongImage(songReportDetail.link)" style="max-height: 250px; max-width:400px;">
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
                  <tr>
                    <td>신고 내용:</td>
                    <td>{{ foundReport.reportContent }}</td>    
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
      </v-row>
      <div class="button-container">
          <v-btn @click="changeStatusTypeApprove" class="custom-btn">APPROVE</v-btn>
          <v-btn @click="changeStatusTypeReturn" class="custom-btn">RETURN</v-btn>
        </div>
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
        reportList: {
          type: Object,
          required: true,
        },
        reportId: {
          type: String, 
          required: true,
        },
      
    },
    components: {
      
    },

    methods: {

        changeStatusTypeApprove() {
        this.$emit("changeStatusTypeApprove")
        },
        changeStatusTypeReturn() {
          this.$emit("changeStatusTypeReturn")
        },
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
          if(link)
            return (
              "https://img.youtube.com/vi/" +
              link.substring(link.lastIndexOf("=") + 1) +
              "/mqdefault.jpg"
            );
        },
        formatLyrics(lyrics) {
          if(lyrics)
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

      foundReport() {
        return this.reportList.find(report => report.reportId === this.reportId);
      }
      
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
  display: flex;
  color: #ffffff;
  justify-content: center;  
  margin-top: -25px;
  margin-bottom: 10px;
}

.custom-btn {
  background-color: #5b6775c5;  
  width: 300px;
  margin: 5px; 
}

.song-info {
  flex-grow: 1;
}

.lyrics-container {
  max-height: 250px;
  overflow-y: auto;
}
</style>
  
