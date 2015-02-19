var should = require('should');
var News   = require('../lib/news');

describe('News', function() {

  var news    = {};
  var options = {username: 'nitin', message: 'Something just happened'};

  before(function() {
    news = new News(options);
  });

  describe('defaults', function() {

    it('has username', function() {
      news.username.should.eql('nitin');
    });

    it('has message', function() {
      news.message.should.eql('Something just happened');
    });

  });

  describe('toJson', function() {

    it('returns json', function() {
      news.toJson().should.eql(options);
    });

  })
});
