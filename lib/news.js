var assert = require('assert');

var News = function (args) {

  var news = {};

  news.username = args.username;
  news.message  = args.message;
  news.errors   = [];

  news.validate = function() {
    try {
      assert.ok(args.username, 'Need to specify username');
      assert.ok(args.message, 'Need to specify message');
      return true;

    } catch(e) {
      if (e instanceof assert.AssertionError) {
        this.errors.push(e.message);
        return false;
      } else {
        throw(e);
      }
    }
  };

  news.toJson = function() {
    return {
      username: this.username,
      message: this.message
    };
  };

  return news;
};

module.exports = News;
