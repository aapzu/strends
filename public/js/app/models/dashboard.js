
Strends.Models.Dashboard = Backbone.Model.extend({

    initialize: function(attributes, options){
        var _this = this
        this.collection = new Strends.Collections.DashboardItemCollection()
        this.collection.fetch()
        // If the 'update' event isn't trigged, there may be problems with the automatic updating
        this.collection.trigger("update")

        // Ask if the dataHand is already streaming and start it if it's not
        $.getJSON(baseUrl+'/data/isStreaming/', function(res){
            console.log(res)
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
        // TODO: make this smarter
        setInterval(function(){
            _this.collection.sort()
            _this.orderChanged = false
        },2000)

        this.bindEvents()
    },

    bindEvents: function(){
        var _this = this
        this.listenTo(this.collection, "change:rank", function(){
            _this.orderChanged = true
        })
    },

    sendMessage: function(word, message){
        this.messageGot = true
        var model = this.collection.find(function(m){
            return m.get("word").toLowerCase() == word.toLowerCase()
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