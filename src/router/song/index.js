import MusicRecommendationPage from "@/views/song/MusicRecommendationPage.vue"

const songRoutes = [
  {
    path: "/music-recommendation-page/:sentence",
    name: "MusicRecommendationPage",
    components: {
      default: MusicRecommendationPage,
    },
    props: {
      default: true,
    },
  },
];

export default songRoutes;
