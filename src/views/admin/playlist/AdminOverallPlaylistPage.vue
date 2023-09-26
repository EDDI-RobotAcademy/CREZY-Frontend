<template lang="">
  <div>
    <AdminOverallPlaylistFrom
      @getStatus="getPlaylistsStatus"
      @switchCategory="getCategorizedPlaylistList"
      @getPlaylistByAccountId="getPlaylistByAccountId"
      :playlistsStatus="playlistsStatus"
      :playlists="playlists"
      :accountId="selectedAccountId"
      @searchPlaylist="searchPlaylist"
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
      selectedAccountId: ''
    }
  },
  components: {
    AdminOverallPlaylistFrom
  },
  methods: {
    ...mapActions(adminPlaylistModule, [
      "requestPlaylistsStatusToSpring",
      "requestPlaylistsForAdminToSpring",
      "requestAccountPlaylistsToSpring",
      "requestSearchPlaylistsForAdminToSpring"
    ]),

    async getPlaylistsStatus(targetDate) {
      const date = targetDate
      await this.requestPlaylistsStatusToSpring(date)
    },

    async getCategorizedPlaylistList(selectedCategory) {
      this.currentCategory = selectedCategory
      this.currentPage = 1
      const sortType = selectedCategory
      const page = this.currentPage
      await this.requestPlaylistsForAdminToSpring({ sortType, page })
    },

    async getPaginatedPlaylist() {
      const sortType = this.currentCategory
      const page = this.currentPage
      await this.requestPlaylistsForAdminToSpring({ sortType, page })
    },

    async getPlaylistByAccountId(selectedAccountId) {
      const accountId = selectedAccountId
      const page = this.currentPage
      await this.requestAccountPlaylistsToSpring({ accountId, page })
    },
    async searchPlaylist(payload) {
      const keyword = payload
      const page = this.currentPage
      await this.requestSearchPlaylistsForAdminToSpring({ page, keyword })
    }
  },

  computed: {
    ...mapState(adminPlaylistModule, [
      'playlistsStatus',
      'playlists',
      'playlistListCount',
    ]),
  },
  async mounted() {
    if (!localStorage.getItem("roleType") === "ADMIN" || localStorage.getItem("roleType") === null) {
      this.$router.push({ name: "home" });
    }
  },


}
</script>

<style></style>