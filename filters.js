var marked = require('marked')

module.exports = function(swig) {
  var pageLinkFilter = function(pageObj) {
      return "<a href='" + pageObj.url_name + "'>" + pageObj.title + "</a>"
  }
  pageLinkFilter.safe = true
  swig.setFilter('page_link', pageLinkFilter)

  marked.safe = true
  swig.setFilter('marked', marked)


}
