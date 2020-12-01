import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItTocDoneRight from 'markdown-it-toc-done-right'
import MarkdownItMathJax from '@area403/markdown-it-mathjax'
import MarkdownItGridTables from 'markdown-it-gridtables'
import MarkdownItContainer from 'markdown-it-container'
import Highlight from 'highlight.js'

class Markdown {
  constructor () {
    const md = new MarkdownIt({
      preset: 'default',
      linkify: false,
      html: true,
      xhtmlOut: true,
      typographer: true,
      highlight: function (str, lang) {
        if (lang && Highlight.getLanguage(lang)) {
          try {
            return Highlight.highlight(lang, str).value
          } catch (__) {
            // console.log('Highlight Alert')
          }
        }

        return '' // use external default escaping
      }
    })

    md.use(MarkdownItAnchor, {
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '§'
    })

    md.use(MarkdownItMathJax)

    md.use(MarkdownItGridTables)

    md.use(MarkdownItTocDoneRight)

    md.use(MarkdownItContainer, 'callout', {

      validate: function (params) {
        return params.trim().match(/^callout\s+(.*)$/)
      },

      render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(/^callout\s+(.*)$/)

        if (tokens[idx].nesting === 1) {
          const callout = md.utils.escapeHtml(m[1])
          if (callout === 'warning') {
            return `
              <div class="bg-red-200 flex flex-wrap sm:flex-no-wrap justify-between bg-white rounded overflow-hidden p-2 space-x-0 sm:space-x-2">
                <div class="flex flex-1 sm:flex-initial justify-center items-baseline py-4 sm:py-0">
                  <span class="bg-red-300 bg-opacity-50 rounded-full p-1">
                    <svg class="h-10 sm:h-6 w-auto" fill="none" viewBox="0 0 24 24" stroke="red">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </span>
                </div>
              <div class="flex flex-col flex-grow text-center sm:text-left">
            `
          } else if (callout === 'info') {
            return `
              <div class="bg-blue-200 flex flex-wrap sm:flex-no-wrap justify-between bg-white rounded overflow-hidden p-2 space-x-0 sm:space-x-2">
                <div class="flex flex-1 sm:flex-initial justify-center items-baseline py-4 sm:py-0">
                  <span class="bg-blue-300 bg-opacity-50 rounded-full p-1">
                    <svg class="h-10 sm:h-6 w-auto" fill="none" viewBox="0 0 24 24" stroke="blue">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </span>
                </div>
              <div class="flex flex-col flex-grow text-center sm:text-left">
            `
          } else if (callout === 'question') {
            return `
              <div class="bg-green-200 flex flex-wrap sm:flex-no-wrap justify-between bg-white rounded overflow-hidden p-2 space-x-0 sm:space-x-2">
                <div class="flex flex-1 sm:flex-initial justify-center items-baseline py-4 sm:py-0">
                  <span class="bg-green-300 bg-opacity-50 rounded-full p-1">
                    <svg class="h-10 sm:h-6 w-auto" fill="none" viewBox="0 0 24 24" stroke="green">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </div>
              <div class="flex flex-col flex-grow text-center sm:text-left">
            `
          } else {
            return `
              <div class="unknown">
            `
          }
        } else {
          return '</div></div>\n'
        }
      }
    })
    this.md = md
  }

  render (payload) {
    return this.md.render(payload)
  }
}

export default new Markdown()
