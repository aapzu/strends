
Strends.Views.DashboardItemView = Backbone.View.extend({
    events: {
        "click":"raiseUp"
    },

    template: _.template(Strends.Templates.DashboardItemTemplate),

    initialize: function(){

    },

    render: function(){
        this.$el.append(this.template(this.model.toJSON()))

        // Add more of these
        this.rankEl = this.$el.find(".rank")
        this.wordEl = this.$el.find(".word")

        this.bindEvents()

        return this.el
    },

    bindEvents: function(){
        this.listenTo(this.model, "remove", this.remove)
        this.listenTo(this.model, "change", this.update)
    },

    raiseUp: function(){
        this.model.raiseUp()
    },

    update: function(e){
        this.rankEl.html("#"+this.model.get("rank"))
        this.wordEl.html(this.model.get("word"))
    }
})