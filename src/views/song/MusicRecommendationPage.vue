<template>
  <div>
    <MusicRecommendationForm :musicList="musicList"/>
  </div>
</template>

<script>
import MusicRecommendationForm from "@/components/music/MusicRecommendationForm.vue";

import { mapActions, mapState } from "vuex";

const songModule = "songModule";

export default {
  components: {
    MusicRecommendationForm
  },
  props: {
    sentence: {
      type: String,
      required: true
    },
  },
  computed: {
    ...mapState(songModule, ["musicList"]),
  },
  methods: {
    ...mapActions(songModule, ["requestRecommendationToSpring", "removeRecommendations"]),

    async getRecommendation(inputedSentence) {
      const sentence = inputedSentence
      await this.removeRecommendations()
      await this.requestRecommendationToSpring(sentence)
    }
    
  },
  mounted() {
    this.getRecommendation(this.sentence)
  }
}
</script>

<style>
    
</style>