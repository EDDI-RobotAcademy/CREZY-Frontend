<template>
  <div>
    <MusicRecommendationSearchForm @submit="requestRecommendation" />
  </div>
</template>

<script>
import MusicRecommendationSearchForm from "@/components/music/MusicRecommendationSearchForm.vue";

export default {
  components: {
    MusicRecommendationSearchForm,
  },
  methods: {
    async requestRecommendation(payload) {
      const sentence = payload
      await this.$router.push({
        name: "MusicRecommendationPage",
        params: { sentence: sentence },
      });
    },


  },
};
</script>

<style></style>
