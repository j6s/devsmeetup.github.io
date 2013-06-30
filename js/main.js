/**
 * @author: Hans Christian Reinl
 * @date: 30.06.2013
 */

(function () {
	'use strict';

	// The loader
	var L = (function () {
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
	}());


	// Onload, load index content
	L.load('single-view.tpl', '.site-content');

	// And load teaser
	L.load('teaser', '.site-teaser');

}());

