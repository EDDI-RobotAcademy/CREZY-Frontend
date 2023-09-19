<template>
  <div>
    <change-nickname-form v-if="showModal" ref="nicknameChangeForm" :loginType="loginType" />
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
  data() {
    return {
      loginType: 'Naver'
    }
  },
  setup() {
    const store = useStore();
    const showModal = ref(false);
    const router = useRouter();

    const requestExistUserInfoNaverToSpring = (payload) => {
      return store.dispatch(
        "accountModule/requestExistUserInfoNaverToSpring",
        {
          code: payload,
        }
      );
    };

    const requestCheckNaverEmailToSpring = (checkPayload) =>
      store.dispatch("accountModule/requestCheckNaverEmailToSpring", {
        code: checkPayload,
      });

    async function setRedirectData() {
      const route = useRoute();
      const code = route.query.code;
      const checkPayload = code;
      const isEmailValid = await requestCheckNaverEmailToSpring(checkPayload);

      if (isEmailValid === 'NORMAL') {
        await requestExistUserInfoNaverToSpring(checkPayload);
        router.push({ name: "home" });
      } else if (isEmailValid === 'BLACKLIST') {
        alert("회원님은 저희와 함께 할 수 없습니다.")
        router.push({ name: "home" });
      } else {
        showModal.value = true;
      }
    }

    onMounted(() => {
      setRedirectData();
    });

    return {
      requestExistUserInfoNaverToSpring,
      showModal,
    };
  },
};
</script>

<style scoped></style>
