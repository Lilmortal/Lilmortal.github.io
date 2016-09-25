module.exports = (function() {
	"use strict";
	const Button = require('./button.js');
	const Config = require('../config.js');

	const config = Config.elements;
	
	const Textfield = {
		create_textfield(callback) {
			return Object.create(this.textfield[callback]);
		},

		textfield: {
			submit_textfield: {
				submit() {
					const submit_button = Button.create_button('submit_button');

					config.submit_textfield.addEventListener('keyup', (event) => {
						if (event.keyCode === 13) {
							submit_button.submit();
						}
					});				
				}
			}
		}
	}
	return Textfield;
})();