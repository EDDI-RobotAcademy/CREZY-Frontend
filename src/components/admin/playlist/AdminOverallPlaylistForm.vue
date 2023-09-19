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
                  {{ playlistsStatus.todayPlaylist }}
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
                  {{ playlistsStatus.increaseRate }}%
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
                  {{ playlistsStatus.totalPlaylist }}
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-card class="overall-playlist-graph">
          <Line :data="playlistData" :options="playlistOptions" />
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="overall-playlist-calendar-card">
          <DatePicker 
            v-model="searchDate" 
            transparent 
            borderless 
            :is-dark="true" 
            expanded 
            :rows="2"
            :step="1"
            :color="selectedColor"
            :max-date="new Date()"
            :initial-page-position="2"/>
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
            <table class="overall-playlist-table">
              <tr class="overall-playlist-table-header">
                <th style="width: 100px;"></th>
                <th align="start">index</th>
                <th align="start">title</th>
                <th align="start">creater</th>
                <th align="end">likes</th>
                <th align="end">songs</th>
                <th align="end" style="padding-right: 25px">created date</th>
              </tr>
              <tr class="overall-playlist-table-row" v-for="(playlist, index) in playlists" @click="toManage(playlist.playlistId)">
                <td>
                  <div class="overall-playlist-song-marker-container">
                    <div v-if="playlist.songCounts === 0" class="no-song-marker"></div>
                    <div v-else class="yes-song-marker"></div>
                  </div>
                </td>
                <td>{{ index + 1 }}</td>
                <td align="start">{{ playlist.playlistName }}</td>
                <td align="start">{{ playlist.accountName }}</td>
                <td align="end">{{ playlist.likeCounts }}</td>
                <td align="end">{{ playlist.songCounts }}</td>
                <td align="end" style="padding-right: 25px">{{ playlist.createDate }}</td>
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

import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

export default {
  components: {
    Line,
    DatePicker,
    Calendar
  },

  props: {
    playlistsStatus: {
      type: Object,
      required: true
    },
    playlists: {
      type: Array,
      required: true,
    }
  },
  data() {
    return{ 
      playlistCategories: ["recent", "trending", "empty"],
      choosePlaylistCategory: false,
      selectedCategory: 'recent',

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

      selectedColor: 'teal',
      searchDate: '',
      formattedDate: '',

    }
  },
  methods: {
    onClick() {
      alert("yay")
    },
    selectCategory(category) {
      this.selectedCategory = category
      const selectedCategory = category
      this.$emit("switchCategory", selectedCategory)
    },
    toManage(playlistId) {
      this.$router.push({
        name: "AdminParticularPlaylistPage",
        params: { selectedPlaylistId: playlistId },
      })
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
  },
  watch: {
    searchDate(newValue) {
      this.formattedDate = this.formatDate(newValue);
      this.getStatus(this.formattedDate)
    },
  },
  async mounted() {
    this.searchDate = new Date()
    const targetDate = this.formatDate(this.searchDate)
    await this.getStatus(targetDate)
    await this.selectCategory(this.selectedCategory)
  },
  computed: {
    playlistData() {
      const playlistData = {
        labels: [],
        datasets: [
          {
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)'
          }
        ]
      }
      playlistData.labels = this.playlistsStatus.playlistDateList;
      playlistData.datasets[0].data = this.playlistsStatus.playlistCounts;
      return playlistData
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
  top: 82px;

}

.admin-playlist-category-selection {
  color: white; 
  border-bottom: 1px dotted white;
}

.overall-playlist-table {
  width: 100%; 
  border-collapse: separate;
  border-spacing: 0 15px;
}

.overall-playlist-table-header{
  color: #5F6871; 
  height: 75px;
}

.overall-playlist-table-row {
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
  border-radius: 5px;
}

.yes-song-marker {
  height: 50px; 
  width: 3px; 
  background-color: #7AE5A8;
  border-radius: 5px;
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