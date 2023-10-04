<template>
    <div>
        <AdminOverallSongsForm @getStatus="getSongsStatus" @switchCategory="getCategorizedSongList" :songs="songs"
            :songInfo="songInfo" :songsStatus="songsStatus" @openManage="getSongInfo" @modifyLyrics="modifyLyrics"
            @deleteSong="deleteSong" @openSong="openSong" @blockSong="blockSong" @switchSort="getSortedSongList"
            @giveWarning="giveWarning" />
        <v-pagination style="color: white" v-model="currentPage" :length="songListCount" @click="getPaginatedSongs">
        </v-pagination>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import AdminOverallSongsForm from "@/components/admin/song/AdminOverallSongsForm.vue"

const adminSongModule = "adminSongModule"
const adminWarningModule = "adminWarningModule"

export default {
    data() {
        return {
            currentPage: 1,
            currentSort: 'ASC',
            currentCategory: 'TOTAL',
            searchKeyword: ''
        }
    },
    components: {
        AdminOverallSongsForm,
    },
    methods: {
        ...mapActions(adminSongModule, [
            "requestSongListForAdminToSpring",
            "requestSongInfoForAdminToSpring",
            "requestSongsStatusToSpring",
            "requestModifyLyricsToSpring",
            "requestDeleteSongToSpring",
            "removeSongFromState",
            "requestOpenSongToSpring",
            "requestBlockSongToSpring",
            "requestSearchSongForAdminToSpring"]),

        ...mapActions(adminWarningModule, [
            'requestGiveWarningToSpring',
        ]),

        async getCategorizedSongList(selectedCategory) {
            this.currentCategory = selectedCategory;
            this.currentPage = 1;
            this.searchKeyword = ''

            const songStatusType = selectedCategory;
            const sortType = this.currentSort
            const page = this.currentPage;
            await this.requestSongListForAdminToSpring({ songStatusType, sortType, page });
        },

        async getSortedSongList(selectedType) {
            const { sortType, isSearch } = selectedType
            if (isSearch) {
                await this.searchSong(selectedType)
            } else {
                const songStatusType = this.currentCategory;
                const page = this.currentPage;
                await this.requestSongListForAdminToSpring({ songStatusType, sortType, page });
            }

        },

        async getPaginatedSongs() {
            if (this.searchKeyword !== '') {
                const keyword = this.searchKeyword
                const page = this.currentPage
                await this.requestSearchSongForAdminToSpring({ page, keyword })
            }
            else {
                const sortType = this.currentSort;
                const page = this.currentPage;
                const songStatusType = this.currentCategory;
                await this.requestSongListForAdminToSpring({ songStatusType, sortType, page });
            }
        },

        async getSongInfo(selectedSongId) {
            const songId = selectedSongId
            await this.requestSongInfoForAdminToSpring(songId)
        },

        async getSongsStatus(targetDate) {
            const date = targetDate
            await this.requestSongsStatusToSpring(date)
        },

        async modifyLyrics(payload) {
            const songId = payload.songId
            await this.requestModifyLyricsToSpring(payload)
            await this.requestSongInfoForAdminToSpring(songId)
        },

        async deleteSong(selectedSongId) {
            if (confirm("노래를 지우시겠습니까?")) {
                await this.requestDeleteSongToSpring(selectedSongId)
                await this.removeSongFromState()
            }
            await this.getPaginatedSongs();
        },

        async openSong(selectedSongId) {
            await this.requestOpenSongToSpring(selectedSongId)
            await this.getPaginatedSongs();
            await this.getSongInfo(selectedSongId)
        },

        async blockSong(selectedSongId) {
            await this.requestBlockSongToSpring(selectedSongId)
            await this.getPaginatedSongs();
            await this.getSongInfo(selectedSongId)
        },
        async searchSong(payload) {
            this.currentPage = 1

            const { keyword, sortType } = payload
            const page = this.currentPage

            await this.requestSearchSongForAdminToSpring({ page, keyword, sortType })
        },
        async giveWarning(payload) {
            const songId = payload.reportedId
            await this.requestGiveWarningToSpring(payload)
            await this.getPaginatedSongs()
            await this.getSongInfo(songId)
        }
    },
    computed: {
        ...mapState(adminSongModule, [
            'songs',
            'songInfo',
            'songListCount',
            'songsStatus']),
    },
    mounted() {
        if (!localStorage.getItem("roleType") === "ADMIN" || localStorage.getItem("roleType") === null) {
            this.$router.push({ name: "home" });
        }
    }
}
</script>

<style></style>