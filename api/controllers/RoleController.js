/**
 * RoleController
 *
 * @description :: Server-side logic for managing roles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	show: function(req, res) {

		var id = req.param('id');

		if(!id) return res.send("No id specified.", 500);

//		Role.findOne(1).populate('users').populate('menus').exec(function(err, role) {
		Role.findOne(1).populate('users').exec(function(err, role) {
			if(err) return res.sender(err, 500);
			return res.send(role, 200);
		});

//		Role.find(id, function roleFound(err, role) {
//			if(err) return res.sender(err, 500);
//			if(!role) return res.send("User " + id + " not found", 404);
//			sails.log(role[0]);
//			return res.send(role[0], 200);
//		});
	}
};