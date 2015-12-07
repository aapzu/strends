
Strends.Models.Dashboard = Backbone.Model.extend({

    initialize: function(attributes, options){
        var _this = this
        this.collection = new Strends.Collections.DashboardItemCollection()
        this.collection.fetch()
        // If the 'update' event isn't trigged, there may be problems with the automatic updating
        this.collection.trigger("update")

        this.client = new StreamrClient({
            // Connection options and default values
            server: 'data.streamr.com',
            autoConnect: true,
            autoDisconnect: false
        })

        this.client.subscribe(
            this.get("streamId"),
            function(message, streamId, counter) {
                _.each(message, function(obj, field){
                    _this.sendMessage(field, obj)
                })
            },
            {
                resend_last: 0
            }
        )
        this.bindEvents()
    },

    bindEvents: function(){
        var _this = this
        this.listenTo(this.collection, "add", function(model){
            _this.addWord(model.get("word"))
        })
        this.listenTo(this.collection, "remove", function(model){
            _this.removeWord(model.get("word"))
        })
    },

    sendMessage: function(word, message){
        var model = this.collection.find(function(m){
            return m.get("word") == word
        })
        if(model)
            model.trigger("message", message)
    },

    stream: function(query){
        $.get(baseUrl+'/data/stream/'+query)
    },

    addWord: function(word){
        $.get(baseUrl+'/data/addWord/'+word)
    },

    removeWord: function(word){
        $.get(baseUrl+'/data/removeWord/'+word)
    }
})