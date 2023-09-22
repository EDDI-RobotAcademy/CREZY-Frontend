<template>
  <div>
    <!-- 신고 대상 선택 -->
    <div class="custom-section">
      <div class="custom-label">
        <label for="reportedCategoryType" class="font-color">신고 대상 선택</label>
      </div>
      <div class="custom-radio-group">
        <input type="radio" id="reportAccount" value="ACCOUNT" v-model="reportedCategoryType" class="custom-radio" />
        <label for="reportAccount" class="custom-radio-label">계정</label>
      </div>

      <div class="custom-radio-group">
        <input type="radio" id="reportPlaylist" value="PLAYLIST" v-model="reportedCategoryType" class="custom-radio" />
        <label for="reportPlaylist" class="custom-radio-label">플레이리스트</label>
      </div>
    </div>

    <!-- 선택한 대상에 따른 신고 유형 -->
    <div class="custom-section" v-if="reportedCategoryType === 'ACCOUNT'">
      <div class="custom-label">
        <label for="reportContent" class="font-color">신고 유형</label>
      </div>

      <div class="custom-radio-group">
        <input type="radio" id="reportContent1" value="부적절한 닉네임" v-model="reportContent" class="custom-radio" />
        <label for="reportContent1" class="custom-radio-label">부적절한 닉네임</label>
      </div>

      <div class="custom-radio-group">
        <input type="radio" id="reportContent2" value="불법 광고 계정" v-model="reportContent" class="custom-radio" />
        <label for="reportContent2" class="custom-radio-label">불법 광고 계정</label>
      </div>

      <div class="custom-radio-group">
        <input type="radio" id="reportContent3" value="계정 도용" v-model="reportContent" class="custom-radio" />
        <label for="reportContent3" class="custom-radio-label">계정 도용</label>
      </div>

      <div class="custom-radio-group">
        <input type="radio" id="reportContent4" value="유해한 프로필 사진" v-model="reportContent" class="custom-radio" />
        <label for="reportContent4" class="custom-radio-label">유해한 프로필 사진</label>
      </div>

      <div class="custom-radio-group">
        <input type="radio" id="reportContent5" value="기타" v-model="reportContent" class="custom-radio" />
        <label for="reportContent5" class="custom-radio-label">기타</label>
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

    <!-- 플레이리스트 신고 목록 -->
    <div v-if="reportedCategoryType === 'PLAYLIST'">
      <div class="custom-label">
        <label for="reportContent" class="font-color">신고 유형</label>
      </div>

      <div class="custom-radio-group">
        <input type="radio" id="reportContent6" value="부적절한 제목" v-model="reportContent" class="custom-radio" />
        <label for="reportContent6" class="custom-radio-label">부적절한 제목</label>
      </div>

      <div class="custom-radio-group">
        <input type="radio" id="reportContent7" value="유해한 플레이리스트 사진" v-model="reportContent" class="custom-radio" />
        <label for="reportContent7" class="custom-radio-label">유해한 플레이리스트 사진</label>
      </div>

      <div class="custom-radio-group">
        <input type="radio" id="reportContent8" value="허위 콘텐츠" v-model="reportContent" class="custom-radio" />
        <label for="reportContent8" class="custom-radio-label">허위 콘텐츠</label>
      </div>

      <div class="custom-radio-group">
        <input type="radio" id="reportContent9" value="기만적인 정보" v-model="reportContent" class="custom-radio" />
        <label for="reportContent9" class="custom-radio-label">기만적인 정보</label>
      </div>

      <div class="custom-radio-group">
        <input type="radio" id="reportContent10" value="기타" v-model="reportContent" class="custom-radio" />
        <label for="reportContent10" class="custom-radio-label">기타</label>
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
      <v-btn :disabled="!isFormValid" @click="onSubmitReportAccountPlaylistForm" class="submit">제출</v-btn>
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

.submit {
  color: white;
}
</style>
