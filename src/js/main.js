"use strict";

/**
 * The main objective of this game is the users must quickly type in the exact value for the first dota item that is displayed amongst a list of dota
 * images; that value is the price of that item currently. If the user did not type the correct value in time before the images reaches the end, the
 * game loses.
 * @author Jack Tan
 */
(function() {
	var startButton = new Button('startButton');
	startButton.initStart();

	var failButton = new Button('failButton');
	failButton.initFail();

  	var submitButton = new Button('submitButton');
  	submitButton.submit();
})();