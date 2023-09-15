<template lang="">
  <div>
    <AdminOverallPlaylistFrom
      @getStatus="getPlaylistsStatus"
      @switchCategory="getCategorizedPlaylistList"
      :playlistsStatus="playlistsStatus"
      :playlists="playlists"
    />
    <v-pagination 
      style="color: white" 
      v-model="currentPage" 
      :length="playlistListCount" 
      @click="getPaginatedPlaylist">
    </v-pagination>     
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import AdminOverallPlaylistFrom from "@/components/admin/playlist/AdminOverallPlaylistForm.vue"

const adminPlaylistModule = "adminPlaylistModule"

export default {
  data() {
    return {
      currentPage: 1,
      currentCategory: '',
    }
  },
  components: {
    AdminOverallPlaylistFrom
  },
  methods: {
    ...mapActions(adminPlaylistModule, [
      "requestPlaylistsStatusToSpring",
      "requestPlaylistsForAdminToSpring"
    ]),

    async getPlaylistsStatus(targetDate) {
      const date = targetDate
      await this.requestPlaylistsStatusToSpring(date)
    },

    async getCategorizedPlaylistList(selectedCategory) {
      this.currentCategory = selectedCategory
      const sortType = selectedCategory
      const page = 1
      await this.requestPlaylistsForAdminToSpring({ sortType, page })
    },

    async getPaginatedPlaylist() {
      const sortType = this.currentCategory
      const page = this.currentPage
      await this.requestPlaylistsForAdminToSpring({ sortType, page })
    }
  },

  computed: {
    ...mapState(adminPlaylistModule, [
      'playlistsStatus',
      'playlists',
      'playlistListCount',
    ]),
  }
}
</script>

<style>
    
</style>