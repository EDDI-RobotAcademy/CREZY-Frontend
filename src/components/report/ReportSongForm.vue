<template>
  <div>
    <!-- 선택한 대상에 따른 신고 유형 -->
    <div class="custom-section">
      <div class="custom-label">
        <label for="reportContent" class="font-color">신고 유형</label>
      </div>

      <div class="custom-radio-group" v-for="songReport in songReportTypes">
        <input type="radio" :value="songReport.name" v-model="reportContent" class="custom-radio" />
        <label class="custom-radio-label">{{ songReport.name }}</label>
      </div>

      <div class="custom-section">
        <div class="custom-label-content" v-if="reportContent === '기타'">
          <label for="details">기타 내용</label>
        </div>
        <div v-if="reportContent === '기타'">
          <textarea id="details" v-model="otherDetails" class="custom-textarea"></textarea>
        </div>
      </div>
    </div>
  </div>
  <div>
    <v-card-actions class="custom-submit-button">
      <v-btn :disabled="!isFormValid" @click="onSubmitReportSongForm" class="submit-btn">제출</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  props: {
    songId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      reportedCategoryType: 'SONG', // 선택한 대상 (계정 또는 플레이리스트)
      reportContent: '', // 선택한 신고 유형
      otherDetails: '', // 기타 내용

      songReportTypes: [
          { name: "노래 가사 오류"},
          { name: "저작권 침해"},
          { name: "잘못된 링크"},
          { name: "불쾌한 콘텐츠"},
          { name: "허위"},
          { name: "기타"},
        ]
    };
  },
  methods: {
    async onSubmitReportSongForm() {
      const reportData = {
        reportedCategoryType: this.reportedCategoryType,
        reportContent: this.reportContent === '기타' ? '기타 ' + this.otherDetails : this.reportContent,
        reportedId: this.songId // 신고하는 플레이리스트 ID 추가
      };
      console.log('신고 정보를 서버에 제출:', reportData);

      this.$emit('submit', reportData);

      // 신고 정보 제출 후, 폼 초기화
      this.reportedCategoryType = '';
      this.reportContent = '';
      this.otherDetails = '';

    },
  },

  computed: {
    isFormValid() {
      return this.reportedCategoryType && this.reportContent;
    }
  }
};
</script>

<style>
.font-color {
  color: white;
}

.custom-radio {
  width: 22px;
  height: 22px;
  margin-right: 8px;
  vertical-align: -4px;
}

.custom-radio:checked {
  appearance: none;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background-color: green;
  border: solid 2px rgb(255, 255, 255);
  box-shadow: 0 0 0 1px green;
}

.custom-radio:not(:checked) {
  appearance: none;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  border: solid 2px rgb(255, 255, 255);
  background-color: #3a3838;
}

.custom-section {
  margin-bottom: 20px;
}

.custom-label {
  margin-bottom: 10px;
}

.custom-radio-group {
  margin-bottom: 8px;
}

.custom-radio-label {
  margin-left: 8px;
  color: white;
}

.custom-label-content {
  margin-bottom: 2px;
  color: white;
}

.custom-textarea {
  color: white;
  font-family: Arial, sans-serif;
  font-size: 14px;
  border: 1px solid #e1dcdc;
  padding: 8px;
  width: 100%;
  height: 100px;
  resize: none;
}

.custom-submit-button {
  position: absolute;
  bottom: 0;
  right: 60px;
}

.submit-btn {
  color: white !important;
}
</style>
