var c2_fixed = false
, windowWidth = 0
, animationsOn = false
, $sun = null, $sun_wrap = null, $header = null
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
	animate(startTime);

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

function animate(startTime) {
	var timeDiff = (new Date()).getTime() - startTime;

	var rotateSpeed = 0.0005;
	var rotateSunBy = rotateSpeed * timeDiff;

	_drawSunburst($sun[0], {}, rotateSunBy);

	// request new frame
	if (animationsOn) {
	    requestAnimFrame(function() {
	      animate(startTime);
	    });
	}
}

$(document).ready(function(){

	transformPrefix = GetVendorPrefix(['transform', 'WebkitTransform', 'msTransform', 'MozTransform', 'OTransform']);

	if (transformPrefix) {

		$('#stop_css3').click(function(){
			stop_animations(true);
		});


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
    	if ((windowWidth<=750) && animationsOn) {
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

	var _rotateAndy = function(timeDiff) {

		//var delta = timeDiff;
		var r = (Math.cos(timeDiff) * 30) -15;
		//console.log(r);



		if (transformPrefix==='WebkitTransform') {
			$('#andy').css({ WebkitTransform: 'rotateY('+r+'deg)' });
		}
	}

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
		var alpha = 1-((Math.abs(Math.sin( rotateSunBy % 360)/3)+0.5)*0.9);

		var color = $$(options.color, 'rgba(192, 57, 43,'+alpha+')');

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
			ctx.rotate((i*(Math.PI*2/bars))+(rotateSunBy*-0.1));
			_drawTriangle(ctx, fatness, max_dimen);
			ctx.restore();
		}

		ctx.restore();
	};
