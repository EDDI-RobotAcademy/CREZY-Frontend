<template>
  <div>
    <AdminParticularPlaylistDetailForm :playlist = "playlist"/>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import AdminParticularPlaylistDetailForm from "@/components/admin/playlist/AdminParticularPlaylistDetailForm.vue"

const adminPlaylistModule = "adminPlaylistModule"

export default {
  props: {
    selectedPlaylistId: {
      type: String,
      required: true
    }
  },
  components: {
    AdminParticularPlaylistDetailForm
  },
  methods: {
    ...mapActions(adminPlaylistModule, ['requestPlaylistForAdminToSpring'])
  },
  computed: {
    ...mapState(adminPlaylistModule, ["playlist"])
  },
  async mounted() {
    await this.requestPlaylistForAdminToSpring(this.selectedPlaylistId)
  }
}
</script>

<style>
    
</style>