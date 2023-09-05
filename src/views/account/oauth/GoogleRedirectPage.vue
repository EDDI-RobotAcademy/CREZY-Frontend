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
      loginType: 'Google'
    }
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
      const isEmailValid = await requestCheckGoogleEmailToSpring(checkPayload);

      if (isEmailValid) {
        await requestExistUserInfoGoogleToSpring(checkPayload);
        router.push({ name: "home" });
      } else {
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
