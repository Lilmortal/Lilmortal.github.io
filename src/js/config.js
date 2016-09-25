module.exports = (function() {
	const config = {
		elements: {
			// images
			images: document.getElementsByClassName('images')[0],
			images_panel: document.getElementsByClassName('images_panel')[0],
			image: document.getElementsByClassName('image'),

			//fail
			fail_background: document.getElementsByClassName('fail_background')[0],
			fail_button: document.getElementById('fail_button'),

			//submit
			submit_textfield: document.getElementById('submit_textfield'),
			submit_button: document.getElementById('submit_button'),

			//instruction
			instruction_panel: document.getElementsByClassName('instruction_panel')[0],
			start_button: document.getElementById('start_button'),

			//countdown
			countdown_panel: document.getElementById('countdown_panel'),

			//slider
			add_points: document.getElementsByClassName('add_points')[0],
			slider_panel: document.getElementsByClassName('slider_panel')[0],
			high_score: document.getElementsByClassName('high_score'),
			result_text: document.getElementsByClassName('result_text')[0],

			//body
			wrapper: document.getElementsByClassName('wrapper')[0]
		}
	}
	return config;
})();