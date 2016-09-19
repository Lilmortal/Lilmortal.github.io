/**
 * This is the slider that will be displayed after the countdown. It will display an endless stream of dota images that are retrieved via Dota API.
 * It will constantly transition to the left until it reaches to the starting position of the panel that holds the images, which in that case the game
 * lose. 
 */
module.exports = (function() {
	"use strict";
	
	const Helper = require('../helper.js');
	const SLIDE_DURATION = 10;
	const WARNING_THRESHOLD = 30;
	const images = document.getElementsByClassName('images')[0];
	const imagesPanel = document.getElementsByClassName('imagesPanel')[0];
	const failBackground = document.getElementsByClassName('failBackground')[0];

	function slider(slider) {
		this.slider = document.getElementsByClassName(slider)[0];
	}

	/**
	 * Get images from dota API, appending it to a list of generated image DOM element.
	 */
	slider.prototype.getImages = function() {
		// TODO - Get list of dota images using AJAX, look up Promises and Generators
		// Promises - asychronous calls, do this, then do this
		// Generators - something about waiting indefinitely until it gets it (uses the keyword 'yield')
		// APPARENTLY GENERATORS IS A HACK, ES7 'ASYNC' KEYWORD IS THE LEGIT WAY OR SOME SHIT; I THINK? 
		// Using XMLHttpRequest on a remote server gives you 'Access-control-allow-origin' missing error; look up CORS; maybe create a Python script instead
		/*var oReq = new XMLHttpRequest();
		oReq.onload = function (e) {
		    console.log(e.target.response.message);
		};
		oReq.open('GET', 'https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=6C1CF76C90768388618F348BB73EE015&language=en_us&format=JSON', true);
		oReq.responseType = 'json';
		oReq.send();*/

		// TODO: Fix this, it's been called everytime you start a new game which is very inefficient
		const dotaHeroesJson = JSON.parse(this.stubDotaHeroes());
		const fragment = document.createDocumentFragment();
		const heroes = dotaHeroesJson.result.heroes;
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
	}

	/**
	 * Transition effect on the images.
	 */
	slider.prototype.slide = function() {
		const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	    const defaultWidth = (screenWidth - imagesPanel.offsetWidth/ 2) + imagesPanel.offsetWidth;
	    const warningWidth = defaultWidth * WARNING_THRESHOLD / 100;
	    let timer;

		images.style.marginLeft = '0';
	    images.style.transition = SLIDE_DURATION + 's linear';
		Helper.removeClass(imagesPanel, 'warningAnimation');

	    timer = setInterval(function() {
	    	if (Helper.getPosition(images).x <= warningWidth) {
				Helper.addClass(imagesPanel, 'warningAnimation');
				clearInterval(timer);
	    	}
	    }, 1000);
	}

	/**
	 * Initialize the slider transition, display the fail panel when the transition ends.
	 */
	slider.prototype.startSlider = function() {
		if (images.children.length === 0) {
			this.getImages();
		}
		Helper.showElement(this.slider);
		this.slide();
		Helper.transitionEnd(images, function() {
			document.getElementsByClassName('resultText')[0].innerHTML = 'You lose...';
			Helper.showElement(failBackground);
		});
	}

	// Temporary until an actual call to API is made
	slider.prototype.stubDotaHeroes = function() {
		return `{
		"result":{
		"heroes":[
		{
		"name":"npc_dota_hero_antimage",
		"id":1,
		"localized_name":"Anti-Mage"
		},
		{
		"name":"npc_dota_hero_axe",
		"id":2,
		"localized_name":"Axe"
		},
		{
		"name":"npc_dota_hero_bane",
		"id":3,
		"localized_name":"Bane"
		},
		{
		"name":"npc_dota_hero_bloodseeker",
		"id":4,
		"localized_name":"Bloodseeker"
		},
		{
		"name":"npc_dota_hero_crystal_maiden",
		"id":5,
		"localized_name":"Crystal Maiden"
		},
		{
		"name":"npc_dota_hero_drow_ranger",
		"id":6,
		"localized_name":"Drow Ranger"
		},
		{
		"name":"npc_dota_hero_earthshaker",
		"id":7,
		"localized_name":"Earthshaker"
		},
		{
		"name":"npc_dota_hero_juggernaut",
		"id":8,
		"localized_name":"Juggernaut"
		},
		{
		"name":"npc_dota_hero_mirana",
		"id":9,
		"localized_name":"Mirana"
		},
		{
		"name":"npc_dota_hero_nevermore",
		"id":11,
		"localized_name":"Shadow Fiend"
		},
		{
		"name":"npc_dota_hero_morphling",
		"id":10,
		"localized_name":"Morphling"
		},
		{
		"name":"npc_dota_hero_phantom_lancer",
		"id":12,
		"localized_name":"Phantom Lancer"
		},
		{
		"name":"npc_dota_hero_puck",
		"id":13,
		"localized_name":"Puck"
		},
		{
		"name":"npc_dota_hero_pudge",
		"id":14,
		"localized_name":"Pudge"
		},
		{
		"name":"npc_dota_hero_razor",
		"id":15,
		"localized_name":"Razor"
		},
		{
		"name":"npc_dota_hero_sand_king",
		"id":16,
		"localized_name":"Sand King"
		},
		{
		"name":"npc_dota_hero_storm_spirit",
		"id":17,
		"localized_name":"Storm Spirit"
		},
		{
		"name":"npc_dota_hero_sven",
		"id":18,
		"localized_name":"Sven"
		},
		{
		"name":"npc_dota_hero_tiny",
		"id":19,
		"localized_name":"Tiny"
		},
		{
		"name":"npc_dota_hero_vengefulspirit",
		"id":20,
		"localized_name":"Vengeful Spirit"
		},
		{
		"name":"npc_dota_hero_windrunner",
		"id":21,
		"localized_name":"Windranger"
		},
		{
		"name":"npc_dota_hero_zuus",
		"id":22,
		"localized_name":"Zeus"
		},
		{
		"name":"npc_dota_hero_kunkka",
		"id":23,
		"localized_name":"Kunkka"
		},
		{
		"name":"npc_dota_hero_lina",
		"id":25,
		"localized_name":"Lina"
		},
		{
		"name":"npc_dota_hero_lich",
		"id":31,
		"localized_name":"Lich"
		},
		{
		"name":"npc_dota_hero_lion",
		"id":26,
		"localized_name":"Lion"
		},
		{
		"name":"npc_dota_hero_shadow_shaman",
		"id":27,
		"localized_name":"Shadow Shaman"
		},
		{
		"name":"npc_dota_hero_slardar",
		"id":28,
		"localized_name":"Slardar"
		},
		{
		"name":"npc_dota_hero_tidehunter",
		"id":29,
		"localized_name":"Tidehunter"
		},
		{
		"name":"npc_dota_hero_witch_doctor",
		"id":30,
		"localized_name":"Witch Doctor"
		},
		{
		"name":"npc_dota_hero_riki",
		"id":32,
		"localized_name":"Riki"
		},
		{
		"name":"npc_dota_hero_enigma",
		"id":33,
		"localized_name":"Enigma"
		},
		{
		"name":"npc_dota_hero_tinker",
		"id":34,
		"localized_name":"Tinker"
		},
		{
		"name":"npc_dota_hero_sniper",
		"id":35,
		"localized_name":"Sniper"
		},
		{
		"name":"npc_dota_hero_necrolyte",
		"id":36,
		"localized_name":"Necrophos"
		},
		{
		"name":"npc_dota_hero_warlock",
		"id":37,
		"localized_name":"Warlock"
		},
		{
		"name":"npc_dota_hero_beastmaster",
		"id":38,
		"localized_name":"Beastmaster"
		},
		{
		"name":"npc_dota_hero_queenofpain",
		"id":39,
		"localized_name":"Queen of Pain"
		},
		{
		"name":"npc_dota_hero_venomancer",
		"id":40,
		"localized_name":"Venomancer"
		},
		{
		"name":"npc_dota_hero_faceless_void",
		"id":41,
		"localized_name":"Faceless Void"
		},
		{
		"name":"npc_dota_hero_skeleton_king",
		"id":42,
		"localized_name":"Wraith King"
		},
		{
		"name":"npc_dota_hero_death_prophet",
		"id":43,
		"localized_name":"Death Prophet"
		},
		{
		"name":"npc_dota_hero_phantom_assassin",
		"id":44,
		"localized_name":"Phantom Assassin"
		},
		{
		"name":"npc_dota_hero_pugna",
		"id":45,
		"localized_name":"Pugna"
		},
		{
		"name":"npc_dota_hero_templar_assassin",
		"id":46,
		"localized_name":"Templar Assassin"
		},
		{
		"name":"npc_dota_hero_viper",
		"id":47,
		"localized_name":"Viper"
		},
		{
		"name":"npc_dota_hero_luna",
		"id":48,
		"localized_name":"Luna"
		},
		{
		"name":"npc_dota_hero_dragon_knight",
		"id":49,
		"localized_name":"Dragon Knight"
		},
		{
		"name":"npc_dota_hero_dazzle",
		"id":50,
		"localized_name":"Dazzle"
		},
		{
		"name":"npc_dota_hero_rattletrap",
		"id":51,
		"localized_name":"Clockwerk"
		},
		{
		"name":"npc_dota_hero_leshrac",
		"id":52,
		"localized_name":"Leshrac"
		},
		{
		"name":"npc_dota_hero_furion",
		"id":53,
		"localized_name":"Nature's Prophet"
		},
		{
		"name":"npc_dota_hero_life_stealer",
		"id":54,
		"localized_name":"Lifestealer"
		},
		{
		"name":"npc_dota_hero_dark_seer",
		"id":55,
		"localized_name":"Dark Seer"
		},
		{
		"name":"npc_dota_hero_clinkz",
		"id":56,
		"localized_name":"Clinkz"
		},
		{
		"name":"npc_dota_hero_omniknight",
		"id":57,
		"localized_name":"Omniknight"
		},
		{
		"name":"npc_dota_hero_enchantress",
		"id":58,
		"localized_name":"Enchantress"
		},
		{
		"name":"npc_dota_hero_huskar",
		"id":59,
		"localized_name":"Huskar"
		},
		{
		"name":"npc_dota_hero_night_stalker",
		"id":60,
		"localized_name":"Night Stalker"
		},
		{
		"name":"npc_dota_hero_broodmother",
		"id":61,
		"localized_name":"Broodmother"
		},
		{
		"name":"npc_dota_hero_bounty_hunter",
		"id":62,
		"localized_name":"Bounty Hunter"
		},
		{
		"name":"npc_dota_hero_weaver",
		"id":63,
		"localized_name":"Weaver"
		},
		{
		"name":"npc_dota_hero_jakiro",
		"id":64,
		"localized_name":"Jakiro"
		},
		{
		"name":"npc_dota_hero_batrider",
		"id":65,
		"localized_name":"Batrider"
		},
		{
		"name":"npc_dota_hero_chen",
		"id":66,
		"localized_name":"Chen"
		},
		{
		"name":"npc_dota_hero_spectre",
		"id":67,
		"localized_name":"Spectre"
		},
		{
		"name":"npc_dota_hero_doom_bringer",
		"id":69,
		"localized_name":"Doom"
		},
		{
		"name":"npc_dota_hero_ancient_apparition",
		"id":68,
		"localized_name":"Ancient Apparition"
		},
		{
		"name":"npc_dota_hero_ursa",
		"id":70,
		"localized_name":"Ursa"
		},
		{
		"name":"npc_dota_hero_spirit_breaker",
		"id":71,
		"localized_name":"Spirit Breaker"
		},
		{
		"name":"npc_dota_hero_gyrocopter",
		"id":72,
		"localized_name":"Gyrocopter"
		},
		{
		"name":"npc_dota_hero_alchemist",
		"id":73,
		"localized_name":"Alchemist"
		},
		{
		"name":"npc_dota_hero_invoker",
		"id":74,
		"localized_name":"Invoker"
		},
		{
		"name":"npc_dota_hero_silencer",
		"id":75,
		"localized_name":"Silencer"
		},
		{
		"name":"npc_dota_hero_obsidian_destroyer",
		"id":76,
		"localized_name":"Outworld Devourer"
		},
		{
		"name":"npc_dota_hero_lycan",
		"id":77,
		"localized_name":"Lycan"
		},
		{
		"name":"npc_dota_hero_brewmaster",
		"id":78,
		"localized_name":"Brewmaster"
		},
		{
		"name":"npc_dota_hero_shadow_demon",
		"id":79,
		"localized_name":"Shadow Demon"
		},
		{
		"name":"npc_dota_hero_lone_druid",
		"id":80,
		"localized_name":"Lone Druid"
		},
		{
		"name":"npc_dota_hero_chaos_knight",
		"id":81,
		"localized_name":"Chaos Knight"
		},
		{
		"name":"npc_dota_hero_meepo",
		"id":82,
		"localized_name":"Meepo"
		},
		{
		"name":"npc_dota_hero_treant",
		"id":83,
		"localized_name":"Treant Protector"
		},
		{
		"name":"npc_dota_hero_ogre_magi",
		"id":84,
		"localized_name":"Ogre Magi"
		},
		{
		"name":"npc_dota_hero_undying",
		"id":85,
		"localized_name":"Undying"
		},
		{
		"name":"npc_dota_hero_rubick",
		"id":86,
		"localized_name":"Rubick"
		},
		{
		"name":"npc_dota_hero_disruptor",
		"id":87,
		"localized_name":"Disruptor"
		},
		{
		"name":"npc_dota_hero_nyx_assassin",
		"id":88,
		"localized_name":"Nyx Assassin"
		},
		{
		"name":"npc_dota_hero_naga_siren",
		"id":89,
		"localized_name":"Naga Siren"
		},
		{
		"name":"npc_dota_hero_keeper_of_the_light",
		"id":90,
		"localized_name":"Keeper of the Light"
		},
		{
		"name":"npc_dota_hero_wisp",
		"id":91,
		"localized_name":"Io"
		},
		{
		"name":"npc_dota_hero_visage",
		"id":92,
		"localized_name":"Visage"
		},
		{
		"name":"npc_dota_hero_slark",
		"id":93,
		"localized_name":"Slark"
		},
		{
		"name":"npc_dota_hero_medusa",
		"id":94,
		"localized_name":"Medusa"
		},
		{
		"name":"npc_dota_hero_troll_warlord",
		"id":95,
		"localized_name":"Troll Warlord"
		},
		{
		"name":"npc_dota_hero_centaur",
		"id":96,
		"localized_name":"Centaur Warrunner"
		},
		{
		"name":"npc_dota_hero_magnataur",
		"id":97,
		"localized_name":"Magnus"
		},
		{
		"name":"npc_dota_hero_shredder",
		"id":98,
		"localized_name":"Timbersaw"
		},
		{
		"name":"npc_dota_hero_bristleback",
		"id":99,
		"localized_name":"Bristleback"
		},
		{
		"name":"npc_dota_hero_tusk",
		"id":100,
		"localized_name":"Tusk"
		},
		{
		"name":"npc_dota_hero_skywrath_mage",
		"id":101,
		"localized_name":"Skywrath Mage"
		},
		{
		"name":"npc_dota_hero_abaddon",
		"id":102,
		"localized_name":"Abaddon"
		},
		{
		"name":"npc_dota_hero_elder_titan",
		"id":103,
		"localized_name":"Elder Titan"
		},
		{
		"name":"npc_dota_hero_legion_commander",
		"id":104,
		"localized_name":"Legion Commander"
		},
		{
		"name":"npc_dota_hero_ember_spirit",
		"id":106,
		"localized_name":"Ember Spirit"
		},
		{
		"name":"npc_dota_hero_earth_spirit",
		"id":107,
		"localized_name":"Earth Spirit"
		},
		{
		"name":"npc_dota_hero_terrorblade",
		"id":109,
		"localized_name":"Terrorblade"
		},
		{
		"name":"npc_dota_hero_phoenix",
		"id":110,
		"localized_name":"Phoenix"
		},
		{
		"name":"npc_dota_hero_oracle",
		"id":111,
		"localized_name":"Oracle"
		},
		{
		"name":"npc_dota_hero_techies",
		"id":105,
		"localized_name":"Techies"
		},
		{
		"name":"npc_dota_hero_winter_wyvern",
		"id":112,
		"localized_name":"Winter Wyvern"
		},
		{
		"name":"npc_dota_hero_arc_warden",
		"id":113,
		"localized_name":"Arc Warden"
		},
		{
		"name":"npc_dota_hero_abyssal_underlord",
		"id":108,
		"localized_name":"Underlord"
		}
		]
		,
		"status":200,
		"count":112
		}
		}`
	}

	return slider;
})();