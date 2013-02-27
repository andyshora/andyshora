$(document).ready(function(){
	var html = "";
	var plane_light_str = '<div class="plane_light"></div>';
	for(var i=0; i<20; i++)
		html += plane_light_str;

	html += '<div class="plane_tail_light"></div>';
	html += '<div class="plane_wing_light"></div>';
	html += '<div class="plane_btm_light"></div>';

	$('#plane_lights_wrap').append(html);

	
});