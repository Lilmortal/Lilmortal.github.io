import { Config } from '../config';
import { Helper } from '../helper';

const { images } = Config.elements;
const { images_json_url } = Config.text;

export const Images = {
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
		fetch(images_json_url)
		.then(this.get_status)
		.then(this.get_json)
		.then((response) => {
			const heroes = response.result.heroes;
			const fragment = document.createDocumentFragment();

			Array.from(heroes).map((hero) => {
				const image = document.createElement('img');
				image.className = 'image';
				image.src = 'http://cdn.dota2.com/apps/dota2/images/heroes/' + hero.name.replace('npc_dota_hero_', '') + '_lg.png';
				//It should be Tuskar, not Tusk!
				if (hero.localized_name === 'Tusk') {
					hero.localized_name = 'Tuskar';
				}
				image.name = hero.localized_name;
				Object.assign(image, Helper);
				fragment.appendChild(image);
			});
			
			images.appendChild(fragment);
		})
	}
}
