<template>
  <div
    v-if="!musicList || (Array.isArray(musicList) && musicList.length === 0)"
  >
    <MusicRecommendationSearchForm @submit="recommendation" />
  </div>
  <div v-else>
    <MusicRecommendationForm />
  </div>
</template>

<script>
import MusicRecommendationSearchForm from "@/components/music/MusicRecommendationSearchForm.vue";
import MusicRecommendationForm from "@/components/music/MusicRecommendationForm.vue";

import { mapActions, mapState } from "vuex";

const musicModule = "musicModule";

export default {
  components: {
    MusicRecommendationForm,
    MusicRecommendationSearchForm,
  },
  computed: {
    ...mapState(musicModule, ["musicList"]),
  },
  methods: {
    ...mapActions(musicModule, ["requestRecommendationToFastApi"]),

    async recommendation(payload) {
      await this.requestRecommendationToFastApi(payload);
    },
  },
};
</script>

<style></style>
