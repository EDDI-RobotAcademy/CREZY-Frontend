<template>
  <div>
    <!-- 신고 대상 선택 -->
    <div class="custom-section">
      <div class="custom-label">
        <label for="reportTarget" class="font-color">신고 대상 선택</label>
      </div>
      <div class="custom-radio-group">
        <input type="radio" id="reportAccount" value="account" v-model="reportTarget" class="custom-radio" />
        <label for="reportAccount" class="custom-radio-label">계정</label>
      </div>

      <div class="custom-radio-group">
        <input type="radio" id="reportPlaylist" value="playlist" v-model="reportTarget" class="custom-radio" />
        <label for="reportPlaylist" class="custom-radio-label">플레이리스트</label>
      </div>
    </div>

    <!-- 선택한 대상에 따른 신고 유형 -->
    <div class="custom-section">
      <div class="custom-label">
        <label for="reportType" class="font-color">신고 유형</label>
      </div>
      <div class="custom-radio-group" v-if="reportTarget === 'account'">
        <div class="custom-radio-group" v-if="reportTarget === 'account'">
          <input type="radio" id="reportType1" value="inappropriate-nickname" v-model="reportType" class="custom-radio" />
          <label for="reportType1" class="custom-radio-label">부적절한 닉네임</label>
        </div>
        <input type="radio" id="reportType2" value="advertise" v-model="reportType" class="custom-radio" />
        <label for="reportType2" class="custom-radio-label">불법 광고 계정</label>
      </div>
      <div class="custom-radio-group" v-if="reportTarget === 'account'">
        <input type="radio" id="reportType3" value="account-hack" v-model="reportType" class="custom-radio" />
        <label for="reportType3" class="custom-radio-label">계정 도용</label>
      </div>
      <div class="custom-radio-group" v-if="reportTarget === 'account'">
        <input type="radio" id="reportType4" value="injurious-profile" v-model="reportType" class="custom-radio" />
        <label for="reportType4" class="custom-radio-label">유해한 프로필 사진</label>
      </div>

      <div class="custom-radio-group" v-if="reportTarget === 'account'">
        <input type="radio" id="reportType5" value="etc" v-model="reportType" class="custom-radio" />
        <label for="reportType5" class="custom-radio-label">기타</label>
      </div>

      <!-- 플레이리스트 신고 목록 -->
      <div class="custom-radio-group" v-if="reportTarget === 'playlist'">
        <input type="radio" id="reportType6" value="inappropriate-title" v-model="reportType" class="custom-radio" />
        <label for="reportType6" class="custom-radio-label">부적절한 제목</label>
      </div>
      <div class="custom-radio-group" v-if="reportTarget === 'playlist'">
        <input type="radio" id="reportType7" value="excessive-advertise" v-model="reportType" class="custom-radio" />
        <label for="reportType7" class="custom-radio-label">과도한 홍보</label>
      </div>
      <div class="custom-radio-group" v-if="reportTarget === 'playlist'">
        <input type="radio" id="reportType8" value="false-content" v-model="reportType" class="custom-radio" />
        <label for="reportType8" class="custom-radio-label">허위 콘텐츠</label>
      </div>
      <div class="custom-radio-group" v-if="reportTarget === 'playlist'">
        <input type="radio" id="reportType9" value="deceptive-information" v-model="reportType" class="custom-radio" />
        <label for="reportType9" class="custom-radio-label">기만적인 정보</label>
      </div>
      <div class="custom-radio-group" v-if="reportTarget === 'playlist'">
        <input type="radio" id="reportType10" value="etc" v-model="reportType" class="custom-radio" />
        <label for="reportType10" class="custom-radio-label">기타</label>
      </div>
    </div>
    <div class="custom-section">
      <div class="custom-label-content" v-if="reportType === 'etc'">
        <label for="details">기타 내용</label>
      </div>
      <div v-if="reportType === 'etc'">
        <textarea id="details" v-model="reportDetails" class="custom-textarea"></textarea>
      </div>
    </div>
    <v-card-actions class="custom-submit-button">
      <v-btn @click="submitReport" class="submit">제출</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reportTarget: '', // 선택한 대상 (계정 또는 플레이리스트)
      reportType: '', // 선택한 신고 유형
      reportDetails: '', // 추가 정보
    };
  },
  methods: {
    submitReport() {
      const reportData = {
        target: this.reportTarget,
        type: this.reportType,
        details: this.reportDetails,
      };
      console.log('신고 정보를 서버에 제출:', reportData);

      this.$emit('submit', reportData);

      // 신고 정보 제출 후, 폼 초기화
      this.reportTarget = '';
      this.reportType = '';
      this.reportDetails = '';
      
    },
  },
};
</script>

<style scoped>
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
