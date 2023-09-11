<template>
  <div>
    <v-row style="margin: 15px;">
      <v-col cols="8">
        <v-row>
          <v-col cols="4" >
            <v-card class="overall-playlist-stat-card">
              <div class="overall-playlist-stat-content">
                <div class="overall-playlist-stat=title">
                  New Today
                </div>
                <div class="overall-playlist-stat-num">
                  {{ newToday }}
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="4" >
            <v-card class="overall-playlist-stat-card">
              <div class="overall-playlist-stat-content">
                <div class="overall-playlist-stat=title">
                  Percentage
                </div>
                <div class="overall-playlist-stat-num">
                  {{ percentage }}
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="4" >
            <v-card class="overall-playlist-stat-card">
              <div class="overall-playlist-stat-content">
                <div class="overall-playlist-stat=title">
                  Total
                </div>
                <div class="overall-playlist-stat-num">
                  {{ totalNum }}
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-card class="overall-playlist-graph">
          <Line :data="accountsData" :options="accountsOptions"/>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="overall-playlist-calendar-card">
          <v-date-picker
            class="overall-playlist-calendar"
            show-adjacent-months
            color="rgb(75, 192, 192)"
            elevation="4"
          ></v-date-picker>
        </v-card>
      </v-col>
    </v-row>     
    
    <v-card class="admin-overall-playlist-list-card">

      <div style="justify-content: space-between; display: flex;">
        <div class="admin-overall-playlist-list-title" align="start">
          Accounts
        </div>
        <div style="width: 400px; margin-left: 80px">
          <v-text-field 
            class="admin-playlist-search-field"
            variant="outlined"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            @click:append-inner="onClick"
          ></v-text-field>
        </div>
        <div style="width: 300px; ">
          <v-text-field
            variant="outlined"
            append-inner-icon="mdi-menu-down-outline"
            @click:append-inner="chooseAccountCategory = !chooseAccountCategory"
            readonly
            class="admin-playlist-search-field"
            v-model="selectedCategory"
          ></v-text-field>
          <v-menu v-model="chooseAccountCategory">
            <template v-slot:activator="{ on }">
              <v-list class="admin-playlist-category-select-field" v-if="chooseAccountCategory">
                <v-list-item class="admin-playlist-category-selection" v-for="accountCategory in accountCategories" @click="selectCategory(accountCategory)">
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
            <tr class="overall-playlist-table-row" @click="forManage(account.accountId)">
              <td>
                <div class="overall-playlist-song-marker-container">
                  <div v-if="account.warningCount === 3" class="three-warning-account-marker"></div>
                  <div v-if="account.warningCount === 2" class="two-warning-account-marker"></div>
                  <div v-if="account.warningCount === 1" class="one-warning-account-marker"></div>
                  <div v-if="account.warningCount === 0" class="no-warning-account-marker"></div>
                </div>
              </td>
              <td>{{ index + 1 }}</td>
              <td align="start">{{ account.nickname }}</td>
              <td align="end">{{ account.playlistCount }}</td>
              <td align="end">{{ account.songCount }}</td>
              <td align="end" style="padding-right: 25px">{{ account.createDate }}</td>
            </tr>
            <tr v-if="selectedAccountId === account.accountId">
              <td colspan="6">
                <AdminParticularAccountDetailForm :accountId="selectedAccountId"/>
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

import { VDatePicker } from 'vuetify/labs/VDatePicker'
import AdminParticularAccountDetailForm from "@/components/admin/account/AdminParticularAccountDetailForm.vue"

export default {
  components: {
    Line,
    VDatePicker,
    AdminParticularAccountDetailForm
  },
  data() {
    return{ 
      newToday: 12,
      percentage: "71%",
      totalNum: 64,

      selectedAccountId: '',
      chooseAccountCategory: false,
      selectedCategory: 'recent',
      accountCategories: [ 'recent', 'blacklisted', '1 warning', '2 warnings'],

      accountsData: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
        datasets: [
          {
            data: [18, 12, 3, 5, 7, 7, 12],
            fill: false,
            borderColor: 'rgb(75, 192, 192)'
          }
        ]
      },
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

      accounts: [
        { accountId: 1, nickname: "이름 1", playlistCount: 3, songCount: 31, createDate: "23-09-01", warningCount: 0 },
        { accountId: 3, nickname: "이름 3", playlistCount: 7, songCount: 74, createDate: "23-09-01", warningCount: 0 },
        { accountId: 4, nickname: "이름 4", playlistCount: 2, songCount: 8, createDate: "23-09-04", warningCount: 1 },
        { accountId: 6, nickname: "이름 6", playlistCount: 0, songCount: 0, createDate: "23-09-07", warningCount: 3 },
        { accountId: 7, nickname: "이름 7", playlistCount: 1, songCount: 11, createDate: "23-09-07", warningCount: 2 },
      ]
    }
  },
  methods: {
    forManage(accountId) {
      if (this.selectedAccountId == accountId.toString()) {
        this.selectedAccountId = ''
      } else {
      this.selectedAccountId = accountId;
      }
    },
    selectCategory(selectedCategory) {
      this.selectedCategory = selectedCategory
    },
  }
}
</script>

<style>
.accounts-table-picker-container{
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