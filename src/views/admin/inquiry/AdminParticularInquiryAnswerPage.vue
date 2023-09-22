<template>
    <div>
        <AdminParticularInquiryAnswerForm :inquiry="inquiry" @submitInquiryAnswer="onSubmitInquiryAnswer"
            @modifyInquiryAnswer="onModifyInquiryAnswer" @deleteInquiryAnswer="onDeleteInquiryAnswer" />
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
            "requestInquiryAnswerToSpring",
            "requestModifyInquiryAnswerToSpring",
            "requestDeleteInquiryAnswerToSpring",
        ]),
        async onSubmitInquiryAnswer(inquiryAnswer) {
            const inquiryId = this.selectedInquiryId
            await this.requestInquiryAnswerToSpring({ inquiryAnswer, inquiryId })
            await this.requestInquiryForAdminToSpring(this.selectedInquiryId)
        },
        async onModifyInquiryAnswer(newInquiryAnswer) {
            const inquiryAnswerId = this.inquiry.inquiryAnswer.inquiryAnswerId
            await this.requestModifyInquiryAnswerToSpring({ answer: newInquiryAnswer, inquiryAnswerId })
            await this.requestInquiryForAdminToSpring(this.selectedInquiryId)
        },
        async onDeleteInquiryAnswer() {
            if (confirm("정말로 삭제하시겠습니까?")) {
                const inquiryAnswerId = this.inquiry.inquiryAnswer.inquiryAnswerId;
                await this.requestDeleteInquiryAnswerToSpring(inquiryAnswerId)
                await this.requestInquiryForAdminToSpring(this.selectedInquiryId)
            }
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