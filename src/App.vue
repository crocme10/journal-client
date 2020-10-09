<template>
  <div id="app">
    <NavBar />
    <router-view/>
    <Notifications />
  </div>
</template>

<script>
import Notifications from '@/components/Util/Notifications'
import NavBar from '@/components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar,
    Notifications
  }
}
</script>
