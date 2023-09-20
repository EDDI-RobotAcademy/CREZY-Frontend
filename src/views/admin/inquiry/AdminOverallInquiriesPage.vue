<template>
  <div>
    <AdminOverallInquiriesForm :inquiryStatus="inquiryStatus" :inquiryList="inquiryList"
      :urgentInquiries="urgentInquiries" :inquiryListCount="inquiryListCount" @requestInquiries="getInquiries"
      @getAccountInquiries="getAccountInquiries" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import AdminOverallInquiriesForm from "@/components/admin/inquiry/AdminOverallInquiriesForm.vue"

const adminInquiryModule = "adminInquiryModule"

export default {
  components: {
    AdminOverallInquiriesForm
  },
  data() {
    return {
      currentPage: 1,
    }
  },
  methods: {
    ...mapActions(adminInquiryModule, [
      "requestInquiryStatusToSpring",
      "requestInquiryListToSpring",
      "requestUrgentInquiriesToSpring",
      "requestAccountInquiriesToSpring"
    ]),

    async getInquiries(payload) {
      const { statusType, categoryType, page } = payload
      await this.requestInquiryListToSpring({ statusType, categoryType, page })
    },

    async getAccountInquiries(payload) {
      const { accountId, page } = payload
      await this.requestAccountInquiriesToSpring({ accountId, page })
    }
  },
  computed: {
    ...mapState(adminInquiryModule, [
      "inquiryStatus",
      "inquiryList",
      "urgentInquiries",
      "inquiryListCount"
    ])
  },
  async mounted() {
    if (!localStorage.getItem("roleType") === "ADMIN" || localStorage.getItem("roleType") === null) {
      this.$router.push({ name: "home" });
    } else {
      await this.requestInquiryStatusToSpring()
      await this.requestUrgentInquiriesToSpring()
    }
  }
}
</script>

<style></style>