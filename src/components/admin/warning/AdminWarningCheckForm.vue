<template>
  <v-card class="admin-warning-check-card">
    <v-card-title>
      {{ nickname }}의 경고 내역
    </v-card-title>

    <div v-if="!warnings || warnings.length === 0" class="admin-no-warning" align="center">
      <span>경고 내역이 없습니다</span>
    </div>

    <v-list v-else lines="three" v-model:opened="open" class="admin-warning-check-list">
      <v-list-group v-for="warning in warnings" :value="warning.warningId">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :title="warning.name" :subtitle="warning.createWarningDate"></v-list-item>
        </template>

        <div class="admin-warning-content-container">
          <div class="admin-warning-content">
            <div class="admin-warning-report-content">
              <div>{{ warning.reportedCategoryType }} 관련</div>
              <div>신고 날짜: {{ warning.createReportDate }}</div>
            </div>
            <div>
              <div>{{ warning.reportContent }} 의 사유로 경고를 받았습니다.</div>
            </div>
          </div>
          <div class="admin-warning-actions">
            <v-btn class="admin-warning-btn" @click="removeWarning(warning.warningId)">경고 철회하기</v-btn>
          </div>
        </div>


      </v-list-group>
    </v-list>

    <div class="admin-warning-actions">
      <v-btn class="admin-warning-btn" @click="openGiveWarningModal">경고 주기</v-btn>
      <v-btn class="admin-warning-btn" @click="cancelCheckWarning">취소</v-btn>
    </div>

  </v-card>
  <v-dialog v-model="openGiveWarning" max-width="600px">
    <AdminGiveWarningForm 
      :selectedWarningCategory="selectedWarningCategory"
      @giveWarning="giveWarning"
      @cancelWarning="cancelWarning"/>
  </v-dialog>
</template>

<script>
import AdminGiveWarningForm from "@/components/admin/warning/AdminGiveWarningForm.vue"

export default {
  props: {
    nickname: {
      type: String,
      required: true,
    },
    warnings: {
      type: Array
    }
  },
  components: {
    AdminGiveWarningForm
  },
  data() {
    return {
      open: [],
      openGiveWarning: false,
    }
  },

  methods: {
    giveWarning(payload) {
      this.$emit("giveWarning", payload)
    },

    cancelWarning() {
      this.openGiveWarning = false
    },

    cancelCheckWarning() {
      this.$emit("cancelCheckWarning")
    },

    removeWarning(warningId) {
      if ( confirm("경고를 철회하시겠습니까?")) {
        this.$emit("removeWarning", warningId)
      }
    },

    openGiveWarningModal() {
      this.selectedWarningCategory = "ACCOUNT"
      this.openGiveWarning = true
    }
  }
}
</script>

<style>
.admin-warning-check-card {
  padding: 15px; 
  background-color: #292E37; 
  color: white;
} 

.admin-no-warning {
  font-size: 32px; 
  height: 120px; 
  padding: 24px
}

.admin-warning-check-list {
  background-color: transparent; 
  color: white;
}

.admin-warning-content-container {
  padding: 25px; 
  padding-bottom: 35px;
  height: 200px;
  background-color: #26292E;
}

.admin-warning-content {
  display: flex; 
  justify-content: space-between; 
  flex-direction: column; 
  height: 90%;
}

.admin-warning-report-content {
  display: flex; 
  justify-content: space-between;
}

.admin-warning-actions {
  display: flex; 
  justify-content: flex-end;
}

.admin-warning-btn {
  background-color: #485463;
  margin: 8px;
}
</style>