<template>
  <article>
    <h1 class="title has-text-weight-light has-text-primary is-2">
      {{ title }}
    </h1>
    <p class="has-text-weight-light">{{ publishedAt }}</p>
    <div class="content">
      <div v-html="content" />
    </div>
  </article>
</template>

<script>
import format from 'date-fns'
import markdown from '@/utils/markdown'

export default {
  data: () => ({
    title: null,
    publishedAt: null,
    content: null
  }),
  created () {
    this.$store.dispatch('docs/loadDocDetail', this.id).then(res => {
      console.log('loadDoc Response: ', res)
      res.match({
        Err: ({ msg }) => {
          console.log('Load Doc Error: ', msg)
        },
        Ok: () => {
          const doc = this.$store.getters['docs/doc']
          this.title = doc.title
          this.content = markdown.render(doc.content)
          this.publishedAt = format(new Date(doc.updatedAt), 'MMM do, yyyy')
          console.log('Successfully loaded doc.')
        }
      })
    })
  },
  props: {
    id: String
  }
}
</script>
