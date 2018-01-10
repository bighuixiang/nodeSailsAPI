/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'users',
	attributes: {
		id: {
			type: 'integer',
			required: true,
			primaryKey: true
		},
		username: {
			type: 'String',
			required: true
		},
		password: {
			type: 'String',
			required: true
		},
		age: {
			type: 'String',
			defaultsTo: '0'
		},
		tel: {
			type: 'String',
			defaultsTo: ''
		},
		sex: {
			type: 'String'
		},
		roles: {
			collection: 'role'
		}
	},
};