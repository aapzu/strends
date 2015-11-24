
Strends.Templates.DashboardTemplate = '<div class="row"></div>';

Strends.Templates.DashboardItemTemplate = ''+
    '<div class="col-lg-4 col-xs-6">'+
        '<div class="small-box bg-aqua">'+
            '<div class="inner">'+
                '<h2>#<%= rank %></h2><h3><%= word %></h3>'+
            '</div>'+
            '<div class="icon">'+
                '<i class="ion ion-bag"></i>'+
            '</div>'+
            '<a href="#" class="small-box-footer">'+
                'More info <i class="fa fa-arrow-circle-right"></i>'+
            '</a>'+
        '</div>'+
    '</div>';

Strends.Templates.SearchBarTemplate = ''+
    '<div class="input-group">'+
        '<input type="text" id="search-input" class="form-control" placeholder="Search...">'+
        '<span class="input-group-btn">'+
            '<button type="submit" id="search-btn" class="btn btn-flat">' +
            '<i class="fa fa-search"></i></button>'+
        '</span>'+
    '</div>';