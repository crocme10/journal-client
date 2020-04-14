<template>
  <div class='m-4'> <!-- This wrappes the whole section -->
    <div v-if="isLoading">
      <Spinner />
    </div>
    <div v-else class='grid md:grid-cols-3 gap-4'> <!-- cards are in a 3 column grid -->
      <div v-for='doc in docs' :key='doc.id' class='relative bg-gray-100 border rounded-lg shadow overflow-hidden'>
        <a :href='"/doc/" + doc.id'>
          <img :src='"/img/" + doc.front.image + ".jpg"' :alt='doc.front.image' class='h-48 w-full object-cover object-top'/>
        </a>
        <div class='p-4'>
          <a :href='"/doc/" + doc.id'>
            <h4 class='font-header text-lg font-bold text-center'>{{ doc.front.title }}</h4>
            <p class='mt-4 text-gray-800 leading-snug'>{{ doc.front.outline }}</p>
          </a>
          <div class='mt-4 mb-8 flex flex-wrap'>
            <button v-for='tag in doc.front.tags' :key='tag' @click="tagHandler(tag)" class='bg-gray-300 mt-2 mr-2 px-2 text-xs text-gray-800 rounded-full uppercase font-semibold tracking-wide'>
              {{ tag }}
            </button>
          </div>
          <p class='absolute bottom-0 right-0 mr-4 mb-4 bg-gray-700 px-2 text-xs text-white rounded-full uppercase font-semibold tracking-wide'>{{ doc.front.genre }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isOk } from 'result-async'
import { parseISO, isValid, format } from 'date-fns'
import Spinner from '@/components/Spinner'

export default {
  name: 'docs',
  components: {
    Spinner
  },
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
