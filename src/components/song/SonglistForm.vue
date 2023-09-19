<template>
    <div class="delete-button-container">
        <v-btn v-if="this.checkedSongs.length > 0" @click="openDeleteDialog" class="delete-button" rounded
            variant="outlined" color="white"><v-icon>mdi-delete</v-icon>삭제</v-btn>
        <v-btn v-else class="delete-button-invisible">삭제</v-btn>
    </div>
    <v-row>
        <v-col cols="12">
            <table style="color: white;
                justify-content: space-between;
                width: 100%;
                border-collapse: separate;
                border-spacing: 0 15px">
                <tbody style="border:">
                    <tr v-if="!playlist || (Array.isArray(playlist) && playlist.length === 0)">
                        <td colspan="8" class="inform">
                            현재 등록된 노래가 없습니다!
                        </td>
                    </tr>
                    <tr v-else v-for="(song, index) in playlist.songlist" :key="song.songId"
                        :class="{ 'playing': checkedSongs.includes(song.songId), }" style="cursor: pointer"
                        @mouseover="showCheckbox(index)" @mouseleave="hideCheckbox(index)">

                        <td align="center" style="width: 10%;">
                            <v-img :src=getImage(song.link) height="50" width="50"></v-img>
                        </td>
                        <td align="center" style="width: 50%;">
                            {{ song.title }}
                        </td>
                        <td align="center" style="width: 30%;">
                            {{ song.singer }}
                        </td>

                        <td align="center" style="">
                            <button  v-if="song.statusType.statusType === 'BLOCK'" @click="reModifySongButtonClick(song.songId)"
                                style="color: red; margin-right: 70px;" >
                                <v-icon>mdi-alert-circle</v-icon>
                            </button>
                        </td>

                        <td v-if="hoverIndex == index || checkedSongs.includes(song.songId)" style="width: 10%;">
                            <input type="checkbox" :id="'song-' + song.songId" v-model="checkedSongs" :value="song.songId"
                                class="checkbox">
                        </td>
                        <td v-else style="width: 10%;">
                            <input type="checkbox" :id="'song-' + song.songId" v-model="checkedSongs" :value="song.songId"
                                class="checkbox invisible-checkbox">
                        </td>
                    </tr>
                </tbody>
            </table>
        </v-col>
    </v-row>
    <v-dialog v-model="confirmDeleteDialog" persistent max-width="290">
        <v-card class="confirmDeleteDialog">
            <v-card-text class="headline" style="color: white">선택된 곡: {{ checkedSongs.length }}곡</v-card-text>
            <v-card-text style="color: white">삭제하시겠습니까?</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="white" text @click="deleteSelectedSongs">확인</v-btn>
                <v-btn color="white" text @click="confirmDeleteDialog = false">취소</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: {
        playlist: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            checkedSongs: [],
            hoverIndex: null,
            confirmDeleteDialog: false,

        }
    },
    methods: {
        reModifySongButtonClick(songId) {

        },
        showCheckbox(index) {
            this.hoverIndex = index;
        },
        hideCheckbox(index) {
            if (!this.checkedSongs.includes(this.playlist.songlist[index].songId)) {
                this.hoverIndex = null;
            }
        },
        openDeleteDialog() {
            if (this.checkedSongs.length > 0) {
                this.confirmDeleteDialog = true;
            }
        },
        async deleteSelectedSongs() {
            this.playlist.songlist = this.playlist.songlist.filter(song => !this.checkedSongs.includes(song.songId));
            console.log("checkedSongs", this.checkedSongs)
            this.confirmDeleteDialog = false;
            let songlist = this.checkedSongs.toString();
            await this.$emit("deleteSubmit", songlist)
        },
        getImage(link) {
            return (
                "https://img.youtube.com/vi/" +
                link.substring(link.lastIndexOf("=") + 1) +
                "/mqdefault.jpg"
            );
        },
    }

}
</script>
<style>
input[type=checkbox] {
    visibility: hidden;
    width: 18px;
    height: 18px;
}

tr:hover .checkbox,
tr.playing .checkbox {
    visibility: visible;
}

.delete-button-container {
    display: flex;
    justify-content: flex-end;
}

.delete-button {
    color: white;
}

.invisible-checkbox {
    opacity: 0;
}

.delete-button-invisible {
    opacity: 0;
}

.confirmDeleteDialog {
    background-color: rgba(0, 0, 0, 0.7) !important;
}
</style>