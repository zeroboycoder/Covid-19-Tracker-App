$("document").ready(function(){
    $(".body").waypoint(function(direction){
        if(direction == "down"){
            $("nav").addClass("waypoint-nav");
        } else {
            $("nav").removeClass("waypoint-nav");
        }
    }, {
        offset : '-20px'
    })
})