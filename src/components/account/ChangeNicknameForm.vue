<template>
  <div class="nickname-dialog-background" v-if="isModalOpen">
    <div class="nickname-dialog">
      <h2 class="nickname-dialog-title">닉네임</h2>
      <v-text-field v-model="newNickname" label="사용하고 싶은 닉네임을 입력하십시오" outlined class="nickname-input"></v-text-field>
      <div class="nickname-dialog-actions">
        <v-btn @click="checkNickname" color="black">중복확인</v-btn>
        <v-btn @click="submit" color="black" :disabled = "!isNicknameAvailable" >Submit</v-btn>
        <v-btn @click="closeModal" color="white">가입취소</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex"; 
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const store = useStore(); 
    const newNickname = ref("");
    const isNicknameAvailable = ref(false);
    const isModalOpen = ref(true);
    const router = useRouter();
    const route = useRoute();
    const code = route.query.code;

    const payload = {
        code,
        nickname: null,
        profileImageName: null,
      };

    const requestUserInfoGoogleToSpring = (payload) => {
      const { code, nickname, profileImageName } = payload;
      return store.dispatch("accountModule/requestUserInfoGoogleToSpring", {
        code,
        nickname,
        profileImageName,
      });
    };


    const closeModal = () => {
      isModalOpen.value = false;
      router.push({ name: "home" });
      
    };

    const checkNickname = async () => {
      const res = await store.dispatch("accountModule/requestCheckNicknameToSpring", {newNickname: newNickname.value});      
      isNicknameAvailable.value = res;
    };

    const submit = async () => {
      await requestUserInfoGoogleToSpring(code);
      await store.dispatch("accountModule/requestChangeNicknameToSpring", {newNickname: newNickname.value});  
      closeModal();
    };

    
    return {      
      newNickname,
      isNicknameAvailable,
      checkNickname,      
      submit,
      isModalOpen, 
      closeModal,
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
</style>
