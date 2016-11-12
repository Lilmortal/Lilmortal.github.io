A simple web application which displays a list of dota hero images; you must quickly type the first hero name before it reaches the end.

The main purpose of this web application is to practice Javascript and CSS without any frameworks. Currently I am using ES6 and factory patterns to structure my Javascript code,
and SASS as my CSS compiler. It is not perfect yet, and so here are a list of bugs/features that I want to implement if I have time:

<ul>
	<li> Replace setTimeout on the slider with requestAnimationFrames; I will need to figure out how to use it asynchronously (e.g. compatible with Promises)</li>
	<li> At the moment I explicitly inserts helper functions (e.g. show(), hide()) to all elements. The problem is the images themselves are not on the DOM initially; they are 
	appended after. I will need to figure out how to insert helper functions to those image elements without duplicate code</li>
	<li> Webpack config is a bit screwed up at the moment. Hot reload is not working; I need to figure out how to be able to read seperate JS files when debugging instead of only 
	have one JS file at the moment (bundle.js); and replace webpack-dev-server with an actual server that I will soon create.</li>
	<li>Modularize my files instead of having HTML/CSS/JS folders. What about files like base.scss? Do I put that out in the root folder? Do I create a new folder for it? Do I need a
	template for HTML like Jade?</li>
	<li>Maybe think about using BEM + SMACSS + OOCSS</li>
	<li>Test this using Mocha or Jasmine. Need to structure it so it is more testable (e.g. use import * as something instead of import { something }); think about using 
	dependency injection here.</li>
	<li>Make the website design better... It looks so 90s</li>
	<li>Maybe have a high score? Try implement a HTML5 local storage</li>
</ul>