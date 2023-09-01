<template>
    <div>
        <AccountModifyForm :account="account" @submit="submitAccountInfo" />
    </div>
</template>
<script>
import AccountModifyForm from "@/components/account/AccountModifyForm.vue";
import { mapActions, mapState } from "vuex";

const accountModule = "accountModule";

export default {
    props: {
        accountId: {
            type: String,
            required: true,
        },
    },
    components: {
        AccountModifyForm,
    },
    methods: {
        ...mapActions(accountModule, ["requestAccountInfoToSpring", "requestChangeNicknameToSpring",
            "requestChangeProfileImageToSpring"]),
        async submitAccountInfo(payload) {
            await this.requestChangeNicknameToSpring(payload)
            await this.requestChangeProfileImageToSpring(payload)
        }
    },
    computed: {
        ...mapState(accountModule, ["account"]),
    },
    async mounted() {
        await this.requestAccountInfoToSpring();
    },
};
</script>
<style></style>
  