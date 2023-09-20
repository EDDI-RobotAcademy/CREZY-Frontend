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
                    This week
                    <v-icon>mdi-menu-down-outline</v-icon>
                  </v-btn>
                  <v-list style="background-color: #212630 !important; position: absolute; width: 130px" v-if="chooseWeek">
                    <v-list-item style="color: white; border-bottom: 1px dotted white;">
                      <v-list-item-title style="font-size: 13px">This Week</v-list-item-title>
                    </v-list-item>
                    <v-list-item style="color: white">
                      <v-list-item-title style="font-size: 13px">Last Week</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </template>
              </v-menu>
            </div>
          </div>
          <div style="color: white; background-color: #212630; border-radius: 10px; width: 95%; height: 50px; margin: auto; display: flex; justify-content: space-between; padding: 12px; margin-bottom: 25px; margin-top: 25px;">
            <div>
              Saturday
            </div>
            <div>
              77 new
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
                    This week
                    <v-icon>mdi-menu-down-outline</v-icon>
                  </v-btn>
                  <v-list style="background-color: #212630 !important; position: absolute; width: 130px" v-if="chooseTrafficWeek">
                    <v-list-item style="color: white; border-bottom: 1px dotted white;">
                      <v-list-item-title style="font-size: 13px">This Week</v-list-item-title>
                    </v-list-item>
                    <v-list-item style="color: white">
                      <v-list-item-title style="font-size: 13px">Last Week</v-list-item-title>
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
      <v-col cols="3">
        <v-card style="background-color: #292E37; padding: 15px; height: 250px">
          <div style="color: white; display: flex; flex-direction: column; ">
            <div style="font-size: 24px; margin-bottom: 22px; display: flex; align-items: center;">
              <div class="dashboard-icon"></div>
              <div>Reports</div>
            </div>
            <div></div>
            <div style="font-size: 48px; display: flex; align-items: center; margin-top: 20px; width: 100%; justify-content: center;">
              <div>4 </div>
              <div style="color: red; font-size: 32px; margin-left: 8px">(-3%)</div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card style="background-color: #292E37; padding: 15px; height: 250px">
          <div style="color: white; display: flex; flex-direction: column; ">
            <div style="font-size: 24px; margin-bottom: 22px; display: flex; align-items: center;">
              <div class="dashboard-icon"></div>
              <div>Inquiries</div>
            </div>
            <div></div>
            <div style="font-size: 48px; display: flex; align-items: center; margin-top: 20px; width: 100%; justify-content: center;">
              <div>8 </div>
              <div style="color: red; font-size: 32px; margin-left: 8px">(-9%)</div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card style="background-color: #292E37; padding: 15px; height: 250px">
          <div style="color: white; display: flex; flex-direction: column; ">
            <div style="font-size: 24px; margin-bottom: 22px; display: flex; align-items: center;">
              <div class="dashboard-icon"></div>
              <div>Logins</div>
            </div>
            <div></div>
            <div style="font-size: 48px; display: flex; align-items: center; margin-top: 20px; width: 100%; justify-content: center;">
              <div>8 </div>
              <div style="color: green; font-size: 32px; margin-left: 8px">(+4%)</div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card style="background-color: #292E37; padding: 15px; height: 250px">
          <div style="color: white; display: flex; flex-direction: column; ">
            <div style="font-size: 24px; margin-bottom: 22px; display: flex; align-items: center;">
              <div class="dashboard-icon"></div>
              <div>Analysis</div>
            </div>
            <div></div>
            <div style="font-size: 48px; display: flex; align-items: center; margin-top: 20px; width: 100%; justify-content: center;">
              <div>32 </div>
              <div style="color: green; font-size: 32px; margin-left: 8px">(+12%)</div>
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
  data() {
    return {
      barData: {
        labels: [ 'S', 'M', 'T', 'W', "T", 'F', 'S' ],
        datasets: [ 
          { 
            backgroundColor: '#1FB099',
            data: [40, 20, 12, 15, 22, 36, 77],
            label: "weekly behavior",
            barThickness: 10,
          } 
        ]
      },
      barOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },

      doughnutData: {
        labels: [ 'Songs', 'Playlists', 'Accounts' ],
        datasets: [
          {
            backgroundColor: [ '#8AFFE9', '#16B49A', '#0D5F50'],
            data: [ 60, 12, 5],
            
          }
        ]
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
              usePointStyle: true, // 라벨 박스를 동그라미로 표시
              pointStyle: 'circle', // 동그라미로 나타낼 모양 설정
              // pointStyle: 'triangle', // 다른 모양으로 변경 가능
              // pointStyle: 'rect', // 다른 모양으로 변경 가능
            },
          },
        }
      },

      loginData: {
        labels: [ 'Mon', 'Tue', 'Wed', 'Thu', "Fri", 'Sat', 'Sun' ],
        datasets: [ 
          { 
            borderColor: '#1F7DAD',
            borderWidth: 4,
            data: [8, 3, 12, 15, 9, 16, 23],
            fill: false
          } 
        ]
      },
      loginOptions: {
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
          title: {
            display: true,
            text: 'Weekly Login Rate',
            color: 'white'
          }
        }
      },

      analysisData: {
        labels: [ 'S', 'M', 'T', 'W', "T", 'F', 'S' ],
        datasets: [ 
          { 
            borderColor: '#8AFFE9',
            borderWidth: 4,
            data: [40, 20, 12, 15, 22, 36, 77],
            fill: false
          } 
        ]
      },
      analysisOptions: {
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
          title: {
            display: true,
            text: 'Weekly Analysis Rate',
            color: 'white'
          }
        }
      },

      trafficData: {
        labels: [ 'S', 'M', 'T', 'W', "T", 'F', 'S' ],
        datasets: [ 
          { 
            borderColor: '#1F7DAD',
            backgroundColor: "rgba(31, 125, 173, 0.05)",
            borderWidth: 4,
            data: [8, 3, 12, 15, 9, 16, 23],
            fill: true,
            label: "Logins"
          },
          { 
            borderColor: '#8AFFE9',
            backgroundColor: "rgba(138, 255, 233, 0.05)",
            borderWidth: 4,
            data: [40, 20, 12, 15, 22, 36, 77],
            fill: true,
            label: "Analysis"
          } 
        ]
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
            stacked: true
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              usePointStyle: true, // 라벨 박스를 동그라미로 표시
              pointStyle: 'circle', // 동그라미로 나타낼 모양 설정
              // pointStyle: 'triangle', // 다른 모양으로 변경 가능
              // pointStyle: 'rect', // 다른 모양으로 변경 가능
            },
          },
          // title: {
          //   display: true,
          //   text: 'Weekly Traffic Rate',
          //   color: 'white'
          // }
        }
      },

      chooseWeek: false,
      chooseTrafficWeek: false
    }
  },
}
</script>

<style>
.dashboard-icon {
  background: linear-gradient(to bottom, #8AFFE9 20%, #1F7DAD 100% );
  height: 25px;
  width: 25px;
  margin-right: 16px
}
</style>