var c2_fixed = false;

$(document).ready(function(){
	var html = "";
	var plane_light_str = '<div class="plane_light"></div>';
	for(var i=0; i<20; i++)
		html += plane_light_str;

	html += '<div class="plane_tail_light"></div>';
	html += '<div class="plane_wing_light"></div>';
	html += '<div class="plane_btm_light"></div>';

	$('#plane_lights_wrap').append(html);

	// PARALLAX
	$(window).bind('scroll.globalMessage', function(){
		var o=window.pageYOffset;

		if ((o>=370)&&(!c2_fixed)) {
			$('#c2_wrap,#links,#c3_wrap,#links_wrap').addClass('fixed');
			c2_fixed = true;
		} else if ((o<370) && c2_fixed) {
			$('#c2_wrap,#links,#c3_wrap,#links_wrap').removeClass('fixed');
			c2_fixed = false;
		}
	});

	window._gaq = [['_setAccount','UA-17716290-10'],['_trackPageview'],['_trackPageLoadTime']];
    Modernizr.load({
      load: ('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js'
    });
});