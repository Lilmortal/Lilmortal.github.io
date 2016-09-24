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
	const images_panel = document.getElementsByClassName('images_panel')[0];
	const fail_background = document.getElementsByClassName('fail_background')[0];
	const url = 'http://lilmortal-test.apigee.net/getdotaheroes?key=6C1CF76C90768388618F348BB73EE015&language=en_us&format=JSON';
	const Slider = {
		create_slider() {
			return Object.create(this.slider_panel);
		},

		slider_panel: {
			load_images() {
				return new Promise(function(resolve, reject) {
					const oReq = new XMLHttpRequest();
					oReq.open('GET', url);
					oReq.onload = function() {
					    if (oReq.readyState === XMLHttpRequest.DONE && oReq.status === 200) {
					        resolve(JSON.parse(oReq.responseText));
					    } else {
					    	reject(oReq.statusText);
					    }
					};		
					oReq.send();
				})			
			},
			get_images() {
				this.load_images(url).then(function(response) {
			        const fragment = document.createDocumentFragment();
					const heroes = response.result.heroes;
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
					}, function(error) {
						console.log("Error loading the images. " + error);
					}
				);	
			},
			slide() {
				const screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			    const default_width = (screen_width - images_panel.offsetWidth/ 2) + images_panel.offsetWidth;
			    const warning_width = default_width * WARNING_THRESHOLD / 100;
			    let timer;
				images.style.marginLeft = '0';
			    images.style.transition = SLIDE_DURATION + 's linear';
				Helper.remove_class(images_panel, 'warning_animation');

			    timer = setInterval(function() {
			    	if (Helper.get_position(images).x <= warning_width) {
						Helper.add_class(images_panel, 'warning_animation');
						clearInterval(timer);
			    	}
			    }, 1000);
			},
			start_slider() {
				var self = this;
				const slider = document.getElementsByClassName('slider_panel')[0];
				const slider_promise = new Promise(function(resolve, reject) {
					if (images.children.length === 0) {
						self.get_images();
					}
					Helper.show_element(slider);
					self.slide();
					resolve(images);
				});
				return slider_promise;
			}
		}
	}
	return Slider;
})();