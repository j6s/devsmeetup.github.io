/**
 * @author: Hans Christian Reinl
 * @date: 30.06.2013
 */

(function () {
	'use strict';

	var meetupsData;

	// Some helpers
	var Helper = {


		createElement: function (htmlString) {
			var fragment = document.createDocumentFragment();
			var temp = document.createElement('div');

			temp.innerHTML = htmlString;

			while (temp.firstChild) {
				fragment.appendChild(temp.firstChild);
			}

			return fragment;
		},

		// Content injection
		setContent: function (selector, content) {
			var fragment;
			var element = document.querySelector(selector);

			// Delete all content from content element
			element.innerHTML = '';

			// Create a fragment from the input
			fragment = Helper.createElement(content);

			// Append the content
			element.appendChild(fragment);
		}
	};

	// The loader
	var L = function () {

		// Main loading function
		var _load = function (what, where, callback) {
			var pathPrefix = 'content/';
			var fileSuffix = '.html';
			var file;

			// Initialize XHR
			var xhr = new XMLHttpRequest();

			var _ensureReadiness = function () {
				if (xhr.readyState < 4) {
					return;
				}

				if (xhr.status !== 200) {
					return;
				}

				// We're ok
				if (xhr.readyState === 4) {

					// If we want to create a new element
					if (where !== '') {
						Helper.setContent(where, xhr.responseText);
					}

					// Call a callback
					if (typeof callback === 'function') {
						callback.call(this, xhr.responseText);
					}
				}
			};

			// Correct file path
			if (what.indexOf('.') > -1) {
				fileSuffix = '';
			}

			file = pathPrefix + what + fileSuffix;

			// New XHR
			xhr.onreadystatechange = _ensureReadiness;
			xhr.open('GET', file, true);
			xhr.send();
		};

		// Public API
		return {
			load: _load
		};
	};


	// Class to website's functionality
	var D = function () {

		// Initialize Loader
		var Loader = new L();

		var _mainAction = 'index';
		var _allowedActions = ['index', 'teaser'];

		// Compiled templates
		var templates = {
			archive: Hogan.compile(document.getElementById('template-archive').innerHTML),
			single: Hogan.compile(document.getElementById('template-single').innerHTML)
		};

		// Inject script for twitter
		var _injectTwitterButton = function () {
			if (document.querySelector('.twitter-share-button')) {
				(function (d,s,id) {
					var js;
					var fjs = d.getElementsByTagName(s)[0];

					if (!d.getElementById(id)) {
						js = d.createElement(s);
						js.id = id;
						js.src = "//platform.twitter.com/widgets.js";
						fjs.parentNode.insertBefore(js, fjs);
					}
				}(document, 'script', 'twitter-wjs'));
			}
		};

		// Filter single view and return correct one if available
		var _findSingleMeetup = function (url) {
			var i = 0;
			var max = meetupsData.meetups.length;
			for (; i < max; i++) {
				if (meetupsData.meetups[i].url === url) {
					return meetupsData.meetups[i];
				}
			}

			return undefined;
		};

		// Handler for meetup: either load single view or list
		var _handleMeetup = function (action, data) {
			var content;
			var single;

			action = action.split('/');

			if (action[1]) {
				single = _findSingleMeetup(action[1]);

				content = templates.single.render(single);
			} else {
				content = templates.archive.render(data);
			}

			Helper.setContent('.site-content', content);
		};

		var _mainHandler = function () {
			var action = window.location.hash.replace('#/', '');

			document.querySelector('.site-teaser').innerHTML = '';

			// Load index content
			if (action === '' || action === '!') {

				Loader.load(_mainAction, '.site-content', _injectTwitterButton);

				// And load teaser
				Loader.load('teaser', '.site-teaser');

				return;
			}

			// Otherwise load some other content
			if (_allowedActions.indexOf(action) > -1) {
				document.querySelector('.site-teaser').innerHTML = '';

				Loader.load(action, '.site-content');

				window.scrollTo(0);
			} else if (action.indexOf('meetup') > -1) {

				// Meetup data already available
				if (meetupsData) {
					_handleMeetup(action, meetupsData);

				// Load meetup data
				} else {
					Loader.load('meetups.json', '', function (data) {

						// Parse data
						data = JSON.parse(data);

						// Put data in a wrapper object
						data.meetups = data.reverse();

						// Set data globalls
						meetupsData = data;

						_handleMeetup(action, meetupsData);
					});
				}

				window.scrollTo(0);
			}
		};


		return {
			init: function () {

				// Initialize hash change events
				window.addEventListener('hashchange', _mainHandler, false);
				window.addEventListener('load', _mainHandler, false);
			}
		};

	};



	// Initialize all functionality
	var d = D();

	d.init();

}());

