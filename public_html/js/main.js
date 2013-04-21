var c2_fixed = false
, plane_html = ''
, windowWidth = 0
, animationsOn = false
, $plane = null, $sun = null, $sun_wrap = null, $header = null
, transformPrefix = '';

function GetVendorPrefix(arrayOfPrefixes) {

	var tmp = document.createElement("div");

	for (var i = 0; i < arrayOfPrefixes.length; ++i) {
		if (typeof tmp.style[arrayOfPrefixes[i]] != 'undefined') {
			return arrayOfPrefixes[i];
		}
	}

	return false;
}

function init_animations(){
	animationsOn = true;
	//$('#buildings_wrap,#pods_wrap').show();
	$('#buildings_wrap,#pods_wrap').show();
	$('#pods').addClass('spin');
	$('#stop_css3').show();

	drawSun();

	var startTime = (new Date()).getTime();
	animate($plane, startTime);

}
function drawSun() {

	if (!Modernizr.canvas) return;

	$sun = $('#sun');
	$sunWrap = $('#sun_wrap');
	$header = $('header');
	var height = $header.height();

	$sun.width(windowWidth);
	$sun.height(height);
	$sun.css('height', height+'px');

	_drawSunburst($sun[0]);
}

function stop_animations(fade){
	animationsOn = false;
	$('#pods').removeClass('spin');

	if ((fade!==undefined)&& fade)
		$('#buildings_wrap').fadeOut(2000);
	else
		$('#buildings_wrap').hide();

	$('#stop_css3').hide();
}

// polyfill
window.requestAnimFrame = (function(){
	return	window.requestAnimationFrame 		||
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
	var linearSpeed = 120;
	var newX = (linearSpeed * timeDiff / 1000) - 100;
	var newY = (Math.sin((newX/(windowWidth/2)) - 0.5)) * 100;

	var rotateSpeed = 0.001;
	var rotateSunBy = rotateSpeed * timeDiff;
	//console.log('rotateSunBy', rotateSunBy);
	//console.log(newY);

	if (newX > windowWidth+200){
		startTime = (new Date()).getTime();
	}

	$plane.style[transformPrefix] = 'translate3d('+newX+'px, '+newY+'px, 0)';

	_drawSunburst($sun[0], {}, rotateSunBy);

	// request new frame
	if (animationsOn) {
	    requestAnimFrame(function() {
	      animate($plane, startTime);
	    });
	}
}

$(document).ready(function(){

	transformPrefix = GetVendorPrefix(['transform', 'WebkitTransform', 'msTransform', 'MozTransform', 'OTransform']);

	if (transformPrefix) {
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

		$plane = $('.plane_wrap')[0];

		Modernizr.load([{
			test : Modernizr.cssgradients,
			nope : ['css/gradients.css']
		}
		]);


	}

	window._gaq = [['_setAccount','UA-17716290-10'],['_trackPageview'],['_trackPageLoadTime']];
    Modernizr.load({
      load: ('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js'
    });

    $(window).bind('resize', function(){

    	windowWidth = $(this).width();
    	if ((windowWidth<=480) && animationsOn) {
    		stop_animations(false);
    	} else if (Modernizr.cssanimations && (windowWidth>480) && (!animationsOn)) {
    		init_animations();
    	} else {
    		// resized, animations already running
    		drawSun();
    	}


    });


    $(window).trigger('resize');

});



	var _drawTriangle = function(ctx, fatness, max_dimen) {
		ctx.beginPath();
		ctx.moveTo(0, 0);
		xPos = (fatness/100) * max_dimen;
		xNeg = -1 * xPos;
		ctx.lineTo(max_dimen*Math.sqrt(2), xNeg);
		ctx.lineTo(max_dimen*Math.sqrt(2), xPos);
		ctx.fill();
	};

	var _drawSunburst = function(canvas, options, rotateSunBy) {
		var $$ = function(val, deflt) {
			if("undefined"==typeof val) { return deflt; }
			return val;
		}

		var ctx = canvas.getContext('2d');
		ctx.save();



		options = $$(options, {});
		var bars = $$(options.bars, 36);
		var fatness = $$(options.fatness, 5);

		var x = Math.round(Math.sin( rotateSunBy % 360) * 255);
		console.log(x);


		var color = $$(options.color, 'rgba(14, 111, '+x+',0.2)');
		//console.log(color);
		var backcolor = $$(options.backcolor, 'rgba(255,255,255,0.5)');

		width = canvas.width;
		height = canvas.height*2;

		var max_dimen = (height > width ? height : width);

		ctx.translate(width/2,height/2);
		ctx.fillStyle = backcolor;
		ctx.fillRect(-1* (width/2),-1 * (height/2),width,height);
		ctx.fillStyle = color;
		for(var i = 0; i < bars; i++) {
			ctx.save();

			if (rotateSunBy==null) {
				rotateSunBy = 1;
			}
			ctx.rotate(i*(Math.PI*2/bars));
			_drawTriangle(ctx, fatness, max_dimen);
			ctx.restore();
		}

		ctx.restore();
	};
