<template>
  <div class="recommendation-field">
    <v-card class="recommendation-card" flat>
      <div class="recommendation-title">Project By CREZY</div>
      <div class="recommendation-subtitle">
        Tell us about your day <br />
        Let us zhuzh it up
      </div>
      <div class="recommendation-divider">/////////////////////////////</div>
      <div class="d-flex">
        <input
          type="text"
          class="recommendation-search-bar"
          v-model="emotionKeyword"
        />
        <button
          class="recommendation-search-button"
          @click="getRecommendation"
          type="submit"
        >
          search
        </button>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      emotionKeyword: "",
    };
  },
  methods: {
    getRecommendation() {
      const { emotionKeyword } = this;
      this.$emit("submit", emotionKeyword);
    },
  },
};
</script>
<style>
.recommendation-field {
  display: flex;
  justify-content: center;
  align-items: center;
}

.recommendation-card {
  margin-top: 6rem;
  padding: 2rem;
  width: 750px;
  background-color: transparent !important;
}

.recommendation-title {
  font-size: 22px;
  color: white;
}
.recommendation-subtitle {
  font-size: 68px;
  margin-top: 30px;
  margin-bottom: 55px;
  line-height: 1;
  color: #07ffee;
}
.recommendation-divider {
  font-size: 36px;
  margin-top: 15px;
  margin-bottom: 55px;
  color: #07ffee;
}

.recommendation-search-bar {
  font-size: 22px;
  color: white;
  width: 550px;
  background-color: rgba(255, 255, 255, 0.2);
}
.recommendation-search-button {
  font-size: 22px;
  margin-left: 30px;
  padding: 3px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #ccff00;
}
</style>
