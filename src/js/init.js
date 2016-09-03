"use strict";

require('./helper.js');
require('./components/button.js');
require('./components/countdownpanel.js');
require('./components/slider.js');

(function() {
  var startButton = new Button('startButton');
  startButton.initStart();

  var failButton = new Button('failButton');
  failButton.initFail();

  var submitButton = new Button('submitButton');
  submitButton.submit();
})();