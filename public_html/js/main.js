var c2_fixed = false;
var plane_html = "";

function init_animations(){
	
	$('#buildings_wrap,#pods_wrap,#clouds').show();
	$('.plane_lights_wrap').append(plane_html);
	$('.plane_wrap').addClass('fly');
	$('#pods').addClass('spin');
}

$(document).ready(function(){

	// PARALLAX
	/*$(window).bind('scroll.globalMessage', function(){
		var o=window.pageYOffset;

		if ((o>=370)&&(!c2_fixed)) {
			$('#c2_wrap,#links,#c3_wrap,#links_wrap').addClass('fixed');
			c2_fixed = true;
		} else if ((o<370) && c2_fixed) {
			$('#c2_wrap,#links,#c3_wrap,#links_wrap').removeClass('fixed');
			c2_fixed = false;
		}
	});*/

	if (Modernizr.cssanimations) {
		var plane_light_str = '<div class="plane_light"></div>';
		for(var i=0; i<20; i++)
			plane_html += plane_light_str;

		plane_html += '<div class="plane_tail_light"></div>';
		plane_html += '<div class="plane_wing_light"></div>';
		plane_html += '<div class="plane_btm_light"></div>';

		$('#stop_css3').click(function(){
			$('#plane_wrap').removeClass('fly');
			$('#pods').removeClass('spin');
			$('#clouds, #buildings_wrap').fadeOut(2000);
			$(this).hide();

		}).show();

		init_animations();
	}

	

	Modernizr.load([{
		test : Modernizr.cssgradients,
		nope : ['css/gradients.css']
	}
	]);


	window._gaq = [['_setAccount','UA-17716290-10'],['_trackPageview'],['_trackPageLoadTime']];
    Modernizr.load({
      load: ('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js'
    });

});