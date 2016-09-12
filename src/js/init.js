//TODO - "use strict" better here or inside IIFE?
"use strict";

require('./helper.js');
require('./components/button.js');
require('./components/countdownpanel.js');
require('./components/slider.js');

(function() {
  const startButton = new Button('startButton');
  startButton.initStart();

  const failButton = new Button('failButton');
  failButton.initFail();

  const submitButton = new Button('submitButton');
  submitButton.submit();
})();