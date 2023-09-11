<template >
    <div>
        {{ accountId }}
    </div>
</template>
<script>
export default {
  props: {
    accountId: {
        type: Number,
        required: true
    }
  }
}
</script>
<style lang="">
    
</style>