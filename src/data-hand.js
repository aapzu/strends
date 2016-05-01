var _ = require('underscore');
var Twitter = require('twitter');
var twitterConfig = require('../config/twitter')
var streamrConfig = require('../config/streamr')
var rest = require('restler');

function DataHand(options) {
    var _this = this;

    this.limit = true

    this.wordList = {}

    this.twitterClient = new Twitter({
        consumer_key: twitterConfig.consumer_key,
        consumer_secret: twitterConfig.consumer_secret,
        access_token_key: twitterConfig.access_token_key,
        access_token_secret: twitterConfig.access_token_secret
    });

    this.buildRequest = function(words){
        this.request = ""
        if (_.isObject(words) || _.isArray(words) || words === undefined || words == '') {
            if(words !== undefined && words != ''){
                this.wordList = {}
                if(words instanceof Array)
                    _.each(words, function(word){
                        _this.wordList[word] = 1
                    })
                else if(_.isObject(words))
                    this.wordList = words
            }
            this.request = "";
            var max = (_.keys(this.wordList)).length - 1
            _.each(_.keys(this.wordList), function(word){
                if(max == 0){
                    _this.request += word
                } else {
                    _this.request += word + ","
                }
                max--;
            })
        } else {
            this.request = words;
            var list = words.split(",")
            _.each(list, function(item){
                item = item.trim()
                _this.wordList[item] = 1
            })
        }
        // We must URL encode the request
        this.request = encodeURI(this.request)
    }

    this.stream = function(words){
        if(!words){
            words = this.wordList
        }
        this.buildRequest(words)

        console.log("Streaming started! Request: '"+this.request+"'")
        this.twitterClient.stream('statuses/filter', {track: this.request}, function(stream) {
            _this.twitterStream = stream
            stream.on('data', function(tweet) {
                _this.processTweet(tweet)
            });

            stream.on('error', function(error) {
                console.log("Error: "+error)
            });
        });
    };

    this.processTweet = function(tweet){
        if (tweet.limit) {
            this.limit = true
            console.log("Rate limited: " + tweet.limit.track);
        } else {
            var message = _this.parse(tweet)
            message = JSON.stringify(message)
            if (this.limit) {
                console.log("Tweet received!")
                this.limit = false
            }
            rest.post('http://data.streamr.com/json', {
                headers: {
                    Stream: streamrConfig.stream_id,
                    Auth: streamrConfig.stream_auth
                },
                data: message
            }).on('complete', function (data, response) {
                if (!response) console.log("Warn: response was null")
            });
        }
    }

    this.pushToWordList = function(word){
        this.wordList[word] = ( this.wordList[word] !== undefined ? this.wordList[word] : 0 ) +1
    }

    this.addWord = function(word){
        this.pushToWordList(word)
        this.stream()
    }

    this.addWordList = function(wordList){
        var _this = this
        _.each(wordList, function(word){
            _this.pushToWordList(word)
        })
        this.stream()
    }

    this.removeWord = function(word) {
        this.wordList[word] = this.wordList[word] - 1
        if(this.wordList[word] == 0)
            delete this.wordList[word]
        if (_.keys(this.wordList).length == 0) {
            this.destroy()
        } else {
            this.stream()
        }
    }

    this.parse = function(tweet) {
        var tweetObject = {};
        if(tweet.text) {
            var text = tweet.text.toLowerCase();
            var keys = _.keys(this.wordList)
            _.each(keys, function (request) {
                request = escape(request).toLowerCase()
                if (text.match(request)) {
                    tweetObject[request] = tweet
                }
            })
        }
        return tweetObject
    }

    this.destroy = function() {
        if(this.twitterStream)
            this.twitterStream.destroy()
    }

    this.isStreaming = function(){
        return this.twitterStream != undefined
    }

    return this
}

module.exports = DataHand;