
Strends.Models.Dashboard = Backbone.Model.extend({

    initialize: function(attributes, options){
        var _this = this
        this.collection = new Strends.Collections.DashboardItemCollection()
        this.collection.fetch()
        // If the 'update' event isn't trigged, there may be problems with the automatic updating
        this.collection.trigger("update")

        $.getJSON(baseUrl+'/data/isStreaming/', function(res){
            if(res.success)
                if(!res.isStreaming)
                    _this.streamAll()
        })

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
            }
        )
        this.messageGot = false
        setInterval(function(){
            if(_this.messageGot){
                _this.collection.sort()
                _this.messageGot = false
            }
        },2000)
    },

    sendMessage: function(word, message){
        this.messageGot = true
        var model = this.collection.find(function(m){
            return m.get("word") == word
        })
        if(model)
            model.processTweet(message)
    },

    streamAll: function(){
        var query = ""
        for(var i = 0; i < this.collection.models.length; i++){
            query += this.collection.models[i].get("word")
            if(i != this.collection.models.length-1)
                query += ","
        }
        if(query)
            this.stream(query)
    },

    stream: function(query, method){
        if(!method)
            method = "stream"
        $.getJSON(baseUrl+'/data/'+method+'/'+query, {}, function(res){
            if(res.success)
                $.pnotify({
                    type: "success",
                    title: "Streaming started!",
                    delay: 4000,
                })
        })
    }
})