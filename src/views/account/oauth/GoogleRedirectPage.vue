<template>
  <div>
    <change-nickname-form ref="nicknameChangeForm" @closeModal="closeNicknameChangeForm" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import ChangeNicknameForm from "@/components/account/ChangeNicknameForm.vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  components: {
    ChangeNicknameForm
  },
  setup() {
    const store = useStore()
    const nicknameChangeFormRef = ref(null);
    const router = useRouter();

    const requestUserInfoGoogleToSpring = (code) => store.dispatch("accountModule/requestUserInfoGoogleToSpring", code)
    async function setRedirectData() {
      const route = useRoute()
      const code = route.query.code
      await requestUserInfoGoogleToSpring(code)
    }

    const openNicknameChangeForm = () => {
      if (nicknameChangeFormRef.value) {
        nicknameChangeFormRef.value.openModal();
      }
    };

    const closeNicknameChangeForm = () => {
      if (nicknameChangeFormRef.value) {
        nicknameChangeFormRef.value.closeModal();
        
      }
      router.push({ name: "home" });
     
    };

    onMounted(() => {
      setRedirectData()
      openNicknameChangeForm();
    });

    return {
      requestUserInfoGoogleToSpring,
      openNicknameChangeForm,
      closeNicknameChangeForm
    };
  }
}


</script>

<style scoped>

</style>
