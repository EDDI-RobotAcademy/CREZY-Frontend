<template>
  <div class="nickname-dialog-background">
    <div class="nickname-dialog">
      <h2 class="nickname-dialog-title">닉네임</h2>
      <v-text-field v-model="newNickname" label="사용하고 싶은 닉네임을 입력하십시오" outlined class="nickname-input"></v-text-field>
      <div class="nickname-dialog-actions">
        <v-btn @click="submit" color="black">Submit</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex"; 

export default {
  setup(props, { emit }) {
    const store = useStore(); 
    const newNickname = ref("");

    const closeModal = () => {
      emit("closeModal");
    };

    const submit = async () => {
      await store.dispatch("accountModule/requestChangeNicknameToSpring", {newNickname: newNickname.value});
      closeModal();
      
    };

    return {
      newNickname,
      submit,
    };
  },
};
</script>

<style scoped>
.nickname-dialog-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.nickname-dialog {
  background-color: rgba(255, 255, 255, 0.562);
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  width: 400px;
  text-align: center;
}

.nickname-dialog-title {
  font-size: 18px;
  margin-bottom: 16px;
}

.nickname-input {
  width: 100%;
  margin-bottom: 16px;
}

.nickname-dialog-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}
</style>
