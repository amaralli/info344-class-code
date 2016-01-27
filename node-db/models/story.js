'use strict';

var connPool;

var Story = {
	//getAll: function() {}
	getAll() {
		var sql = 'select * from stories order by votes desc, createdOn desc limit 50';
		return connPool.queryAsync(sql);
	},
	
	insert(story) {
		//theoretically we would need to validate stuff here
		//using ? prevents sql injection attacks
		var sql = 'insert into stories (url, title) values (?,?)';
		var params = [story.url, story.title];
		
		return connPool.queryAsync(sql, params)
			.then(function(results) {
				sql = 'select * from stories where id=?'
				params = [results.insertId];
				return connPool.queryAsync(sql, params);
			})
			.then(function(rows) {
				//turnary
				return rows.length > 0 ? rows[0] : null;
			});
	},
	
	upVote(id) {
		var sql = 'update stories set votes = votes+1 where id=?';
		var params = [id];
		return connPool.queryAsync(sql, params)
			.then(function(results) {
				sql = 'select * from stories where id=?';
				return connPool.queryAsync(sql, params);
			})
			.then(function(rows) {
				return rows.length > 0 ? rows[0] : null;
			})
	}
}

//creates a mock connection pool
module.exports.Model = function(connectionPool) {
	connPool = connectionPool;
	return Story;
}