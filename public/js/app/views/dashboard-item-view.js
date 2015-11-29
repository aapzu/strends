
Strends.Views.DashboardItemView = Backbone.View.extend({
    events: {
        "click .remove-di-button":"delete",
        "click .word": "edit",
        "keydown .word-input input": "changeWord",
        "blur .word-input input": "changeWord"
    },

    template: _.template(Strends.Templates.DashboardItemTemplate),

    initialize: function(){

    },

    render: function(){
        this.$el.empty()
        this.$el.append(this.template(this.model.toJSON()))

        // Add more of these
        this.rankEl = this.$el.find(".rank")
        this.wordEl = this.$el.find(".word")
        this.wordInput = this.$el.find(".word-input input")

        this.bindEvents()

        return this.el
    },

    bindEvents: function(){
        this.listenTo(this.model, "remove", this.remove)
        this.listenTo(this.model, "change", this.update)
    },

    delete: function(){
        this.model.destroy()
    },

    raiseUp: function(){
        this.model.raiseUp()
    },

    update: function(e){
        this.rankEl.html("#"+this.model.get("rank"))
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