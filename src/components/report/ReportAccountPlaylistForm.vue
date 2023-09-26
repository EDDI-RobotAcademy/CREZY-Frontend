<template>
  <div>
    <!-- 신고 대상 선택 -->
    <div class="custom-section">
      <div class="custom-label">
        <label for="reportedCategoryType" class="font-color">신고 대상 선택</label>
      </div>
      <div class="custom-radio-group" v-for="category in categories">
        <input type="radio" :value="category.value" v-model="reportedCategoryType" class="custom-radio"/>
        <label class="custom-radio-label">{{ category.name }}</label>
      </div>
    </div>

    <!-- 선택한 대상에 따른 신고 유형 -->
    <div class="custom-section">
      <div class="custom-label">
        <label for="reportContent" class="font-color">신고 유형</label>
      </div>

      <div class="custom-radio-group" v-for="reportContentType in reportContentTypes()">
        <input type="radio" :value="reportContentType.name" v-model="reportContent" class="custom-radio" />
        <label class="custom-radio-label">{{ reportContentType.name }}</label>
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
      <v-btn :disabled="!isFormValid" @click="onSubmitReportAccountPlaylistForm" class="submit-btn">제출</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  props: {
    playlistId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      reportedCategoryType: '', // 선택한 대상 (계정 또는 플레이리스트)
      reportContent: '', // 선택한 신고 유형
      otherDetails: '', // 기타 내용

      categories: [
        { name: "계정", value: "ACCOUNT" },
        { name: "플레이리스트", value: "PLAYLIST" },
      ],

    };
  },
  methods: {
    async onSubmitReportAccountPlaylistForm() {
      const reportData = {
        reportedCategoryType: this.reportedCategoryType,
        reportContent: this.reportContent === '기타' ? '기타 ' + this.otherDetails : this.reportContent,
        reportedId: this.playlistId // 신고하는 플레이리스트 ID 추가
      };
      console.log('신고 정보를 서버에 제출:', reportData);

      this.$emit('submit', reportData);

      // 신고 정보 제출 후, 폼 초기화
      this.reportedCategoryType = '';
      this.reportContent = '';
      this.otherDetails = '';

    },

    reportContentTypes() {
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
      if (this.reportedCategoryType === "PLAYLIST") {
          const  playlistWarnings = [
          { name: "부적절한 제목"},
          { name: "유해한 플레이리스트 사진"},
          { name: "허위 콘텐츠"},
          { name: "기만적인 정보"},
          { name: "기타"},
        ]
        return playlistWarnings
      }
    }
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
  margin-bottom: 5px;
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
