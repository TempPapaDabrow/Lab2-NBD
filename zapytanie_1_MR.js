printjson( db.people.mapReduce(function() {
	var key = this.sex;
	var value = {"height": this.height, "weight" : this.weight, "count" : 1};
	emit(key, value);
}, function(key, values) {
	reducedValue = {"height": 0, "weight": 0, "count": 0};
	values.forEach(function(value){
		reducedValue.height += value.height;
		reducedValue.weight += value.weight;
		reducedValue.count += value.count;
	});
	return reducedValue;
}, { out: "map_reduce_example2", "finalize" :  function(key, reducedValue){
	reducedValue.height = reducedValue.height / reducedValue.count;
	reducedValue.weight = reducedValue.weight / reducedValue.count;
	return reducedValue;
}
}).find().toArray())
