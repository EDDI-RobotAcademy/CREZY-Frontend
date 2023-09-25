<template>
  <div>
    <v-row style="margin: 15px;">
      <v-col cols="8">
        <v-row>
          <v-col cols="4">
            <v-card class="overall-playlist-stat-card">
              <div class="overall-playlist-stat-content">
                <div class="overall-playlist-stat=title">
                  New Today
                </div>
                <div class="overall-playlist-stat-num">
                  {{ accountsStatus.todayAccount }}
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="overall-playlist-stat-card">
              <div class="overall-playlist-stat-content">
                <div class="overall-playlist-stat=title">
                  Percentage
                </div>
                <div class="overall-playlist-stat-num">
                  {{ accountsStatus.increaseRate }}%
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card class="overall-playlist-stat-card">
              <div class="overall-playlist-stat-content">
                <div class="overall-playlist-stat=title">
                  Total
                </div>
                <div class="overall-playlist-stat-num">
                  {{ accountsStatus.totalAccount }}
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-card class="overall-playlist-graph">
          <Line :data="accountsData" :options="accountsOptions" />
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="overall-playlist-calendar-card">
          <DatePicker v-model="searchDate" transparent borderless :is-dark="true" expanded :rows="2" :step="1"
            :color="selectedColor" :max-date="new Date()" :initial-page-position="2" />
        </v-card>
      </v-col>
    </v-row>

    <v-card class="admin-overall-playlist-list-card">

      <div style="justify-content: space-between; display: flex;">
        <div class="admin-overall-playlist-list-title" align="start">
          Accounts
        </div>
        <div style="width: 400px; margin-left: 80px">
          <v-text-field class="admin-playlist-search-field" variant="outlined" append-inner-icon="mdi-magnify" single-line
            hide-details @click:append-inner="searchAccount" v-model="keyword" @keyup.enter="searchAccount"></v-text-field>
        </div>
        <div style="width: 300px; ">
          <v-text-field variant="outlined" append-inner-icon="mdi-menu-down-outline"
            @click:append-inner="chooseAccountCategory = !chooseAccountCategory" readonly
            class="admin-playlist-search-field" v-model="selectedCategory"></v-text-field>
          <v-menu v-model="chooseAccountCategory">
            <template v-slot:activator="{ on }">
              <v-list class="admin-playlist-category-select-field" v-if="chooseAccountCategory">
                <v-list-item class="admin-playlist-category-selection" v-for="accountCategory in accountCategories"
                  @click="selectCategory(accountCategory)">
                  <v-list-item-title style="font-size: 13px">{{ accountCategory }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </template>
          </v-menu>
        </div>
      </div>


      <v-divider></v-divider>

      <div>
        <table class="overall-playlist-table">
          <tr class="accounts-table-picker-container">
            <td colspan="6" align="end">
              <div>
                <v-icon style="color: #0f0606; font-size: 46px;">mdi-circle-small</v-icon> blacklist
                <v-icon style="color: #EA78B3; font-size: 46px">mdi-circle-small</v-icon> 2 warning
                <v-icon style="color: #dee57a; font-size: 46px">mdi-circle-small</v-icon> 1 warning
                <v-icon style="color: #7AE5A8; font-size: 46px">mdi-circle-small</v-icon> clean
              </div>
            </td>
          </tr>
          <tr class="overall-playlist-table-header">
            <th style="width: 100px;"></th>
            <th align="start">index</th>
            <th align="start">nickname</th>
            <th align="end">playlists</th>
            <th align="end">songs</th>
            <th align="end" style="padding-right: 25px;">
              register date
            </th>
          </tr>
          <template v-for="(account, index) in accounts">
            <tr class="overall-playlist-table-row" @click="forManage(account)">
              <td>
                <div class="overall-playlist-song-marker-container">
                  <div v-if="account.accountRoleType === 'BLACKLIST'" class="three-warning-account-marker"></div>
                  <div v-if="account.accountRoleType === 'NORMAL' && account.warningCounts === 2"
                    class="two-warning-account-marker"></div>
                  <div v-if="account.accountRoleType === 'NORMAL' && account.warningCounts === 1"
                    class="one-warning-account-marker"></div>
                  <div v-if="account.accountRoleType === 'NORMAL' && account.warningCounts === 0"
                    class="no-warning-account-marker"></div>
                </div>
              </td>
              <td>{{ index + 1 }}</td>
              <td align="start">{{ account.nickname }}</td>
              <td align="end">{{ account.playlistCounts }}</td>
              <td align="end">{{ account.songCounts }}</td>
              <td align="end" style="padding-right: 25px">{{ account.createDate }}</td>
            </tr>
            <tr v-if="selectedAccountId === account.accountId">
              <td colspan="6">
                <AdminParticularAccountDetailForm :accountInfo="accountInfo" :warnings="warnings"
                  @isChangeBadNickname="changeBadNickname" @removeFromBlacklist="removeFromBlacklist"
                  @moveToBlacklist="moveToBlacklist" @getAccountWarnings="getAccountWarnings"
                  @giveWarning="giveWarning" @removeWarning="removeWarning"/>
              </td>
            </tr>
          </template>
        </table>
      </div>
    </v-card>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import { mapActions } from "vuex";

import AdminParticularAccountDetailForm from "@/components/admin/account/AdminParticularAccountDetailForm.vue"

const adminAccountModule = 'adminAccountModule'

export default {
  extends: Line,
  components: {
    Line,
    DatePicker,
    Calendar,
    AdminParticularAccountDetailForm
  },

  props: {
    accountsStatus: {
      type: Object,
      required: true
    },
    accounts: {
      type: Array,
      required: true
    },
    accountInfo: {
      type: Object,
      required: false,
    },
    warnings: {
      type: Array
    }
  },

  data() {
    return {
      selectedAccountId: '',
      selectedAccountRole: '',
      chooseAccountCategory: false,
      selectedCategory: 'recent',
      accountCategories: ['recent', 'blacklisted', '1 warning', '2 warnings'],

      selectedColor: 'teal',
      searchDate: '',
      formattedDate: '',
      keyword: '',

      accountsOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        }
      },
    }
  },
  methods: {
    ...mapActions(adminAccountModule, ["requestChangeBadNicknameToSpring", "requestAccountInfoForAdminToSpring"]),

    forManage(account) {
      if (this.selectedAccountId == account.accountId.toString()) {
        this.selectedAccountId = ''
      } else {
        this.selectedAccountId = account.accountId;
        this.selectedAccountRole = account.accountRoleType
        this.$emit("openManage", this.selectedAccountId)
      }
    },
    selectCategory(category) {
      this.selectedCategory = category
      const selectedCategory = category
      this.$emit("switchCategory", selectedCategory)
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    getStatus(targetDate) {
      const date = targetDate
      this.$emit("getStatus", { date });
    },
    async changeBadNickname(accountId) {
      if (confirm("닉네임을 바꾸시겠습니까?")) {
        await this.requestChangeBadNicknameToSpring(accountId)
        await this.requestAccountInfoForAdminToSpring(accountId);
        const accountToUpdate = await this.accounts.find(account => account.accountId === accountId);
        if (accountToUpdate) {
          accountToUpdate.nickname = this.accountInfo.nickname;
        }
      }
    },
    removeFromBlacklist() {
      const selectedAccountId = this.selectedAccountId
      this.$emit("removeFromBlacklist", selectedAccountId)
    },
    moveToBlacklist() {
      const selectedAccountId = this.selectedAccountId
      this.$emit("moveToBlacklist", selectedAccountId)
    },

    getAccountWarnings(selectedAccountId) {
      this.$emit("getAccountWarnings", selectedAccountId)
    },

    giveWarning(payload) {
      console.log(payload)
      this.$emit("giveWarning", payload)
    },
    searchAccount() {
      if (this.keyword.trim() != '') {
        const keyword = this.keyword
        this.$emit("searchAccount", keyword)
        this.keyword = ''
        this.selectedCategory = 'search'
      } else {
        alert('공백이 입력되었습니다.')
      }
    },

    removeWarning(payload) {
      this.$emit("removeWarning", payload)
    }
  },

  watch: {
    searchDate(newValue) {
      this.formattedDate = this.formatDate(newValue);
      this.getStatus(this.formattedDate)
    },
  },
  async mounted() {
    if (!localStorage.getItem("roleType") === "ADMIN" || localStorage.getItem("roleType") === null) {
      this.$router.push({ name: "home" });
    } else {
      this.searchDate = new Date()
      const targetDate = this.formatDate(this.searchDate)
      await this.getStatus(targetDate)
      // await this.requestAccountListForAdminToSpring(this.currentPage)
    }
  },
  computed: {
    accountsData() {
      const accountsData = {
        labels: [],
        datasets: [
          {
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)'
          }
        ]
      }
      accountsData.labels = this.accountsStatus.accountDateList;
      accountsData.datasets[0].data = this.accountsStatus.accountCounts;
      return accountsData
    }
  }
}
</script>

<style>
.accounts-table-picker-container {
  height: 20px;
  color: #5F6871;
}

.three-warning-account-marker {
  height: 50px;
  width: 3px;
  background-color: #0f0606;
  border-radius: 5px;
}

.two-warning-account-marker {
  height: 50px;
  width: 3px;
  background-color: #EA78B3;
  border-radius: 5px;
}

.one-warning-account-marker {
  height: 50px;
  width: 3px;
  background-color: #dee57a;
  border-radius: 5px;
}

.no-warning-account-marker {
  height: 50px;
  width: 3px;
  background-color: #7AE5A8;
  border-radius: 5px;
}
</style>