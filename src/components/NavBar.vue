<template>
  <header class="z-30 w-full bg-white px-2 sm:px-4 py-2 shadow">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center space-x-3">
        <div class="inline-flex md:hidden" x-data="{ open: false }">
          <button class="btn btn-white btn-sm px-2 flex-none" @click="open = true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <span class="sr-only">Open Menu</span>
          </button>
          <div class="flex flex-col space-y-2 absolute m-2 top-0 left-0 right-0 rounded bg-white z-50 p-2 shadow"
            x-show.transition="open" @click="open = false" x-cloak>
            <button class="btn btn-link btn-icon px-2 flex-none self-start" @click="open = false">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              <span class="sr-only">Close Menu</span>
            </button>
            <a class="btn btn-icon w-full btn-link" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="mr-2" >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="mr-2" >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Documents
            </a>
            <a class="btn btn-icon w-full btn-primary" href="/about">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="mr-2" >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              About
            </a>
            <label class="tag-label hidden lg:block">
              <span class="sr-only">Search</span>
              <div class="tag-icon">
                <svg
                  class="w-2 h-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input class="tag-input mt-0 text-sm" placeholder="Search..." />
              </div>
            </label>
          </div>
        </div>
        <a href="/" title="J2" class="flex items-center">
          <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 157.95085 107.60851"
             version="1.1" id="svg994" width="157.95085" height="107.60851" class="h-10 v-auto">
            <defs id="defs998" />
            <path fill="#41729f" id="path992"
               d="m 142.42009,17.79983 c 11.4,9.8 13.4,31.4 6.7,47 -6.8,15.6 -22.4,25.1 -37.9,31.1 -15.5,6.1 -30.9,8.7 -50.5,5 -19.7,-3.7 -43.6,-13.6 -52.0999999,-32.3 -8.49999997,-18.7 -1.4,-46.2 14.6999999,-57.1 16.1,-10.89999993 41.4,-5.1999999 64.3,-3.3999999 22.9,1.9 43.5,-0.1 54.8,9.6999999 z" />
            <g aria-label="J" id="text1004"
               style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:64px;line-height:1.25;font-family:'Iosevka Slab';-inkscape-font-specification:'Iosevka Slab Bold';letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;fill:#ffffff">
              <path
                 d="m 73.881303,66.997458 q -2.24,0 -4.352,-0.64 -2.112,-0.704 -3.84,-2.176 -1.664,-1.472 -2.688,-3.456 -0.96,-1.984 -1.28,-4.16 l 7.232,-1.728 q 0.192,1.344 0.704,2.56 0.576,1.216 1.728,2.048 1.152,0.768 2.496,0.768 1.536,0 2.752,-1.088 1.28,-1.152 1.664,-2.688 0.448,-1.536 0.448,-3.136 v -27.072 h -7.424 v -6.784 h 14.976 v 33.856 q 0,2.624 -0.768,5.184 -0.704,2.496 -2.432,4.544 -1.664,2.048 -4.16,3.008 -2.496,0.96 -5.056,0.96 z"
                 id="path939" />
            </g>
            <path
               style="fill:#ffffff;stroke:#ffffff;stroke-width:1.88976;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="M 23.385773,32.304867 135.15142,32.008113"
               id="path1006" />
            <g
               aria-label="2"
               id="text1025"
               style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:37.3333px;line-height:1.25;font-family:Muli;-inkscape-font-specification:'Muli Bold';letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;fill:#ffffff">
              <path
                 d="m 113.24724,63.174905 v 3.919997 H 95.401923 v -3.546664 l 9.034657,-9.743991 q 1.60533,-1.754665 2.352,-3.210664 0.74667,-1.455999 0.74667,-2.874664 0,-1.829332 -1.08267,-2.762665 -1.04533,-0.933332 -3.024,-0.933332 -3.509327,0 -7.205324,2.762664 l -1.605332,-3.50933 q 1.567999,-1.418666 4.031996,-2.239998 2.464,-0.858666 4.96533,-0.858666 3.99466,0 6.30933,1.978665 2.352,1.941331 2.352,5.263995 0,2.277332 -1.008,4.29333 -0.97067,2.015998 -3.28533,4.517329 l -6.53333,6.943994 z"
                 id="path942" />
            </g>
            <path
               style="fill:#ffffff;stroke:#ffffff;stroke-width:1.88976;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
               d="M 23.042423,70.251279 134.80807,69.954529"
               id="path1006-3" />
          </svg>
          <span class="sr-only">J2</span>
        </a>
        <div class="hidden md:inline-flex space-x-1">
          <a class="btn btn-sm btn-icon btn-link" href="#">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="mr-2" >
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Documents
          </a>
        </div>
      </div>
      <div class="flex items-center space-x-3">
        <label class="tag-label hidden lg:block">
          <span class="sr-only">Search</span>
          <div class="tag-icon">
            <svg class="w-2 h-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input v-model="search" v-on:keyup.enter="searchHandler" type="search" placeholder="Search" class="tag-input mt-0 text-sm">
          </div>
        </label>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'navbar',
  data () {
    return {
      search: ''
    }
  },
  methods: {
    ...mapActions({
      loadDocSearch: 'docs/loadDocSearch'
    }),
    async searchHandler () {
      try {
        console.log('dispatching search query ' + this.search)
        await this.loadDocSearch(this.search)
        this.$router.push({ name: 'Docs' }).catch(err => {
          // Ignore the vuex err regarding  navigating to the page they are already on.
          if (
            err.name !== 'NavigationDuplicated' &&
              !err.message.includes('Avoided redundant navigation to current location')
          ) {
            // But print any other errors to the console
            console.log('router error: ' + err)
          }
        })
      } catch (err) {
        console.log('search error: ' + err)
      }
    }
  }
}
</script>
