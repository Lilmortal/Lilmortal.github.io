//TODO - "use strict" better here or inside IIFE?
"use strict";

(function() {
	const Button = require('./components/button.js');

	const startButton = new Button('startButton');
	startButton.initStart();

	const failButton = new Button('failButton');
	failButton.initFail();

	const submitButton = new Button('submitButton');
	submitButton.submit();
})();