<template>
  <div id="app">
    <Navbar />
    <router-view />
    <ErrorToaster />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import ErrorToaster from '@/components/ErrorToaster'

export default {
  components: {
    ErrorToaster,
    Navbar
  }
}
</script>
