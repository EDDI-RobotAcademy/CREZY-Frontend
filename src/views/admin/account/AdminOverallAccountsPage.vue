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
      warningCounts: 0,
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
      'requestCategoryAccountListToSpring',
      'requestAccountInfoForAdminToSpring'
    ]),

    async getAccountsStatus(targetDate) {
      const date = targetDate
      await this.requestAccountsStatusToSpring(date)
    },
    async getPaginatedAccounts() {
      if (this.warningCounts > 0) {
        const warningCounts = this.warningCounts
        const page = this.currentPage
        await this.requestCategoryAccountListToSpring({warningCounts, page})
      }
      else {
        const currentPage = this.currentPage
        await this.requestAccountListForAdminToSpring(currentPage)
      }
    },
    async getCategorizedAccountList(selectedCategory) {
      this.currentPage = 1
      if (selectedCategory === "recent") {
        this.warningCounts = 0
        await this.requestAccountListForAdminToSpring(this.currentPage)
        await this.requestAccountListTotalToSpring()
      }
      if (selectedCategory === "blacklisted") {
        this.warningCounts = 3
        const warningCounts = this.warningCounts
        const page = this.currentPage
        await this.requestCategoryAccountListToSpring({warningCounts, page})
      }
      if (selectedCategory === "1 warning") {
        this.warningCounts = 2
        const warningCounts = this.warningCounts
        const page = this.currentPage
        await this.requestCategoryAccountListToSpring({warningCounts, page})
      }
      if (selectedCategory === "2 warnings") {
        this.warningCounts = 1
        const warningCounts = this.warningCounts
        const page = this.currentPage
        await this.requestCategoryAccountListToSpring({warningCounts, page})
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