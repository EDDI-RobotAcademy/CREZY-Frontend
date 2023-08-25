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
      const requestOauthGoogleToSpring = (code)=> store.dispatch("accountModule/requestOauthGoogleToSpring", code)
      async function setRedirectData() {
        const route = useRoute()
        const code = route.query.code
        await requestOauthGoogleToSpring(code)
      }
      onMounted(()=> {
        setRedirectData()
        }
      )
      return {
        requestOauthGoogleToSpring
      }
    }
  }
  </script>
  
  <style scoped>
  </style>