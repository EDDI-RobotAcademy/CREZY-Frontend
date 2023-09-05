<template>
    <div>
        <change-nickname-form v-if="showModal" ref="nicknameChangeForm" :loginType="loginType" />
    </div>
</template>
  
<script>
import { ref, onMounted } from "vue";
import ChangeNicknameForm from "@/components/account/ChangeNicknameForm.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
    components: {
        ChangeNicknameForm
    },
    data() {
        return {
            loginType: 'Kakao'
        }
    },
    setup() {
        const store = useStore()
        const showModal = ref(false);
        const router = useRouter()

        const requestExistUserInfoKakaoToSpring = (payload) => {
            return store.dispatch(
                "accountModule/requestExistUserInfoKakaoToSpring",
                {
                    code: payload,
                }
            );
        };

        const requestCheckKaKaoEmailToSpring = (checkPayload) =>
            store.dispatch("accountModule/requestCheckKaKaoEmailToSpring", {
                code: checkPayload,
            });

        async function setRedirectData() {
            const route = useRoute();
            const code = route.query.code;
            const checkPayload = code;
            const isEmailValid = await requestCheckKaKaoEmailToSpring(checkPayload);

            if (isEmailValid) {
                await requestExistUserInfoKakaoToSpring(checkPayload);
                router.push({ name: "home" });
            } else {
                showModal.value = true;
            }
        }

        onMounted(() => {
            setRedirectData();
        });

        return {
            requestExistUserInfoKakaoToSpring,
            showModal,
        };
    },
};
</script>

  
<style scoped></style>