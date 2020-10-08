<template>
  <section class="container mx-auto py-24 px-4">
    <h2 class="text-3xl text-gray-900 leading-tight mb-2 font-extrabold">Skcript Blog</h2>
    <p class="text-lg text-gray-600 mb-20">Comes directly from the desk of engineers, creators and managers at Skcript.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12">
      <div v-for='doc in docs' :key='doc.id'>
        <a :href='"/doc/" + doc.id'>
          <img :src='"/img/" + doc.front.image + ".jpg"' :alt='doc.front.image'
            class="object-cover bg-center h-56 w-full rounded mb-5" loading="lazy" />
        </a>
        <h2 class="text-gray-900 text-lg font-semibold mb-2">
          <a href="#" class="text-gray-900 hover:text-purple-700">{{ doc.front.title }}</a>
        </h2>
        <p class="text-sm text-gray-600 font-normal mb-3">{{ doc.front.outline }}</p>
        <p class="text-sm text-gray-600 font-normal mb-3">
          <a href="#" class="text-gray-900 hover:text-purple-700 font-medium">Praveen Juge</a>
          April 16, 2020
        </p>
        <div class='mt-4 mb-8 flex flex-wrap'>
          <button v-for='tag in doc.front.tags' :key='tag' @click="tagHandler(tag)" class='bg-gray-300 mt-2 mr-2 px-2 text-xs text-gray-800 rounded-full uppercase font-semibold tracking-wide'>
            {{ tag }}
          </button>
        </div>
        <p class='absolute bottom-0 right-0 mr-4 mb-4 bg-gray-700 px-2 text-xs text-white rounded-full uppercase font-semibold tracking-wide'>{{ doc.front.genre }}</p>
      </div>
    </div>
    <div class="flex items-center justify-center space-x-0 md:space-x-2 space-y-2 md:space-y-0 mt-20 flex-col md:flex-row">
      <a href="#" class="btn btn-light btn-xl rounded-full w-full md:w-auto">Previous Page</a>
      <a href="#" class="btn btn-light btn-xl rounded-full w-full md:w-auto">Next Page</a>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { isOk } from 'result-async'
import { parseISO, isValid, format } from 'date-fns'

export default {
  name: 'docs',
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      docs: state => state.docs.docs
    })
  },
  async created () {
    // If there is no docs in the store, call 'loadDocs'
    if (!this.$store.getters['docs/docs'].length) {
      this.isLoading = true
      const res = await this.$store.dispatch('docs/loadDocs')
      if (isOk(res)) {
        this.isLoading = false
      } else {
        // TODO Launch missile and toaster
      }
    }
  },
  methods: {
    formatDate (doc) {
      try {
        const updated = parseISO(doc.updatedAt)
        if (isValid(updated)) {
          return format(updated, 'MMM do, yyyy')
        } else {
          return ''
        }
      } catch (err) {
        // console.log('format date error: ' + err)
      }
    },
    async tagHandler (tag) {
      this.isLoading = true
      const res = await this.$store.dispatch('docs/loadTagSearch', tag)
      if (isOk(res)) {
        this.isLoading = false
      } else {
        // TODO Launch toaster
      }
    }
  }
}
</script>
