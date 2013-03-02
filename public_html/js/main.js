var c2_fixed = false;
var plane_html = "";
var window_width = 0;
var animations_on = false;

function init_animations(){
	animations_on = true;
	$('#buildings_wrap,#pods_wrap,#clouds').show();
	$('.plane_wrap').addClass('fly');
	$('#pods').addClass('spin');
	$('#stop_css3').show();
}

function stop_animations(fade){
	animations_on = false;
	$('#plane_wrap').removeClass('fly');
	$('#pods').removeClass('spin');

	if ((fade!==undefined)&& fade)
		$('#clouds, #buildings_wrap').fadeOut(2000);
	else 
		$('#clouds, #buildings_wrap').hide();

	$('#stop_css3').hide();
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

		$('.plane_lights_wrap').append(plane_html);

		$('#stop_css3').click(function(){
			stop_animations(true);
		});

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

    $(window).bind('resize', function(){
    	window_width = $(this).width();
    	if ((window_width<=480) && animations_on) {
    		stop_animations(false);
    	} else if (Modernizr.cssanimations && (window_width>480) && (!animations_on)) {
    		init_animations();
    	} 
    });

    // reset zoom when orientation changes on iOS
    if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
	    var viewportmeta = document.querySelector('meta[name="viewport"]');
	    if (viewportmeta) {
	        viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
	        document.body.addEventListener('gesturestart', function () {
	            viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
	        }, false);
	    }
	}


    $(window).trigger('resize');

});