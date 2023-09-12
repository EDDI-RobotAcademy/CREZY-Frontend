<template>
  <div class="admin-login-form">
    <v-card class="admin-login-card">
      <div class="admin-login-title">
        <v-img            
          src="@/assets/images/Logo_small-removebg-preview.png"
          height="120"
          width="120"
          contain></v-img>
      </div>
      <v-text-field
        variant="outlined"
        prepend-inner-icon="mdi-account"
        v-model="email"
        label="Email"
        class="login-text-field"
        required>
      </v-text-field>
      <v-text-field
        variant="outlined"
        prepend-inner-icon="mdi-lock"
        v-model="password"
        label="Password"
        type="password"
        class="login-text-field"
        required>
      </v-text-field>
      <v-btn
        @click="adminLogin"
        class="login-btn">
        login
      </v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    adminLogin() {
      const { email, password } = this
      this.$emit("login", { email, password });
    }
  }
}
</script>

<style>
.admin-login-form {
  transform: translateY(50%);
}
.admin-login-card{
  background-color: rgb(0, 0, 0, 0.2);
  width: 460px;
  padding: 50px;
  text-align: center;
}

.admin-login-title{
  margin-bottom: 30px; 
  display: flex;
  align-items: center;
}

.login-text-field{
  color: #5BB5EF;
}

.login-btn{
  background-color: rgb(62, 230, 175, 0.85);
  height: 50px !important;
  width: 90%;
  margin-top: 20px;
}
</style>