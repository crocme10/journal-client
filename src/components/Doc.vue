<template>
  <div class='m-4'>
    <img :src='"/img/" + doc.image + ".jpg"' :alt='doc.image' class='h-48 w-full object-cover object-top'/>
    <div class='container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded' :style='{ backgroundImage: `url("${doc.image}")`, height: "5vh"}'></div>
    <h1 class='mt-8 text-3xl text-center font-header'>{{ doc.title }}</h1>
    <p class='text-gray-800'>{{ doc.updatedAt }}</p>
    <p class='text-gray-800 mt-4 px-8'>{{ doc.outline }}</p>
    <div class='mt-8'>
      <div v-html='doc.content' />
    </div>
  </div>
</template>

<script>
import { isOk } from 'result-async'
import { parseISO, isValid, format } from 'date-fns'
import markdown from '@/utils/markdown'

export default {
  data () {
    return {
      // We provide a default (empty) doc
      doc: {
        id: '',
        title: '',
        outline: '',
        author: '',
        tags: [],
        image: '',
        kind: '',
        genre: '',
        updatedAt: ''
      }
    }
  },
  created () {
    this.$store.dispatch('docs/loadDocDetail', this.id).then(res => {
      if (isOk(res)) {
        this.doc = this.$store.getters['docs/doc']
        this.doc.content = markdown.render(this.doc.content)
        const updated = parseISO(this.doc.updatedAt)
        if (isValid(updated)) {
          this.doc.updatedAt = format(updated, 'MMM do, yyyy')
        } else {
          this.doc.updatedAt = ''
        }
        // console.log('Load DocDetails Success.')
      } else {
        // console.log('Load DocDetails Error: ', res.error)
      }
    })
  },
  props: {
    id: String
  }
}
</script>
