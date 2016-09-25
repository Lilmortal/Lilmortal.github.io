/**
 * This is the slider that will be displayed after the countdown. It will display an endless stream of dota images that are retrieved via Dota API.
 * It will constantly transition to the left until it reaches to the starting position of the panel that holds the images, which in that case the game
 * lose. 
 */
module.exports = (function() {
	"use strict";
	
	const Helper = require('../helper.js');
	const Config = require('../config.js');
	const config = Config.elements;
	const SLIDE_DURATION = 10;
	const WARNING_THRESHOLD = 30;
	const url = 'http://lilmortal-test.apigee.net/getdotaheroes?key=6C1CF76C90768388618F348BB73EE015&language=en_us&format=JSON';
	const Slider = {	
		create_slider() {
			return Object.create(this.slider_panel);
		},

		slider_panel: {
			get_status(response) {
				if (response.status !== 200) {
					return Promise.reject(new Error(response.statusText));
				} else {
					return Promise.resolve(response);
				}
			},
			get_json(response) {
				return response.json();
			},
			load_images() {
				var self = this;
				fetch(url)
				.then(this.get_status)
				.then(this.get_json)
				.then(function (response) {
					const heroes = response.result.heroes;
			        const fragment = document.createDocumentFragment();

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
					config.images.appendChild(fragment);
				})
			},
			slide() {
				var self = this;
				const screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			    const default_width = (screen_width - config.images_panel.offsetWidth/ 2) + config.images_panel.offsetWidth;
			    const warning_width = default_width * WARNING_THRESHOLD / 100;
			    let timer;
				config.images.style.marginLeft = '0';
			    config.images.style.transition = SLIDE_DURATION + 's linear';
				Helper.remove_class(config.images_panel, 'warning_animation');

			    timer = setInterval(function() {
			    	if (Helper.get_position(config.images).x <= warning_width) {
						Helper.add_class(config.images_panel, 'warning_animation');
						clearInterval(timer);
			    	}
			    }, 1000);
			},
			start_slider() {
				var self = this;
				const slider_promise = new Promise(function(resolve, reject) {
					if (config.images.children.length === 0) {
						self.load_images();
					}
					Helper.show_element(config.slider_panel);
					self.slide();
					resolve(config.images);
				});
				return slider_promise;
			}
		}
	}
	return Slider;
})();