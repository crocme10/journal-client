<template>
  <article class="container mx-auto py-24 px-4" itemid="#" itemscope itemtype="http://schema.org/BlogPosting">
    <div class="w-full md:w-10/12 lg:w-3/4 mx-auto text-left mb-12">
      <img :src='"/img/" + doc.front.image + ".jpg"' :alt='doc.front.image' class="object-cover bg-center h-64 w-full rounded-lg" />
      <p class="mt-6 mb-2 text-primary uppercase tracking-wider font-semibold text-xs">Development</p>
      <h1 class="text-3xl md:text-4xl text-gray-900 leading-tight mb-3 font-bold" itemprop="headline" title="Rise of Tailwind - A Utility First CSS Framework">
        {{ doc.front.title }}
      </h1>
      <div class="flex space-x-2 mb-6">
        <a v-for='tag in doc.front.tags' :key='tag' class="badge badge-light text-header text-base" href="#">{{ tag }}</a>
      </div>
      <a class="text-gray-700 flex items-center" href="#">
        <!-- FIXME Get Avatar pic <div class="avatar"><img src="/placeholder.jpg" alt="Photo of Praveen Juge" /></div> -->
        <div class="ml-2">
          <!-- FIXME Get Author name <p class="text-base font-semibold text-gray-900">{{ doc.front.author }}</p>-->
          <p class="text-base text-gray-600">Updated {{ doc.updatedAt }}</p>
        </div>
      </a>
    </div>
    <div class="doc w-full md:w-10/12 lg:w-3/4 prose mx-auto font-text text-base">
      <div v-html='doc.content' />
    </div>
  </article>
</template>

<script>
import { mapActions } from 'vuex'
import { parseISO, isValid, format } from 'date-fns'
import markdown from '@/utils/markdown'

export default {
  name: 'doc',
  props: {
    id: String
  },
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
  methods: {
    ...mapActions({
      loadDocDetails: 'docs/loadDocDetails'
    })
  },
  async created () {
    await this.loadDocDetails(this.id)
    this.doc = this.$store.getters['docs/doc']
    this.doc.content = markdown.render(this.doc.content)
    const updated = parseISO(this.doc.updatedAt)
    if (isValid(updated)) {
      this.doc.updatedAt = format(updated, 'MMM do, yyyy')
    } else {
      this.doc.updatedAt = ''
    }
  }
}
</script>

<style>
  .doc h1, .doc h2, .doc h3, .doc h4 {
    @apply font-header
  }

  /* purgecss start ignore */
  /* Markdown Styles */
  /* Global */

  .prose {
    max-width: 80ch;
  }

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
