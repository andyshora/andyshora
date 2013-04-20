var c2_fixed = false;
var plane_html = "";
var windowWidth = 0;
var animations_on = false;
var $plane = null;

function init_animations(){
	animations_on = true;
	$('#buildings_wrap,#pods_wrap').show();
	//$('.plane_wrap').addClass('fly');
	$('#pods').addClass('spin');
	$('#stop_css3').show();
}

function stop_animations(fade){
	animations_on = false;
	$('#plane_wrap').removeClass('fly');
	$('#pods').removeClass('spin');

	if ((fade!==undefined)&& fade)
		$('#buildings_wrap').fadeOut(2000);
	else 
		$('#buildings_wrap').hide();

	$('#stop_css3').hide();
}

// polyfill
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame 		|| 
			window.webkitRequestAnimationFrame 	|| 
			window.mozRequestAnimationFrame		|| 
			window.oRequestAnimationFrame		|| 
			window.msRequestAnimationFrame		|| 
			function(/* function */ callback, /* DOMElement */ element){
			window.setTimeout(callback, 1000 / 60);
	};
})();

function animate(plane, startTime) {
	var timeDiff = (new Date()).getTime() - startTime;
	var linearSpeed = 200;
	var newX = linearSpeed * timeDiff / 1000;

	if (newX > windowWidth+200){
		startTime = (new Date()).getTime();
	}

	$plane.style.webkitTransform = "translate3d("+newX+"px, 0, 0)";

	// request new frame
    requestAnimFrame(function() {
      animate($plane, startTime);
    });
}

$(document).ready(function(){


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

	$plane = $('.plane_wrap')[0];
	var startTime = (new Date()).getTime();
    animate($plane, startTime);

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
    	windowWidth = $(this).width();
    	if ((windowWidth<=480) && animations_on) {
    		stop_animations(false);
    	} else if (Modernizr.cssanimations && (windowWidth>480) && (!animations_on)) {
    		//init_animations();
    	} 
    });


    $(window).trigger('resize');

});