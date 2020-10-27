import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItTocDoneRight from 'markdown-it-toc-done-right'
import MarkdownItMathJax from '@area403/markdown-it-mathjax'
import MarkdownItGridTables from 'markdown-it-gridtables'
import Highlight from 'highlight.js'

class Markdown {
  constructor () {
    const md = new MarkdownIt({
      preset: 'default',
      linkify: false,
      html: false,
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

    this.md = md
  }

  render (payload) {
    return this.md.render(payload)
  }
}

export default new Markdown()
