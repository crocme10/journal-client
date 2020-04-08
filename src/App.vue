<template>
  <!-- outside container, purpose is to have the inner div centered -->
  <div id="app" class="flex items-center justify-center">
    <!-- this div is used to:
         set the width of the display relative to the size of the display
         set the font size dependending on the media query
    -->
    <div class="font-text sm:text-base lg:text-lg xl:text-xl sm:w-5/6 md:w-4/5 lg:w-1/2">
      <Navbar />
      <router-view />
      <ErrorToaster />
    </div>
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
