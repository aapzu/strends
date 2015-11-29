var _ = require('underscore')
var Twitter = require('twitter');
var rest = require('restler');

function DataHand(options) {
    var _this = this


    this.client = new Twitter({
        consumer_key: options.twitter.consumer_key,
        consumer_secret: options.twitter.consumer_secret,
        access_token_key: options.twitter.access_token_key,
        access_token_secret: options.twitter.access_token_secret
    });

    this.stream = function(list){
        var request = ""
        _this.list = list
        list.forEach(function(item){
            request += item
            request += ","
        })

        this.client.stream('statuses/filter', {track: request}, function(stream) {
            stream.on('data', function(tweet) {
                var a = JSON.stringify(_this.parse(tweet))
                if (tweet.limit)
                    console.log("Rate limited: "+tweet.limit.track)
                else {
                    rest.post('http://data.streamr.com/json', {
                        headers: {
                            Stream: options.streamr.stream_id,
                            Auth: options.streamr.stream_auth
                        },
                        data: a
                    }).on('complete', function(data, response) {
                        if (!response) console.log("Warn: response was null")
                    });
                }
            });

            stream.on('error', function(error) {
                console.log("Error: "+error)
            });
        });
    }

    this.parse = function(tweet) {
        var text
        var tweetObject = {}
        if(tweet.text) {
            var text = tweet.text.toLowerCase()
            _.each(_this.list, function (request) {
                if (text.match(request)) {
                    tweetObject[request] = tweet
                }
            })
        }
        return tweetObject
    }

    return this
}

module.exports = DataHand;