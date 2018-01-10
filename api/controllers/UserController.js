/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function(req, res) {
		res.view();
	},

	create: function(req, res) {
		var params = _.extend(req.query || {}, req.params || {}, req.body || {});

		User.create(params, function userCreated(err, createdUser) {

			if(err) return res.send(err, 500);

			res.redirect('/user/show/' + createdUser.id);
		});
	},

	show: function(req, res) {

		var id = req.param('id');

		if(!id) return res.send("No id specified.", 500);

		User.find(id, function userFound(err, user) {
			if(err) return res.sender(err, 500);
			if(!user) return res.send("User " + id + " not found", 404);
			//			sails.log(user[0]);
			//			return res.send(user[0], 200);
			res.view({
				user: user[0]
			})
		});
	},
	showTest: function(req, res) {

		var id = req.param('id');

		if(!id) return res.send("No id specified.", 500);
		User.query("SELECT * FROM users u INNER JOIN role r where u.id = r.user_id", function(err, results) {
			console.log(results);
			return res.send(results, 200);
		})
		//		User.find().populate('roles').exec(function(err, user) {
		//			if(err) return res.sender(err, 500);
		//			return res.send(user, 200);
		//		});
		//		User.find(id, function userFound(err, user) {
		//			if(err) return res.sender(err, 500);
		//			if(!user) return res.send("User " + id + " not found", 404);
		//			sails.log(user[0]);
		//			return res.send(user[0], 200);
		//
		//		});
	},
	edit: function(req, res) {
		var id = req.param('id');

		if(!id) return res.send("No id specified.", 500);

		User.find(id, function userFound(err, user) {
			if(err) return res.send(err, 500);
			if(!user) return res.send("User " + id + " not found.", 404);

			res.view({
				user: user[0]
			})
		});
	},

	update: function(req, res) {

		var params = _.extend(req.query || {}, req.params || {}, req.body || {});
		var id = params.id;

		if(!id) return res.send("No id specified.", 500);

		User.update(id, params, function userUpdated(err, updatedUser) {
			if(err) {
				return res.redirect('/user/edit');
			}
			if(!updatedUser) {
				return res.redirect('/user/edit');
			}
			res.redirect('/user/show/' + id);
		});
	},

	destroy: function(req, res) {
		var id = req.param('id');
		if(!id) return res.send("No id specified.", 500);

		User.find(id, function foundUser(err, user) {
			if(err) return res.send(err, 500);
			if(!user) return res.send("No user with that idid exists.", 404);

			User.destroy(id, function userDestroyed(err) {
				if(err) return res.send(err, 500);

				return res.redirect('/user');
			});

		})
	},

	find: function(req, res) {
		var params = _.extend(req.query || {}, req.params || {}, req.body || {});

		var whereCondition = {};
		var pageBean = {};
		var sql = {};
		var sax = '';
		var username = '';

		if(params.username) {
			whereCondition.username = {
				'like': '%' + params.username + '%'
			};
			username = params.username;
		}

		if(params.sex) {
			whereCondition.sex = params.sex;
			sax = params.sex;
		}

		if(params.pageCount) {
			pageBean.nowPage = params.nowPage;
			pageBean.pageCount = params.pageCount;
			pageBean.allCount = params.allCount;
			pageBean.NumOfPage = params.NumOfPage;

			if(whereCondition.username || whereCondition.sex) {
				sql.where = whereCondition;
			}

			sql.skip = pageBean.pageCount * (pageBean.nowPage - 1);
			sql.limit = pageBean.pageCount;
			sql.sort = 'updatedAt DESC';

			//User.find({ where: { name: { 'like': '%张三%' } }, skip: 20, limit: 10, sort: 'name DESC' });  

			var query = User.find(sql);

			query.exec(function(err, users) {
				if(err) return res.send(err, 500);
				res.view({
					model: users,
					page: pageBean,
					sex: sax,
					username: username
				});
			});

		} else {
			pageBean.nowPage = 1;
			pageBean.pageCount = 5;

			if(whereCondition.username || whereCondition.sex) {
				sql.where = whereCondition;
			}

			sql.sort = 'updatedAt DESC';

			User.count(sql).exec(function(err, count) {
				if(err) return res.send(err, 500);
				pageBean.allCount = count;

				sql.skip = pageBean.pageCount * (pageBean.nowPage - 1);
				sql.limit = pageBean.pageCount;

				pageBean.NumOfPage = Math.ceil(pageBean.allCount / pageBean.pageCount);

				var query = User.find(sql);

				query.exec(function(err, users) {
					if(err) return res.send(err, 500);
					res.view({
						model: users,
						page: pageBean,
						sex: sax,
						username: username
					});
				});
			});

		}

	}

};