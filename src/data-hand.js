var _ = require('underscore');
var Twitter = require('twitter');
var rest = require('restler');

function DataHand(options) {
    var _this = this;

    this.limit = true

    this.list = []

    this.client = new Twitter({
        consumer_key: options.twitter.consumer_key,
        consumer_secret: options.twitter.consumer_secret,
        access_token_key: options.twitter.access_token_key,
        access_token_secret: options.twitter.access_token_secret
    });

    this.buildRequest = function(words){
        var request
        if (words instanceof Array || words === undefined || words == '') {
            if(words !== undefined && words != '')
                _this.list = words;
            request = "";
            for(var i = 0; i < this.list.length; i++){
                request += this.list[i]
                if(i != this.list.length-1)
                    request += ","
            }
        } else {
            request = words;
            _this.list = words.split(",")
            _this.list.forEach(function (item) {
                item = item.trim()
            })
        }
        // We must URL encode the request first
        request = encodeURI(request)
        return request
    }

    this.stream = function(words){
        var request = this.buildRequest(words)

        console.log("Streaming started! Request: '"+request+"'")
        this.client.stream('statuses/filter', {track: request}, function(stream) {
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

    this.addWord = function(word){
        if(!_.contains(this.list, word)){
            this.list.push(word)
        }
        this.stream()
    }

    this.removeWord = function(word) {
        this.list = _.without(this.list, word)
        if (this.list.length == 0) {
            this.destroy()
        } else {
            this.stream()
        }
    }

    this.changeWord = function(word, newWord){
        var index = this.list.indexOf(word)
        if(index !== -1)
            this.list[index] = newWord
        this.stream()
    }

    this.parse = function(tweet) {
        var tweetObject = {};
        if(tweet.text) {
            var text = tweet.text.toLowerCase();
            _.each(_this.list, function (request) {
                request = escape(request).toLowerCase()
                if (text.match(request)) {
                    tweetObject[request] = tweet
                }
            })
        }
        return tweetObject
    };

    this.isStreaming = function(){
        return this.twitterStream != undefined
    }

    return this
}

module.exports = DataHand;