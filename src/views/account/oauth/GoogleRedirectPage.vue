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

    const requestUserInfoGoogleToSpring = (code) => store.dispatch("accountModule/requestUserInfoGoogleToSpring", code)
    async function setRedirectData() {
      const route = useRoute()
      const code = route.query.code
      await requestUserInfoGoogleToSpring(code)

      router.push({ name: "home" })
    }
    onMounted(() => {
      setRedirectData()
    }
    )
    return {
      requestUserInfoGoogleToSpring
    }
  }
}
</script>
  
<style scoped></style>