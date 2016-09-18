(function() {
	"use strict";

	const Button = require('./components/button.js');
	const Textfield = require('./components/textfield.js');

	//document.getElementById().initStart better? use "this"?
	// OR TRY USE FACTORY PATTERN ON THIS? 
	const startButton = new Button('startButton');
	startButton.initStart();

	const failButton = new Button('failButton');
	failButton.initFail();

	const submitButton = new Button('submitButton');
	submitButton.submit();

	const submitTextfield = new Textfield('submitTextfield', submitButton);
	submitTextfield.submit();
})();