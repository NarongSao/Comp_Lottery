Meteor.methods({
    getLocationById: function (id) {
        var data = Lottery.Collection.Location.findOne(id);
        return data;
    },
    getLocationForReport: function (selector) {
        var data = Lottery.Collection.Location.aggregate([
            {
                $unwind: "$detail"
            }, {
                $match: selector
            }, {
                $group: {
                    _id: {
                        name: "$name",
                        date: "$detail.date",
                        offValue2D: "$detail.offValue2D",
                        offValue3D: "$detail.offValue3D",
                        win2D: "$detail.win2D",
                        win3D: "$detail.win3D",
                        share: "$detail.share",
                        add: "$detail.add"
                    }
                    ,
                    numberOfTime: {
                        $sum: 1
                    }
                }
            },{
                $sort: {
                    '_id.date': 1
                }
            }
        ]);

        var dataFinal = {};
        if (data.length != 0) {
            data.forEach(function (obj) {
                dataFinal.name=obj._id.name;
                dataFinal.date=obj._id.date;
                dataFinal.offValue2D=obj._id.offValue2D;
                dataFinal.offValue3D=obj._id.offValue3D;
                dataFinal.win2D=obj._id.win2D;
                dataFinal.win3D=obj._id.win3D;
                dataFinal.share=obj._id.share;
                dataFinal.add=obj._id.add;
            })
        }
        return dataFinal;
    }
});