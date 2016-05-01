
Strends.Views.SearchBarView = Backbone.View.extend({
    template: _.template(Strends.Templates.SearchBarTemplate),

    render: function(){
        this.$el = $(this.template())
        this.input = this.$el.find("#search-input")
        this.searchButton = this.$el.find("#search-btn")
        this.streamButton = this.$el.find(".start-streaming-btn")
        this.stopButton = this.$el.find(".stop-streaming-btn")

        this.lastStarted
        this.delay = 15000
        this.allowedToSearch = true

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
        var _this = this
        if(!this.canSearch()) {
            var notice = $.pnotify({
                type: "info",
                text: "You need to wait " +
                    (16 - Math.ceil((Date.now() - _this.lastStarted) / 1000))
                + " more seconds before you can start streaming again!",
                delay: 4000
            })
            setInterval(function() {
                var options = notice.options
            })
        } else
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
    },

    canSearch: function() {
        var _this = this
        if(this.allowedToSearch) {
            this.timeout = setTimeout(function(){
                _this.allowedToSearch = true
            }, _this.delay)
            this.lastStarted = Date.now()
            this.allowedToSearch = false
            return true
        } else {
            return false
        }
    }
})