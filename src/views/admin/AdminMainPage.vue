<template>
  <div class="admin-login" align="center" v-if="!adminLogin">
    <AdminLoginForm/>
  </div>
  <div v-else>
    <AdminMainForm/>
  </div>
</template>

<script>
import AdminMainForm from "@/components/admin/AdminMainForm.vue"
import AdminLoginForm from "@/components/admin/AdminLoginForm.vue"

export default {
  data(){
    return {
      adminLogin: false
    }
  },
  components: {
    AdminLoginForm,
    AdminMainForm
  } 
}
</script>

<style>
.admin-login {
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
}  
</style>