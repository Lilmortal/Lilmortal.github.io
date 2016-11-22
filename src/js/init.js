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

// Add helper functions to each elements (e.g. so each element have methods like show(), hide() etc)
for (let element of Config.elements) {
	if (element instanceof HTMLCollection) {
		for (let htmlCollectionElement of element) {
			Object.assign(htmlCollectionElement, Helper);
		}
	} else {
		Object.assign(element, Helper);	
	}
}