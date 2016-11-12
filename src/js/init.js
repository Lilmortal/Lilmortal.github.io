require('../css/main.scss');
require('../img/background_image.jpg');

import { Button } from './components/button';
import { Textfield } from './components/textfield';
import { Images } from './components/images';
import { Config } from './config';
import { Helper } from './helper';

Images.load_images();

const start_button = Button.create_button('start_button').click('start_game');

const fail_button = Button.create_button('fail_button').click('restart_game');

const submit_button = Button.create_button('submit_button').click('submit');

const submit_textfield = Textfield.create_textfield('submit_textfield').submit();

for (let element of Object.values(Config.elements)) {
	for (let [k,v] of Object.entries(Helper)) {
		if (element.length >= 0) {
			for (let el of element) {
				el[k] = v;
			}
		} else {
			element[k] = v;
		}
	}
}