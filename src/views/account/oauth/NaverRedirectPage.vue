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

    const requestUserInfoNaverToSpring = (code) => store.dispatch("accountModule/requestUserInfoNaverToSpring", code)
    async function setRedirectData() {
      const route = useRoute()
      const code = route.query.code
      await requestUserInfoNaverToSpring(code)

      router.push({ name: "home" })
    }
    onMounted(() => {
      setRedirectData()
    }
    )
    return {
      requestUserInfoNaverToSpring
    }
  }
}
</script>
  
<style scoped></style>