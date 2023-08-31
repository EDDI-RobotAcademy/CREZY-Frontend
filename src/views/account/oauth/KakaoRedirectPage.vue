<template>
    <div></div>
</template>
  
<script>
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore()
        const router = useRouter()

        const requestUserInfoKakaoToSpring = (code) => store.dispatch("accountModule/requestUserInfoKakaoToSpring", code)
        async function setRedirectData() {
            const route = useRoute()
            const code = route.query.code
            await requestUserInfoKakaoToSpring(code)

            router.push({ name: "home" })
        }
        onMounted(() => {
            setRedirectData()
        })
        return {
            requestUserInfoKakaoToSpring
        }
    }
}
</script>
  
<style scoped></style>