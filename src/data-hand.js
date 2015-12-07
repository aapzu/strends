var _ = require('underscore');
var Twitter = require('twitter');
var rest = require('restler');

function DataHand(options) {
    var _this = this;

    this.client = new Twitter({
        consumer_key: options.twitter.consumer_key,
        consumer_secret: options.twitter.consumer_secret,
        access_token_key: options.twitter.access_token_key,
        access_token_secret: options.twitter.access_token_secret
    });

    this.stream = function(words){
        var request
        if (words instanceof Array || words === undefined || words == '') {
            if(words !== undefined && words != '')
                _this.list = words;
            request = "";
            _this.list.forEach(function (item) {
                request += item;
                request += ","
            });
        } else {
            request = words;
            _this.list = words.split(",")
            _this.list.forEach(function (item) {
                item = item.trim()
            })
        }
        // We must URL encode the request first
        request = encodeURI(request)

        var limit = true

        console.log("Streaming started! Request: '"+request+"'")
        this.client.stream('statuses/filter', {track: request}, function(stream) {
            _this.twitterStream = stream
            stream.on('data', function(tweet) {
                if (tweet.limit) {
                    limit = true
                    console.log("Rate limited: " + tweet.limit.track);
                } else {
                    var message = JSON.stringify(_this.parse(tweet))
                    if(limit){
                        console.log("Tweet received!")
                        limit = false
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
            });

            stream.on('error', function(error) {
                console.log("Error: "+error)
            });
        });
    };

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

/*
    this.
*/

    this.destroy = function(){
        if(this.twitterStream){
            this.twitterStream.destroy()
            console.log("Stream destroyed!")
        } else {
            console.log("No stream found!")
        }
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

    return this
}

module.exports = DataHand;