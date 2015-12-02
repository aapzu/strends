
Strends.Templates.DashboardTemplate = '<div class="row"></div>';

Strends.Templates.DashboardItemTemplate = '' +
    '<div class="col-lg-4 col-md-6 col-sm-12">' +
        '<div class="dashboard-item small-box bg-<%= color %>">' +
            '<div class="pull-right box-tools">' +
                '<i class="edit-button fa fa-pencil"></i>' +
                '<i class="remove-di-button fa fa-times"></i>' +
            '</div>'+
            '<div class="inner">'+
                '<h3>' +
                    '<span class="rank">#<%= rank %></span>' +
                    '&nbsp;-&nbsp;' +
                    '<span class="word"><%= word %></span>' +
                    '<span class="word-input form-inline">' +
                        '<input class="form-control" value="<%= word %>"/>' +
                    '</span>' +
                '</h3>' +
            '</div>' +
            '<div class="icon">' +
                '<i class="ion ion-bag"></i>' +
            '</div>' +
            '<div class="tweet-container small-box-footer"></div>'
        '</div>' +
    '</div>' ;

Strends.Templates.TweetTemplate = '' +
    '<a href="http://www.twitter.com/<%= user.screen_name %>/status/<%= id_str %>" target="_blank">' +
        '<span class="tweet" title="<%= user.name %>&nbsp;@<%= user.screen_name %>">' +
            '<%= text %>' +
        '</span>' +
    '</a>' ;



Strends.Templates.SearchBarTemplate = '' +
    '<div class="input-group">' +
        '<input type="text" id="search-input" class="form-control" placeholder="Search...">' +
        '<span class="input-group-btn">' +
            '<button type="submit" id="search-btn" class="btn btn-flat">' +
            '<i class="fa fa-search"></i></button>' +
        '</span>' +
    '</div>' ;