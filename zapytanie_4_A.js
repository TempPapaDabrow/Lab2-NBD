printjson(db.people.aggregate([{ 
$group: { _id:"$nationality", 
	avgBmi : { $avg: { $divide : ["$weight", {$pow : ["$height", 2]}] } }, 
	minBmi : { $min: { $divide : ["$weight", {$pow : ["$height", 2]}] } },
	maxBmi : { $max: { $divide : ["$weight", {$pow : ["$height", 2]}] } }
	} 
}]).toArray())
