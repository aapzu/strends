
Strends.Views.DashboardItemView = Backbone.View.extend({
    tagName: "div",
    className: "col-lg-4 col-md-6 col-sm-12",

    events: {
        "click .remove-di-button": "delete"
    },

    template: _.template(Strends.Templates.DashboardItemTemplate),
    tweetTemplate: _.template(Strends.Templates.TweetTemplate),

    initialize: function(){

    },

    render: function(){
        this.$el.append(this.template(this.model.toJSON()))

        // Add more of these
        this.rankEl = this.$el.find(".rank")
        this.wordEl = this.$el.find(".word")
        this.tweetEl = this.$el.find(".tweet-container")
        this.countEl = this.$el.find(".tweet-count")

        this.bindEvents()

        return this.el
    },

    bindEvents: function(){
        var _this = this
        this.listenTo(this.model, "remove", this.remove)
        this.listenTo(this.model, "change:rank", function(){
            _this.rankEl.html(this.model.get("rank"))
        })
        this.listenTo(this.model, "message", function(msg){
            _this.tweetEl.html(_this.tweetTemplate(msg))
            _this.countEl.html(this.model.tweets.length)
        })
    },

    delete: function(){
        this.model.destroy()
    }

})