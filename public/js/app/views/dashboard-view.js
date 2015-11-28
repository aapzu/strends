
Strends.Views.DashboardView = Backbone.View.extend({
    template: _.template(Strends.Templates.DashboardTemplate),

    initialize: function(options){
        if(this.$el.length == 0){
            throw "No element found!"
        }

        this.searchBarEl = $(options.searchBarEl)
        this.searchBar = new Strends.Views.SearchBarView()
        this.searchBarEl.append(this.searchBar.render())
        this.collection = new Strends.Collections.DashboardItemCollection()

        this.render()
        this.bindEvents()

        this.collection.fetch()
    },

    render: function(){
        this.$el.append(this.template())
        this.row = this.$el.find(".row")
    },

    addDashboardItem: function(model){
        var diView = new Strends.Views.DashboardItemView({
            model: model
        })
        model.view = diView
        this.row.append(diView.render())
    },

    bindEvents: function(){
        var _this = this
        this.listenTo(this.searchBar, "search", function(query){
            _this.collection.create({
                word: query,
                color: _this.randomColor()
            })
            _this.collection.trigger("update")
        })

        // To be removed
        this.listenTo(this.searchBar, "empty", function(){
            while(_this.collection.size() > 0) {
                _this.collection.at(0).destroy()
            }
        })

        this.listenTo(this.collection, "add", function(model){
            _this.addDashboardItem(model)
        })

        this.listenTo(this.collection, "change:rank", function(model, rank){
            model.view.$el.insertBefore(_this.row.children()[rank])
        })
    },

    randomColor: function(){
        this.colors = this.colors || ['navy', 'light-blue', 'aqua', 'red',
                'green', 'yellow', 'purple', 'blue', 'maroon']
        var rand = Math.random() * 9
        rand = Math.floor(rand)
        return this.colors[rand]
    }
})