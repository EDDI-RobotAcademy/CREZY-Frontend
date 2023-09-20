<template>
  <div>
    <v-form @submit.prevent="songModifyForm" ref="form">
      <v-text-field type="text" class="input-field" v-model="title" placeholder="노래 제목"></v-text-field>
      <v-text-field type="text" class="input-field" v-model="singer" placeholder="가수"></v-text-field>
      <v-text-field type="text" class="input-field" v-model="link" placeholder="링크"></v-text-field>
    </v-form>
    <div class="add-button">
      <v-btn class="mr-2" @click="songModifyForm" rounded>수정</v-btn>
      <v-btn @click="cancel" rounded>취소</v-btn>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    song: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      title: '',
      singer: '',
      link: ''
    }
  },
  mounted() { 
    this.title = this.song.title;
    this.singer = this.song.singer;
    this.link = this.song.link;
  },
  methods: {
    cancel() {
      this.$emit("cancelModify");
    },
    songModifyForm() {
      let songInfo = {
        songId: this.song.songId,
        title: this.title,
        singer: this.singer,
        link: this.link
      }
      this.$emit("submit", songInfo);
    }
  },
}
</script>
<style>
.input-field {
  color: white;
  height: 75px;
  margin-top: 10px;
}

.add-button {
  margin-top: 20px;
  float: right;
}
</style>