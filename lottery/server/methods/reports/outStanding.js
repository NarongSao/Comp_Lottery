Meteor.methods({
    lottery_outStandingReport: function (params) {
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


        var date = s.words(self.date, ' To ');
        var fDate = moment(date[0], 'YYYY-MM-DD').toDate();
        var tDate = moment(date[1], 'YYYY-MM-DD').add(1, 'days').toDate();


        var selector = {};
        var currencyLength = !_.isArray(self.currencyId) ? 1 : self.currencyId.length;
        var firstRow = currencyLength;


        if (self.branchId != "") {
            selector.branchId = self.branchId;
        }
        var agentName = "";

        selector.lossDate = {$gte: new Date(fDate), $lt: new Date(tDate)};


        var resultAll = [];

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


        var labelShareRiel = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px'>Riel</th>" : "";
        var labelShareDollar = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px'>Dollar</th>" : "";
        var labelShareBath = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px'>Bath</th>" : "";


        var stringPrepare = "";


        stringPrepare += "<table class='table tableReport'><caption><b>" +
            "<span align='left'>Date : " + moment(self.date).format('DD-MM-YYYY') +
            "</b></caption><tr><th style='border: solid 1px' rowspan='2'>Main Agent</th><th style='border: solid 1px' rowspan='2'>Agent Name</th><th style='border: solid 1px' colspan='" + firstRow + "'>Amount</th><th style='border: solid 1px' colspan='" + firstRow + "'>Total Amount</th><th style='border: solid 1px' colspan='" + firstRow + "'>Old Remain</th><th style='border: solid 1px' colspan='" + firstRow + "'>Me Paid</th><th style='border: solid 1px' colspan='" + firstRow + "'>You Paid</th><th style='border: solid 1px' colspan='" + firstRow + "'>Remain</th><tr>"

            + labelShareRiel
            + labelShareDollar
            + labelShareBath
            + labelShareRiel
            + labelShareDollar
            + labelShareBath
            + labelShareRiel
            + labelShareDollar
            + labelShareBath
            + labelShareRiel
            + labelShareDollar
            + labelShareBath
            + labelShareRiel
            + labelShareDollar
            + labelShareBath
            + labelShareRiel
            + labelShareDollar
            + labelShareBath
            + "</tr>";


        var grandShareRiel = 0;
        var grandShareDollar = 0;
        var grandShareBath = 0;

        var grandYouPaidRiel = 0;
        var grandYouPaidDollar = 0;
        var grandYouPaidBath = 0;

        var grandMePaidRiel = 0;
        var grandMePaidDollar = 0;
        var grandMePaidBath = 0;

        var grandOldRemainRiel = 0;
        var grandOldRemainDollar = 0;
        var grandOldRemainBath = 0;

        var grandRemainRiel = 0;
        var grandRemainDollar = 0;
        var grandRemainBath = 0;

        var i = 1;

        var agentMap = Lottery.Collection.MapAgent.find().fetch();

        agentMap.forEach(function (agentData) {

            // Agent List
            var agentList = [];
            if (agentData.detail.length > 1) {
                agentData.detail.forEach(function (obj) {
                    agentList.push(obj.agentDoc._id);
                })
                selector.agentId = {$in: agentList};
            } else {
                agentData.detail.forEach(function (obj) {
                    selector.agentId = obj.agentDoc._id;
                })
            }
            agentName = agentData.mainAgent;


            selectorYouPaidRiel.transferFrom = agentData._id;
            selectorYouPaidDollar.transferFrom = agentData._id;
            selectorYouPaidBath.transferFrom = agentData._id;

            selectorMePaidRiel.transferTo = agentData._id;
            selectorMePaidDollar.transferTo = agentData._id;
            selectorMePaidBath.transferTo = agentData._id;

            //Get Data Group By Agent
            resultAll = Meteor.call('lottery_betGroupByAgent', selector, selectorYouPaidRiel, selectorYouPaidDollar, selectorYouPaidBath, selectorMePaidRiel, selectorMePaidDollar, selectorMePaidBath, fDate, agentData._id);
            var result = [];
            if (resultAll.length != 0) {
                resultAll.forEach(function (obj) {
                    var totalRiel = 0;
                    var totalDollar = 0;
                    var totalBath = 0;

                    var shareRiel = 0;
                    var shareDollar = 0;
                    var shareBath = 0;

                    var agentInfo = Lottery.Collection.Agent.findOne(obj.agentId);


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
                        agentId: agentInfo._id,
                        agentName: agentInfo.name,
                        totalRiel: totalRiel,
                        totalDollar: totalDollar,
                        totalBath: totalBath,
                        shareRiel: shareRiel,
                        shareDollar: shareDollar,
                        shareBath: shareBath,

                        youPaidRiel: obj.youPaidRiel,
                        youPaidDollar: obj.youPaidDollar,
                        youPaidBath: obj.youPaidBath,

                        mePaidRiel: obj.mePaidRiel,
                        mePaidDollar: obj.mePaidDollar,
                        mePaidBath: obj.mePaidBath,

                        oldRemainRiel: obj.oldRemainRiel,
                        oldRemainDollar: obj.oldRemainDollar,
                        oldRemainBath: obj.oldRemainBath
                    })
                })
            }

            var subGrandTotalRiel = 0;
            var subGrandTotalDollar = 0;
            var subGrandTotalBath = 0;

            var subGrandShareRiel = 0;
            var subGrandShareDollar = 0;
            var subGrandShareBath = 0;

            var subGrandYouPaidRiel = 0;
            var subGrandYouPaidDollar = 0;
            var subGrandYouPaidBath = 0;

            var subGrandMePaidRiel = 0;
            var subGrandMePaidDollar = 0;
            var subGrandMePaidBath = 0;

            var subGrandOldRemainRiel = 0;
            var subGrandOldRemainDollar = 0;
            var subGrandOldRemainBath = 0;

            var subGrandRemainRiel = 0;
            var subGrandRemainDollar = 0;
            var subGrandRemainBath = 0;


            var resultLength = result.length;
            var j = 1;
            if (result.length > 0) {
                result.forEach(function (obj) {

                    //         Sub Total

                    subGrandShareRiel += obj.shareRiel;
                    subGrandShareDollar += obj.shareDollar;
                    subGrandShareBath += obj.shareBath;


                    subGrandYouPaidRiel += obj.youPaidRiel;
                    subGrandYouPaidDollar += obj.youPaidDollar;
                    subGrandYouPaidBath += obj.youPaidBath;

                    subGrandMePaidRiel += obj.mePaidRiel;
                    subGrandMePaidDollar += obj.mePaidDollar;
                    subGrandMePaidBath += obj.mePaidBath;

                    subGrandOldRemainRiel += obj.oldRemainRiel;
                    subGrandOldRemainDollar += obj.oldRemainDollar;
                    subGrandOldRemainBath += obj.oldRemainBath;

                    subGrandRemainRiel += obj.oldRemainRiel + obj.mePaidRiel - obj.youPaidRiel + obj.shareRiel;
                    subGrandRemainDollar += obj.oldRemainDollar + obj.mePaidDollar - obj.youPaidDollar + obj.shareDollar;
                    subGrandRemainBath += obj.oldRemainBath + obj.mePaidBath - obj.youPaidBath + obj.shareBath;
                })
            }


            if (result.length > 0) {
                result.forEach(function (obj) {


                    grandShareRiel += obj.shareRiel;
                    grandShareDollar += obj.shareDollar;
                    grandShareBath += obj.shareBath;


                    grandYouPaidRiel += obj.youPaidRiel;
                    grandYouPaidDollar += obj.youPaidDollar;
                    grandYouPaidBath += obj.youPaidBath;

                    grandMePaidRiel += obj.mePaidRiel;
                    grandMePaidDollar += obj.mePaidDollar;
                    grandMePaidBath += obj.mePaidBath;

                    grandOldRemainRiel += obj.oldRemainRiel;
                    grandOldRemainDollar += obj.oldRemainDollar;
                    grandOldRemainBath += obj.oldRemainBath;

                    grandRemainRiel += obj.oldRemainRiel + obj.mePaidRiel - obj.youPaidRiel + obj.shareRiel;
                    grandRemainDollar += obj.oldRemainDollar + obj.mePaidDollar - obj.youPaidDollar + obj.shareDollar;
                    grandRemainBath += obj.oldRemainBath + obj.mePaidBath - obj.youPaidBath + obj.shareBath;


                    if (resultLength == j) {
                        var valueShareRiel = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;border-bottom: solid 1px;' align='center'>" + formatNumberToSeperate(obj.shareRiel) + "</td>" : "";
                        var valueShareDollar = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;border-bottom: solid 1px;' align='center'>" + formatNumberToSeperate(obj.shareDollar) + "</td>" : "";
                        var valueShareBath = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;border-bottom: solid 1px;' align='center'>" + formatNumberToSeperate(obj.shareBath) + "</td>" : "";

                        var labelAgent = "<td style='border-left: solid 1px;border-right: solid 1px;border-bottom: solid 1px;'>" + obj.agentName + "</td>";
                    } else {
                        var valueShareRiel = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + formatNumberToSeperate(obj.shareRiel) + "</td>" : "";
                        var valueShareDollar = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + formatNumberToSeperate(obj.shareDollar) + "</td>" : "";
                        var valueShareBath = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + formatNumberToSeperate(obj.shareBath) + "</td>" : "";

                        var labelAgent = "<td style='border-left: solid 1px;border-right: solid 1px;'>" + obj.agentName + "</td>";
                    }


                    //Sub Total Per Main Agent

                    if (j == 1) {

                        var valueSubShareRiel = self.currencyId.indexOf("KHR") > -1 ? "<td style='border: solid 1px;' align='center' rowspan='" + resultLength + "'>" + formatNumberToSeperate(subGrandShareRiel) + "</td>" : "";
                        var valueSubShareDollar = self.currencyId.indexOf("USD") > -1 ? "<td style='border: solid 1px;' align='center' rowspan='" + resultLength + "'>" + formatNumberToSeperate(subGrandShareDollar) + "</td>" : "";
                        var valueSubShareBath = self.currencyId.indexOf("THB") > -1 ? "<td style='border: solid 1px;' align='center' rowspan='" + resultLength + "'>" + formatNumberToSeperate(subGrandShareBath) + "</td>" : "";

                        var valueSubYouPaidRiel = self.currencyId.indexOf("KHR") > -1 ? "<td style='border: solid 1px;' align='center' rowspan='" + resultLength + "'>" + formatNumberToSeperate(subGrandYouPaidRiel) + "</td>" : "";
                        var valueSubYouPaidDollar = self.currencyId.indexOf("USD") > -1 ? "<td style='border: solid 1px;' align='center' rowspan='" + resultLength + "'>" + formatNumberToSeperate(subGrandYouPaidDollar) + "</td>" : "";
                        var valueSubYouPaidBath = self.currencyId.indexOf("THB") > -1 ? "<td style='border: solid 1px;' align='center' rowspan='" + resultLength + "'>" + formatNumberToSeperate(subGrandYouPaidBath) + "</td>" : "";

                        var valueSubMePaidRiel = self.currencyId.indexOf("KHR") > -1 ? "<td style='border: solid 1px;' align='center' rowspan='" + resultLength + "'>" + formatNumberToSeperate(subGrandMePaidRiel) + "</td>" : "";
                        var valueSubMePaidDollar = self.currencyId.indexOf("USD") > -1 ? "<td style='border: solid 1px;' align='center' rowspan='" + resultLength + "'>" + formatNumberToSeperate(subGrandMePaidDollar) + "</td>" : "";
                        var valueSubMePaidBath = self.currencyId.indexOf("THB") > -1 ? "<td style='border: solid 1px;' align='center' rowspan='" + resultLength + "'>" + formatNumberToSeperate(subGrandMePaidBath) + "</td>" : "";

                        var valueSubOldRemainRiel = self.currencyId.indexOf("KHR") > -1 ? "<td style='border: solid 1px;' align='center' rowspan='" + resultLength + "'>" + formatNumberToSeperate(subGrandOldRemainRiel) + "</td>" : "";
                        var valueSubOldRemainDollar = self.currencyId.indexOf("USD") > -1 ? "<td style='border: solid 1px;' align='center' rowspan='" + resultLength + "'>" + formatNumberToSeperate(subGrandOldRemainDollar) + "</td>" : "";
                        var valueSubOldRemainBath = self.currencyId.indexOf("THB") > -1 ? "<td style='border: solid 1px;' align='center' rowspan='" + resultLength + "'>" + formatNumberToSeperate(subGrandOldRemainBath) + "</td>" : "";

                        var valueSubRemainRiel = self.currencyId.indexOf("KHR") > -1 ? "<td style='border: solid 1px;' rowspan='" + resultLength + "'>" + formatNumberToSeperate(subGrandRemainRiel) + "</td>" : "";
                        var valueSubRemainDollar = self.currencyId.indexOf("USD") > -1 ? "<td style='border: solid 1px;' align='center' rowspan='" + resultLength + "'>" + formatNumberToSeperate(subGrandRemainDollar) + "</td>" : "";
                        var valueSubRemainBath = self.currencyId.indexOf("THB") > -1 ? "<td style='border: solid 1px;' align='center' rowspan='" + resultLength + "'>" + formatNumberToSeperate(subGrandRemainBath) + "</td>" : "";

                        var valueMainAgent = "<td style='border: solid 1px; <!--transform: rotate(-45deg);--> background-color: inherit' align='center' rowspan='" + resultLength + "'>" + agentData.mainAgent + "</td>";

                    } else {
                        var valueSubShareRiel = "";
                        var valueSubShareDollar = "";
                        var valueSubShareBath = "";
                        var valueSubYouPaidRiel = "";
                        var valueSubYouPaidDollar = "";
                        var valueSubYouPaidBath = "";
                        var valueSubMePaidRiel = "";
                        var valueSubMePaidDollar = "";
                        var valueSubMePaidBath = "";

                        var valueSubOldRemainRiel = "";
                        var valueSubOldRemainDollar = "";
                        var valueSubOldRemainBath = "";
                        var valueSubRemainRiel = "";
                        var valueSubRemainDollar = "";
                        var valueSubRemainBath = "";

                        var valueMainAgent = "";

                    }

                    stringPrepare += "<tr>" + valueMainAgent + labelAgent
                        + valueShareRiel
                        + valueShareDollar
                        + valueShareBath
                        + valueSubShareRiel
                        + valueSubShareDollar
                        + valueSubShareBath
                        + valueSubOldRemainRiel
                        + valueSubOldRemainDollar
                        + valueSubOldRemainBath
                        + valueSubMePaidRiel
                        + valueSubMePaidDollar
                        + valueSubMePaidBath

                        + valueSubYouPaidRiel
                        + valueSubYouPaidDollar
                        + valueSubYouPaidBath
                        + valueSubRemainRiel
                        + valueSubRemainDollar
                        + valueSubRemainBath
                        + "</tr>";
                    j++;
                })
            }

        })

        var footerShareRiel = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandShareRiel) + "</th>" : "";
        var footerShareDollar = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandShareDollar) + "</th>" : "";
        var footerShareBath = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandShareBath) + "</th>" : "";

        var footerTotalShareRiel = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandShareRiel) + "</th>" : "";
        var footerTotalShareDollar = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandShareDollar) + "</th>" : "";
        var footerTotalShareBath = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandShareBath) + "</th>" : "";

        var footerYouPaidRiel = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandYouPaidRiel) + "</th>" : "";
        var footerYouPaidDollar = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandYouPaidDollar) + "</th>" : "";
        var footerYouPaidBath = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandYouPaidBath) + "</th>" : "";

        var footerMePaidRiel = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandMePaidRiel) + "</th>" : "";
        var footerMePaidDollar = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandMePaidDollar) + "</th>" : "";
        var footerMePaidBath = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandMePaidBath) + "</th>" : "";

        var footerOldRemainRiel = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandOldRemainRiel) + "</th>" : "";
        var footerOldRemainDollar = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandOldRemainDollar) + "</th>" : "";
        var footerOldRemainBath = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandOldRemainBath) + "</th>" : "";

        var footerRemainRiel = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandRemainRiel) + "</th>" : "";
        var footerRemainDollar = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandRemainDollar) + "</th>" : "";
        var footerRemainBath = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px' align='center'>" + formatNumberToSeperate(grandRemainBath) + "</th>" : "";

        stringPrepare += "<tr><th colspan='2' style='border: solid 1px'>Total</th>"
            + footerShareRiel
            + footerShareDollar
            + footerShareBath
            + footerTotalShareRiel
            + footerTotalShareDollar
            + footerTotalShareBath
            + footerOldRemainRiel
            + footerOldRemainDollar
            + footerOldRemainBath
            + footerMePaidRiel
            + footerMePaidDollar
            + footerMePaidBath

            + footerYouPaidRiel
            + footerYouPaidDollar
            + footerYouPaidBath
            + footerRemainRiel
            + footerRemainDollar
            + footerRemainBath
            + "</tr>";
        stringPrepare += "</table>";
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

