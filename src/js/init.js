(function() {
	"use strict";

	const Button = require('./components/button.js');

	const startButton = new Button('startButton');
	startButton.initStart();

	const failButton = new Button('failButton');
	failButton.initFail();

	const submitButton = new Button('submitButton');
	submitButton.submit();
})();