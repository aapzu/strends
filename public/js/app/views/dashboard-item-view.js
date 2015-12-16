
Strends.Views.DashboardItemView = Backbone.View.extend({
    className: "col-lg-4 col-md-6 col-sm-12",

    events: {
        "click .remove-di-button":"delete",
        "click .edit-button": "edit",
        "keydown .word-input input": "changeWord",
        "blur .word-input input": "changeWord"
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
        this.wordInput = this.$el.find(".word-input input")
        this.tweetEl = this.$el.find(".tweet-container")
        this.countEl = this.$el.find(".tweet-count")

        this.bindEvents()

        return this.el
    },

    bindEvents: function(){
        var _this = this
        this.listenTo(this.model, "remove", this.remove)
        this.listenTo(this.model, "change", this.update)
        this.listenTo(this.model, "message", function(msg){
            _this.tweetEl.html(_this.tweetTemplate(msg))
            _this.countEl.html(this.model.tweets.length)
        })
    },

    delete: function(){
        this.model.destroy()
    },


    update: function(e){
        this.rankEl.html(this.model.get("rank"))
        this.wordEl.html(this.model.get("word"))
    },

    edit: function(){
        this.$el.find(".dashboard-item").addClass("edit")
        this.wordInput.select()
    },

    changeWord: function(e){
        if(e.type == "focusout" || e.keyCode == 13){
            var value = this.wordInput.val()
            this.model.set("word", value)
            this.model.save()

            this.render()
        }
    }
})