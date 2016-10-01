import {Button} from './button.js';
import {Config} from '../config.js';

const {elements} = Config;

export const Textfield = {
	create_textfield(callback) {
		return Object.create(this.textfield[callback]);
	},

	textfield: {
		submit_textfield: {
			submit() {
				const submit_button = Button.create_button('submit_button');

				elements.submit_textfield.addEventListener('keyup', (event) => {
					if (event.keyCode === 13) {
						submit_button.submit();
					}
				});				
			}
		}
	}
}
