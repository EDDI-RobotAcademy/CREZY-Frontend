<template>
  <div>
    <change-nickname-form
      v-if="showModal"
      ref="nicknameChangeForm"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import ChangeNicknameForm from "@/components/account/ChangeNicknameForm.vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  components: {
    ChangeNicknameForm,
  },
  setup() {
    const store = useStore();
    const showModal = ref(false); 
    const router = useRouter();

    const requestExistUserInfoGoogleToSpring = (payload) => {
      return store.dispatch(
        "accountModule/requestExistUserInfoGoogleToSpring",
        {
          code: payload,
        }
      );
    };
    
    const requestCheckGoogleEmailToSpring = (checkPayload) =>
      store.dispatch("accountModule/requestCheckGoogleEmailToSpring", {
        code: checkPayload,
      });

    async function setRedirectData() {
      const route = useRoute();
      const code = route.query.code;
      const checkPayload = code;
      // 코드를 이용해 기존, 신규 유저 판별
      const isEmailValid = await requestCheckGoogleEmailToSpring(checkPayload);

      if (isEmailValid) {
        console.log("기존 회원");
        // 코드 이용해서 기존회원 정보 받아오기
        await requestExistUserInfoGoogleToSpring(checkPayload);
        router.push({ name: "home" });
      } else {
        console.log("신규 회원");
        showModal.value = true; 
      }
    }   

    onMounted(() => {
      setRedirectData();
    });

    return {
      requestExistUserInfoGoogleToSpring,
      showModal, 
    };
  },
};
</script>

<style scoped></style>
