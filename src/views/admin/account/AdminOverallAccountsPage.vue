<template>
  <div>
    <AdminOverallAccountsForm 
      :accountsStatus="accountsStatus"
      :accounts="accountList" 
      :accountInfo="accountInfo" 
      :warnings="warnings"
      @getStatus="getAccountsStatus" 
      @switchCategory="getCategorizedAccountList"
      @openManage="getAccountInfo" 
      @removeFromBlacklist="removeFromBlacklist" 
      @moveToBlacklist="moveToBlacklist"
      @getAccountWarnings="getAccountWarnings" 
      @giveWarning="giveWarning"  
      @searchAccount="searchAccount"
      @removeWarning="removeWarning" />
    <v-pagination style="color: white" v-model="currentPage" :length="accountListCount" @click="getPaginatedAccounts">
    </v-pagination>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import AdminOverallAccountsForm from "@/components/admin/account/AdminOverallAccountsForm.vue"

const adminAccountModule = 'adminAccountModule'
const adminWarningModule = 'adminWarningModule'

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
      'requestAccountInfoForAdminToSpring',
      'requestBlacklistAccountToSpring',
      'requestRemoveBlacklistAccountToSpring',
      'requestWarningToAccountToSpring',
      'requestSearchAccountListForAdminToSpring',
      'requestRemoveWarningToSpring'
    ]),

    ...mapActions(adminWarningModule, [
      'requestAccountWarningsForAdminToSpring',
    ]),

    async getAccountsStatus(targetDate) {
      const date = targetDate
      await this.requestAccountsStatusToSpring(date)
    },
    async getPaginatedAccounts() {
      if (this.warningCounts > 0) {
        const warningCounts = this.warningCounts
        const page = this.currentPage
        await this.requestCategoryAccountListToSpring({ warningCounts, page })
      }
      else {
        const page = this.currentPage
        await this.requestAccountListForAdminToSpring(page)
      }
    },
    async getCategorizedAccountList(selectedCategory) {
      this.currentPage = 1
      if (selectedCategory === "recent") {
        this.warningCounts = 0
        await this.requestAccountListForAdminToSpring(this.currentPage)
      }
      if (selectedCategory === "blacklisted") {
        this.warningCounts = 3
        const warningCounts = this.warningCounts
        const page = this.currentPage
        await this.requestCategoryAccountListToSpring({ warningCounts, page })
      }
      if (selectedCategory === "1 warning") {
        this.warningCounts = 2
        const warningCounts = this.warningCounts
        const page = this.currentPage
        await this.requestCategoryAccountListToSpring({ warningCounts, page })
      }
      if (selectedCategory === "2 warnings") {
        this.warningCounts = 1
        const warningCounts = this.warningCounts
        const page = this.currentPage
        await this.requestCategoryAccountListToSpring({ warningCounts, page })
      }
    },
    async getAccountInfo(selectedAccountId) {
      const accountId = selectedAccountId
      await this.requestAccountInfoForAdminToSpring(accountId)
    },
    async moveToBlacklist(selectedAccountId) {
      const accountId = selectedAccountId
      await this.requestBlacklistAccountToSpring(accountId)
      await this.getPaginatedAccounts()
      await this.requestAccountInfoForAdminToSpring(accountId)
    },
    async removeFromBlacklist(selectedAccountId) {
      const accountId = selectedAccountId
      await this.requestRemoveBlacklistAccountToSpring(accountId)
      await this.getPaginatedAccounts()
      await this.requestAccountInfoForAdminToSpring(accountId)
    },

    async getAccountWarnings(selectedAccountId) {
      const accountId = selectedAccountId
      await this.requestAccountWarningsForAdminToSpring(accountId)
    },

    async giveWarning(payload) {
      const accountId = payload.reportedId
      await this.requestWarningToAccountToSpring(payload)
      await this.requestAccountInfoForAdminToSpring(accountId)
    },
    async searchAccount(payload) {
      const keyword = payload
      const page = this.currentPage
      await this.requestSearchAccountListForAdminToSpring({ page, keyword })
    },

    async removeWarning(payload) {
      const warningId = payload.warningId
      const accountId = payload.accountId
      await this.requestRemoveWarningToSpring(warningId)
      await this.requestAccountInfoForAdminToSpring(accountId)
      await this.requestAccountWarningsForAdminToSpring(accountId)
    }
  },
  computed: {
    ...mapState(adminAccountModule, [
      'accountsStatus',
      'accountList',
      'accountListCount',
      'accountInfo',
    ]),

    ...mapState(adminWarningModule, [
      'warnings'
    ])

  },
  async mounted() {
    if (!localStorage.getItem("roleType") === "ADMIN" || localStorage.getItem("roleType") === null) {
      this.$router.push({ name: "home" });
    } else {
      await this.requestAccountListForAdminToSpring(this.currentPage)
    }
  }
}
</script>

<style></style>