<template>
  <div class='m-4'> <!-- This wrappes the whole section -->
    <div class='grid md:grid-cols-3 lg:grid-cols-4 gap-4'> <!-- cards are in a 3 column grid -->
      <div v-for='doc in docs' :key='doc.id' class='relative bg-gray-100 border rounded-lg shadow overflow-hidden'>
        <a :href='"/doc/" + doc.id'>
          <img :src='"/img/" + doc.image + ".jpg"' :alt='doc.image' class='h-48 w-full object-cover object-top'/>
        </a>
        <div class='p-4'>
          <a :href='"/doc/" + doc.id'>
            <h4 class='font-header text-lg font-bold text-center'>{{ doc.title }}</h4>
            <p class='mt-4 text-gray-800 leading-snug'>{{ doc.outline }}</p>
          </a>
          <div class='mt-4 mb-8 flex flex-wrap'>
            <p v-for='tag in doc.tags' :key='tag' class='bg-gray-300 mt-2 mr-2 px-2 text-xs text-gray-800 rounded-full uppercase font-semibold tracking-wide'>
              {{ tag }}
            </p>
          </div>
          <p class='absolute bottom-0 right-0 mr-4 mb-4 bg-gray-700 px-2 text-xs text-white rounded-full uppercase font-semibold tracking-wide'>{{ doc.genre }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isOk } from 'result-async'
import { parseISO, isValid, format } from 'date-fns'

export default {
  created () {
    // If there is no docs in the store, call 'loadDocList'
    if (!this.$store.getters['docs/docs'].length) {
      console.log('loading Documents')
      try {
        this.$store.dispatch('docs/loadDocs').then(res => {
          if (isOk(res)) {
            console.log('load docs ok')
          }
        })
      } catch (err) {
        console.log('caught error 1: ' + err)
      }
    }
  },
  computed: {
    docs () {
      return this.$store.getters['docs/docs']
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
        console.log('format date error: ' + err)
      }
    }
  }
}
</script>
