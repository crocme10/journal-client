function getJournalBaseUrl () {
  if (process.env.VUE_APP_JOURNAL_HOST) {
    return 'http://' + process.env.VUE_APP_JOURNAL_HOST + ':' + process.env.VUE_APP_JOURNAL_PORT
  } else {
    return ''
  }
}

const ApiRoutes = {
  JournalGraphQL: getJournalBaseUrl() + process.env.VUE_APP_JOURNAL_QUERY + '/graphql'
}

export default ApiRoutes
