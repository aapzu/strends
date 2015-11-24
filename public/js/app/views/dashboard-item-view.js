
Strends.Views.DashboardItemView = Backbone.View.extend({
    template: _.template(Strends.Templates.DashboardItemTemplate),

    initialize: function(){

    },

    render: function(){
        this.$el.append(this.template(this.model.toJSON()))

        this.bindEvents()

        return this.el
    },

    bindEvents: function(){
        this.listenTo(this.model, "remove", function(){
            this.remove()
        })
    }
})