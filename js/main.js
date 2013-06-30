/**
 * @author: Hans Christian Reinl
 * @date: 30.06.2013
 */

(function () {
	'use strict';

	// The loader
	var L = function () {
		var pathPrefix = 'content/';
		var fileSuffix = '.html';


		var _createElement = function (htmlString) {
			var fragment = document.createDocumentFragment();
			var temp = document.createElement('div');

			temp.innerHTML = htmlString;

			while (temp.firstChild) {
				fragment.appendChild(temp.firstChild);
			}

			return fragment;
		};

		// Main loading function
		var _load = function (what, where, callback) {
			var _main = document.querySelector(where); // main element to insert

			// Initialize XHR
			var xhr = new XMLHttpRequest();

			var _ensureReadiness = function () {
				var fragment;

				if (xhr.readyState < 4) {
					return;
				}

				if (xhr.status !== 200) {
					return;
				}

				// We're ok
				if (xhr.readyState === 4) {

					// Create a fragment from the input
					fragment = _createElement(xhr.response);

					// Append the content
					_main.appendChild(fragment);

					// Call a callback
					if (typeof callback === 'function') {
						callback.call(this);
					}
				}
			};

			// Delete all content from main element
			_main.innerHTML = '';

			// New XHR
			xhr.onreadystatechange = _ensureReadiness;
			xhr.open('GET', pathPrefix + what + fileSuffix, true);
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
		var _allowedActions = ['index', 'archive', 'teaser'];

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

		var _mainHandler = function () {
			var action = window.location.hash.replace('#/', '');

			// Load index content
			if (action === '' || action === '!') {

				Loader.load(_mainAction, '.site-content', _injectTwitterButton);

				// And load teaser
				Loader.load('teaser', '.site-teaser');

				return;
			}

			// Otherwise load some other content
			if (_allowedActions.indexOf(action)) {
				document.querySelector('.site-teaser').innerHTML = '';

				Loader.load(action, '.site-content');

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

