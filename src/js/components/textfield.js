import { Button } from './button';
import { Config } from '../config';

const { submit_textfield } = Config.elements;

export const Textfield = {
	create_textfield(callback) {
		return Object.create(this.textfield[callback]);
	},

	textfield: {
		submit_textfield: {
			submit() {
				const submit_button = Button.create_button('submit_button');

				submit_textfield.addEventListener('keyup', (event) => {
					if (event.keyCode === 13) {
						submit_button.submit();
					}
				});				
			}
		}
	}
}
