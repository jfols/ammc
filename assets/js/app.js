jQuery(document).ready(function($) {
// helper function to flip the expander between its two states, "+" or "x",
// depending on if the messager section is open
    function flipExpander() {
        if ($(".messager").is(":visible")) {
            $("#expander").removeClass("fa-times").addClass("fa-plus");
        } else {
            $("#expander").removeClass("fa-plus").addClass("fa-times");
        }
    }

// executes when the user clicks the "Request a Quote" button
    $("#quoteButton").click(function() {
        // slides open the messager section, if it isn't already open, and auto scrolls down the page
        if (!$(".messager").is(":visible")) {
            $(".messager").velocity("slideDown", {duration: 1000});
            flipExpander();
        }
        $(".messager").velocity("scroll");
    });

// executes when the user clicks the expander
    $("#expander, #contact-us-today").click(function(e) {
        // slides open the messager section and scrolls down to it,
        // and the opposite if the messager is already open
        if ($(".messager").is(":visible")) {
            $(".messager").velocity("slideUp", {duration: 1000});
            $(".content").velocity("scroll", {delay: 1000});
        }
        else {
            $(".messager").velocity("slideDown", {duration: 1000})
                        .velocity("scroll");
        }

        e.preventDefault();
        flipExpander();
    });

// executes when the user clicks the scroll down chevron
    $("#scrollDown").click(function() {
        // auto scroll down to the content
        $(".content").velocity("scroll");
    });

// functionality for the call list. start by storing the first span in the list
    var $current = $(".callList span:first");
    // create an immediately invoked function which can be recalled indefinitely
    (function wordFlip() {
        // since we want the first word to already be displayed, only flip in if its not visible
        if ($current.is(":hidden")) {
            $current.addClass("flipInX");
            $current.show();
        }

        // wait a bit to start the flip out sequence
        setTimeout(function() {
            $current.removeClass("flipInX").addClass("flipOutX");
            // let the animation play before hiding the element again
            setTimeout( function() {
                $current.removeClass("flipOutX");
                $current.hide();

                // now select the next span in the list, or start back at the beginning
                if($current.next("span").length > 0) {
                    $current = $current.next("span");
                } else {
                    $current = $(".callList span:first");
                }
            }, 1000);
        }, 3000);

        // wash, rinse, and repeat every 4.5 seconds
        setTimeout(wordFlip, 4500);
    })();

// Products Services aka terrible javascript that I'm gonna fix
    // $("#service-select li.one a").click(function(e) {
    //     $("#service-select li.current").removeClass("current");
    //     $("#service-select li.one").addClass("current");
    //     $(".service").removeClass("current");
    //     $(".service.one").addClass("current");
    //     e.preventDefault();
    // });
    // $("#service-select li.two a").click(function(e) {
    //     $("#service-select li.current").removeClass("current");
    //     $("#service-select li.two").addClass("current");
    //     $(".service").removeClass("current");
    //     $(".service.two").addClass("current");
    //     e.preventDefault();
    // });
    // $("#service-select li.three a").click(function(e) {
    //     $("#service-select li.current").removeClass("current");
    //     $("#service-select li.three").addClass("current");
    //     $(".service").removeClass("current");
    //     $(".service.three").addClass("current");
    //     e.preventDefault();
    // });
    // $("#service-select li.four a").click(function(e) {
    //     $("#service-select li.current").removeClass("current");
    //     $("#service-select li.four").addClass("current");
    //     $(".service").removeClass("current");
    //     $(".service.four").addClass("current");
    //     e.preventDefault();
    // });


    //cache a reference to the tabs
    var tabs = $('#service-select li');
    var tabsLink = $('#service-select li a');
    var slides = $('.services-container .service');

    //auto-rotate every 5 seconds
    var timerId = setInterval(function() {
            //get currently-on tab
        var onTab = tabs.filter('.on');
        var onSlide = slides.filter('.on');

            //click either next tab, if exists, else first one
        var nextTab = onTab.index() < tabs.length-1 ? onTab.next() : tabs.first();
        var nextSlide = onSlide.index() < slides.length-1 ? onSlide.next() : slides.first();
        nextTab.click();
        nextSlide.click();
    }, 5000);

    tabs.click(function() { 
        $(this).addClass('on').siblings('.on').removeClass('on'); 
    });
    slides.click(function() { 
        $(this).addClass('on').siblings('.on').removeClass('on'); 
    });
    tabsLink.click(function(e) {
        clearInterval(timerId);
        e.preventDefault();
    });

    $("#service-select li.one a").click(function(e) {
        $("#service-select li.on").removeClass("on");
        $("#service-select li.one").addClass("on");
        $(".service").removeClass("on");
        $(".service.one").addClass("on");
        e.preventDefault();
    });
    $("#service-select li.two a").click(function(e) {
        $("#service-select li.on").removeClass("on");
        $("#service-select li.two").addClass("on");
        $(".service").removeClass("on");
        $(".service.two").addClass("on");
        e.preventDefault();
    });
    $("#service-select li.three a").click(function(e) {
        $("#service-select li.on").removeClass("on");
        $("#service-select li.three").addClass("current");
        $(".service").removeClass("on");
        $(".service.three").addClass("on");
        e.preventDefault();
    });
    $("#service-select li.four a").click(function(e) {
        $("#service-select li.on").removeClass("on");
        $("#service-select li.four").addClass("on");
        $(".service").removeClass("on");
        $(".service.four").addClass("on");
        e.preventDefault();
    });



    //on click to tab, turn it on, and turn previously-on tab off
    // tabs.click(function() { 
    //     $(this).addClass('on').siblings('.on').removeClass('on'); 
    //     clearInterval(timerId);
    // });

    // FitText
    $("#main-headline").fitText(2.3, {minFontSize: '25px'});
    $("#sub-headline").fitText(2.3, {minFontSize: '25px'});

    //
    mediaCheck({
        media: '(max-width: 549px)',
        entry: function() {
            $('#footer-main').prependTo('#footer-contacts');
        },
        exit: function() {
            $('#footer-main').insertAfter('#before-footer-main');
        }
    });
});