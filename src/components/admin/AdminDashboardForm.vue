<template>
  <div style="margin-top: 100px;">
    <v-row>
      <v-col cols="6">
          <v-card style=" background-color: #292E37; margin: 15px; padding: 15px">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; margin: 18px;">
              <div style="color: white; font-size: 24px;">
                weekly behavior
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
            <div style="color: white; background-color: #212630; border-radius: 10px; width: 95%; height: 42px; margin: auto; display: flex; justify-content: space-between; padding: 12px">
              <div>
                Saturday
              </div>
              <div>
                77 new
              </div>
            </div>
            <div style="display: flex;">
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
                  style="background-color: #292E37; height: 350px; width: 300px"
                />
              </div>
              </v-col>
            </div>
          </v-card>


      </v-col>
      <v-col cols="6">
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Bar, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale)

export default {
  components: { Bar, Doughnut },
  data() {
    return {
      barData: {
        labels: [ 'S', 'M', 'T', 'W', "T", 'F', 'S' ],
        datasets: [ 
          { 
            backgroundColor: '#1FB099',
            data: [40, 20, 12, 15, 22, 36, 77],
            label: "weekly behavior",
            barThickness: 8,
          } 
        ]
      },
      barOptions: {
        responsive: true,
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
      chooseWeek: false
    }
  },
}
</script>

<style>
</style>