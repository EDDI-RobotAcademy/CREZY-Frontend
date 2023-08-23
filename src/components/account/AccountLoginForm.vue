<template lang="">
    <v-container>
        <v-card class="login-card" flat>
            <div class="login-title">로그인</div>
            <v-img
                  class="mx-auto"
                  height="300"
                  :src="require('@/assets/images/blackpeoplewithheadphone.png')"
                >
            </v-img>
        </v-card>
    </v-container>
</template>
<script>
export default {
    
}
</script>

<style>

.login-card {
  margin-top: 6rem;
  padding: 18px;
  width: 900px;
  background-color: rgba(0, 0, 0, 0.4) !important;
}

.login-title {
  font-size: 22px;
  color: #ffffff;
}
    
</style>