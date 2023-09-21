<template>
  <v-card class="admin-warning-check-card">
    <div class="custom-section">
      <div class="custom-label">
        <label for="reportedCategoryType" class="font-color">경고 유형 선택</label>
      </div>
      <div class="custom-radio-group" v-for="category in categories">
        <input type="radio" :value="category.value" v-model="reportedCategoryType" class="custom-radio" />
        <label class="custom-radio-label">{{ category.name }}</label>
      </div>
    </div>

    <div class="custom-section" v-if="reportedCategoryType">
      <div class="custom-label">
        <label for="reportContent" class="font-color">경고 사유</label>
      </div>

      <div>
        <v-textarea 
          style="color: white; background-color: #26292E;" 
          v-model="reportContent"></v-textarea>
      </div>
    </div>
    
    <div class="admin-warning-actions">
      <v-btn class="admin-warning-btn" @click="giveWarning">저장</v-btn>
      <v-btn class="admin-warning-btn" @click="cancel">취소</v-btn>
    </div>

  </v-card>
</template>

<script>
export default {
  data() {
    return {
      reportedCategoryType: '',
      reportContent: '',

      categories: [
        { name: "계정", value: "ACCOUNT" },
        { name: "플레이리스트", value: "PLAYLIST" },
        { name: "노래", value: "SONG" },
      ],
    }
  },
  methods: {
    giveWarning() {
      const { reportedCategoryType, reportContent } = this
      this.$emit("giveWarning", { reportedCategoryType, reportContent })
    },

    cancel() {
      this.reportedCategoryType = ''
      this.reportContent = ''
      this.$emit("cancelWarning")
    }
  }
}
</script>

<style>
    
</style>