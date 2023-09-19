<template>
  <div>
    <v-row>
      <v-col cols="5">
        <div class="account-activitiy-chart">
          <Line :data="accountData" :options="accountOptions" style="height: 400px" />
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
                  <td align="end">{{ accountInfo.nickname }}</td>
                </tr>
                <tr>
                  <td>이메일:</td>
                  <td align="end">{{ accountInfo.email }}</td>
                </tr>
                <tr>
                  <td>경고 수:</td>
                  <td align="end">{{ accountInfo.warningCounts }}</td>
                </tr>
                <tr>
                  <td>신고 수:</td>
                  <td align="end">{{ accountInfo.reportedCounts }}</td>
                </tr>
              </table>
            </v-col>
            <v-col cols="6" v-if="accountInfo.warningCounts > 0">
              <div align="center">
                <v-card class="account-warning-card" v-for=" ( warning, index ) in accountInfo.warnings">
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
              <td align="end">{{ accountInfo.lastLoginDate }}</td>
            </tr>
            <tr>
              <td>플레이리스트 수:</td>
              <td align="end">{{ accountInfo.playlistCounts }}</td>
            </tr>
            <tr>
              <td>등록한 곡 수:</td>
              <td align="end">{{ accountInfo.songCounts }}</td>
            </tr>
            <tr>
              <td>좋아요 누른 플레이리스트 수:</td>
              <td align="end">{{ accountInfo.likePlaylistCounts }}</td>
            </tr>
          </table>
        </v-card>
      </v-col>
      <v-col cols="2" class="account-manage-btn-column">
        <v-card class="account-manage-btn-card">
          <div align="center" class="account-manage-btn-container">
            <v-btn v-if="accountInfo.accountRoleType === 'BLACKLIST'" class="account-manage-btn" @click="removeFromBlacklist">블랙 해제하기</v-btn>
            <v-btn v-else class="account-manage-btn" @click="moveToBlacklist">유저 블랙하기</v-btn>
            <v-btn class="account-manage-btn">경고 수정 하기</v-btn>
            <v-btn @click="changeBadNickname" class="account-manage-btn">닉네임 지우기</v-btn>
            <v-btn @click="findUserInquiries" class="account-manage-btn">문의 내역 보기</v-btn>
            <v-btn @click="findRegisteredPlaylists" class="account-manage-btn" style="margin: 0;">등록한 플레이리스트</v-btn>
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
    accountInfo: {
      type: Object,
      required: true
    },
  },
  components: {
    Line
  },
  data() {
    return {
      showStateManage: false,

      states: ['move to blacklist', 'move from blacklist'],

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
    }
  },
  computed: {
    accountData() {
      const accountData = {
        labels: [],
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
      }
      accountData.labels = this.accountInfo.accountDateList
      accountData.datasets[0].data = this.accountInfo.playlistCountsList;
      accountData.datasets[1].data = this.accountInfo.songCountsList;
      return accountData
    },
  },
  methods: {
    changeBadNickname() {
      this.$emit("isChangeBadNickname", this.accountInfo.accountId)
    },
    removeFromBlacklist() {
      this.$emit("removeFromBlacklist")
    },
    moveToBlacklist() {
      this.$emit("moveToBlacklist")
    },

    findRegisteredPlaylists() {
      this.$router.push({
        name: "AdminOverallPlaylistPage",
        query: { accountId: this.accountInfo.accountId }
      })
    },

    findUserInquiries() {
      this.$router.push({
        name: "AdminOverallInquiriesPage",
        query: { accountId: this.accountInfo.accountId }
      })
    }
  },
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

.account-activity-card {
  color: white;
  background-color: #485463;
  margin-top: 20px;
  padding: 10px
}

.account-manage-btn-column {
  padding-top: 26.5px; 
  padding-bottom: 30.5px;
}

.account-manage-btn-card {
  color: white;
  background-color: #485463;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 8px;
}

.account-manage-btn-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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