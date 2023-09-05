<template>
    <div>
        <AccountModifyForm :account="account" @submitAccountInfo="submitAccountInfo" @withdrawAccount="withdrawAccount" />
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
            "requestChangeProfileImageToSpring", "requestWithdrawAccountToSpring"]),
        async submitAccountInfo(payload) {
            await this.requestChangeNicknameToSpring(payload)
            await this.requestChangeProfileImageToSpring(payload)
        },
        async withdrawAccount() {
            if (confirm('정말로 탈퇴하시겠습니까?')) {
                await this.$router.push({ name: "home", })

                await this.requestWithdrawAccountToSpring();
            }
        }
    },
    computed: {
        ...mapState(accountModule, ["account", 'isLoggedIn']),
    },
    async mounted() {
        await this.requestAccountInfoToSpring();
    },
};
</script>
<style></style>
  