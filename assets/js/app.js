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
    $("#expander").click(function() {
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
});