
Strends.Views.SearchBarView = Backbone.View.extend({
    template: _.template(Strends.Templates.SearchBarTemplate),

    render: function(){
        this.$el.append(this.template())
        this.input = this.$el.find("#search-input")
        this.searchButton = this.$el.find("#search-btn")
        this.bindEvents()

        return this.el
    },

    bindEvents: function(){
        var _this = this
        this.searchButton.click(function(e){
            e.preventDefault()
            if(_this.input.val())
                _this.search(_this.input.val())
        })
    },

    search: function(query){
        this.trigger("search", query)
        this.input.val("")
    }
})