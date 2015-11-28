
function DataHand(options) {
    var Twitter = require('twitter');
    var rest = require('restler');


    var client = new Twitter({
        consumer_key: options.twitter.consumer_key,
        consumer_secret: options.twitter.consumer_secret,
        access_token_key: options.twitter.access_token_key,
        access_token_secret: options.twitter.access_token_secret
    });

    client.stream('statuses/filter', {track: 'winter'}, function(stream) {
        stream.on('data', function(tweet) {
            if (tweet.limit)
                console.log("Rate limited: "+tweet.limit.track)
            else {
                console.log(tweet.text)

                rest.post('http://data.streamr.com/json', {
                    headers: {
                        Stream: options.streamr.stream_id,
                        Auth: options.streamr.stream_auth
                    },
                    data: JSON.stringify(tweet)
                }).on('complete', function(data, response) {
                    if (response)
                        console.log(response.statusCode)
                    else console.log("Warn: response was null")
                });
            }
        });

        stream.on('error', function(error) {
            console.log("Error: "+error)
        });
    });
}

var dataHand = new DataHand({
    twitter: {
        consumer_key: "HI0mcdH2xj5PyxynulBcTaQHM",
        consumer_secret: "xYl25RvpsMWcJzrv6sGz7H5348QPB0IQO9ovw6kDGzaHCPgaPL",
        access_token_key: "118690370-CywZu2RJ5zupfs4PUDiCqzxJjkXIrWoP8JuPVBQx",
        access_token_secret: "jNWu4iTjVEW3BsDXcobKD7HKMyGjGPdm2Sw8c38VRdPyS"
    },
    streamr: {
        stream_id: "7v6Wyy8wTmiZ7nKNjDMSyA",
        stream_auth: "OpZb2n9bRHyQNluvT3Afxw"
    }
})