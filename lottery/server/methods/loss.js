Meteor.methods({
    lottery_betGroupByPage: function (selector) {
        return Lottery.Collection.Loss.aggregate([
            {
                $unwind: "$detail"
            }, {
                $match: selector
            }, {
                $group: {
                    _id: {
                        page: "$detail.page"
                    },
                    totalRiel2D: {
                        $sum: "$detail.totalRiel2D"
                    },
                    totalRiel3D: {
                        $sum: "$detail.totalRiel3D"
                    },
                    totalDollar2D: {
                        $sum: "$detail.totalDollar2D"
                    },
                    totalDollar3D: {
                        $sum: "$detail.totalDollar3D"
                    },
                    totalBath2D: {
                        $sum: "$detail.totalBath2D"
                    },
                    totalBath3D: {
                        $sum: "$detail.totalBath3D"
                    },


                    lossRiel2D: {
                        $sum: "$detail.lossRiel2D"
                    },
                    lossRiel3D: {
                        $sum: "$detail.lossRiel3D"
                    },
                    lossDollar2D: {
                        $sum: "$detail.lossDollar2D"
                    },
                    lossDollar3D: {
                        $sum: "$detail.lossDollar3D"
                    },
                    lossBath2D: {
                        $sum: "$detail.lossBath2D"
                    },
                    lossBath3D: {
                        $sum: "$detail.lossBath3D"
                    },
                    updateCount: {
                        $sum: "$detail.updateCount"
                    }
                }
            },

            {
                $sort: {
                    "_id.page": 1
                }
            }
        ]);


    },
    lottery_betGroupByAgent: function (selector, selectorYouPaidRiel, selectorYouPaidDollar, selectorYouPaidBath, selectorMePaidRiel, selectorMePaidDollar, selectorMePaidBath, fDate,mainAgentId) {
        var data = Lottery.Collection.Loss.aggregate([
            {
                $unwind: "$detail"
            }, {
                $match: selector
            }, {
                $group: {
                    _id: {
                        agentId: "$agentId"
                    },
                    totalRiel2D: {
                        $sum: "$detail.totalRiel2D"
                    },
                    totalRiel3D: {
                        $sum: "$detail.totalRiel3D"
                    },
                    totalDollar2D: {
                        $sum: "$detail.totalDollar2D"
                    },
                    totalDollar3D: {
                        $sum: "$detail.totalDollar3D"
                    },
                    totalBath2D: {
                        $sum: "$detail.totalBath2D"
                    },
                    totalBath3D: {
                        $sum: "$detail.totalBath3D"
                    },


                    lossRiel2D: {
                        $sum: "$detail.lossRiel2D"
                    },
                    lossRiel3D: {
                        $sum: "$detail.lossRiel3D"
                    },
                    lossDollar2D: {
                        $sum: "$detail.lossDollar2D"
                    },
                    lossDollar3D: {
                        $sum: "$detail.lossDollar3D"
                    },
                    lossBath2D: {
                        $sum: "$detail.lossBath2D"
                    },
                    lossBath3D: {
                        $sum: "$detail.lossBath3D"
                    }
                }
            },
            {
                $sort: {
                    "_id.agentId": 1
                }
            }
        ]);

        var agentListRaw = Lottery.Collection.Agent.find({}, {fields: {_id: 1}}).fetch();
        var agentList = [];
        agentListRaw.forEach(function (obj) {
            agentList.push(obj._id);
        })

        var dataList = [];
        data.forEach(function (obj) {
            dataList.push(obj._id.agentId);
        })

        /*agentList.forEach(function (obj) {
            if (obj.indexOf(dataList) == 0) {
                data.push({
                    _id: {agentId: obj},
                    totalRiel2D: 0,
                    totalRiel3D: 0,
                    totalDollar2D: 0,
                    totalDollar3D: 0,
                    totalBath2D: 0,
                    totalBath3D: 0,


                    lossRiel2D: 0,
                    lossRiel3D: 0,
                    lossDollar2D: 0,
                    lossDollar3D: 0,
                    lossBath2D: 0,
                    lossBath3D: 0

                })
            }
        })*/
        var endDateLastMonth = Lottery.Collection.EndPerMonth.findOne({endDate: {$lt: new Date(fDate)}}, {sort: {endDate: -1}});
        var dataFinal = [];
        var i=0;
        data.forEach(function (obj) {

            var oldRemain ={};
            if(i==0){
                var youPaidRiel = Meteor.call('getTransferMoneyByAgentId', selectorYouPaidRiel);
                var youPaidDollar = Meteor.call('getTransferMoneyByAgentId', selectorYouPaidDollar);
                var youPaidBath = Meteor.call('getTransferMoneyByAgentId', selectorYouPaidBath);

                var mePaidRiel = Meteor.call('getTransferMoneyByAgentId', selectorMePaidRiel);
                var mePaidDollar = Meteor.call('getTransferMoneyByAgentId', selectorMePaidDollar);
                var mePaidBath = Meteor.call('getTransferMoneyByAgentId', selectorMePaidBath);



                var selectorOldRemain = {};
                selectorOldRemain['detail.agentId'] = mainAgentId;

                if(endDateLastMonth!=null){
                    selectorOldRemain.endDate = endDateLastMonth.endDate;
                    oldRemain = Meteor.call('getEndPerMonthByAgent', selectorOldRemain);
                }

            }else{

                var youPaidRiel = 0;
                var youPaidDollar =0;
                var youPaidBath = 0;

                var mePaidRiel = 0;
                var mePaidDollar = 0;
                var mePaidBath = 0;

            }

            i++;

            if (_.isEmpty(oldRemain)) {
                oldRemain.remainRiel = 0;
                oldRemain.remainDollar = 0;
                oldRemain.remainBath = 0;
            }

            dataFinal.push({
                agentId: obj._id.agentId,
                totalRiel2D: obj.totalRiel2D,
                totalRiel3D: obj.totalRiel3D,
                totalDollar2D: obj.totalDollar2D,
                totalDollar3D: obj.totalDollar3D,
                totalBath2D: obj.totalBath2D,
                totalBath3D: obj.totalBath3D,

                lossRiel2D: obj.lossRiel2D,
                lossRiel3D: obj.lossRiel3D,
                lossDollar2D: obj.lossDollar2D,
                lossDollar3D: obj.lossDollar3D,
                lossBath2D: obj.lossBath2D,
                lossBath3D: obj.lossBath3D,

                youPaidRiel: youPaidRiel,
                youPaidDollar: youPaidDollar,
                youPaidBath: youPaidBath,

                mePaidRiel: mePaidRiel,
                mePaidDollar: mePaidDollar,
                mePaidBath: mePaidBath,

                oldRemainRiel: oldRemain.remainRiel,
                oldRemainDollar: oldRemain.remainDollar,
                oldRemainBath: oldRemain.remainBath
            })
        })
        return dataFinal;
    },
    lottery_betGroupByDay: function (selector) {
        return Lottery.Collection.Loss.aggregate([
            {
                $unwind: "$detail"
            }, {
                $match: selector
            }, {
                $group: {
                    _id: {
                        date: "$lossDate"
                    },
                    totalRiel2D: {
                        $sum: "$detail.totalRiel2D"
                    },
                    totalRiel3D: {
                        $sum: "$detail.totalRiel3D"
                    },
                    totalDollar2D: {
                        $sum: "$detail.totalDollar2D"
                    },
                    totalDollar3D: {
                        $sum: "$detail.totalDollar3D"
                    },
                    totalBath2D: {
                        $sum: "$detail.totalBath2D"
                    },
                    totalBath3D: {
                        $sum: "$detail.totalBath3D"
                    },


                    lossRiel2D: {
                        $sum: "$detail.lossRiel2D"
                    },
                    lossRiel3D: {
                        $sum: "$detail.lossRiel3D"
                    },
                    lossDollar2D: {
                        $sum: "$detail.lossDollar2D"
                    },
                    lossDollar3D: {
                        $sum: "$detail.lossDollar3D"
                    },
                    lossBath2D: {
                        $sum: "$detail.lossBath2D"
                    },
                    lossBath3D: {
                        $sum: "$detail.lossBath3D"
                    }
                }
            },
            {
                $sort: {
                    "_id.date": 1
                }
            }
        ]);
    }

  /*  ,
    getRemainLastMonth: function (selector, selectorYouPaid, selectorMePaid,fromDate) {
        var data = Lottery.Collection.Loss.aggregate([
            {
                $unwind: "$detail"
            }, {
                $match: selector
            }, {
                $group: {
                    _id: {
                        agentId: "$agentId"
                    },

                    totalRiel2D: {
                        $sum: "$detail.totalRiel2D"
                    },
                    totalRiel3D: {
                        $sum: "$detail.totalRiel3D"
                    },
                    totalDollar2D: {
                        $sum: "$detail.totalDollar2D"
                    },
                    totalDollar3D: {
                        $sum: "$detail.totalDollar3D"
                    },
                    totalBath2D: {
                        $sum: "$detail.totalBath2D"
                    },
                    totalBath3D: {
                        $sum: "$detail.totalBath3D"
                    },


                    lossRiel2D: {
                        $sum: "$detail.lossRiel2D"
                    },
                    lossRiel3D: {
                        $sum: "$detail.lossRiel3D"
                    },
                    lossDollar2D: {
                        $sum: "$detail.lossDollar2D"
                    },
                    lossDollar3D: {
                        $sum: "$detail.lossDollar3D"
                    },
                    lossBath2D: {
                        $sum: "$detail.lossBath2D"
                    },
                    lossBath3D: {
                        $sum: "$detail.lossBath3D"
                    }
                }
            },
            {
                $sort: {
                    "_id.agentId": 1
                }
            }
        ]);

        var dataFinal = {};

        var selectorYouPaidRiel = selectorYouPaid;
        var selectorYouPaidDollar = selectorYouPaid;
        var selectorYouPaidBath = selectorYouPaid;

        selectorYouPaidRiel.currencyId = "KHR";
        selectorYouPaidDollar.currencyId = "USD";
        selectorYouPaidBath.currencyId = "THB";


        var selectorMePaidRiel = selectorMePaid;
        var selectorMePaidDollar = selectorMePaid;
        var selectorMePaidBath = selectorMePaid;

        selectorMePaidRiel.currencyId = "KHR";
        selectorMePaidDollar.currencyId = "USD";
        selectorMePaidBath.currencyId = "THB";

        var youPaidRiel = Meteor.call('getTransferMoneyByAgentId', selectorYouPaidRiel);
        var youPaidDollar = Meteor.call('getTransferMoneyByAgentId', selectorYouPaidDollar);
        var youPaidBath = Meteor.call('getTransferMoneyByAgentId', selectorYouPaidBath);

        var mePaidRiel = Meteor.call('getTransferMoneyByAgentId', selectorMePaidRiel);
        var mePaidDollar = Meteor.call('getTransferMoneyByAgentId', selectorMePaidDollar);
        var mePaidBath = Meteor.call('getTransferMoneyByAgentId', selectorMePaidBath);


        data.forEach(function (obj) {
            var agentInfo = Lottery.Collection.Agent.findOne(obj._id.agentId);

            var selectorLocation={};
            selectorLocation._id=agentInfo.locationId;
            selectorLocation['detail.date'] = {$lte: new Date(fromDate)};

            var locationInfo =Meteor.call('getLocationForReport',selectorLocation);


            dataFinal.agentId = obj._id.agentId;
            dataFinal.amountRiel = mePaidRiel - youPaidRiel + ((obj.totalRiel2D * locationInfo.add * locationInfo.offValue2D / 100 + obj.totalRiel3D * locationInfo.add * locationInfo.offValue3D / 100) - (obj.lossRiel2D * locationInfo.add * locationInfo.win2D + obj.lossRiel3D * locationInfo.add * locationInfo.win3D)) * locationInfo.share / 100;
            dataFinal.amountDollar = mePaidDollar - youPaidDollar + ((obj.totalDollar2D * locationInfo.offValue2D / 100 + obj.totalDollar3D * locationInfo.offValue3D / 100) - (obj.lossDollar2D * locationInfo.win2D + obj.lossDollar3D * locationInfo.win2D )) * locationInfo.share / 100;
            dataFinal.amountBath = mePaidBath - youPaidBath + ((obj.totalBath2D * locationInfo.offValue2D / 100 + obj.totalBath3D * locationInfo.offValue3D / 100) - (obj.lossBath2D * locationInfo.win2D + obj.lossBath3D * locationInfo.win3D )) * locationInfo.share / 100;
        })


        return dataFinal;
    }*/
})