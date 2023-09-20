<template>
    <div>
        <v-row style="margin: 15px;">
            <v-col cols="8">
                <v-row>
                    <v-col cols="4">
                        <v-card class="overall-song-stat-card">
                            <div class="overall-song-stat-content">
                                <div class="overall-song-stat=title">
                                    New Today
                                </div>
                                <div class="overall-song-stat-num">
                                    {{ songsStatus.todaySong }}
                                </div>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="4">
                        <v-card class="overall-song-stat-card">
                            <div class="overall-song-stat-content">
                                <div class="overall-song-stat=title">
                                    Percentage
                                </div>
                                <div class="overall-song-stat-num">
                                    {{ songsStatus.increaseRate }}%
                                </div>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="4">
                        <v-card class="overall-song-stat-card">
                            <div class="overall-song-stat-content">
                                <div class="overall-song-stat=title">
                                    Total
                                </div>
                                <div class="overall-song-stat-num">
                                    {{ songsStatus.totalSong }}
                                </div>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
                <v-card class="overall-song-graph">
                    <Line :data="songsData" :options="songsOptions" />
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card class="overall-song-calendar-card">
                    <DatePicker v-model="searchDate" transparent borderless :is-dark="true" expanded :rows="2" :step="1"
                        :color="selectedColor" :max-date="new Date()" :initial-page-position="2" />
                </v-card>
            </v-col>
        </v-row>
        <div>
            <v-card class="admin-overall-song-list-card">

                <div style="justify-content: space-between; display: flex;">
                    <div class="admin-overall-song-list-title" align="start">
                        Songs
                    </div>
                    <div style="width: 400px; margin-left: 80px">
                        <v-text-field class="admin-song-search-field" variant="outlined" append-inner-icon="mdi-magnify"
                            single-line hide-details @click:append-inner="onClick"></v-text-field>
                    </div>
                    <div style="width: 300px; ">
                        <v-text-field variant="outlined" append-inner-icon="mdi-menu-down-outline"
                            @click:append-inner="chooseSongCategory = !chooseSongCategory" readonly
                            class="admin-song-search-field" v-model="selectedCategory">
                        </v-text-field>
                        <v-menu v-model="chooseSongCategory">
                            <template v-slot:activator="{ on }">
                                <v-list class="admin-song-category-select-field" v-if="chooseSongCategory">
                                    <v-list-item class="admin-song-category-selection"
                                        v-for="songCategory in songCategories" @click="selectCategory(songCategory)">
                                        <v-list-item-title style="font-size: 13px">{{ songCategory
                                        }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </template>
                        </v-menu>
                    </div>
                </div>

                <v-divider></v-divider>

                <div>
                    <table class="overall-song-table">
                        <tr class="accounts-table-picker-container">
                            <td colspan="12" align="end">
                                <div>
                                    <v-icon style="color: #EA78B3; font-size: 46px">mdi-circle-small</v-icon> open
                                    <v-icon style="color: #7AE5A8; font-size: 46px">mdi-circle-small</v-icon> block
                                </div>
                            </td>
                        </tr>
                        <tr class="overall-song-table-header">
                            <th style="width: 100px;"></th>
                            <th align="start">index</th>
                            <th @click="toggleSortDirection" style="cursor: pointer;" align="start">
                                title
                                <v-icon v-if="selectedSort === 'ASC'">mdi-menu-up</v-icon>
                                <v-icon v-else>mdi-menu-down</v-icon>
                            </th>
                            <th align="start">singer</th>
                            <th align="end">writer</th>
                            <th align="end" style="padding-right: 25px">registered date</th>
                        </tr>
                        <template v-for="(song, index) in songs">
                            <tr class="overall-song-table-row" @click="forManage(song.songId)">
                                <td>
                                    <div class="overall-song-marker-container">
                                        <div v-if="song.songStatusType.statusType === 'OPEN'" class="open-song-marker">
                                        </div>
                                        <div v-if="song.songStatusType.statusType === 'BLOCK'" class="block-song-marker">
                                        </div>
                                    </div>
                                </td>
                                <td>{{ index + 1 }}</td>
                                <td align="start">{{ song.title }}</td>
                                <td align="start">{{ song.singer }}</td>
                                <td align="end">{{ song.nickname }}</td>
                                <td align="end" style="padding-right: 25px">{{ song.createDate }}</td>
                            </tr>
                            <tr v-if="selectedSongId === song.songId">
                                <td style="color: white;" colspan="6">
                                    <ParticularSongDetailForm :songInfo="songInfo" :songThumbnail="songThumbnail"
                                        @modifyLyrics="modifyLyrics" @deleteSong="deleteSong" @openSong="openSong"
                                        @blockSong="blockSong" />
                                </td>
                            </tr>
                        </template>
                    </table>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script>
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

import ParticularSongDetailForm from "@/components/admin/song/ParticularSongDetailForm.vue"

export default {
    components: {
        Line,
        DatePicker,
        Calendar,
        ParticularSongDetailForm,
    },

    props: {
        songsStatus: {
            type: Object,
            required: true
        },
        songs: {
            type: Array,
            required: true,
        },
        songInfo: {
            type: Object
        }
    },
    data() {
        return {
            songCategories: ["TOTAL", "OPEN", "BLOCK"],
            chooseSongCategory: false,
            selectedCategory: 'TOTAL',

            selectedSort: 'ASC',

            songsOptions: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                }
            },

            selectedColor: 'teal',
            searchDate: '',
            formattedDate: '',

            songThumbnail: '',
            selectedSongId: '',
        }
    },
    methods: {
        onClick() {
            alert("yay")
        },
        selectCategory(category) {
            this.selectedCategory = category
            const selectedCategory = category
            this.$emit("switchCategory", selectedCategory)
        },
        toggleSortDirection() {
            this.selectedSort = this.selectedSort === 'ASC' ? 'DESC' : 'ASC';
            this.$emit('switchSort', this.selectedSort);
        },
        forManage(songId) {
            if (this.selectedSongId == songId.toString()) {
                this.selectedSongId = ''
            } else {
                this.selectedSongId = songId;
                this.$emit("openManage", this.selectedSongId)
            }
        },
        formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        getStatus(targetDate) {
            const date = targetDate
            this.$emit("getStatus", { date });
        },
        getSongImage(link) {
            return (
                "https://img.youtube.com/vi/" +
                link.substring(link.lastIndexOf("=") + 1) +
                "/mqdefault.jpg"
            );
        },
        modifyLyrics(payload) {
            this.$emit('modifyLyrics', payload)
        },
        deleteSong(selectedSongId) {
            this.$emit('deleteSong', selectedSongId)
        },
        openSong(selectedSongId) {
            this.$emit('openSong', selectedSongId)
        },

        blockSong(selectedSongId) {
            this.$emit('blockSong', selectedSongId)
        },
    },
    watch: {
        searchDate(newValue) {
            this.formattedDate = this.formatDate(newValue);
            this.getStatus(this.formattedDate)
        },
        songInfo: {
            handler(newVal) {
                if (newVal && newVal.link) {
                    this.songThumbnail = this.getSongImage(newVal.link)
                }
            }
        }
    },
    async mounted() {
        if (!localStorage.getItem("roleType") === "ADMIN" || localStorage.getItem("roleType") === null) {
            this.$router.push({ name: "home" });
        } else {
            this.searchDate = new Date()
            const targetDate = this.formatDate(this.searchDate)
            await this.getStatus(targetDate)
            await this.selectCategory(this.selectedCategory)
        }
    },
    computed: {
        songsData() {
            const songsData = {
                labels: [],
                datasets: [
                    {
                        data: [],
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)'
                    }
                ]
            }
            songsData.labels = this.songsStatus.songDateList;
            songsData.datasets[0].data = this.songsStatus.songCounts;
            return songsData
        }
    }
}
</script>

