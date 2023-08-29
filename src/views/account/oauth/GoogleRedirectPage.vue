<template>
    <div></div>
  </template>
  
  <script>
  import {useRoute} from "vue-router";
  import {onMounted} from "vue";
  import {useStore} from "vuex";
  export default {
    setup() {
      const store = useStore()
      const requestUserInfoGoogleToSpring = (code)=> store.dispatch("accountModule/requestUserInfoGoogleToSpring", code)
      async function setRedirectData() {
        const route = useRoute()
        const code = route.query.code
        await requestUserInfoGoogleToSpring(code)
      }
      onMounted(()=> {
        setRedirectData()
        }
      )
      return {
        requestUserInfoGoogleToSpring
      }
    }
  }
  </script>
  
  <style scoped>
  </style>