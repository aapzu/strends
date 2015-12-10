var assert = require('assert')
var proxyquire = require('proxyquire')

var DataHand

describe('DataHand', function(){
    var options
    var mockTwitter
    var dataHand
    before(function(){
        dataHandOptions = {
            twitter: {
                consumer_key: "test_consumer_key",
                consumer_secret: "test_consumer_secret",
                access_token_key: "test_access_token_key",
                access_token_secret: "test_access_token_secret"
            },
            streamr: {
                stream_id: "test_stream_id",
                stream_auth: "test_stream_auth"
            }
        }
    })

    it('should create new twitter instance with the given options', function(done){
        var options = {
            twitter: {
                consumer_key: 1
            },
            streamr: 2
        }
        DataHand = proxyquire('../../src/data-hand.js', {
            twitter: function(opts){
                assert.equal(opts.consumer_key, 1)
                done()
            }
        })
        new DataHand(options)
    })

    describe('buildRequest', function(){
        var request
        beforeEach(function(){
            DataHand = proxyquire('../../src/data-hand.js', {
                twitter: function(){}
            })
            dataHand = new DataHand(dataHandOptions)
        })
        it('must build the request if the words are in a string', function(){
            request = dataHand.buildRequest("test1,test2,test3")
        })
        it('must build the request if the words are in a list', function(){
            request = dataHand.buildRequest([
                "test1",
                "test2",
                "test3"
            ])
        })
        it('must use the existing list if the words are undefined', function(){
            dataHand.list = [
                "test1",
                "test2",
                "test3"
            ]
            request = dataHand.buildRequest()
        })

        afterEach('check the request and list', function(){
            assert(request == "test1,test2,test3," || request == "test1,test2,test3")
            assert.equal(["test1","test2","test3"].toString(), dataHand.list.toString())
            request = undefined
        })
    })

    describe('addWord', function(){
        beforeEach(function(){
            DataHand = proxyquire('../../src/data-hand.js', {
                twitter: function(){}
            })
            dataHand = new DataHand(dataHandOptions)
        })

        it('must add the word if it is not in the list', function(){
            dataHand.stream = function(){}
            dataHand.addWord("test")
            assert.equal(dataHand.list.length, 1)
            assert.equal(dataHand.list[0], "test")
        })

        it('must not add the word if it is already in the list', function(){
            dataHand.stream = function(){}
            dataHand.list = ["test"]
            dataHand.addWord("test")
            assert.equal(dataHand.list.length, 1)
            assert.equal(dataHand.list[0], "test")
        })

        it('must call stream', function(done){
            var calls = 0
            dataHand.stream = function(){
                done()
            }
            dataHand.addWord("test")
        })
    })

    describe('removeWord', function(){
        beforeEach(function(){
            DataHand = proxyquire('../../src/data-hand.js', {
                twitter: function(){}
            })
            dataHand = new DataHand(dataHandOptions)
        })

        it('must remove the word if it is in the list', function(){
            dataHand.stream = function(){}
            dataHand.list = ["test", "test2"]
            dataHand.removeWord("test")
            assert.equal(dataHand.list.toString(), ["test2"].toString())
        })

        it('must do nothing if the word is not in the list', function(){
            dataHand.stream = function(){}
            dataHand.list = ["test", "test2"]
            dataHand.removeWord("test3")
            assert.equal(dataHand.list.toString(), ["test","test2"].toString())
        })

        it('must call stream if the removed item was not the last one', function(done){
            dataHand.stream = function(){
                done()
            }
            dataHand.destroy = function(){
                throw "Destroy called!"
            }
            dataHand.list = ["test", "test2"]
            dataHand.removeWord("test2")
        })

        it('must call destroy if the removed item was the last one', function(done){
            dataHand.stream = function(){
                throw "Stream called!"
            }
            dataHand.destroy = function(){
                done()
            }
            dataHand.list = ["test"]
            dataHand.removeWord("test")
        })
    })

    describe('changeWord', function(){
        beforeEach(function(){
            DataHand = proxyquire('../../src/data-hand.js', {
                twitter: function(){}
            })
            dataHand = new DataHand(dataHandOptions)
        })

        it('must change the word if it is in the list', function(){
            dataHand.stream = function(){}
            dataHand.list = ["test", "test2"]
            dataHand.changeWord("test", "test3")
            assert.equal(dataHand.list.toString(), ["test3","test2"].toString())
        })

        it('must do nothing if the word is not in the list', function(){
            dataHand.stream = function(){}
            dataHand.list = ["test", "test2"]
            dataHand.changeWord("test3", "test4")
            assert.equal(dataHand.list.toString(), ["test","test2"].toString())
        })

        it('must call stream', function(done){
            var calls = 0
            dataHand.stream = function(){
                done()
            }
            dataHand.addWord("test")
        })
    })

    describe('destroy', function(){
        beforeEach(function(){
            DataHand = proxyquire('../../src/data-hand.js', {
                twitter: function(){}
            })
            dataHand = new DataHand(dataHandOptions)
        })

        it('must not throw error if there is no twitterStream defined', function(done){
            dataHand.destroy()
            done()
        })

        it('must destroy the stream if the twitterStream is defined', function(done){
            dataHand.twitterStream = {
                destroy: function(){
                    done()
                }
            }
            dataHand.destroy()
        })
    })

    describe('parse', function(){
        it('is not made yet', function(){
            assert(false)
        })
    })

    describe('stream', function(){
        it('is not made yet', function(){
            assert(false)
        })
    })

    describe('processTweet', function() {
        beforeEach(function () {
            DataHand = proxyquire('../../src/data-hand.js', {
                twitter: function () {
                },
                restler: {
                    post: function(){
                        return {
                            on: function(){}
                        }
                    }
                }
            })
            dataHand = new DataHand(dataHandOptions)
        })

        it('must just change the value of limit if the tweet has field limit', function(){
            dataHand.limit = false
            dataHand.processTweet({
                limit: true
            })
            assert(dataHand.limit)
        })

        it('must change the limit value back to false', function(){
            dataHand.processTweet({
                test: "test"
            })
            assert(!dataHand.limit)
        })

        it('must parse and post the stringified tweet to right url with right headers', function(done){
            parsed = false
            DataHand = proxyquire('../../src/data-hand.js', {
                restler: {
                    post: function(url, options){
                        assert.equal(url, 'http://data.streamr.com/json')
                        assert.equal(options.headers.Stream, "test_stream_id")
                        assert.equal(options.headers.Auth, "test_stream_auth")
                        assert.equal(options.data, '{"test1":"test1","test2":"test2"}')
                        assert(parsed)
                        done()
                        return {
                            on: function(){}
                        }
                    }
                }
            })
            dataHand = new DataHand(dataHandOptions)
            dataHand.parse = function(tweet){
                parsed = true
                return tweet
            }
            dataHand.processTweet({
                test1: "test1",
                test2: "test2"
            })
            assert(!dataHand.limit)
        })
    })

})