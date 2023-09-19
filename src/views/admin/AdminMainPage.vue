<template>
  <div class="admin-login" align="center" v-if="!adminLogin">
    <AdminLoginForm 
      @login="loginAdmin"
      :wrongAccountCount="wrongAccountCount"
    />
  </div>
  <div v-else>
    <AdminDashboardForm/>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import AdminDashboardForm from "@/components/admin/AdminDashboardForm.vue"
import AdminLoginForm from "@/components/admin/AdminLoginForm.vue"

const accountModule = 'accountModule'

export default {
  data(){
    return {
      adminLogin: false,
      wrongAccountCount: 1,
    }
  },
  components: {
    AdminLoginForm,
    AdminDashboardForm
  },
  mounted() {
    if (localStorage.getItem("roleType") === null && localStorage.getItem("userToken") !== null) {
      if (confirm("현재 계정은 관리자 권한이 없습니다. \n계정에서 로그아웃 하시겠습니까?")) {
        localStorage.removeItem("userToken")
      } else {
      this.$router.push({ name: "home" })
      }
    }
    if (localStorage.getItem("roleType") === "ADMIN") {
      this.adminLogin = true
    }
  },
  methods: {
    ...mapActions(accountModule, ['requestAdminLoginToSpring']),

    async loginAdmin(payload) {
      if (await this.requestAdminLoginToSpring(payload)) {
        alert("어서 오세요 " + localStorage.getItem("nickname") + "님")
        this.adminLogin = true
      }
      this.wrongAccountCount = this.wrongAccountCount + 1
    }
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