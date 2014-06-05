/*
 * router.js
 */
define([
	'jquery',
	'can'
	/*,
	'model_box',
	'model_user',
	'page_box',
	'page_user'
], function ($, can , Box, User, BoxPage, UserPage) {
*/
], function ($, can) {
	'use strict';

	var Router = can.Control.extend({
		pages: null,
		element: null,
		'route': function () {
			// Default route
		}
		/*,
		'users route': function () {
			new UserPage(this.element, {});
		},
		'user/:user route': function (data) {
			User.findOne({id: data.user}).then(can.proxy(function (user) {
				new UserPage(this.element, {user: user});
			}, this));
		},
		'box/:box route': function (data) {
			Box.findOne({id: data.box}).then(can.proxy(function (box) {
				new BoxPage(this.element, {box: box});
			}, this));
		},
		'box/:box&user/:user route': function (data) {
			var _this = this;
			$.when(Box.findOne({id: data.box}), User.findOne({id: data.user})).done(
				function (box, user) {
					new BoxPage(_this.element, {box: box, user: user});
				}
			);
		}
		*/
	});

	return Router;

});
