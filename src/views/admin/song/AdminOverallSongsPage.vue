<template>
    <div>
        <AdminOverallSongsForm @getStatus="getSongsStatus" @switchCategory="getCategorizedSongList" :songs="songs"
            :songInfo="songInfo" :songsStatus="songsStatus" @openManage="getSongInfo" />
        <v-pagination style="color: white" v-model="currentPage" :length="songListCount" @click="getPaginatedSongs">
        </v-pagination>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import AdminOverallSongsForm from "@/components/admin/song/AdminOverallSongsForm.vue"

const adminSongModule = "adminSongModule"

export default {
    data() {
        return {
            currentPage: 1,
            currentSort: 'ASC',
        }
    },
    components: {
        AdminOverallSongsForm,
    },
    methods: {
        ...mapActions(adminSongModule, [
            "requestSongListForAdminToSpring",
            "requestSongInfoForAdminToSpring",
            "requestSongsStatusToSpring"]),

        async getCategorizedSongList(selectedCategory) {
            const songStatusType = selectedCategory;
            const sortType = this.currentSort
            const page = this.currentPage;
            await this.requestSongListForAdminToSpring({ songStatusType, sortType, page });
        },

        async getPaginatedSongs() {
            const sortType = this.currentSort;
            const page = this.currentPage;
            const songStatusType = this.currentCategory;
            await this.requestSongListForAdminToSpring({ songStatusType, sortType, page });
        },

        async getSongInfo(selectedSongId) {
            const songId = selectedSongId
            await this.requestSongInfoForAdminToSpring(songId)
        },

        async getSongsStatus(targetDate) {
            const date = targetDate
            await this.requestSongsStatusToSpring(date)
        },
    },
    computed: {
        ...mapState(adminSongModule, [
            'songs',
            'songInfo',
            'songListCount',
            'songsStatus']),
    },
}
</script>

<style></style>