<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-card style=" background-color: #292E37; padding: 15px; height: 602px">
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px; margin: 18px;">
            <div style="color: white; font-size: 24px; display: flex; align-items: center;">
              <div class="dashboard-icon"></div> Weekly Behavior
            </div>
            <div style="color: white">
              <v-menu offset-y v-model="chooseWeek">
                <template v-slot:activator="{ on }">
                  <v-btn style="background-color: transparent; text-transform: none;"
                    v-on="on" @click="chooseWeek = !chooseWeek">
                    {{ selectedBehaviorWeek }}
                    <v-icon>mdi-menu-down-outline</v-icon>
                  </v-btn>
                  <v-list style="background-color: #212630 !important; position: absolute; width: 130px" v-if="chooseWeek">
                    <v-list-item style="color: white; border-bottom: 1px dotted white;" v-for="week in weeks" @click="selectBehaviorWeek(week)">
                      <v-list-item-title style="font-size: 13px">{{ week.name }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </template>
              </v-menu>
            </div>
          </div>
          <div style="color: white; background-color: #212630; border-radius: 10px; width: 95%; height: 50px; margin: auto; display: flex; justify-content: space-between; padding: 12px; margin-bottom: 25px; margin-top: 25px;">
            <div>
              <v-menu offset-y v-model="chooseDay">
                <template v-slot:activator="{ on }">
                  <v-btn style="background-color: transparent; text-transform: none;"
                    v-on="on" @click="chooseDay = !chooseDay" flat>
                    {{ selectedDay }}
                    <v-icon>mdi-menu-down-outline</v-icon>
                  </v-btn>
                  <v-list style="background-color: #212630 !important; position: absolute; width: 80px" v-if="chooseDay">
                    <v-list-item style="color: white; border-bottom: 1px dotted white;" v-for="(day, index) in daysOfWeek" @click="selectDay(index)">
                      <v-list-item-title style="font-size: 13px">{{ day }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </template>
              </v-menu>
            </div>
            <div>
              {{ newCount }} new
            </div>
          </div>
          <div style="display: flex; align-items: center;">
            <v-col cols="6">
              <div style="height: 300px; width: 300px; padding: 25px">
                <Doughnut
                  id="day-chart"
                  :options="doughnutOptions"
                  :data="doughnutData"
                />
              </div>
            </v-col>
            <v-col cols="6">
              <div style="padding-top: 30px">
              <Bar
                id="week-chart"
                :options="barOptions"
                :data="barData"
                style="height: 300px;"
              />
            </div>
            </v-col>
          </div>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card style="background-color: #292E37; padding: 15px">
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px; margin: 18px;">
            <div style="color: white; font-size: 24px; display: flex; align-items: center;">
              <div class="dashboard-icon"></div> Weekly Traffic
            </div>
            <div style="color: white">
              <v-menu offset-y v-model="chooseTrafficWeek">
                <template v-slot:activator="{ on }">
                  <v-btn style="background-color: transparent; text-transform: none;"
                    v-on="on" @click="chooseTrafficWeek = !chooseTrafficWeek">
                    {{ selectedTrafficWeek }}
                    <v-icon>mdi-menu-down-outline</v-icon>
                  </v-btn>
                  <v-list style="background-color: #212630 !important; position: absolute; width: 130px" v-if="chooseTrafficWeek">
                    <v-list-item style="color: white; border-bottom: 1px dotted white;" v-for="week in weeks" @click="selectTrafficWeek(week)">
                      <v-list-item-title style="font-size: 13px">{{ week.name }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </template>
              </v-menu>
            </div>
          </div>
          <div style="height: 500px">
            <Line :data="trafficData" :options="trafficOptions" />
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" v-for="(statCard, index) in statCards">
        <v-card style="background-color: #292E37; padding: 15px; height: 250px">
          <div style="color: white; display: flex; flex-direction: column; ">
            <div style="font-size: 24px; margin-bottom: 22px; display: flex; align-items: center;">
              <div class="dashboard-icon"></div>
              <div>{{ statCard.name }}</div>
            </div>
            <div></div>
            <div style="font-size: 48px; display: flex; align-items: center; margin-top: 20px; width: 100%; justify-content: center;">
              <div>{{ getTodayCount(statCard) }}</div>
              <div :style="{fontSize: '32px', marginLeft: '8px', color: calculateMinus(statCard)}">({{ getTodayPercentage(statCard) }}%)</div>
            </div>
          </div>
        </v-card>
      </v-col>


    </v-row>
  </div>
</template>

<script>
import { Bar, Doughnut, Line } from 'vue-chartjs'
import { 
  Chart as ChartJS, 
  Title, 
  Tooltip, 
  Legend, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js'

ChartJS.register(
  Title, 
  Tooltip, 
  Legend, 
  ArcElement, 
  BarElement, 
  CategoryScale, 
  LinearScale,
  PointElement,
  LineElement,
  )

export default {
  components: { Bar, Doughnut, Line },

  props: {
    dailyStat: {
      type: Object,
      required: true
    },
    weeklyBehavior: {
      type: Array,
      required: true,
    },
    weeklyTraffic: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      barOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },

      doughnutOptions: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '70%',
        plugins: {
          legend: {
            align: 'center',
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
        }
      },

      trafficOptions: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        },
        scales: {
          y: {
            beginAtZero: true,
            stacked: 'single'
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
        }
      },

      chooseWeek: false,
      chooseTrafficWeek: false,
      chooseDay: false,

      selectedBehaviorWeek: 'This Week',
      selectedTrafficWeek: 'This Week',
      selectedDay: '',
      dayIndex: 0,
      newCount: 0,

      daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

      weeks: [
        { name: "This Week", value: 0 },
        { name: "Last Week", value: 1 },
        { name: "Two Weeks Ago", value: 2 },
      ],

      statCards: [
        { name: "Reports" },
        { name: "Inquiries" },
        { name: "Logins" },
        { name: "Analysis" },
      ]
    }
  },

  methods: {
    selectBehaviorWeek(week) {
      this.getWeekBehavior(week.value)
      this.selectedBehaviorWeek = week.name
    },

    selectTrafficWeek(week) {
      this.getWeekTraffic(week.value)
      this.selectedTrafficWeek = week.name
    },

    selectDay(index) {
      this.selectedDay = this.daysOfWeek[index]
      this.dayIndex = index
      this.newCount = this.barData.datasets[0].data[index]
    },

    calculateDay() {
      const currentDay = new Date()
      if (currentDay.getDay() == 0) {
        return 6
      } 
      else {
        return currentDay.getDay() - 1
      }
    },

    getWeekBehavior(selectedValue) {
      this.$emit('getWeekBehavior', selectedValue)
    },

    getWeekTraffic(selectedValue) {
      this.$emit('getWeekTraffic', selectedValue)
    },

    getTodayCount(statCard) {
      if (statCard.name === "Reports") {
        return this.dailyStat.reportCount
      }
      if (statCard.name === "Inquiries") {
        return this.dailyStat.inquiryCount
      }
      if (statCard.name === "Logins") {
        return this.dailyStat.loginCount
      }
      if (statCard.name === "Analysis") {
        return this.dailyStat.analysisCount
      }
    },

    getTodayPercentage(statCard) {
      if (statCard.name === "Reports") {
        const num = parseInt(this.dailyStat.reportCountRate, 10)
        if (num < 0) {
          return this.dailyStat.reportCountRate
        } 
        return '+' + this.dailyStat.reportCountRate
      }
      if (statCard.name === "Inquiries") {
        const num = parseInt(this.dailyStat.inquiryCountRate, 10)
        if (num < 0) {
          return this.dailyStat.inquiryCountRate
        } 
        return '+' + this.dailyStat.inquiryCountRate
      }
      if (statCard.name === "Logins") {
        const num = parseInt(this.dailyStat.loginCountRate, 10)
        if (num < 0) {
          return this.dailyStat.loginCountRate
        } 
        return '+' + this.dailyStat.loginCountRate
      }
      if (statCard.name === "Analysis") {
        const num = parseInt(this.dailyStat.analysisCountRate, 10)
        if (num < 0) {
          return this.dailyStat.analysisCountRate
        } 
        return '+' + this.dailyStat.analysisCountRate
      }
    },

    calculateMinus(statCard) {
      if (statCard.name === "Reports") {
        const num = parseInt(this.dailyStat.reportCountRate, 10)
        if (num < 0) {
          return 'red'
        } 
        return 'green'
      }
      if (statCard.name === "Inquiries") {
        const num = parseInt(this.dailyStat.inquiryCountRate, 10)
        if (num < 0) {
          return 'red'
        } 
        return 'green'
      }
      if (statCard.name === "Logins") {
        const num = parseInt(this.dailyStat.loginCountRate, 10)
        if (num < 0) {
          return 'red'
        } 
        return 'green'
      }
      if (statCard.name === "Analysis") {
        const num = parseInt(this.dailyStat.analysisCountRate, 10)
        if (num < 0) {
          return 'red'
        } 
        return 'green'
      }
    },
  },

  mounted() {
    if (!localStorage.getItem("roleType") === "ADMIN" || localStorage.getItem("roleType") === null) {
      this.$router.push({ name: "home" });
    } else {
      this.selectedDay = this.daysOfWeek[this.calculateDay()]
      this.dayIndex = this.calculateDay()
      this.getWeekBehavior(0)
      this.getWeekTraffic(0)
      this.newCount = this.barData.datasets[0].data[this.dayIndex]
    }
  },

  computed: {
    trafficData() {
      const trafficData = {
        labels: [ 'Mon', 'Tue', 'Wed', "Thu", 'Fri', 'Sat', 'Sun' ],
        datasets: [ 
          { 
            borderColor: '#1F7DAD',
            backgroundColor: "rgba(31, 125, 173, 0.05)",
            borderWidth: 4,
            data: [],
            fill: true,
            label: "Logins"
          },
          { 
            borderColor: '#8AFFE9',
            backgroundColor: "rgba(138, 255, 233, 0.05)",
            borderWidth: 4,
            data: [],
            fill: true,
            label: "Analysis"
          } 
        ]
      }
      trafficData.datasets[0].data = this.weeklyTraffic.loginCount
      trafficData.datasets[1].data = this.weeklyTraffic.analysisCount

      return trafficData
    },

    barData() {
      const barData = {
        labels: [ 'Mon', 'Tue', 'Wed', "Thu", 'Fri', 'Sat', 'Sun' ],
        datasets: [ 
          { 
            backgroundColor: '#1FB099',
            data: [40, 20, 12, 15, 22, 36, 77],
            label: "weekly behavior",
            barThickness: 10,
          } 
        ]
      }
      barData.datasets[0].data = this.weeklyBehavior.map(data => {
        let sum = 0;
        for (let key in data) {
          sum += data[key]
        }
        return sum
      });
      return barData
    },

    doughnutData() {
      const doughnutData = {
        labels: [ 'Accounts', 'Playlists', 'Songs' ],
        datasets: [
          {
            backgroundColor: [ '#0D5F50', '#16B49A', '#8AFFE9'],
            data: [],
          }
        ]
      }
      const dailyData = this.weeklyBehavior[this.dayIndex]
      const dailyList = []
      for (let key in dailyData) {
        dailyList.push(dailyData[key])
      }
      doughnutData.datasets[0].data = dailyList
      return doughnutData
    }
  }
}
</script>

<style>
.dashboard-icon {
  background: linear-gradient(to bottom, #8AFFE9 20%, #1F7DAD 100%);
  height: 25px;
  width: 25px;
  margin-right: 16px
}
</style>