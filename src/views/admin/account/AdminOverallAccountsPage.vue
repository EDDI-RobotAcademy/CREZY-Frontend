<template>
  <div>
     <AdminOverallAccountsForm @getStatus="getAccountsStatus" :accountsStatus="accountsStatus" :accounts="accountList"/>   
     <v-pagination 
      style="color: white" 
      v-model="currentPage" 
      :length="accountListCount" 
      @click="getPaginatedAccounts">
    </v-pagination>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import AdminOverallAccountsForm from "@/components/admin/account/AdminOverallAccountsForm.vue"

const adminAccountModule = 'adminAccountModule'

export default {
  data() {
    return {
      currentPage: 1,
    }
  },
  components: {
    AdminOverallAccountsForm
  },
  methods: {
    ...mapActions(adminAccountModule, ['requestAccountsStatusToSpring', 'requestAccountListForAdminToSpring', 'requestAccountListTotalToSpring']),

    async getAccountsStatus(targetDate) {
      const date = targetDate
      await this.requestAccountsStatusToSpring(date)
    },
    async getPaginatedAccounts() {
      const currentPage = this.currentPage
      await this.requestAccountListForAdminToSpring(currentPage)
    }
  },
  computed: {
    ...mapState(adminAccountModule, ['accountsStatus', 'accountList', 'accountListCount']),

  },
  async mounted() {
    await this.requestAccountListForAdminToSpring(this.currentPage)
    await this.requestAccountListTotalToSpring()
  }
}
</script>

<style>
    
</style>