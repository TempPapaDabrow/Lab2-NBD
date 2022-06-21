printjson( db.people.mapReduce(function() {
	if(this.nationality == "Poland"){
	if(this.sex == "Female"){
		for(var idx = 0; idx < this.credit.length; idx++){
			var key = this.credit[idx].currency;
			var value = {sumOfBalance : this.credit[idx].balance, counter : 1};
			emit(key, value);	
		}
	}}
}, function(key, values) {
	reducedValue = {"sumOfBalance": 0, counter : 0};
	values.forEach(function(value){
		reducedValue.sumOfBalance += value.sumOfBalance;
		reducedValue.counter += value.counter;
	});
	return reducedValue;
}, { out: "map_reduce_currency", function(key, reducedValue){
	reducedValue.avgBalance = reducedValue.sumOfBalance / reducedValue.counter;
	return reducedValue;
}
}).find().toArray())

