Meteor.methods({
    lottery_dailyReport: function (params) {
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
        if (self.agentId == "All") {
            var allAgent = Lottery.Collection.Agent.find().fetch();
            allAgent.forEach(function (obj) {
                agentList.push(obj._id);
            })
        } else {
            if(!_.isArray(self.agentId)){
                agentList.push(self.agentId);

            }else{
                self.agentId.forEach(function (obj) {
                    agentList.push(obj);
                })
            }
        }
        var stringPrepare = "";


        var date = s.words(self.date, ' To ');
        var fDate = moment(date[0], 'YYYY-MM-DD').toDate();
        var tDate = moment(date[1], 'YYYY-MM-DD').add(1, 'days').toDate();

        var endDateLastMonth = Lottery.Collection.EndPerMonth.findOne({endDate: {$lt: new Date(fDate)}}, {sort: {endDate: -1}});
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

                var result = [];
                var resultEN = [];
                var resultT = [];


                resultEN = Meteor.call('lottery_betGroupByDay', selectorEN);
                resultT = Meteor.call('lottery_betGroupByDay', selectorT);

                var labelTotalRiel = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px'>Total Riel</th>" : "";
                var labelTotalDollar = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px' >Total Dollar</th>" : "";
                var labelTotalBath = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px' >Total Bath</th>" : "";

                var labelShareRiel = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px'>Riel</th>" : "";
                var labelShareDollar = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px'>Dollar</th>" : "";
                var labelShareBath = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px'>Bath</th>" : "";

                stringPrepare += "<table class='table table-report'><caption>" +
                    "<span align='left'><b>Agent Name : " + agentName +
                    "</b></caption><tr><th style='border: solid 1px'>Date</th>"
                    /*+ labelTotalRiel
                    + labelTotalDollar
                    + labelTotalBath*/
                    + labelShareRiel
                    + labelShareDollar
                    + labelShareBath;


                if (resultEN.length != 0) {
                    resultEN.forEach(function (obj) {
                        var totalRiel = 0;
                        var totalDollar = 0;
                        var totalBath = 0;

                        var shareRiel = 0;
                        var shareDollar = 0;
                        var shareBath = 0;

                        var agentInfo = Lottery.Collection.Agent.findOne(agentId);


                        var selectorLocation={};
                        selectorLocation._id=agentInfo.locationId;
                        selectorLocation['detail.date'] = {$lte: new Date(moment(fDate).format('YYYY-MM-DD'))};

                        var locationInfo =Meteor.call('getLocationForReport',selectorLocation);


                        totalRiel = (obj.totalRiel2D * locationInfo.add * locationInfo.offValue2D / 100 + obj.totalRiel3D * locationInfo.add * locationInfo.offValue3D / 100 ) - (obj.lossRiel2D * locationInfo.add * locationInfo.win2D + obj.lossRiel3D * locationInfo.add * locationInfo.win3D);
                        totalDollar = (obj.totalDollar2D  * locationInfo.offValue2D / 100 + obj.totalDollar3D  * locationInfo.offValue3D / 100 ) - (obj.lossDollar2D  * locationInfo.win2D + obj.lossDollar3D  * locationInfo.win3D);
                        totalBath = (obj.totalBath2D  * locationInfo.offValue2D / 100 + obj.totalBath3D * locationInfo.offValue3D / 100 ) - (obj.lossBath2D  * locationInfo.win2D + obj.lossBath3D  * locationInfo.win3D);


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

                        var selectorLocation={};
                        selectorLocation._id=agentInfo.locationId;
                        selectorLocation['detail.date'] = {$lte: new Date(moment(fDate).format('YYYY-MM-DD'))};

                        var locationInfo =Meteor.call('getLocationForReport',selectorLocation);
                        

                        totalRiel = (obj.totalRiel2D * locationInfo.add * locationInfo.offValue2D / 100 + obj.totalRiel3D * locationInfo.add * locationInfo.offValue3D / 100 ) - (obj.lossRiel2D * locationInfo.add * locationInfo.win2D + obj.lossRiel3D * locationInfo.add * locationInfo.win3D);
                        totalDollar = (obj.totalDollar2D  * locationInfo.offValue2D / 100 + obj.totalDollar3D* locationInfo.offValue3D / 100 ) - (obj.lossDollar2D  * locationInfo.win2D + obj.lossDollar3D  * locationInfo.win3D);
                        totalBath = (obj.totalBath2D  * locationInfo.offValue2D / 100 + obj.totalBath3D  * locationInfo.offValue3D / 100 ) - (obj.lossBath2D  * locationInfo.win2D + obj.lossBath3D  * locationInfo.win3D);

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
                var grandTotalRiel = 0;
                var grandTotalDollar = 0;
                var grandTotalBath = 0;

                var grandShareRiel = 0;
                var grandShareDollar = 0;
                var grandShareBath = 0;

                result.sort(compare);
                if (result.length > 0) {
                    result.forEach(function (obj) {

                        grandTotalRiel += obj.totalRiel;
                        grandTotalDollar += obj.totalDollar;
                        grandTotalBath += obj.totalBath;

                        grandShareRiel += obj.shareRiel;
                        grandShareDollar += obj.shareDollar;
                        grandShareBath += obj.shareBath;

                        var valueTotalRiel = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + formatNumberToSeperate(obj.totalRiel) + "</b></td>" : "";
                        var valueTotalDollar = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + formatNumberToSeperate(obj.totalDollar) + "</b></td>" : "";
                        var valueTotalBath = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + formatNumberToSeperate(obj.totalBath) + "</b></td>" : "";

                        var valueShareRiel = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + formatNumberToSeperate(obj.shareRiel) + "</td>" : "";
                        var valueShareDollar = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + formatNumberToSeperate(obj.shareDollar)  + "</td>" : "";
                        var valueShareBath = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + formatNumberToSeperate(obj.shareBath) + "</td>" : "";

                        var dateInfo = obj.country == "A" ? obj.date : "<b><font color= 'red'>"+obj.date +"(Thai)</font></b>";

                        stringPrepare += "<tr><td style='border-left: solid 1px;border-right: solid 1px;'>" + dateInfo + "</td>"
                                /*  + valueTotalRiel
                                 + valueTotalDollar
                                 + valueTotalBath*/
                            + valueShareRiel
                            + valueShareDollar
                            + valueShareBath
                            + "</tr>"

                    })
                }

                    var footerTotalRiel = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px' align='center'><b>" + formatNumberToSeperate(grandTotalRiel) + "</b></th>" : "";
                    var footerTotalDollar = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px' align='center'><b>" + formatNumberToSeperate(grandTotalDollar) + "</b></th>" : "";
                    var footerTotalBath = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px' align='center'><b>" + formatNumberToSeperate(grandTotalBath) + "</b></th>" : "";

                    var footerShareRiel = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px' align='center'>" +formatNumberToSeperate(grandShareRiel)+ "</th>" : "";
                    var footerShareDollar = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandShareDollar)+ "</th>" : "";
                    var footerShareBath = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandShareBath)  + "</th>" : "";

                 /*   var selectorYouPaidRiel = {};
                    var selectorYouPaidDollar = {};
                    var selectorYouPaidBath = {};

                    var selectorMePaidRiel = {};
                    var selectorMePaidDollar = {};
                    var selectorMePaidBath = {};

                    selectorYouPaidRiel.transferFrom = agentId;
                    selectorYouPaidRiel.currencyId = "KHR";
                    selectorYouPaidRiel.transferDate = {$gte: new Date(fDate), $lt: new Date(tDate)};

                    selectorYouPaidDollar.transferFrom = agentId;
                    selectorYouPaidDollar.currencyId = "USD";
                    selectorYouPaidDollar.transferDate = {$gte: new Date(fDate), $lt: new Date(tDate)};

                    selectorYouPaidBath.transferFrom = agentId;
                    selectorYouPaidBath.currencyId = "THB";
                    selectorYouPaidBath.transferDate = {$gte: new Date(fDate), $lt: new Date(tDate)};


                    selectorMePaidRiel.transferTo = agentId;
                    selectorMePaidRiel.currencyId = "KHR";
                    selectorMePaidRiel.transferDate = {$gte: new Date(fDate), $lt: new Date(tDate)};

                    selectorMePaidDollar.transferTo = agentId;
                    selectorMePaidDollar.currencyId = "USD";
                    selectorMePaidDollar.transferDate = {$gte: new Date(fDate), $lt: new Date(tDate)};

                    selectorMePaidBath.transferTo = agentId;
                    selectorMePaidBath.currencyId = "THB";
                    selectorMePaidBath.transferDate = {$gte: new Date(fDate), $lt: new Date(tDate)};

                    if (self.branchId != "") {
                        selectorYouPaidRiel.branchId = self.branchId;
                        selectorYouPaidDollar.branchId = self.branchId;
                        selectorYouPaidBath.branchId = self.branchId;

                        selectorMePaidRiel.branchId = self.branchId;
                        selectorMePaidDollar.branchId = self.branchId;
                        selectorMePaidBath.branchId = self.branchId;
                    }

                    var youPaidRielValue = Meteor.call("getTransferMoneyByAgentId", selectorYouPaidRiel);
                    var youPaidDollarValue =Meteor.call("getTransferMoneyByAgentId", selectorYouPaidDollar);
                    var youPaidBathValue =Meteor.call("getTransferMoneyByAgentId", selectorYouPaidBath);

                    var youPaidRiel = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(youPaidRielValue) + "</th>" : "";
                    var youPaidDollar =self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px' align='center'>" +formatNumberToSeperate(youPaidDollarValue) + "</th>" : "";
                    var youPaidBath = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(youPaidBathValue) + "</th>" : "";



                    var mePaidRielValue = Meteor.call("getTransferMoneyByAgentId", selectorMePaidRiel);
                    var mePaidDollarValue = Meteor.call("getTransferMoneyByAgentId", selectorMePaidDollar);
                    var mePaidBathValue = Meteor.call("getTransferMoneyByAgentId", selectorMePaidBath);



                    var mePaidRiel = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(mePaidRielValue) + "</th>" : "";
                    var mePaidDollar =self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px' align='center'>" +formatNumberToSeperate(mePaidDollarValue) + "</th>" : "";
                    var mePaidBath = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(mePaidBathValue) + "</th>" : "";


                    var selectorOldRemain = {};
                    selectorOldRemain['detail.agentId'] =agentId;
                    var oldRemain ={};
                    if(endDateLastMonth!=null){
                        selectorOldRemain.endDate = endDateLastMonth.endDate;
                        oldRemain = Meteor.call('getEndPerMonthByAgent', selectorOldRemain);

                    }

                    if (_.isEmpty(oldRemain)) {
                        oldRemain.remainRiel = 0;
                        oldRemain.remainDollar = 0;
                        oldRemain.remainBath = 0;
                    }


                    var oldRemainRiel   = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(oldRemain.remainRiel)   + "</th>" : "";
                    var oldRemainDollar =self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px' align='center'>" +formatNumberToSeperate(oldRemain.remainDollar) + "</th>" : "";
                    var oldRemainBath   = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(oldRemain.remainBath)   + "</th>" : "";


                    var remainRiel   = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(oldRemain.remainRiel+mePaidRielValue-youPaidRielValue +grandShareRiel)   + "</th>" : "";
                    var remainDollar =self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px' align='center'>" +formatNumberToSeperate(oldRemain.remainDollar+mePaidDollarValue-youPaidDollarValue +grandShareDollar ) + "</th>" : "";
                    var remainBath   = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(oldRemain.remainBath +mePaidBathValue-youPaidBathValue +grandShareBath)   + "</th>" : "";

*/
                    stringPrepare += "<tr><th style='border: solid 1px'>Total</th>"
                        /*+ footerTotalRiel
                        + footerTotalDollar
                        + footerTotalBath*/
                        + footerShareRiel
                        + footerShareDollar
                        + footerShareBath /*+ "</tr><tr><td style='border: solid 1px' align='right'><b>You Paid</b></td>"
                        + youPaidRiel
                        + youPaidDollar
                        + youPaidBath+"</tr><tr><td style='border: solid 1px' align='right'><b>Me Paid</b></td>"
                        + mePaidRiel
                        + mePaidDollar
                        + mePaidBath +"</tr><tr><td style='border: solid 1px' align='right'><b>Old</b></td>"
                        + oldRemainRiel
                        + oldRemainDollar
                        + oldRemainBath +"</tr><tr><td style='border: solid 1px' align='right'><b>Remain</b></td>"
                        + remainRiel
                        + remainDollar
                        + remainBath*/
                    ;
                    stringPrepare += "</table><footer></footer>";

            })
        }

        data.content = stringPrepare;
        return data;
    }
})

var formatNumberToSeperate = function (val) {
    var data="";
    if(val>=0){
        data=  numeral(val).format('(0,0)');
    }else{
        data="<font color='red'>"+numeral(val).format('(0,0)')+"</font>";
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