<template>
  <v-app style="background-color: black">
    <NavigationMenu />
    <v-main>
      <div class="centered">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import NavigationMenu from "./views/layout/navigation/NavigationMenu.vue";

export default {
  components: {
    NavigationMenu,
  },

  data: () => ({}),
};
</script>

<style>
.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
