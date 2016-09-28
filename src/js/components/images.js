module.exports = (function() {
	"use strict";

	const Config = require('../config.js');

	const elements = Config.elements;
	const text = Config.text;

	const Images = {
		get_status(response) {
			if (response.status !== 200) {
				return Promise.reject(new Error("Failed to load images, error status: " + response.statusText));
			} else {
				return Promise.resolve(response);
			}
		},
		get_json(response) {
			return response.json();
		},
		load_images() {
			fetch(text.images_json_url)
			.then(this.get_status)
			.then(this.get_json)
			.then((response) => {
				const fragment = document.createDocumentFragment();

				for (let hero of response.result.heroes) {
					const image = document.createElement('img');
					image.className = 'image';
					image.src = text.image_url + hero.name.replace('npc_dota_hero_', '') + text.image_size;
					//It should be Tuskar, not Tusk!
					if (hero.localized_name === 'Tusk') {
						hero.localized_name = 'Tuskar';
					}
					image.name = hero.localized_name;
					fragment.appendChild(image);
				}
				elements.images.appendChild(fragment);
			})
			.catch((e) => {
				console.log(e);
			});
		}
	}

	return Images;
})();