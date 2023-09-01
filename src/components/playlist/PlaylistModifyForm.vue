<template>
  <div>
    <v-form @submit.prevent="onSubmit" ref="form">
      <v-card-title class="playlist-dialog-title"
        >플레이리스트 수정</v-card-title
      >
      <v-text-field
        id="playlist-title"
        type="text"
        v-model="playlist.playlistName"
        placeholder="제목을 입력하세요"
        class="input-field"
      ></v-text-field>
      <div class="popup">
        <div v-show="!file" class="image-box">
          <div>
            <span class="playlist-thumbnail-title">- 현재 등록된 사진 -</span>
            <v-img :src="getImage(playlist)" class="preview-image" />
          </div>
        </div>
        <div v-if="!file" class="image-box">
          <div>
            <label class="custom-file-upload" for="file-selector"
              >사진 등록</label
            >
            <input
              type="file"
              id="file-selector"
              ref="file"
              style="display: none"
              @change="handleFileUpload"
            />
          </div>
        </div>
        <div v-else>
          <div>
            <div class="image-container">
              <img :src="imagePreview" class="preview-image" />
              <div class="file-close-button" @click="deleteImage">x</div>
            </div>
          </div>
        </div>
      </div>
      <div class="add-button">
        <v-btn @click="onSubmit" rounded variant="outlined" color="white"
          >수정</v-btn
        >
        <v-btn @click="cancel" rounded variant="outlined" color="white"
          >취소</v-btn
        >
      </div>
    </v-form>
  </div>
</template>

<script>
import AWS from "aws-sdk";
export default {
  props: {
    playlist: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      playlistName: "",
      thumbnailName: "",
      imageUrls: [],
      imagePreview: null,
      file: null,
      s3fileList: [],
      awsBucketName: process.env.VUE_APP_AWS_BUCKET_NAME,
      awsBucketRegion: process.env.VUE_APP_AWS_BUCKET_REGION,
      awsIdentityPoolId: process.env.VUE_APP_AWS_IDENTITY_POOLID,
      s3: null,
    };
  },
  methods: {
    handleFileUpload() {
      const file = this.$refs.file.files[0];
      if (file) {
        this.file = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async onSubmit() {
      if (!this.playlist.playlistName) {
        alert("제목을 입력해주세요!");
        return;
      }
      await this.uploadAwsS3();
      let playlistInfo = {
        playlistName: this.playlist.playlistName,
        thumbnailName: this.thumbnailName,
      };
      this.$emit("submit", playlistInfo);
    },
    cancel() {
      this.$emit("cancel");
    },
    awsS3Config() {
      AWS.config.update({
        region: this.awsBucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.awsIdentityPoolId,
        }),
      });
      this.s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: {
          Bucket: this.awsBucketName,
        },
      });
    },
    uploadAwsS3() {
      this.awsS3Config();
      // if (!Array.isArray(this.file)) {
      //     this.file = [this.file];
      // }
      let files = Array.isArray(this.file) ? this.file : [this.file];
      for (let idx = 0; idx < files.length; idx++) {
        // for (let idx = 0; idx < this.file.length; idx++) {
        const file = files[idx];
        if (!file || !file.name) {
          this.thumbnailName = this.playlist.thumbnailName;
          continue;
        }
        this.thumbnailName = file.name;
        this.s3.upload(
          {
            Key: file.name,
            Body: file,
            ACL: "public-read",
          },
          (err, data) => {
            if (err) {
              console.log(err);
              return alert(
                "업로드 중 문제 발생 (사진 파일에 문제가 있음)",
                err.message
              );
            }
          }
        );
      }
    },
    deleteImage() {
      this.imagePreview = null;
      this.file = null;
      this.s3fileList = [];
      this.imageUrls = [];
    },
    getImage(playlist) {
      if (!playlist.thumbnailName) {
        return require("@/assets/images/Logo_Text-removebg-preview.png");
      }
      return `https://${this.awsBucketName}.s3.${this.awsBucketRegion}.amazonaws.com/${this.playlist.thumbnailName}`;
    },
  },
};
</script>
<style>
.popup {
  position: relative;
}

.input-field {
  color: white;
  height: 75px;
  margin-top: 10px;
}

.file-close-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 8px;
  cursor: pointer;
  z-index: 1;
  display: flex;
  border-top-left-radius: 0;
  border-bottom-right-radius: 5px;
  color: grey;
  font-size: 20px;
  font-weight: bold;
}

.image-container {
  position: relative;
  display: inline-block;
}

.preview-image {
  max-width: 200px;
  max-height: 200px;
  margin-bottom: 10px;
}

.custom-file-upload {
  display: inline-block;
  padding: 9px 13px;
  cursor: pointer;
  font-weight: bold;
  background-color: white;
  font-size: 15px;
}

.image-box {
  margin-top: 20px;
}

.add-button {
  bottom: 5%;
}

.playlist-dialog-title {
  text-align: center;
  font-size: 20px;
  color: white;
  margin-left: 10px;
  margin-top: 10px;
}

.playlist-thumbnail-title {
  text-align: center;
  font-size: 15px;
  color: white;
  margin-left: 10px;
  margin-top: 10px;
}
</style>
