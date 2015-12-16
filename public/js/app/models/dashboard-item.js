
Strends.Models.DashboardItem = Backbone.Model.extend({
    defaults: {
        rank: undefined,
        color: "aqua"
    },

    initialize: function(){
        var _this = this
        this.listenTo(this.collection, "update sort", function(){
            _this.set("rank", this.collection.indexOf(_this)+1)
        })
    },

    processTweet: function(tweet){
        if(!this.tweets)
            this.tweets = []
        this.tweets.push(tweet)
        this.trigger("message", tweet)
    }
})