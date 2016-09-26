require('../css/main.scss');
require('../img/background_image.jpg');
require('../img/Navigation_icon.svg');

(function() {
	"use strict";

	const Button = require('./components/button.js');
	const Textfield = require('./components/textfield.js');
	const Images = require('./components/images.js');

	Images.load_images();
	
	const start_button = Button.create_button('start_button');
	start_button.click('start_game');

	const fail_button = Button.create_button('fail_button');
	fail_button.click('restart_game');

	const submit_button = Button.create_button('submit_button');
	submit_button.click('submit');

	const submit_textfield = Textfield.create_textfield('submit_textfield');
	submit_textfield.submit();
})();

