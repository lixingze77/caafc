define([], function () {
    var headerView = {
        onback: function () {
        	
            $(".mui-action-back").on("tap", function () {
                history.back();
            })

        },
        hideLeft: function () {
            if (!$(".mui-action-back").hasClass("mui-hidden")) {
                $(".mui-action-back").addClass("mui-hidden");
            }
        },
        showLeft: function () {
            $(".mui-action-back").removeClass("mui-hidden");
        }, hideRight: function () {
            if (!$(".mui-pull-right").hasClass("mui-hidden")) {
                $(".mui-pull-right").addClass("mui-hidden");
            }
        },
        showRight: function () {
            $(".mui-pull-right").removeClass("mui-hidden");
        }
        
    }

    return headerView;
});