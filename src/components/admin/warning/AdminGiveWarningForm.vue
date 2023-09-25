<template>
  <v-card class="admin-warning-check-card">
    <div class="custom-section">
      <div class="custom-label">
        <label for="reportedCategoryType" class="font-color">경고 유형</label>
      </div>
      <div class="custom-radio-group" v-for="category in categories">
        <input type="radio" :value="category.value" v-model="reportedCategoryType" class="custom-radio" :disabled="true"/>
        <label class="custom-radio-label">{{ category.name }}</label>
      </div>
    </div>

    <div class="custom-section">
      <div class="custom-label">
        <label for="reportContent" class="font-color">경고 사유</label>
      </div>

      <div class="custom-radio-group" v-for="warningContent in warningContents()">
        <input type="radio" :value="warningContent.name" v-model="reportContent" class="custom-radio" />
        <label class="custom-radio-label">{{ warningContent.name }}</label>
      </div>

      <div v-if="reportContent === '기타'">
        <v-textarea 
          style="color: white; background-color: #26292E;" 
          v-model="otherDetails"></v-textarea>
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
  props: {
    selectedWarningCategory: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      reportedCategoryType: this.selectedWarningCategory,
      reportContent: '',
      otherDetails: '',

      categories: [
        { name: "계정", value: "ACCOUNT" },
        { name: "플레이리스트", value: "PLAYLIST" },
        { name: "노래", value: "SONG" },
      ],


    }
  },
  methods: {
    giveWarning() {
      if (this.reportContent === '기타') {
        const reportedCategoryType = this.reportedCategoryType
        const reportContent = this.reportContent + ' ' + this.otherDetails
        this.$emit("giveWarning", { reportedCategoryType, reportContent })
      } else {
        const { reportedCategoryType, reportContent } = this
        this.$emit("giveWarning", { reportedCategoryType, reportContent })
      }
    },

    cancel() {
      this.reportedCategoryType = ''
      this.reportContent = ''
      this.$emit("cancelWarning")
    },

    warningContents() {
      if (this.reportedCategoryType === "ACCOUNT") {
          const  accountWarnings = [
          { name: "부적절한 닉네임"},
          { name: "불법 광고 계정"},
          { name: "계정 도용"},
          { name: "유해한 프로필 사진"},
          { name: "기타"},
        ]
        return accountWarnings
      }
      if (this.reportedCategoryType === "SONG") {
          const  songWarnings = [
          { name: "노래 가사 오류"},
          { name: "저작권 침해"},
          { name: "잘못된 링크"},
          { name: "불쾌한 콘텐츠"},
          { name: "허위"},
          { name: "기타"},
        ]
        return songWarnings
      }
    }
  },


}
</script>

<style>
    
</style>