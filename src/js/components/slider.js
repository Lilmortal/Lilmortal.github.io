/**
 * This is the slider that will be displayed after the countdown. It will display an endless stream of dota images that are retrieved via Dota API.
 * It will constantly transition to the left until it reaches to the starting position of the panel that holds the images, which in that case the game
 * lose. 
 */
module.exports = (function() {
	"use strict";
	
	const Helper = require('../helper.js');
	const SLIDE_DURATION = 10;
	const WARNING_THRESHOLD = 30;
	const images = document.getElementsByClassName('images')[0];
	const imagesPanel = document.getElementsByClassName('images_panel')[0];
	const failBackground = document.getElementsByClassName('fail_background')[0];

	function slider(slider) {
		this.slider = document.getElementsByClassName(slider)[0];
	}

	/**
	 * Get images from dota API, appending it to a list of generated image DOM element.
	 */
	slider.prototype.getImages = function() {
		// TODO - Get list of dota images using AJAX, look up Promises and Generators
		// Promises - asychronous calls, do this, then do this
		// Generators - something about waiting indefinitely until it gets it (uses the keyword 'yield')
		// APPARENTLY GENERATORS IS A HACK, ES7 'ASYNC' KEYWORD IS THE LEGIT WAY OR SOME SHIT; I THINK? 
		// Using XMLHttpRequest on a remote server gives you 'Access-control-allow-origin' missing error; look up CORS; maybe create a Python script instead
		let dotaHeroesJson;
		var oReq = new XMLHttpRequest();
		oReq.onreadystatechange = function() {
		    if (oReq.readyState === XMLHttpRequest.DONE) {
		        dotaHeroesJson = JSON.parse(oReq.responseText);
		        const fragment = document.createDocumentFragment();
				const heroes = dotaHeroesJson.result.heroes;
				for (let i = 0; i < heroes.length; i++) {
					const image = document.createElement('img');
					image.className = 'image';
					image.src = 'http://cdn.dota2.com/apps/dota2/images/heroes/' + heroes[i].name.replace('npc_dota_hero_', '') + '_lg.png';
					//It should be Tuskar, not Tusk!
					if (heroes[i].localized_name === 'Tusk') {
						heroes[i].localized_name = 'Tuskar';
					}
					image.name = heroes[i].localized_name;
					fragment.appendChild(image);
				}
				images.appendChild(fragment);
		    }
		    //ALLAH AKBAR
		}
		//oReq.open('GET', 'https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=6C1CF76C90768388618F348BB73EE015&language=en_us&format=JSON', true);
		oReq.open('GET', 'http://lilmortal-test.apigee.net/getdotaheroes?key=6C1CF76C90768388618F348BB73EE015&language=en_us&format=JSON');
		//oReq.responseType = 'json';
		oReq.send();
		//console.log(oReq.responseText);
		// TODO: Fix this, it's been called everytime you start a new game which is very inefficient
		//const dotaHeroesJson = oReq.response;//JSON.parse(this.stubDotaHeroes());
		//console.log(dotaHeroesJson);

	}

	/**
	 * Transition effect on the images.
	 */
	slider.prototype.slide = function() {
		const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	    const defaultWidth = (screenWidth - imagesPanel.offsetWidth/ 2) + imagesPanel.offsetWidth;
	    const warningWidth = defaultWidth * WARNING_THRESHOLD / 100;
	    let timer;

		images.style.marginLeft = '0';
	    images.style.transition = SLIDE_DURATION + 's linear';
		Helper.removeClass(imagesPanel, 'warning_animation');

	    timer = setInterval(function() {
	    	if (Helper.getPosition(images).x <= warningWidth) {
				Helper.addClass(imagesPanel, 'warning_animation');
				clearInterval(timer);
	    	}
	    }, 1000);
	}

	/**
	 * Initialize the slider transition, display the fail panel when the transition ends.
	 */
	slider.prototype.startSlider = function() {
		if (images.children.length === 0) {
			this.getImages();
		}
		Helper.showElement(this.slider);
		this.slide();
		Helper.transitionEnd(images, function() {
			document.getElementsByClassName('result_text')[0].innerHTML = 'You lose...';
			Helper.showElement(failBackground);
		});
	}
	return slider;
})();