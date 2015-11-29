
Strends.Collections.DashboardItemCollection = Backbone.Collection.extend({
    model: Strends.Models.DashboardItem,
    comparator: "rank",
    localStorage: new Backbone.LocalStorage("strends"),

    initialize: function() {
        var _this = this
        this.listenTo(this, "update", function(model){
            if(_this.size() > 9){
                this.at(0).destroy()
            }
        })
    },

    add: function(model){
        if(this.find(function(m){
                return m.get("word") == model.get("word")
            }))
            throw "Already in the collection!"
        Backbone.Collection.prototype.add.apply(this, [model])
    }


})