<template>
  <div>
    <v-row>
      <v-col cols="5">
        <div class="account-activitiy-chart">
          <Line :data="accountData" :options="accountOptions" style="height: 400px"/>
        </div>
      </v-col>
      <v-col cols="5">
        <v-card class="account-info-card">
          <div align="center">정보</div>
          <v-row>
            <v-col>
              <table style="width: 100%">
                <tr>
                  <td>닉네임:</td>
                  <td align="end">{{ selectedAccount.nickname }}</td>
                </tr>
                <tr>
                  <td>이메일:</td>
                  <td align="end">{{ selectedAccount.email }}</td>
                </tr>
                <tr >
                  <td>경고 수:</td>
                  <td align="end">{{ selectedAccount.warnings.length }}</td>
                </tr>
                <tr>
                  <td>신고 수:</td>
                  <td align="end">{{ selectedAccount.reportCount }}</td>
                </tr>
              </table>
            </v-col>
            <v-col cols="6" v-if="selectedAccount.warnings.length > 0">
              <div align="center">
                <v-card class="account-warning-card" v-for=" ( warning, index ) in selectedAccount.warnings">
                  {{ index + 1 }}번 경고 <br>
                  {{ warning.warnedDate }}
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="account-activity-card">
          <div align="center">활동</div>
          <table style="width: 100%">
            <tr>
              <td>마지막 활동 일자:</td>
              <td align="end">{{ selectedAccount.lastActiveDate }}</td>
            </tr>
            <tr>
              <td>플레이리스트 수:</td>
              <td align="end">{{ selectedAccount.playlistCount }}</td>
            </tr>
            <tr >
              <td>등록한 곡 수:</td>
              <td align="end">{{ selectedAccount.songCount }}</td>
            </tr>
            <tr>
              <td>좋아요 누른 플레이리스트 수:</td>
              <td align="end">{{ selectedAccount.likedPlaylistCount }}</td>
            </tr>
          </table>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-card class="account-manage-btn-container">
          <div align="center">
            <v-btn class="account-manage-btn">신고내역 보기</v-btn>
            <v-btn class="account-manage-btn" @click="showStateManage = !showStateManage">상태 관리 하기</v-btn>
              <v-menu v-model="showStateManage">
                <template v-slot:activator="{ on }">
                  <v-list class="account-states-field" v-if="showStateManage">
                    <v-list-item class="admin-playlist-category-selection" v-for="state in states">
                      <v-list-item-title style="font-size: 13px">{{ state }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </template>
              </v-menu>
            <v-btn class="account-manage-btn">경고 수정 하기</v-btn>
            <v-btn class="account-manage-btn">닉네임 지우기</v-btn>
            <v-btn class="account-manage-btn">문의 내역 보기</v-btn>
            <v-btn class="account-manage-btn" style="margin: 0;">등록한 플레이리스트</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
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
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default {
  props: {
    accountId: {
      type: Number,
      required: true
    }
  },
  components: {
    Line
  },
  data() {
    return {
      selectedAccount: {},

      showStateManage: false,

      states: [ 'move to blacklist', 'move from blacklist' ],
      accountData: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
        datasets: [
          {
            label: 'Playlists',
            data: [],
            fill: true,
            borderColor: 'rgb(220, 39, 154, 0.7)',
            backgroundColor: 'rgba(220, 39, 154, 0.2)'
          },
          {
            label: 'Songs',
            data: [],
            fill: true,
            borderColor: 'rgb(254, 109, 46, 0.7)',
            backgroundColor: 'rgba(254, 109, 46, 0.2)'
          }
        ]
      },
      accountOptions: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        },
        scales: {
          y: {
            stacked: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        }
      },
      accounts: [
        { accountId: 1, registeredPlaylists: [ 0, 0, 0, 1, 2, 0, 0], registeredSongs: [ 0, 0, 0, 8, 16, 4, 3], lastActiveDate: "23-09-11", warnings:[], nickname: "이름 1" },
        { accountId: 3, registeredPlaylists: [ 0, 1, 3, 1, 0, 0, 1], registeredSongs: [ 0, 12, 31, 8, 9, 0, 14], lastActiveDate: "23-09-11", warnings:[], nickname: "이름 3" },
        { accountId: 4, registeredPlaylists: [ 0, 0, 1, 0, 0, 0, 1], registeredSongs: [ 0, 0, 5, 0, 0, 0, 3], lastActiveDate: "23-09-11", warnings: [ {warnedDate: '23-09-04'} ], nickname: "이름 4" },
        { accountId: 6, registeredPlaylists: [ 0, 0, 0, 0, 0, 0, 0], registeredSongs: [ 0, 0, 0, 0, 0, 0, 0], lastActiveDate: "23-09-04", warnings:[ {warnedDate: '23-09-02'}, {warnedDate: '23-09-03'}, {warnedDate: '23-09-07'}], nickname: "이름 6" },
        { accountId: 7, registeredPlaylists: [ 0, 0, 0, 1, 0, 0, 0], registeredSongs: [ 0, 0, 0, 4, 2, 2, 3], lastActiveDate: "23-09-11", warnings:[ {warnedDate: '23-09-02'}, {warnedDate: '23-09-08'}], nickname: "이름 6" },
      ]
    }
  },
  watch: {
    accountId: {
      handler(newValue) {
        // axios 연결 후 selectedAccount를 res.data로 설정
        this.selectedAccount = this.accounts.find(account => account.accountId === newValue);
        if (this.selectedAccount) {
          // 선택한 accountId에 해당하는 데이터를 데이터셋에 설정.
          this.accountData.datasets[0].data = this.selectedAccount.registeredPlaylists;
          this.accountData.datasets[1].data = this.selectedAccount.registeredSongs;
        }
      },
      immediate: true
    }
  }
}
</script>

<style>
.account-activity-chart {
  height: 400px; 
  width: 100%;
}

.account-info-card {
  color: white; 
  background-color: #485463; 
  height: 50%; 
  margin-top: 15px; 
  padding: 10px
}

.account-warning-card {
  background-color: black; 
  color: white; 
  text-align: center; 
  width: 75%; 
  margin: 4px;
}

.account-activity-card{
  color: white; 
  background-color: #485463; 
  margin-top: 20px;
  padding: 10px
}

.account-manage-btn-container {
  color: white; 
  background-color: #485463; 
  display: flex; 
  flex-direction: column; 
  height: 100%; 
  justify-content: center; 
  padding: 8px
}

.account-manage-btn {
  background-color: #5b6775c5;
  width: 95%; 
  margin-bottom: 25px;
}

.account-states-field {
  background-color: #212630 !important; 
  position: absolute; 
  z-index: 999;
  width: 95%;
  text-align: center;
  top: 128px;
}
</style>