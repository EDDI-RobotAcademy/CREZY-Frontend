<template>
    <div>
        <AdminParticularInquiryAnswerForm :inquiry="inquiry" />
    </div>
</template>
<script>
import AdminParticularInquiryAnswerForm from "@/components/admin/inquiry/AdminParticularInquiryAnswerForm.vue"
import { mapActions, mapState } from "vuex";

const adminInquiryModule = "adminInquiryModule"

export default {
    props: {
        selectedInquiryId: {
            type: String,
            required: true
        }
    },
    components: {
        AdminParticularInquiryAnswerForm
    },
    methods: {
        ...mapActions(adminInquiryModule, [
            "requestInquiryForAdminToSpring",]),
    },
    computed: {
        ...mapState(adminInquiryModule, ['inquiry'])
    },
    mounted() {
        this.requestInquiryForAdminToSpring(this.selectedInquiryId)
    },
}
</script>
<style></style>