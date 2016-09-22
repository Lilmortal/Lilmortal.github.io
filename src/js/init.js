(function() {
	"use strict";

	const Button = require('./components/button.js');
	const Textfield = require('./components/textfield.js');

	//document.getElementById().initStart better? use "this"?
	// OR TRY USE FACTORY PATTERN ON THIS? 
	const startButton = new Button('start_button');
	startButton.initStart();

	const failButton = new Button('fail_button');
	failButton.initFail();

	const submitButton = new Button('submit_button');
	submitButton.submit();

	const submitTextfield = new Textfield('submit_textfield', submitButton);
	submitTextfield.submit();
})();