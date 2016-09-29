module.exports = (function() {
	"use strict";

	const Config = require('../config.js');

	const {elements, text} = Config;

	const Images = {
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
			fetch(text.images_json_url)
			.then(this.get_status)
			.then(this.get_json)
			.then((response) => {
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
				elements.images.appendChild(fragment);
			})
		}
	}

	return Images;
})();