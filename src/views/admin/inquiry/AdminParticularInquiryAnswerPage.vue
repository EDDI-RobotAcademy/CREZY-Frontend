<template>
    <div>
        <AdminParticularInquiryAnswerForm :inquiry="inquiry" @submitInquiryAnswer="onSubmitInquiryAnswer" />
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
            "requestInquiryForAdminToSpring",
            "requestInquiryAnswerToSpring"
        ]),

        async onSubmitInquiryAnswer(inquiryAnswer) {
            const inquiryId = this.selectedInquiryId
            await this.requestInquiryAnswerToSpring({ inquiryAnswer, inquiryId })
            await this.requestInquiryForAdminToSpring(this.selectedInquiryId)
        },
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