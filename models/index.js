var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));


var pageSchema = new mongoose.Schema({
  title:    {type: String, required: true, minLength: 1},
  url_name: String,
  owner_id: String,
  content:  {type: String, required: true},
  date:     { type: Date, default: Date.now },
  status:   Number,
  tags: [String]
});

pageSchema.virtual('full_route').get(function() {

})

pageSchema.statics.findByTag = function(tag, cb) {
  return this.find({tag: {$in: [tag]}}, cb);
};

pageSchema.path('tags').set(function(tagsString) {
    return tagsString
    .split(',')
    .map(function(tag) {
      return tag.trim()
    })
})

pageSchema.pre('save', function(next) {
  this.url_name = this.title
    .toLowerCase()
    .replace(/\s/ig, '_')
    .replace(/\W/ig,'');
  next()
})

var userSchema = new mongoose.Schema({
  name:  { first: String, last: String },
  email: String
});

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};