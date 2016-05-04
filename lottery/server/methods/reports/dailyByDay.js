Meteor.methods({
    lottery_dailyByDayReport: function (params) {
        var data = {
            title: {},
            header: {},
            content: [{
                index: 'No Result'
            }],
            footer: {}
        };
        /****** Title *****/
        data.title = Cpanel.Collection.Company.findOne();

        /****** Header *****/
        data.header = params;


        /****** Content *****/
        var self = params;


        var agentList = [];

        var allAgent = Lottery.Collection.Agent.find().fetch();
        allAgent.forEach(function (obj) {
            agentList.push(obj._id);
        })

        var stringPrepare = "";


        var date = s.words(self.date, ' To ');
        var fDate = moment(date[0], 'YYYY-MM-DD').toDate();
        var tDate = moment(date[1], 'YYYY-MM-DD').add(1, 'days').toDate();

        var result = [];


        var labelShareRiel = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px'>Riel</th>" : "";
        var labelShareDollar = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px'>Dollar</th>" : "";
        var labelShareBath = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px'>Bath</th>" : "";

        stringPrepare += "<table class='table table-report'><tr><th style='border: solid 1px'>Date</th>"

            + labelShareRiel
            + labelShareDollar
            + labelShareBath;

        if (agentList.length > 0) {
            agentList.forEach(function (agentId) {
                var selectorEN = {};
                var selectorT = {};


                selectorEN.agentId = agentId;
                selectorT.agentId = agentId;


                var currencyLength = !_.isArray(self.currencyId) ? 1 : self.currencyId.length;


                if (self.branchId != "") {
                    selectorEN.branchId = self.branchId;
                    selectorT.branchId = self.branchId;
                }
                var agentName = "";
                agentName = Lottery.Collection.Agent.findOne(agentId).name;

                selectorEN.lossDate = {$gte: new Date(fDate), $lt: new Date(tDate)};
                selectorT.lossDate = {$gte: new Date(fDate), $lt: new Date(tDate)};

                selectorEN.time = {$in: ["E", "N"]};
                selectorT.time = "T";


                var resultEN = [];
                var resultT = [];


                resultEN = Meteor.call('lottery_betGroupByDay', selectorEN);
                resultT = Meteor.call('lottery_betGroupByDay', selectorT);


                if (resultEN.length != 0) {
                    resultEN.forEach(function (obj) {
                        var totalRiel = 0;
                        var totalDollar = 0;
                        var totalBath = 0;

                        var shareRiel = 0;
                        var shareDollar = 0;
                        var shareBath = 0;

                        var agentInfo = Lottery.Collection.Agent.findOne(agentId);


                        var selectorLocation = {};
                        selectorLocation._id = agentInfo.locationId;
                        selectorLocation['detail.date'] = {$lte: new Date(moment(fDate).format('YYYY-MM-DD'))};

                        var locationInfo = Meteor.call('getLocationForReport', selectorLocation);


                        totalRiel = (obj.totalRiel2D * locationInfo.add * locationInfo.offValue2D / 100 + obj.totalRiel3D * locationInfo.add * locationInfo.offValue3D / 100 ) - (obj.lossRiel2D * locationInfo.add * locationInfo.win2D + obj.lossRiel3D * locationInfo.add * locationInfo.win3D);
                        totalDollar = (obj.totalDollar2D * locationInfo.offValue2D / 100 + obj.totalDollar3D * locationInfo.offValue3D / 100 ) - (obj.lossDollar2D * locationInfo.win2D + obj.lossDollar3D * locationInfo.win3D);
                        totalBath = (obj.totalBath2D * locationInfo.offValue2D / 100 + obj.totalBath3D * locationInfo.offValue3D / 100 ) - (obj.lossBath2D * locationInfo.win2D + obj.lossBath3D * locationInfo.win3D);


                        shareRiel = totalRiel * locationInfo.share / 100;
                        shareDollar = totalDollar * locationInfo.share / 100;
                        shareBath = totalBath * locationInfo.share / 100;

                        result.push({
                            country: "A",
                            date: moment(obj._id.date).format("DD-MM-YYYY"),
                            totalRiel: totalRiel,
                            totalDollar: totalDollar,
                            totalBath: totalBath,
                            shareRiel: shareRiel,
                            shareDollar: shareDollar,
                            shareBath: shareBath
                        })
                    })
                }


                if (resultT.length != 0) {
                    resultT.forEach(function (obj) {
                        var totalRiel = 0;
                        var totalDollar = 0;
                        var totalBath = 0;

                        var shareRiel = 0;
                        var shareDollar = 0;
                        var shareBath = 0;

                        var agentInfo = Lottery.Collection.Agent.findOne(agentId);
                        var selectorLocation = {};
                        selectorLocation._id = agentInfo.locationId;
                        selectorLocation['detail.date'] = {$lte: new Date(moment(fDate).format('YYYY-MM-DD'))};


                        var locationInfo = Meteor.call('getLocationForReport', selectorLocation);


                        totalRiel = (obj.totalRiel2D * locationInfo.add * locationInfo.offValue2D / 100 + obj.totalRiel3D * locationInfo.add * locationInfo.offValue3D / 100 ) - (obj.lossRiel2D * locationInfo.add * locationInfo.win2D + obj.lossRiel3D * locationInfo.add * locationInfo.win3D);
                        totalDollar = (obj.totalDollar2D * locationInfo.offValue2D / 100 + obj.totalDollar3D * locationInfo.offValue3D / 100 ) - (obj.lossDollar2D * locationInfo.win2D + obj.lossDollar3D * locationInfo.win3D);
                        totalBath = (obj.totalBath2D * locationInfo.offValue2D / 100 + obj.totalBath3D * locationInfo.offValue3D / 100 ) - (obj.lossBath2D * locationInfo.win2D + obj.lossBath3D * locationInfo.win3D);

                        shareRiel = totalRiel * locationInfo.share / 100;
                        shareDollar = totalDollar * locationInfo.share / 100;
                        shareBath = totalBath * locationInfo.share / 100;

                        result.push({
                            country: "B",
                            date: moment(obj._id.date).format("DD-MM-YYYY"),
                            totalRiel: totalRiel,
                            totalDollar: totalDollar,
                            totalBath: totalBath,
                            shareRiel: shareRiel,
                            shareDollar: shareDollar,
                            shareBath: shareBath
                        })
                    })
                }

            })
        }

        var grandTotalRiel = 0;
        var grandTotalDollar = 0;
        var grandTotalBath = 0;

        var grandShareRiel = 0;
        var grandShareDollar = 0;
        var grandShareBath = 0;


        result.sort(compare);
        var resultFinal=[];
        result.reduce(function (key, val) {
            if (!key[val.date + val.country]) {
                key[val.date + val.country] = {
                    country: val.country,
                    date: val.date,
                    totalRiel: val.totalRiel,
                    totalDollar: val.totalDollar,
                    totalBath: val.totalBath,
                    shareRiel: val.shareRiel,
                    shareDollar: val.shareDollar,
                    shareBath: val.shareBath
                };
                resultFinal.push(key[val.date + val.country]);
            } else {
                key[val.date + val.country].totalRiel += val.totalRiel;
                key[val.date + val.country].totalDollar += val.totalDollar;
                key[val.date + val.country].totalBath += val.totalBath;
                key[val.date + val.country].shareRiel += val.shareRiel;
                key[val.date + val.country].shareDollar += val.shareDollar;
                key[val.date + val.country].shareBath += val.shareBath;
            }
            return key;
        }, {});


        if (resultFinal.length > 0) {
            resultFinal.forEach(function (obj) {

                grandTotalRiel += obj.totalRiel;
                grandTotalDollar += obj.totalDollar;
                grandTotalBath += obj.totalBath;

                grandShareRiel += obj.shareRiel;
                grandShareDollar += obj.shareDollar;
                grandShareBath += obj.shareBath;


                var valueShareRiel = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + formatNumberToSeperate(obj.shareRiel) + "</td>" : "";
                var valueShareDollar = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + formatNumberToSeperate(obj.shareDollar) + "</td>" : "";
                var valueShareBath = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + formatNumberToSeperate(obj.shareBath) + "</td>" : "";

                var dateInfo = obj.country == "A" ? obj.date : "<b><font color= 'red'>"+obj.date +"(Thai)</font></b>";

                stringPrepare += "<tr><td style='border-left: solid 1px;border-right: solid 1px;'>" + dateInfo + "</td>"
                    + valueShareRiel
                    + valueShareDollar
                    + valueShareBath
                    + "</tr>"

            })


            var footerShareRiel = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandShareRiel) + "</th>" : "";
            var footerShareDollar = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandShareDollar) + "</th>" : "";
            var footerShareBath = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandShareBath) + "</th>" : "";


            stringPrepare += "<tr><th style='border: solid 1px'>Total</th>"
                + footerShareRiel
                + footerShareDollar
                + footerShareBath;
            stringPrepare += "</table><footer></footer>";
        }

        data.content = stringPrepare;
        return data;
    }
})

var formatNumberToSeperate = function (val) {
    var data = "";
    if (val >= 0) {
        data = numeral(val).format('(0,0)');
    } else {
        data = "<font color='red'>" + numeral(val).format('(0,0)') + "</font>";
    }
    return data;
};

function compare(a, b) {
    if (a.date == b.date) {
        return (a.country < b.country) ? -1 : (a.country > b.country) ? 1 : 0;
    }
    else {
        return (a.date < b.date) ? -1 : 1;
    }
};