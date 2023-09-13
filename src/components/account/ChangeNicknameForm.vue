<template>
  <div class="nickname-dialog-background" v-if="isModalOpen">
    <div class="nickname-dialog">
      <h2 class="nickname-dialog-title">프로필 설정</h2>      
      <div class="profile-image-container">
        <label for="profile-image-upload">
          <v-img class="profile-image" :src="getProfileImage()" alt="프로필 사진"></v-img>
        </label>
        <input
          id="profile-image-upload"
          type="file"
          style="display: none;"
          @change="handleFileUpload"
        />
        <v-icon class='profile-image-icon'>mdi-pencil-circle-outline</v-icon>
        <dd class="delete-image-button" >
          <button v-if=isChangeImage @click.prevent.stop="deleteImage">기본 이미지로 변경</button>
        </dd>
      </div>
      <v-text-field v-model="newNickname" label="사용하고 싶은 닉네임을 입력하십시오" outlined class="nickname-input"></v-text-field>
      <div class="nickname-dialog-actions">
        <v-btn @click="checkNickname" color="black">중복확인</v-btn>
        <v-btn @click="submit" color="black" :disabled="!isNicknameAvailable">Submit</v-btn>
        <v-btn @click="closeModal" color="white">가입취소</v-btn>
      </div>
    </div>
  </div>
</template>

<script>

import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import AWS from 'aws-sdk';

export default {
  props: {
    loginType: {
      type: String
    }
  },
  setup(props) {
    const store = useStore();
    const newNickname = ref("");
    const isNicknameAvailable = ref(false);
    const isModalOpen = ref(true);
    const router = useRouter();
    const route = useRoute();
    const code = route.query.code;
    
    const imagePreview = ref(null);
    const newProfileImageName = ref(null);
    const isChangeImage = ref(false);
    const file = ref(null);
    const s3fileList = ref([]);
    let s3 = null;
    const awsBucketName = process.env.VUE_APP_AWS_BUCKET_NAME;
    const awsBucketRegion = process.env.VUE_APP_AWS_BUCKET_REGION;
    const awsIdentityPoolId = process.env.VUE_APP_AWS_IDENTITY_POOLID;

    watch(newNickname, async (changedNickname) => {
      if (changedNickname !== newNickname) {
        isNicknameAvailable.value = false
      }
    })

    const requestUserInfoGoogleToSpring = (payload) => {
      const { nickname, profileImageName } = payload;
      return store.dispatch("accountModule/requestUserInfoGoogleToSpring", {
        nickname,
        profileImageName,
      });
    };

    const requestUserInfoKakaoToSpring = (payload) => {
      const { nickname, profileImageName } = payload;
      return store.dispatch("accountModule/requestUserInfoKakaoToSpring", {
        nickname,
        profileImageName,
      });
    };

    const requestUserInfoNaverToSpring = (payload) => {
      const { nickname, profileImageName } = payload;
      return store.dispatch("accountModule/requestUserInfoNaverToSpring", {
        nickname,
        profileImageName,
      });
    };


    const closeModal = () => {
      isModalOpen.value = false;
      router.push({ name: "home" });

    };

    const checkNickname = async () => {
      const res = await store.dispatch("accountModule/requestCheckNicknameToSpring", { newNickname: newNickname.value });
      isNicknameAvailable.value = res;
    };   

    const getProfileImage = () => {    
        if (imagePreview.value) {
            return imagePreview.value;
        } else {
            return require('@/assets/images/Logo_only_small-removebg-preview.png');
        }        
    };  

    const deleteImage = () => {
      imagePreview.value = null;
      file.value = null;
      newProfileImageName.value = null;     
      isChangeImage.value = false;    
    };      

    const handleFileUpload = (event) => {
      const selectedFile = event.target.files[0];
      isChangeImage.value = true;  
      if (selectedFile) {
        console.log("이미지 읽어오기!!");
        const reader = new FileReader();
        console.log("Blob 값도 맞다!");

        reader.onload = (e) => {
          imagePreview.value = e.target.result;
          newProfileImageName.value = selectedFile.name;
          file.value = selectedFile;
          console.log(file.value);
        };

        reader.readAsDataURL(selectedFile);
      } else {
        console.log("파일 못읽음");
      }
    };     

      const awsS3Config = () => {
            AWS.config.update({
                region: awsBucketRegion,
                credentials: new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: awsIdentityPoolId
                })
            });

            s3 = new AWS.S3({
                apiVersion: '2006-03-01',
                params: {
                    Bucket: awsBucketName
                }
            });
        };

        const uploadAwsS3 = () => {                   
          const selectedFile = file.value;
          console.log(selectedFile)     
          if (selectedFile) {
            newProfileImageName.value = selectedFile.name;
            s3.upload({
              Key: selectedFile.name,
              Body: selectedFile,
              ACL: 'public-read'
            }, (err, data) => {
              if (err) {
                console.log(err);
                alert('업로드 중 문제 발생 (사진 파일에 문제가 있음)', err.message);
                return;
              }         
              newProfileImageName.value = data.Location;
              imagePreview.value = data.Location;            
            });
          } else {
            console.log("이미지를 선택하세요");
          }
        };



    const submit = async () => {
      awsS3Config();
      if (newProfileImageName !== null) {

        if (props.loginType === 'Google') {
          await requestUserInfoGoogleToSpring({ nickname: newNickname.value, profileImageName: newProfileImageName.value });
          uploadAwsS3();           
        }
        if (props.loginType === 'Naver') {
          await requestUserInfoNaverToSpring({ nickname: newNickname.value, profileImageName: newProfileImageName.value });
          uploadAwsS3();   
        }
        if (props.loginType === 'Kakao') {
          console.log(newNickname.value)
          await requestUserInfoKakaoToSpring({ nickname: newNickname.value, profileImageName: newProfileImageName.value });
          uploadAwsS3();   
        }
      } else {
        console.log("이미지를 넣으시오")
      }        
       closeModal();
    };

    return {
      newNickname,
      isNicknameAvailable,
      checkNickname,
      getProfileImage,
      submit,
      isModalOpen,
      closeModal,
      handleFileUpload,
      uploadAwsS3,      
      deleteImage,
      isChangeImage,
    };
  },
};
</script>


<style scoped>
.nickname-dialog-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.nickname-dialog {
  background-color: rgba(255, 255, 255, 0.562);
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  width: 400px;
  text-align: center;
}

.nickname-dialog-title {
  font-size: 18px;
  margin-bottom: 16px;  
}

.nickname-input {
  width: 100%;
  margin-bottom: 16px;
}

.nickname-dialog-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}
.profile-image-container {
  width: 120px;
  height: auto;
  justify-content: center;
  align-items: center;
  margin: auto;
  display: block;
}
.profile-image {
  width: 100px;
  height: auto;
  border-radius: 50%;
  background-color: black;
  margin-bottom: 16px;
  cursor: pointer;
}
</style>