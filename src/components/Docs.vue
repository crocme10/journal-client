<template>
  <div class="post-feed">
    <article
      v-for="doc in docs"
      :key="doc.id"
      class="post-card post tag-dev-suite tag-distributed featured "
    >
      <a class="post-card-image-link" v-bind:href="'/doc/' + doc.id">
        <img
          class="post-card-image"
          v-bind:srcset="'/img/' + doc.image + '-1x.jpg 1x, /img/' + doc.image + '-3x.jpg 3x'"
          v-bind:src="'/img/' + doc.image + '-1x.jpg'"
          v-bind:alt="doc.image"
        />
      </a>
      <div class="post-card-content">
        <a class="post-card-content-link" v-bind:href="'/doc/' + doc.id">
          <header class="post-card-header">
            <h4 class="post-card-title">{{ doc.title }}</h4>
          </header>
          <section class="post-card-excerpt">
            <p>{{ doc.excerpt }}</p>
          </section>
        </a>
        <footer class="post-card-meta">
          <!--<ul class="author-list">
            <li class="author-list-item">
              <div class="author-name-tooltip">
                {{ doc.author }}
              </div>
              <a href="doc.author.link" class="static-avatar">
                <img
                  class="author-profile-image"
                  src="doc.author"
                  alt="doc.author"
                />
              </a>
            </li>
          </ul>-->
          <p class="post-card-tags">{{ doc.tags.toString() }}</p>
          <p class="post-card-tags">{{ doc.genre }}</p>
        </footer>
      </div>
    </article>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  created () {
    // If there is no docs in the store, call 'loadDocList'
    if (!this.$store.getters['docs/docs'].length) {
      console.log('loading Documents')
      this.$store.dispatch('docs/loadDocs').then(res => {
        res.match({
          Err: ({ msg }) => {
            console.log('Load Doc List Error: ', msg)
          },
          Ok: () => {
            console.log('Successfully loaded doc list')
          }
        })
      })
    }
  },
  computed: {
    docs () {
      return this.$store.getters['docs/docs']
    }
  },
  methods: {
    formatDate (doc) {
      return format(new Date(doc.updatedAt), 'MMM do, yyyy')
    }
  }
}
</script>
