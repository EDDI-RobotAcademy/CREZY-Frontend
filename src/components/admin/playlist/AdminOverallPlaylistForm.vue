<template>
  <div style="margin-top: 100px"> 
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
          <Line :data="playlistData" :options="playlistOptions"/>
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
    <div>
      <v-card class="admin-overall-playlist-list-card">

          <div style="justify-content: space-between; display: flex;">
            <div class="admin-overall-playlist-list-title" align="start">
              Playlists
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
                  @click:append-inner="choosePlaylistCategory = !choosePlaylistCategory"
                  readonly
                  class="admin-playlist-search-field"
                  v-model="selectedCategory"
                  >
                </v-text-field>
                <v-menu v-model="choosePlaylistCategory">
                    <template v-slot:activator="{ on }">
                      <v-list class="admin-playlist-category-select-field" v-if="choosePlaylistCategory">
                        <v-list-item class="admin-playlist-category-selection" v-for="playlistCategory in playlistCategories" @click="selectCategory(playlistCategory)">
                          <v-list-item-title style="font-size: 13px">{{ playlistCategory }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </template>
                  </v-menu>
              </div>
          </div>


          <v-divider></v-divider>

          <div>
            <table class="overall-playlist-table" style="margin-bottom: 100px">
              <tr class="overall-playlist-table-header" style="margin-bottom: 100px">
                <th style="width: 100px;"></th>
                <th align="start">index</th>
                <th align="start">title</th>
                <th align="start">creater</th>
                <th align="end">likes</th>
                <th align="end">songs</th>
                <th align="end">created date</th>
              </tr>
              <tr class="overall-playlist-table-row" v-for="(playlist, index) in playlists" @click="toManage(playlist.playlistId)">
                <td>
                  <div class="overall-playlist-song-marker-container">
                    <div v-if="playlist.songCount === 0" class="no-song-marker"></div>
                    <div v-else class="yes-song-marker"></div>
                  </div>
                </td>
                <td>{{ index + 1 }}</td>
                <td align="start">{{ playlist.title }}</td>
                <td align="start">{{ playlist.writer }}</td>
                <td align="end">{{ playlist.likeCount }}</td>
                <td align="end">{{ playlist.songCount }}</td>
                <td align="end">{{ playlist.createDate }}</td>
              </tr>
            </table>
          </div>
        
      </v-card>
    </div>    
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

export default {
  components: {
    Line,
    VDatePicker
  },
  data() {
    return{ 
      newToday: 8,
      percentage: "14%",
      totalNum: 91,

      playlistCategories: ["recent", "trending", "empty"],
      choosePlaylistCategory: false,
      selectedCategory: 'recent',

      playlistData: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
        datasets: [
          {
            data: [12, 15, 3, 22, 11, 7, 8],
            fill: false,
            borderColor: 'rgb(75, 192, 192)'
          }
        ]
      },
      playlistOptions: {
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

      playlists: [
        { playlistId: 1, title: "이름 1", writer: "생성자1", likeCount: 3, songCount: 5, createDate: "23-09-01" },
        { playlistId: 3, title: "이름 3", writer: "생성자3", likeCount: 0, songCount: 0, createDate: "23-09-01" },
        { playlistId: 4, title: "이름 4", writer: "생성자4", likeCount: 2, songCount: 8, createDate: "23-09-04" },
        { playlistId: 6, title: "이름 6", writer: "생성자6", likeCount: 0, songCount: 11, createDate: "23-09-07" },
        { playlistId: 7, title: "이름 7", writer: "생성자7", likeCount: 32, songCount: 11, createDate: "23-09-07" },
      ]
    }
  },
  methods: {
    onClick() {
      alert("yay")
    },
    selectCategory(selectedCategory) {
      this.selectedCategory = selectedCategory
    },
    toManage(playlistId) {
      alert(playlistId + "번 선택!")
    }
  }
}
</script>

<style>
.overall-playlist-stat-card{
  background-color: #292E37;
  border-radius: 5px;
  color: white;
}

.overall-playlist-stat-content {
  padding: 35px
}

.overall-playlist-stat-title {
  font-size: 18px;
}

.overall-playlist-stat-num {
  font-size: 45px;
}

.overall-playlist-calendar-card{
  background-color: #292E37; 
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overall-playlist-calendar{
  background-color: transparent;
  color: white;
}

.overall-playlist-graph{
  background-color: #292E37;
  height: 450px;
  margin-top: 15px;
}

.admin-overall-playlist-list-card{
  background-color: #292E37;
  margin: 15px;
  padding: 25px;
}

.admin-overall-playlist-list-title{
  color: white;
  font-size: 32px;
  float: left;
}

.admin-playlist-search-field{
  color: #5BB5EF;
  border-radius: 10px !important;
  font-size: 12px;
}

.admin-playlist-category-select-field {
  background-color: #212630 !important; 
  position: absolute; 
  width: 300px;

}

.admin-playlist-category-selection {
  color: white; 
  border-bottom: 1px dotted white;
}

.overall-playlist-table {
  width: 100%; 
  border-collapse: collapse;
}

.overall-playlist-table-header{
  color: #5F6871; 
  height: 75px;
}

.overall-playlist-table-row {
  margin: 50px !important; 
  background-color: #485463;
  color: white; 
  height: 100px; 
  padding: 20px
}

.overall-playlist-song-marker-container {
  height: 70px; 
  width: 20px; 
  background-color: #3E4756; 
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  border-radius: 0 10px 10px 0;
}

.no-song-marker {
  height: 50px; 
  width: 3px; 
  background-color: #EA78B3;
}

.yes-song-marker {
  height: 50px; 
  width: 3px; 
  background-color: #7AE5A8;
}


td:first-child,
th:first-child {
  border-radius: 10px 0 0 10px;
}

td:last-child,
th:last-child {
  border-radius: 0 10px 10px 0;
}

</style>