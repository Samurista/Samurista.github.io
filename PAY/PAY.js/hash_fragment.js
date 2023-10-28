'use strict';

var url = window.location.href;

// if there's a state parameter part of a hash fragment on the error page then reload the page with query parameters
// to retrieve the session based on this state parameter
if (url.indexOf('#') > -1 && url.indexOf('/error') > -1 && url.indexOf('state=') > -1) {
	document.title = 'Sofort GmbH - A Klarna Group Company';
	url = url.replace(/#/g, '?');
	url = url.replace(/\/error/g, '/go');
	window.location.href = url;
}