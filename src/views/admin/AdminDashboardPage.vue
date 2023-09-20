<template>
  <div>
    <AdminDashboardForm 
      :dailyStat = "dailyStat"
      :weeklyBehavior = "weeklyBehavior"
      :weeklyTraffic = "weeklyTraffic"
      @getWeekBehavior="getWeekBehavior"
      @getWeekTraffic="getWeekTraffic"/>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import AdminDashboardForm from "@/components/admin/AdminDashboardForm.vue"

const adminDashboardModule = 'adminDashboardModule'

export default {
  components: {
    AdminDashboardForm
  },

  methods: {
    ...mapActions(adminDashboardModule, [
      'requestWeekBehaviorToSpring',
      'requestWeekTrafficToSpring',
      'requestDailyStatToSpring'
    ]),

    async getWeekBehavior(selectedValue) {
      const value = selectedValue
      await this.requestWeekBehaviorToSpring(value)
    },

    async getWeekTraffic(selectedValue) {
      const value = selectedValue
      await this.requestWeekTrafficToSpring(value)
    },
  },
    
  computed: {
    ...mapState(adminDashboardModule, [
      'dailyStat',
      'weeklyBehavior',
      'weeklyTraffic'
    ])
  },

  async mounted() {
    await this.requestDailyStatToSpring()
  }
}
</script>

<style>
    
</style>