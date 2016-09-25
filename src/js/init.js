(function() {
	"use strict";

	const Button = require('./components/button.js');
	const Textfield = require('./components/textfield.js');

	const start_button = Button.create_button('start_button');
	start_button.if_clicked('start');

	const fail_button = Button.create_button('fail_button');
	fail_button.if_clicked('fail');

	const submit_button = Button.create_button('submit_button');
	submit_button.if_clicked('submit');

	const submit_textfield = Textfield.create_textfield('submit_textfield');
	submit_textfield.submit();
})();