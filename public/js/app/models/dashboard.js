
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
                resend_last: 1
            }
        )
    },

    sendMessage: function(word, message){
        var model = this.collection.find(function(m){
            return m.get("word") == word
        })
        if(model)
            model.trigger("message", message)
    }
})