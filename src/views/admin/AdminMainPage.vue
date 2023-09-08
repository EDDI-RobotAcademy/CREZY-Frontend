<template>
  <div class="admin-login" align="center" v-if="!adminLogin">
    <AdminLoginForm/>
  </div>
  <div v-else>
    <AdminDashboardForm/>
  </div>
</template>

<script>
import AdminDashboardForm from "@/components/admin/AdminDashboardForm.vue"
import AdminLoginForm from "@/components/admin/AdminLoginForm.vue"

export default {
  data(){
    return {
      adminLogin: true
    }
  },
  components: {
    AdminLoginForm,
    AdminDashboardForm
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