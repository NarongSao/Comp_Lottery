Meteor.methods({
    getEndPerMonthByAgent: function (selector) {
        var data = Lottery.Collection.EndPerMonth.aggregate([
            {
                $unwind: "$detail"
            }, {
                $match: selector
            }, {
                $group: {
                    _id: {
                        agentId: "$agentId"
                    },
                    remainRiel: {
                        $sum: "$detail.remainRiel"
                    },
                    remainDollar: {
                        $sum: "$detail.remainDollar"
                    },
                    remainBath: {
                        $sum: "$detail.remainBath"
                    }
                }
            },
            {
                $sort: {
                    "_id.agentId": 1
                }
            }
        ]);
        var dataFinal={};
        data.forEach(function(obj){
            dataFinal.agentId=obj._id.agentId;
            dataFinal.remainRiel=obj.remainRiel;
            dataFinal.remainDollar=obj.remainDollar;
            dataFinal.remainBath=obj.remainBath;
        });
        return dataFinal;
    },
    getEndPerMonthLastDate: function(){
        return Lottery.Collection.EndPerMonth.findOne({}, {sort: {endDate: -1}});
    }
})
