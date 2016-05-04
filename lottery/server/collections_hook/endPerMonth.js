/***** Before */
Lottery.Collection.EndPerMonth.before.insert(function (userId, doc) {
    var prefix = doc.branchId + '-';
    doc._id = idGenerator.genWithPrefix(Lottery.Collection.EndPerMonth, prefix, 10);

    var detail = [];
    var tDate = moment(doc.endDate).add(1, 'days').toDate();
    var today = moment(doc.endDate).toDate();

    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }

    var endPerMonthInfo=Lottery.Collection.EndPerMonth.findOne({},{sort: {endDate: -1}});
    if(endPerMonthInfo!=null){
        var fDate = moment(endPerMonthInfo.endDate,'YYYY-MM-DD').add(1, 'days').toDate();

    }else{
        var fDate = moment(year + '-' + month + '-' + "01","YYYY-MM-DD").toDate();
    }



    var selectorYouPaidRiel = {};
    var selectorYouPaidDollar = {};
    var selectorYouPaidBath = {};

    var selectorMePaidRiel = {};
    var selectorMePaidDollar = {};
    var selectorMePaidBath = {};
    selectorYouPaidRiel.transferDate = {$gte: new Date(fDate), $lt: new Date(tDate)};
    selectorYouPaidDollar.transferDate = {$gte: new Date(fDate), $lt: new Date(tDate)};
    selectorYouPaidBath.transferDate = {$gte: new Date(fDate), $lt: new Date(tDate)};

    selectorYouPaidRiel.currencyId = "KHR";
    selectorYouPaidDollar.currencyId = "USD";
    selectorYouPaidBath.currencyId = "THB";

    selectorMePaidRiel.transferDate = {$gte: new Date(fDate), $lt: new Date(tDate)};
    selectorMePaidDollar.transferDate = {$gte: new Date(fDate), $lt: new Date(tDate)};
    selectorMePaidBath.transferDate = {$gte: new Date(fDate), $lt: new Date(tDate)};

    selectorMePaidRiel.currencyId = "KHR";
    selectorMePaidDollar.currencyId = "USD";
    selectorMePaidBath.currencyId = "THB";


    var agentListRaw = Lottery.Collection.MapAgent.find().fetch();
    agentListRaw.forEach(function (agentData) {

        var agentList = [];
        agentData.detail.forEach(function (obj) {
            agentList.push(obj.agentDoc._id);
        })
        var selector = {};
        if (doc.branchId != "") {
            selector.branchId = doc.branchId;
        }

        selector.agentId = {$in: agentList};
        selector.lossDate = {$gte: new Date(fDate), $lt: new Date(tDate)};


        var result = [];



        selectorYouPaidRiel.transferFrom = agentData._id;
        selectorYouPaidDollar.transferFrom = agentData._id;
        selectorYouPaidBath.transferFrom = agentData._id;

        selectorMePaidRiel.transferTo = agentData._id;
        selectorMePaidDollar.transferTo = agentData._id;
        selectorMePaidBath.transferTo = agentData._id;

        result = Meteor.call('lottery_betGroupByAgent', selector, selectorYouPaidRiel, selectorYouPaidDollar, selectorYouPaidBath, selectorMePaidRiel, selectorMePaidDollar, selectorMePaidBath, fDate,agentData._id);

        var remainRiel=0;
        var remainDollar=0;
        var remainBath=0;

        if (result.length != 0) {
            result.forEach(function (obj) {
                var totalRiel = 0;
                var totalDollar = 0;
                var totalBath = 0;

                var shareRiel = 0;
                var shareDollar = 0;
                var shareBath = 0;

                var agentInfo = Lottery.Collection.Agent.findOne(obj.agentId);

                var selectorLocation = {};
                selectorLocation._id = agentInfo.locationId;
                selectorLocation['detail.date'] = {$lte: new Date(doc.endDate)};

                var locationInfo = Meteor.call('getLocationForReport', selectorLocation);

                totalRiel = (obj.totalRiel2D * locationInfo.add * locationInfo.offValue2D / 100 + obj.totalRiel3D * locationInfo.add * locationInfo.offValue3D / 100 ) - (obj.lossRiel2D * locationInfo.add * locationInfo.win2D + obj.lossRiel3D * locationInfo.add * locationInfo.win3D);
                totalDollar = (obj.totalDollar2D * locationInfo.offValue2D / 100 + obj.totalDollar3D * locationInfo.offValue3D / 100 ) - (obj.lossDollar2D * locationInfo.win2D + obj.lossDollar3D * locationInfo.win3D);
                totalBath = (obj.totalBath2D * locationInfo.offValue2D / 100 + obj.totalBath3D * locationInfo.offValue3D / 100 ) - (obj.lossBath2D * locationInfo.win2D + obj.lossBath3D * locationInfo.win3D);

                shareRiel = totalRiel * locationInfo.share / 100;
                shareDollar = totalDollar * locationInfo.share / 100;
                shareBath = totalBath * locationInfo.share / 100;

                 remainRiel   += shareRiel + obj.mePaidRiel - obj.youPaidRiel + obj.oldRemainRiel;
                 remainDollar += shareDollar + obj.mePaidDollar - obj.youPaidDollar + obj.oldRemainDollar;
                 remainBath   += shareBath + obj.mePaidBath - obj.youPaidBath + obj.oldRemainBath;
            })
        }
        detail.push({
            agentId: agentData._id,
            remainRiel: remainRiel,
            remainDollar: remainDollar,
            remainBath: remainBath
        })
    })
    doc.detail = detail;
    return doc;
});
