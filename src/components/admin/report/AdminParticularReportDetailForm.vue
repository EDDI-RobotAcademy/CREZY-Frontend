<template>
    <div>
      <v-row>
        <v-col cols="8">
          <v-card v-if= "accountReportDetail.reportedCategoryType === 'ACCOUNT'" class="custom-card">
            <div class="card-title" style="margin-bottom: 15px;">신고 사항</div>
            <v-img :src="getProfileImage(accountReportDetail.reportedProfileImageName)" style="margin-bottom: 15px; width: 250px;"></v-img>
            <table class="info-table" >
              <tr>
                <td>닉네임:</td>
                <td>{{ accountReportDetail.reportedProfileName }}</td>
              </tr>
            </table>
          </v-card>
          <v-card v-if= "accountReportDetail.reportedCategoryType === 'PLAYLIST'"  class="custom-card">
            <div class="card-title" style="margin-bottom: 15px;">신고 사항</div>
            <v-img :src="getPlaylistImage(playlistReportDetail.thumbnailName)" style="margin-bottom: 15px; width: 250px;"></v-img>
            <table class="info-table" >
              <tr>
                <td>플레이리스트:</td>
                <td>{{ playlistReportDetail.playlistName }}</td>
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
        console.log("컴포넌트가 마운트되었습니다.");
        console.log("accountReportDetail:", this.accountReportDetail);
        
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
</style>
  
