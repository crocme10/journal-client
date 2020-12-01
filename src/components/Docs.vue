<template>
  <section class="container mx-auto py-24 px-4">
    <h2 class="text-3xl text-gray-900 leading-tight mb-2 font-extrabold">Documents</h2>
    <p class="text-lg text-gray-600 mb-20">Comes directly from the desk of crocme10</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12">
      <div v-for='doc in docs' :key='doc.id'>
        <a :href='"/doc/" + doc.id'>
          <img :src='"/img/" + doc.front.image.title + ".jpg"' :alt='doc.front.image.title'
            class="object-cover bg-center h-56 w-full rounded mb-5" loading="lazy" />
        </a>
        <h2 class="text-gray-900 text-lg font-semibold mb-2">
          <a :href='"/doc/" + doc.id' class="text-gray-900 hover:text-purple-700">{{ doc.front.title }}</a>
        </h2>
        <p class="text-sm text-gray-600 font-normal mb-3">{{ doc.front.outline }}</p>
        <p class="text-sm text-gray-600 font-normal mb-3">
          <a href="#" class="text-gray-900 hover:text-purple-700 font-medium">{{ doc.front.author.fullname }}</a>
          {{ formatDate(doc) }}
        </p>
        <div class='mt-4 mb-8 flex flex-wrap'>
          <button v-for='tag in doc.front.tags' :key='tag' @click="tagHandler(tag)" class='bg-gray-300 mt-2 mr-2 px-2 text-xs text-gray-800 rounded-full uppercase font-semibold tracking-wide'>
            {{ tag }}
          </button>
          <button class='bg-gray-300 mt-2 mr-2 px-2 text-xs text-gray-800 rounded-full uppercase font-semibold tracking-wide'>
            {{ doc.front.genre }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { parseISO, isValid, format } from 'date-fns'

export default {
  name: 'docs',
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      docs: 'docs/docs'
    })
  },
  async created () {
    // If there is no docs, call 'loadDocs'
    if (!this.docs.length) {
      this.isLoading = true
      await this.loadDocs()
      this.isLoading = false
    }
  },
  methods: {
    ...mapActions({
      loadDocs: 'docs/loadDocs',
      loadTagSearch: 'docs/loadTagSearch'
    }),
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
      await this.loadTagSearch(tag)
    }
  }
}
</script>
