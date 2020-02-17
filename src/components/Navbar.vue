<template>
  <header class='bg-gray-900 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3 font-header'>
    <div class='flex items-center justify-between px-4 py-3 sm:p-0'>
      <div>
        <!--<img class='h-8' src='/img/logo-inverted.svg' alt='Workcation'>-->
        <h4 class='text-gray-500'>Mimirsbrunn</h4>
      </div>
      <div class='sm:hidden'>
        <button @click='isOpen = !isOpen' type='button' class='block text-gray-500 hover:text-white focus:text-white focus:outline-none'>
          <svg class='h-6 w-6 fill-current' viewBox='0 0 24 24'>
            <path v-if='isOpen' fill-rule='evenodd' d='M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z'/>
            <path v-if='!isOpen' fill-rule='evenodd' d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'/>
          </svg>
        </button>
      </div>
    </div>
    <div :class='isOpen ? "block" : "hidden"' class='px-2 pt-2 pb-4 sm:flex sm:p-0'>
      <router-link to='/' class='block text-gray-500 font-semibold px-2 py-1 rounded hover:bg-gray-800'>Home</router-link>
      <router-link to='/about' class='mt-1 block text-gray-500 font-semibold px-2 py-1 rounded hover:bg-gray-800 sm:mt-0 sm:ml-2'>About</router-link>
      <div class="relative text-gray-600">
        <input v-model="search" v-on:keyup.enter="searchHandler" type="search" placeholder="Search" class="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none">
        <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
          <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve" width="512px" height="512px">
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { isOk } from 'result-async'

export default {
  name: 'navbar',
  data () {
    return {
      isOpen: false,
      search: ''
    }
  },
  methods: {
    searchHandler () {
      try {
        this.$store.dispatch('docs/loadDocSearch', this.search).then(res => {
          console.log('is res ok? ' + res)
          if (isOk(res)) {
            try {
              this.$router.push('docs')
              console.log('after push')
            } catch (err) {
              console.log('pushing docs error: ' + err)
            }
          } else {
            console.log('Error: ' + res.error)
          }
        })
      } catch (err) {
        console.log('search error: ' + err)
      }
    }
  }
}
</script>
