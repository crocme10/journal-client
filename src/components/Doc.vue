<template>
  <div class='mt-4'>
    <img :src='"/img/" + doc.front.image + ".jpg"' :alt='doc.front.image' class='h-48 w-full object-cover object-top'/>
    <!--<div class='container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded' :style='{ backgroundImage: `"/img/" + doc.front.image + ".jpg"`, height: "5vh"}'></div>-->
    <h1 class='mt-4 mb-8 text-4xl text-center font-header font-bold'>{{ doc.front.title }}</h1>
    <p class='text-gray-800'>{{ doc.updatedAt }}</p>
    <p class='text-gray-600 mt-4 mb-8 px-8 text-lg'>{{ doc.front.outline }}</p>
    <div class='mt-8 markdown'>
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
        front: {
          title: '',
          outline: '',
          author: '',
          tags: [],
          image: '',
          kind: '',
          genre: ''
        },
        updatedAt: '',
        content: ''
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

<style>
  /* .doc h1, .doc h2, .doc h3, .doc h4 {
     @apply font-header
     }
  */

  /* purgecss start ignore */
  /* Markdown Styles */
  /* Global */

  .markdown {
    @apply leading-relaxed text-lg text-gray-800
  }

  /* Headers */
  .markdown h1 {
    @apply text-4xl my-6 font-header font-bold
  }
  .markdown h2 {
    @apply text-3xl my-6 font-header font-bold
  }
  .markdown h3 {
    @apply text-2xl my-4 font-header font-semibold
  }
  .markdown h4 {
    @apply text-xl my-4 font-header font-semibold
  }
  .markdown h5 {
    @apply text-xl my-4 font-header font-medium
  }
  .markdown h6 {
    @apply text-lg my-3 font-header font-medium
  }

  /* Links */
  .markdown a {
    @apply text-blue-600
  }
  .markdown a:hover {
    @apply underline
  }

  /* Paragraph */
  .markdown p {
    @apply mb-4 mt-4
  }

  /* Lists */
  .markdown ul,
  .markdown ol {
    @apply mb-4 ml-8
  }
  .markdown li > p,
  .markdown li > ul,
  .markdown li > ol {
    @apply mb-0
  }
  .markdown ol {
    @apply list-decimal
  }
  .markdown ul {
    @apply list-disc
  }

  /* Blockquotes */
  .markdown blockquote {
    @apply p-0 p-2 mx-6 bg-gray-100 mb-4 border-l-4 border-gray-400 italic
  }
  .markdown blockquote > p {
    @apply mb-0
  }

  /* Images */
  .markdown img {
    @apply mx-auto
  }

  /* Tables */
  .markdown table {
    @apply mx-auto
  }
  .markdown td,
  .markdown th {
    @apply px-2 py-1 border border-gray-400
  }
  .markdown tr:nth-child(odd) {
    @apply bg-gray-100
  }
  .markdown table {
    @apply mb-6
  }

  /* Code */
  .markdown code {
    @apply p-0 font-code text-base
  }

  /* Code: special case for diagram, we don't want space between
   * box characters, so we reduce the line spacing */
  .markdown code.language-diagram {
    @apply leading-none inline-block align-middle
  }

  .markdown pre {
    @apply bg-gray-200 border
  }

  .markdown pre {
    @apply font-code rounded-none block px-4 py-2 whitespace-pre
  }

  /* Base16 Atelier Estuary Light - Theme */
  /* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/estuary) */
  /* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

  /* Atelier-Estuary Comment */
  .hljs-comment,
  .hljs-quote {
    color: #6c6b5a;
  }

  /* Atelier-Estuary Red */
  .hljs-variable,
  .hljs-template-variable,
  .hljs-attribute,
  .hljs-tag,
  .hljs-name,
  .hljs-regexp,
  .hljs-link,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class {
    color: #ba6236;
  }

  /* Atelier-Estuary Orange */
  .hljs-number,
  .hljs-meta,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-literal,
  .hljs-type,
  .hljs-params {
    color: #ae7313;
  }

  /* Atelier-Estuary Green */
  .hljs-string,
  .hljs-symbol,
  .hljs-bullet {
    color: #7d9726;
  }

  /* Atelier-Estuary Blue */
  .hljs-title,
  .hljs-section {
    color: #36a166;
  }

  /* Atelier-Estuary Purple */
  .hljs-keyword,
  .hljs-selector-tag {
    color: #5f9182;
  }

  .hljs-deletion,
  .hljs-addition {
    color: #22221b;
    display: inline-block;
    width: 100%;
  }

  .hljs-deletion {
    background-color: #ba6236;
  }

  .hljs-addition {
    background-color: #7d9726;
  }

  .hljs {
    display: block;
    overflow-x: auto;
    background: #f4f3ec;
    color: #5f5e4e;
    padding: 0.5em;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }
</style>
