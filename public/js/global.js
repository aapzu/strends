//  Set up the button to toggle the sidebar
$("#sidebar-toggle").click(function(e) {

    e.preventDefault();

    //If window is small enough, enable sidebar push menu
    if ($(window).width() <= 992) {
        var a = $('.row-offcanvas')
        $('.row-offcanvas').toggleClass('active');
        $('.left-side').removeClass("collapse-left");
        $(".right-side").removeClass("strech");
        $('.row-offcanvas').toggleClass("relative");
    } else {
        if($("#strends-sidebar").hasClass("collapse-left")){
            $("#strends-sidebar").removeClass("collapse-left")
            $("#content-wrapper").removeClass("content-centered")
        } else {
            $("#strends-sidebar").addClass("collapse-left")
            $("#content-wrapper").addClass("content-centered")
        }
    }
})