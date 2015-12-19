var _ = require('underscore');
var Twitter = require('twitter');
var rest = require('restler');

function DataHand(options) {
    var _this = this;

    this.limit = true

    this.wordList = {}

    this.client = new Twitter({
        consumer_key: options.twitter.consumer_key,
        consumer_secret: options.twitter.consumer_secret,
        access_token_key: options.twitter.access_token_key,
        access_token_secret: options.twitter.access_token_secret
    });

    this.buildRequest = function(words){
        this.request = ""
        this.wordList = {}
        if (_.isObject(words) || _.isArray(words) || words === undefined || words == '') {
            if(words !== undefined && words != ''){
                if(words instanceof Array)
                    _.each(words, function(word){
                        _this.wordList[word] = 1
                    })
                else if(_.isObject(words))
                    this.wordList = words
            }
            this.request = "";
            var max = _.keys(this.wordList).size() - 1
            _.each(_.keys(this.wordList, function(word){
                if(max == 0){
                    request += word
                } else {
                    request += word + ","
                }
            }))
        } else {
            this.request = words;
            var list = words.split(",")
            list.forEach(function(item){
                item = item.trim()
                this.wordList[item] = 1
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
        this.client.stream('statuses/filter', {track: this.request}, function(stream) {
            _this.twitterStream = stream
            stream.on('data', function(tweet) {
                if (typeof tweet === 'string' || tweet instanceof String)
                    console.log(tweet)
                else
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
            try {
                message = JSON.stringify(message)
            } catch (e) {
                console.log(message)
            }
            if(this.limit){
                console.log("Tweet received!")
                this.limit = false
            }
            rest.post('http://data.streamr.com/json', {
                headers: {
                    Stream: options.streamr.stream_id,
                    Auth: options.streamr.stream_auth
                },
                data: message
            }).on('complete', function(data, response) {
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

    this.removeWord = function(word) {
        this.wordList[word] = this.wordList[word] - 1
        if(this.wordList[word] == 0)
            this.wordList[word] = undefined
        if (_.keys(this.wordList).length == 0) {
            this.destroy()
        } else {
            this.stream()
        }
    }

    this.parse = function(tweet) {
        var tweetObject = {};
        if(!tweet.text) {
            var text = tweet.text.toLowerCase();
            _.each(_.keys(this.wordList), function (request) {
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