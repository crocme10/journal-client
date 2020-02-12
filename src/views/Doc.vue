<template>
  <div>
    <div>
      <Doc :id='id' />
    </div>
  </div>
</template>

<script>
import Doc from '@/components/Doc.vue'

export default {
  name: 'app',
  components: {
    Doc
  },
  data () {
    return {
      id: this.$route.params.id
    }
  }
}
</script>
