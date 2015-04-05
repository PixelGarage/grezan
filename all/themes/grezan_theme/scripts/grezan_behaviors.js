/**
 * Created with JetBrains PhpStorm.
 * User: ralph
 * Date: 25.10.13
 * Time: 18:34
 *
 * This file contains all Drupal behaviours of the Grezan theme.
 *
 *
 */
(function ($) {

    /**
     * This behavior adds custom icons to an accordion widget.
     *
     * CAUTION: headerSelected -> activeHeader in Version > 1.8
     */
    Drupal.behaviors.accordionSettings = {
        attach: function (context) {
            // accordion icons
            var $accordions = $(".node-unit-description .ui-accordion", context);

            $accordions.once("icons", function () {
                $(this).accordion({
                    icons: { "header": "ui-acc-icon-open", "activeHeader": "ui-acc-icon-close" }
                });
            });
            $accordions.accordion({
                heightStyle: "content",
                autoHeight: false
            })
        }
    };

    /**
     * Make equal column heights on front page.
     */
    Drupal.behaviors.equalColumnHeights = {
        attach: function (context) {

            var maxHeight = 0;
            var calcMaxHeight = function () {
                    $(this).height('auto');
                    var height = $(this).height();
                    if (height > maxHeight) {
                        maxHeight = height;
                    }
                },
                calcMaxHeightWithButton = function () {
                    // reset height and padding
                    $(this).find('.field-details-button').css("padding-top", 0);
                    $(this).height('auto');
                    var height = $(this).height();
                    if (height > maxHeight) {
                        maxHeight = height;
                    }
                },
                setMaxHeightWithButton = function() {
                    // adjust heights and detail buttons of each column
                    var detailsButton = $(this).find('.field-details-button');
                    var height = $(this).height();
                    if (maxHeight > height) {
                        var diff = maxHeight - height;
                        detailsButton.css("padding-top", diff);
                        $(this).height(maxHeight);
                    }
                },
                makeEqualColumns = function () {
                    // equal heights in nodes
                    maxHeight = 0;
                    var nodeColumns = $('.node.view-mode-full:not(.node-unit-description) > .at-panel > .region:not(.region-conditional-stack):not(.region-one-main) > .region-inner');
                    nodeColumns.each(calcMaxHeight);
                    nodeColumns.height(maxHeight);

                    maxHeight = 0;
                    var founderColumns = $('body.page-founders #main-content').find('.view-user-list .views-row .region-inner');
                    founderColumns.each(calcMaxHeight);
                    founderColumns.height(maxHeight);

                    // leave, except for front page
                    if ($('body.front').length <= 0) return;

                    // equal column heights in apartment section, details button at the bottom
                    maxHeight = 0;
                    var apartmentColumns = $('.at-panel > .region > .region-inner > .apartment-section');
                    apartmentColumns.each(calcMaxHeightWithButton);
                    apartmentColumns.each(setMaxHeightWithButton);

                    // equal heights in news/event section
                    maxHeight = 0;
                    var subMainColumns = $('.sub-main-content.at-panel > .region > .region-inner > .front-events .block-content,' +
                                           '.sub-main-content.at-panel > .region > .region-inner > .front-news .block-content');
                    subMainColumns.each(calcMaxHeight);
                    subMainColumns.height(maxHeight);

                };

            $(window)
                .load(makeEqualColumns)
                .resize(makeEqualColumns);

        }
    };

    /**
     * Fixes the position of the menu bar at the top of the window,
     * a soon as the menu bar touches the top.
     * @type {{attach: Function}}
     */
    Drupal.behaviors.fixedMenuBar = {
        attach: function (context) {

            $(window).scroll(function () {

                // fixed position of the menu bar, when it hits the top of the window
                var pos = $("html").scrollTop() || $("body").scrollTop(); /* Fixes Safari/Chrome scrollTop bug */
                var sfMenu = $('#superfish-1');
                var menuBar = $('#menu-bar');

                if (pos > 145) {
                    // set menu to fixed position with full color (no transparency for good readability over any content)
                    var docWidth = $('#page').width();
                    menuBar.css({"position": "fixed", "top": "0px", "width": docWidth, "z-index": "99"});
                    sfMenu.css({"background-color": "rgba(75,141,171,1.0)"});
                    //sfMenu.find('> li').css({"background-color": "rgba(59,132,153,1.0)"});

                    // prevent jump of content
                    menuBar.next().css("margin-top", "38px");

                } else {
                    // reset menu to original position and color
                    menuBar.css({"position": "static", "width": "100%"});
                    sfMenu.css({"background-color": "rgba(51,153,204,0.8)"});
                    //sfMenu.find('> li').css({"background-color": "rgba(102,102,0,0.1)"});

                    // prevent jump of content
                    menuBar.next().css("margin-top", "0px");

                }
            });

        }
    }

})(jQuery);