
Strends.Views.SearchBarView = Backbone.View.extend({
    template: _.template(Strends.Templates.SearchBarTemplate),

    render: function(){
        this.$el = $(this.template())
        this.input = this.$el.find("#search-input")
        this.searchButton = this.$el.find("#search-btn")
        this.streamButton = this.$el.find(".start-streaming-btn")
        this.stopButton = this.$el.find(".stop-streaming-btn")

        this.bindEvents()

        return this.$el
    },

    bindEvents: function(){
        var _this = this
        this.searchButton.click(function(e){
            e.preventDefault()
            _this.search(e)
        })
        this.streamButton.click(function(e){
            e.preventDefault()
            _this.search(e)
            _this.stream(e)
        })
        this.stopButton.click(function(e){
            e.preventDefault()
            _this.trigger("destroy")
        })
    },

    stream: function(e){
        this.trigger("stream")
    },

    search: function(e, query){
        if(query === undefined){
            var query = this.input.val()
        }
        if(query) {
            this.trigger("search", query)
            this.input.val("")
        }
    }
})