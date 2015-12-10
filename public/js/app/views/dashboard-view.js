
Strends.Views.DashboardView = Backbone.View.extend({
    template: _.template(Strends.Templates.DashboardTemplate),

    initialize: function(options){
        if(this.$el.length == 0){
            throw "No element found!"
        }

        this.searchBarEl = $(options.searchBarEl)
        this.searchBar = new Strends.Views.SearchBarView()
        this.searchBarEl.append(this.searchBar.render())

        this.render()
        this.bindEvents()
    },

    render: function(){
        var _this = this
        this.$el.append(this.template())
        this.row = this.$el.find(".row")
        _.each(this.model.collection.models, function(model){
            _this.addDashboardItem(model)
        })
    },

    addDashboardItem: function(dbItem){
        var diView = new Strends.Views.DashboardItemView({
            model: dbItem
        })
        dbItem.view = diView
        this.row.append(diView.render())
    },

    bindEvents: function(){
        var _this = this
        this.listenTo(this.searchBar, "search", function(query){
            _this.model.collection.create({
                word: query,
                color: _this.randomColor()
            })
        })

        this.listenTo(this.searchBar, "stream", function(){
            _this.model.streamAll()
        })

        this.listenTo(this.model.collection, "add", function(model){
            _this.addDashboardItem(model)
        })

        // Doesn't work yet
        /*this.listenTo(this.model.collection, "change:rank", function(model, rank){
            model.view.$el.insertBefore(_this.row.children()[rank])
        })*/
    },

    randomColor: function(){
        this.colors = this.colors || ['navy', 'light-blue', 'aqua', 'red',
                'green', 'yellow', 'purple', 'blue', 'maroon']
        var rand = Math.random() * 9
        rand = Math.floor(rand)
        return this.colors[rand]
    }
})