<style>
.overall-song-stat-card {
    background-color: #292E37;
    border-radius: 5px;
    color: white;
}

.overall-song-stat-content {
    padding: 35px
}

.overall-song-stat-title {
    font-size: 18px;
}

.overall-song-stat-num {
    font-size: 45px;
}

.overall-song-calendar-card {
    background-color: #292E37;
    padding: 15px;
}

.overall-song-calendar {
    background-color: transparent;
    color: white;
}

.overall-song-graph {
    background-color: #292E37;
    height: 450px;
    margin-top: 15px;
}

.admin-overall-song-list-card {
    background-color: #292E37;
    margin: 15px;
    padding: 25px;
}

.admin-overall-song-list-title {
    color: white;
    font-size: 32px;
    float: left;
}

.admin-song-search-field {
    color: #5BB5EF;
    border-radius: 10px !important;
    font-size: 12px;
}

.admin-song-category-select-field {
    background-color: #212630 !important;
    position: absolute;
    width: 300px;
    top: 82px;

}

.admin-song-category-selection {
    color: white;
    border-bottom: 1px dotted white;
}

.overall-song-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 15px;
}

.overall-song-table-header {
    color: #5F6871;
    height: 75px;
}

.overall-song-table-row {
    background-color: #485463;
    color: white;
    height: 100px;
    padding: 20px;
    cursor: pointer;
}

.overall-song-marker-container {
    height: 70px;
    width: 20px;
    background-color: #3E4756;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0 10px 10px 0;
}

.open-song-marker {
    height: 50px;
    width: 3px;
    background-color: #EA78B3;
    border-radius: 5px;
}

.block-song-marker {
    height: 50px;
    width: 3px;
    background-color: #7AE5A8;
    border-radius: 5px;
}


td:first-child,
th:first-child {
    border-radius: 10px 0 0 10px;
}

td:last-child,
th:last-child {
    border-radius: 0 10px 10px 0;
}
</style>