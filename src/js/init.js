require('../css/main.scss');
require('../img/background_image.jpg');

import {Button} from './components/button.js';
import {Textfield} from './components/textfield.js';
import {Images} from './components/images.js';

Images.load_images();

const start_button = Button.create_button('start_button');
start_button.click('start_game');

const fail_button = Button.create_button('fail_button');
fail_button.click('restart_game');

const submit_button = Button.create_button('submit_button');
submit_button.click('submit');

const submit_textfield = Textfield.create_textfield('submit_textfield');
submit_textfield.submit();
