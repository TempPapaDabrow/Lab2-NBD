printjson(db.people.mapReduce(
	function() {
		emit(this.job, this.sex);
	},
	function(key, values) 
	{
		return key;
	},
	{out: "map_reduce_jobs"}).find().toArray())
