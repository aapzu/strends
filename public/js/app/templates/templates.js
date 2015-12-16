
Strends.Templates.DashboardTemplate = '<div class="row"></div>';

Strends.Templates.DashboardItemTemplate = '' +
    '<div class="dashboard-item small-box bg-<%= color %>">' +
        '<div class="pull-left">' +
            '<span class="rank"><%= rank %></span>' +
        '</div>' +
        '<div class="pull-right box-tools">' +
            '<i class="edit-button fa fa-pencil"></i>' +
            '<i class="remove-di-button fa fa-times"></i>' +
        '</div>'+
        '<div class="inner">'+
            '<div class="title">' +
                '<h1>' +
                    '<span class="word"><%= word %></span>' +
                    '<span class="word-input form-inline">' +
                        '<input class="form-control" value="<%= word %>"/>' +
                    '</span>' +
                '</h1>' +
            '</div>'+
            '<p class="count">' +
                '<span class="tweet-count">0</span>' +
                '<span> tweets</span>' +
            '</p>' +
        '</div>' +
        '<div class="icon">' +
            '<i class="ion ion-bag"></i>' +
        '</div>' +
        '<div class="tweet-container small-box-footer"></div>'
    '</div>' ;

Strends.Templates.TweetTemplate = '' +
    '<a href="http://www.twitter.com/<%= user.screen_name %>/status/<%= id_str %>" target="_blank">' +
        '<span class="tweet" title="<%= user.name %>&nbsp;@<%= user.screen_name %>">' +
            '<%= text %>' +
        '</span>' +
    '</a>' ;

Strends.Templates.SearchBarTemplate = '' +
    '<a>' +
        '<i class="fa fa-pencil"></i>' +
        '<span>Add words</span>' +
        '<i class="fa pull-right fa-angle-down"></i>' +
    '</a>' +
    '<ul class="treeview-menu">' +
        '<li>' +
            '<form class="sidebar-form search-form">' +
                '<div class="input-group">' +
                    '<input type="text" id="search-input" class="form-control" autocomplete="off" placeholder="Search...">' +
                    '<span class="input-group-btn">' +
                        '<button type="submit" id="search-btn" class="btn btn-flat">' +
                            '<i class="fa fa-search"></i>' +
                        '</button>' +
                    '</span>' +
                '</div>' +
            '</form>' +
        '</li>' +
        '<li class="text-center">' +
            '<a class="streaming-btn-container">' +
                '<button type="button" class="start-streaming-btn btn btn-sm btn-primary">Update parameters!</button>' +
            '</a>' +
        '</li>' +
    '</ul>' ;
