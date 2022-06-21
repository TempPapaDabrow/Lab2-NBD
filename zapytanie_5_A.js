printjson(db.people.aggregate([ {$unwind : "$credit"}, {$match : { $and: [{"nationality" : "Poland"}, {"sex" : "Female"}]} }, {$group: { _id:"$credit.currency", avgBalance : { $avg: "$credit.balance" }, sumOfBalance : { $sum : "$credit.balance"}}} ]).toArray())

