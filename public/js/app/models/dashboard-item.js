
Strends.Models.DashboardItem = Backbone.Model.extend({
    defaults: {
        rank: undefined,
        color: "aqua"
    },

    initialize: function(){
        var _this = this
        this.listenTo(this.collection, "update", function(){
            _this.set("rank", this.collection.indexOf(_this)+1)
        })
        this.listenTo(this, "message", function(msg){
            console.log(msg)
        })
    },

    raiseUp: function() {
        var i = this.collection.indexOf(this)
        var oldRank = this.get("rank")
        if(oldRank > 0) {
            this.collection.at(i - 1).set("rank", oldRank)
            this.set("rank", oldRank - 1)
        }
    },

    lowerDown: function() {
        var i = this.indexOf(this)
        var oldRank = this.get("rank")
        if(oldRank < this.collection.size()-1) {
            this.collection.at(i + 1).set("rank", oldRank)
            this.set("rank", oldRank + 1)
        }
    }
})