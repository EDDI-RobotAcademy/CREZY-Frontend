<template>
  <div>
    <v-row style="margin: 15px;">
      <v-col cols="12">
        <v-row>
          <v-col cols="3" >
            <v-card class="overall-playlist-stat-card">
              <div class="overall-playlist-stat-content">
                <div class="overall-playlist-stat=title">
                  승인된 신고 개수
                </div>
                <div class="overall-playlist-stat-num">
                  {{ newToday }}
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="3" >
            <v-card class="overall-playlist-stat-card">
              <div class="overall-playlist-stat-content">
                <div class="overall-playlist-stat=title">
                  반려된 신고 개수
                </div>
                <div class="overall-playlist-stat-num">
                  {{ percentage }}
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="3" >
            <v-card class="overall-playlist-stat-card">
              <div class="overall-playlist-stat-content">
                <div class="overall-playlist-stat=title">
                  총 신고 개수
                </div>
                <div class="overall-playlist-stat-num">
                  {{ totalNum }}
                </div>
              </div>
            </v-card>
          </v-col>
          <v-col cols="3" >
            <v-card class="overall-playlist-stat-card">
              <div class="overall-playlist-stat-content">
                <div class="overall-playlist-stat=title">
                  처리할 신고 개수
                </div>
                <div class="overall-playlist-stat-num">
                  {{ totalNum }}
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>        
      </v-col>      
    </v-row>     
    
    <v-card class="admin-overall-playlist-list-card">

      <div style="justify-content: space-between; display: flex;">
        <div class="admin-overall-playlist-list-title" align="start">
          Reports
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
          
          <tr class="overall-playlist-table-header">
            <th style="width: 100px;"></th>
            <th align="start">index</th>
            <th align="start">신고 사유</th>
            <th align="end">신고 대상</th>            
            <th align="end" style="padding-right: 25px;">
              register date
            </th>
          </tr>
          <template v-for="(report, index) in reportList">
            <tr class="overall-playlist-table-row" >   
              <th style="width: 100px;"></th>           
              <td align="start">{{ index + 1 }}</td>
              <td align="start">{{ report.reportContent }}</td>
              <td align="end">{{ report.reportedCategoryType }}</td>
              <td align="end" style="padding-right: 25px">{{ report.createReportDate }}</td>
            </tr>
          </template>
        </table>
      </div>
    </v-card>
  </div>
</template>

<script>


export default {
  
  data() {
    return{ 
      newToday: 4,
      percentage: 12,
      totalNum: 64,

      chooseAccountCategory: false,
      selectedCategory: '전체',
      accountCategories: [ '전체', '계정', '플레이리스트', '노래'],

     
     
    }
  },
  props: {
  reportList: {
    type: Object,
    required: true,
  },
},
  methods: {
    
    selectCategory(selectedCategory) {
      this.selectedCategory = selectedCategory
    },
      
  },
  mounted() {
      
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