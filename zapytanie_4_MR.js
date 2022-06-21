printjson( db.people.mapReduce(function() { var key = this.nationality; var value = {"avgBmi": this.weight/(this.height*this.height), "minBmi" : 0, "maxBmi" : 0, "count" : 1}; emit(key, value);} , function(key, values) { reducedValue = {avgBmi : 0, minBmi : 100, maxBmi : 0, count : 0}; values.forEach(function(value){ reducedValue.avgBmi += value.avgBmi; reducedValue.count += value.count; if(reducedValue.maxBmi < value.avgBmi){ reducedValue.maxBmi = value.avgBmi; } }); values.forEach(function(value){ if(reducedValue.minBmi > value.avgBmi){ reducedValue.minBmi = value.avgBmi; } }); values.forEach(function(value){ if(reducedValue.maxBmi < value.avgBmi){ reducedValue.maxBmi = value.avgBmi; } }); return reducedValue; }, { out: "map_reduce_bmi", function(key, reducedValue){ reducedValue.avgBmi = reducedValue.avgBmi / reducedValue.count; return reducedValue;} } ).find().toArray())
