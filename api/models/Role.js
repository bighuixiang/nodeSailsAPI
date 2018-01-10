/**
 * Role.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'role',
	attributes: {
		id: {
			type: 'integer',
			required: true,
			primaryKey: true
		},
		user_id: {
			type: 'integer',
			required: true
		},
		role_name: {
			type: 'String',
			required: true
		},
		users: {
			collection: 'user'
		}
	},
};