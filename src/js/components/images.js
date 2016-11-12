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

			// Added helper functions to each image so they have methods like show(), hide() etc; problem is this
			// has been done on init.js for other elements already. This is added here because this images are added to the DOM AFTER. 
			// Need to figure out if there is another solution to this.
			for (let [a,b] of Object.entries(images.children)) {
				for (let [k,v] of Object.entries(Helper)) {
					b[k] = v;
				}
			}
		})
	}
}
