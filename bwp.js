;(function (w, d, undefined) {
	'use strict';
	var BWP = function (element, options) {
		var threshold = options.threshold || 0,
			s = getComputedStyle(element), // get element styles
			b = element.getBoundingClientRect(), // get element bounds
			css = 'height: '+ s.height +'; margin: '+s.margin+'; width:'+ s.width+';', // clone element dimmensions and spacing
			h = d.createElement('div'), // create placeholder
			f = false; // is it processed ?
		h.style.cssText = css; // apply the styles to the placeholder once
		w.addEventListener('scroll', function (e) {
			if(b.top - w.scrollY < threshold) { // did we reach the threshold?
				if(f) // if already processed
					return true;
				f = true;
				// process the element
				if(typeof options.beforeset == 'function') { // is the processed callback defined?
					options.set.apply(this, [element]);
				} else {
				    // set the element as fixed on page - default behavior
				    element.style.cssText = 'position: fixed;top: ' + threshold + 'px;z-index: 20;' + css;
				}
				element.insertAdjacentHTML('beforebegin', h.outerHTML); // insert placeholder
				if(typeof options.set == 'function') { // is the processed callback defined?
					options.set.apply(this, [element]);
				}
			} else {
				if(f) {
					element.style.cssText = ""; // mobile friendly
					element.removeAttribute('style');
					if(element.previousSibling) // remove placeholder
						element.previousSibling.parentNode.removeChild(element.previousSibling);
					if(typeof options.unset == 'function') { // is unset callback defined?
						options.unset.apply(this, [element]);
					}
					f = false;
				}
			}
		});
		w.addEventListener('resize', function () {
			s = getComputedStyle(element),
			b = element.getBoundingClientRect();
		}, false);
	}
	$w.BWP = BWP;
}(window, document))
