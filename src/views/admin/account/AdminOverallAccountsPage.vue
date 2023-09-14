<template>
  <div>
     <AdminOverallAccountsForm 
       @getStatus="getAccountsStatus" 
       @switchCategory="getCategorizedAccountList"
       @openManage="getAccountInfo"
       :accountsStatus="accountsStatus" 
       :accounts="accountList"
       :accountInfo="accountInfo"
       />   
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
    ...mapActions(adminAccountModule, [
      'requestAccountsStatusToSpring', 
      'requestAccountListForAdminToSpring', 
      'requestAccountListTotalToSpring',
      'requestBlacklistAccountToSpring',
      'requestBlacklistAccountListTotalToSpring',
      'requestAccountInfoForAdminToSpring'
    ]),

    async getAccountsStatus(targetDate) {
      const date = targetDate
      await this.requestAccountsStatusToSpring(date)
    },
    async getPaginatedAccounts() {
      const currentPage = this.currentPage
      await this.requestAccountListForAdminToSpring(currentPage)
    },
    async getCategorizedAccountList(selectedCategory) {
      console.log("from page: " + selectedCategory)
      this.currentPage = 1
      if (selectedCategory === "recent") {
        await this.requestAccountListForAdminToSpring(this.currentPage)
        await this.requestAccountListTotalToSpring()
      }
      if ( selectedCategory === "blacklisted") {
        await this.requestBlacklistAccountToSpring(this.currentPage)
        await this.requestBlacklistAccountListTotalToSpring()
      }
    },
    async getAccountInfo(selectedAccountId) {
      const accountId = selectedAccountId
      await this.requestAccountInfoForAdminToSpring(accountId)
    }
  },
  computed: {
    ...mapState(adminAccountModule, [
      'accountsStatus', 
      'accountList', 
      'accountListCount',
      'accountInfo'
    ]),

  },
  async mounted() {
    await this.requestAccountListForAdminToSpring(this.currentPage)
    await this.requestAccountListTotalToSpring()
  }
}
</script>

<style>
    
</style>