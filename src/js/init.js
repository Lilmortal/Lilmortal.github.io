require('../css/main.scss');
require('../img/background_image.jpg');
(function() {
	//TODO - "use strict" better in this IIFE or outside?
	"use strict";

	const Button = require('./components/button.js');

	const startButton = new Button('startButton');
	startButton.initStart();

	const failButton = new Button('failButton');
	failButton.initFail();

	const submitButton = new Button('submitButton');
	submitButton.submit();
})();
