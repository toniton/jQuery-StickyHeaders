//*
// * (c) 2016-2017 Akinjiola Toni [Toniton]
// * May be freely distributed under the license.
// 

(function(jQuery) {
    var stickyHeader = function (selector,target) {
        this.selector = selector;
        this.target  = target;
        this.initialize(selector,target);
    };
    
    jQuery.fn.stickyHeader = function() {
        return new stickyHeader(this,jQuery(window));
    };
	
    stickyHeader.prototype = {
        initialize: function (selector,target) {
            var that = this;
            if (typeof this.selector === "object" && this.selector instanceof jQuery && this.selector.length > 0) {
                that.selector.each(function(index,element) {
					var thisSticky = jQuery(element).wrap('<div class="sticky-wrapper" />');
					thisSticky.parent().height(thisSticky.outerHeight());
					jQuery.data(thisSticky[0], 'pos', thisSticky.offset().top);
				});
				
				jQuery(window).on("scroll", function() {
					that.selector.each(function(index,element) {
						var thisSticky = jQuery(this),
							nextSticky = that.selector.eq(index+1),
							prevSticky = that.selector.eq(index-1),
							pos = jQuery.data(thisSticky[0], 'pos');
						
						if (pos <= jQuery(window).scrollTop()) {
						  thisSticky.addClass("fixed");
						  if (nextSticky.length > 0 && thisSticky.offset().top >= jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight()) {
							thisSticky.addClass("absolute").css("top", jQuery.data(nextSticky[0], 'pos') - thisSticky.outerHeight());
						  }
						
						} else {
						  thisSticky.removeClass("fixed");
						  if (prevSticky.length > 0 && jQuery(window).scrollTop() <= jQuery.data(thisSticky[0], 'pos')  - prevSticky.outerHeight()) {
							prevSticky.removeClass("absolute").removeAttr("style");
						  }       
						}
					});
				});
			}
		}
	}
}(jQuery));