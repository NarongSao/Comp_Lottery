Meteor.methods({
    lottery_winLossReport: function (params) {
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
        var selectorE = {};
        var selectorN = {};
        var selectorT = {};
        var currencyLength = !_.isArray(self.currencyId) ? 1 : self.currencyId.length;

        var firstRow = (currencyLength * 4) + 1;
        var secondRow = currencyLength * 2;
        var thirdRow = currencyLength;


        var labelStakeRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px'>Riel</th>" : "";
        var labelStakeDollar2D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px' >Dollar</th>" : "";
        var labelStakeBath2D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px' >Bath</th>" : "";
        var labelStakeRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px' >Riel</th>" : "";
        var labelStakeDollar3D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px' >Dollar</th>" : "";
        var labelStakeBath3D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px'>Bath</th>" : "";
        var labelLossRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px'>Riel</th>" : "";
        var labelLossDollar2D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px'>Dollar</th>" : "";
        var labelLossBath2D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px'>Bath</th>" : "";
        var labelLossRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px'>Riel</th>" : "";
        var labelLossDollar3D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px'>Dollar</th>" : "";
        var labelLossBath3D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px' >Bath</th>" : "";


        if (self.branchId != "") {
            selectorE.branchId = self.branchId;
            selectorN.branchId = self.branchId;
            selectorT.branchId = self.branchId;
        }
        var agentName = "";

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
        var result = [];
        var stringPrepare = "";
        agentList.forEach(function (obj) {
            selectorE.agentId = obj;
            selectorN.agentId = obj;
            selectorT.agentId = obj;
            var agentInfo = Lottery.Collection.Agent.findOne(obj);
            agentName = agentInfo.name;
            selectorE.lossDate = new Date(self.date);
            selectorN.lossDate = new Date(self.date);
            selectorT.lossDate = new Date(self.date);

            selectorE.time = "E";
            selectorN.time = "N";
            selectorT.time = "T";

            var resultE = [];
            var resultN = [];
            var resultT = [];


            var grandTotalRiel2D = 0;
            var grandTotalRiel3D = 0;

            var grandTotalDollar2D = 0;
            var grandTotalDollar3D = 0;

            var grandTotalBath2D = 0;
            var grandTotalBath3D = 0;


            //Win
            var grandTotalWinRiel2D = 0;
            var grandTotalWinRiel3D = 0;

            var grandTotalWinDollar2D = 0;
            var grandTotalWinDollar3D = 0;

            var grandTotalWinBath2D = 0;
            var grandTotalWinBath3D = 0;


            if (self.country == "Vietnam") {
                resultE = Meteor.call('lottery_betGroupByPage', selectorE);
                resultN = Meteor.call('lottery_betGroupByPage', selectorN);
            } else if (self.country == "Thai") {
                resultT = Meteor.call('lottery_betGroupByPage', selectorT);
            }
            if (resultE.length != 0) {
                stringPrepare += "<table class='table table-reportWinLoseMain'><caption><b>" +
                    "<span align='left'><font size='2'>Date : " + moment(self.date).format('DD-MM-YYYY') +
                    "</font></b></caption><tr><td>";
            }

            var updateCountFinal=0;

            if (resultE.length != 0) {
                var totalPerAgentRiel2D = 0;
                var totalPerAgentDollar2D = 0;
                var totalPerAgentBath2D = 0;
                var totalPerAgentRiel3D = 0;
                var totalPerAgentDollar3D = 0;
                var totalPerAgentBath3D = 0;

                var lossPerAgentRiel2D = 0;
                var lossPerAgentDollar2D = 0;
                var lossPerAgentBath2D = 0;
                var lossPerAgentRiel3D = 0;
                var lossPerAgentDollar3D = 0;
                var lossPerAgentBath3D = 0;

                stringPrepare +=
                    "<table class='table table-reportWinLose' style='border-collapse: collapse !important;'>" +
                    "<tr><th style='border: solid 1px'  colspan='" + firstRow + "' align='center'><b>" + agentName + "(Evening)</b></th></tr>" +
                    "<tr><th rowspan='3' style='border: solid 1px' align='center'>No.</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'>Turnover</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'> Loss</th></tr>" +
                    "<tr><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th></tr>" +

                    "<tr>" +

                    labelStakeRiel2D +
                    labelStakeDollar2D +
                    labelStakeBath2D +
                    labelStakeRiel3D +
                    labelStakeDollar3D +
                    labelStakeBath3D +
                    labelLossRiel2D +
                    labelLossDollar2D +
                    labelLossBath2D +
                    labelLossRiel3D +
                    labelLossDollar3D +
                    labelLossBath3D +
                    "</tr>";


                resultE.forEach(function (reE) {

                    var valueStakeRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalRiel2D + "</b></font></td>" : "";
                    var valueStakeDollar2D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalDollar2D + "</b></font></td>" : "";
                    var valueStakeBath2D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalBath2D + "</b></font></td>" : "";
                    var valueStakeRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalRiel3D + "</b></font></td>" : "";
                    var valueStakeDollar3D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalDollar3D + "</b></font></td>" : "";
                    var valueStakeBath3D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalBath3D + "</b></font></td>" : "";
                    var valueLossRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossRiel2D + "</font></td>" : "";
                    var valueLossDollar2D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossDollar2D + "</font></td>" : "";
                    var valueLossBath2D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossBath2D + "</font></td>" : "";
                    var valueLossRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossRiel3D + "</font></td>" : "";
                    var valueLossDollar3D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossDollar3D + "</font></td>" : "";
                    var valueLossBath3D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossBath3D + "</font></td>" : "";

                    updateCountFinal+=reE.updateCount;
                    if(reE.updateCount>0) {
                        stringPrepare += "<tr class='updateColor'>" +
                            "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + "</td>" +

                            valueStakeRiel2D +
                            valueStakeDollar2D +
                            valueStakeBath2D +
                            valueStakeRiel3D +
                            valueStakeDollar3D +
                            valueStakeBath3D +
                            valueLossRiel2D +
                            valueLossDollar2D +
                            valueLossBath2D +
                            valueLossRiel3D +
                            valueLossDollar3D +
                            valueLossBath3D +

                            "</tr>";
                    }else{
                        stringPrepare += "<tr>" +
                            "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + "</td>" +

                            valueStakeRiel2D +
                            valueStakeDollar2D +
                            valueStakeBath2D +
                            valueStakeRiel3D +
                            valueStakeDollar3D +
                            valueStakeBath3D +
                            valueLossRiel2D +
                            valueLossDollar2D +
                            valueLossBath2D +
                            valueLossRiel3D +
                            valueLossDollar3D +
                            valueLossBath3D +

                            "</tr>";
                    }
                    totalPerAgentRiel2D = totalPerAgentRiel2D + reE.totalRiel2D;
                    totalPerAgentDollar2D = totalPerAgentDollar2D + reE.totalDollar2D;
                    totalPerAgentBath2D = totalPerAgentBath2D + reE.totalBath2D;
                    totalPerAgentRiel3D = totalPerAgentRiel3D + reE.totalRiel3D;
                    totalPerAgentDollar3D = totalPerAgentDollar3D + reE.totalDollar3D;
                    totalPerAgentBath3D = totalPerAgentBath3D + reE.totalBath3D;

                    lossPerAgentRiel2D = lossPerAgentRiel2D + reE.lossRiel2D;
                    lossPerAgentDollar2D = lossPerAgentDollar2D + reE.lossDollar2D;
                    lossPerAgentBath2D = lossPerAgentBath2D + reE.lossBath2D;
                    lossPerAgentRiel3D = lossPerAgentRiel3D + reE.lossRiel3D;
                    lossPerAgentDollar3D = lossPerAgentDollar3D + reE.lossDollar3D;
                    lossPerAgentBath3D = lossPerAgentBath3D + reE.lossBath3D;

                })
                var footerStakeRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRiel2D + "</font></th>" : "";
                var footerStakeDollar2D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollar2D + "</font></th>" : "";
                var footerStakeBath2D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBath2D + "</font></th>" : "";
                var footerStakeRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRiel3D + "</font></th>" : "";
                var footerStakeDollar3D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollar3D + "</font></th>" : "";
                var footerStakeBath3D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBath3D + "</font></th>" : "";
                var footerLossRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red'>" + lossPerAgentRiel2D + "</font></th>" : "";
                var footerLossDollar2D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollar2D + "</font></th>" : "";
                var footerLossBath2D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBath2D + "</font></th>" : "";
                var footerLossRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentRiel3D + "</font></th>" : "";
                var footerLossDollar3D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollar3D + "</font></th>" : "";
                var footerLossBath3D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBath3D + "</font></th>" : "";

                grandTotalRiel2D += totalPerAgentRiel2D;
                grandTotalRiel3D += totalPerAgentRiel3D;

                grandTotalDollar2D += totalPerAgentDollar2D;
                grandTotalDollar3D += totalPerAgentDollar3D;

                grandTotalBath2D += totalPerAgentBath2D;
                grandTotalBath3D += totalPerAgentBath3D;


                //Win
                grandTotalWinRiel2D += lossPerAgentRiel2D;
                grandTotalWinRiel3D += lossPerAgentRiel3D;

                grandTotalWinDollar2D += lossPerAgentDollar2D;
                grandTotalWinDollar3D += lossPerAgentDollar3D;

                grandTotalWinBath2D += lossPerAgentBath2D;
                grandTotalWinBath3D += lossPerAgentBath3D;

                stringPrepare += "<tr class='sumFooter'>" +
                    "<th style='border: solid 1px;' align='center';><font size='1'>TTL</font></th>" +
                    footerStakeRiel2D +
                    footerStakeDollar2D +
                    footerStakeBath2D +
                    footerStakeRiel3D +
                    footerStakeDollar3D +
                    footerStakeBath3D +
                    footerLossRiel2D +
                    footerLossDollar2D +
                    footerLossBath2D +
                    footerLossRiel3D +
                    footerLossDollar3D +
                    footerLossBath3D +
                    "</tr>" + "</table>";

            }

            if (resultN.length != 0 && resultE.length != 0) {
                stringPrepare += "</td><td>";
            } else if (resultN.length != 0 && resultE.length == 0) {
                stringPrepare += "<table class='table' ><caption><b>" +
                    "<span align='left'><font size='2'>Date : " + moment(self.date).format('DD-MM-YYYY') +
                    "</font></b></caption><tr><td>";

            }

            if (resultN.length != 0) {
                var totalPerAgentRiel2D = 0;
                var totalPerAgentDollar2D = 0;
                var totalPerAgentBath2D = 0;
                var totalPerAgentRiel3D = 0;
                var totalPerAgentDollar3D = 0;
                var totalPerAgentBath3D = 0;

                var lossPerAgentRiel2D = 0;
                var lossPerAgentDollar2D = 0;
                var lossPerAgentBath2D = 0;
                var lossPerAgentRiel3D = 0;
                var lossPerAgentDollar3D = 0;
                var lossPerAgentBath3D = 0;

                stringPrepare += "<td>" +
                    "<table class='table table-reportWinLose' style='border-collapse: collapse !important;'>" +
                    "<tr><th style='border: solid 1px'  colspan='" + firstRow + "' align='center'><b>" + agentName + "(Night)</b></th></tr>" +
                    "<tr><th rowspan='3' style='border: solid 1px' align='center'>No.</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'>Turnover</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'> Loss</th></tr>" +
                    "<tr><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th></tr>" +
                    "<tr>" +

                    labelStakeRiel2D +
                    labelStakeDollar2D +
                    labelStakeBath2D +
                    labelStakeRiel3D +
                    labelStakeDollar3D +
                    labelStakeBath3D +
                    labelLossRiel2D +
                    labelLossDollar2D +
                    labelLossBath2D +
                    labelLossRiel3D +
                    labelLossDollar3D +
                    labelLossBath3D +
                    "</tr>";


                resultN.forEach(function (reE) {
                    var valueStakeRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalRiel2D + "</b></font></td>" : "";
                    var valueStakeDollar2D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalDollar2D + "</b></font></td>" : "";
                    var valueStakeBath2D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalBath2D + "</b></font></td>" : "";
                    var valueStakeRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalRiel3D + "</b></font></td>" : "";
                    var valueStakeDollar3D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalDollar3D + "</b></font></td>" : "";
                    var valueStakeBath3D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalBath3D + "</b></font></td>" : "";
                    var valueLossRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossRiel2D + "</font></td>" : "";
                    var valueLossDollar2D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossDollar2D + "</font></td>" : "";
                    var valueLossBath2D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossBath2D + "</font></td>" : "";
                    var valueLossRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossRiel3D + "</font></td>" : "";
                    var valueLossDollar3D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossDollar3D + "</font></td>" : "";
                    var valueLossBath3D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossBath3D + "</font></td>" : "";


                    updateCountFinal+=reE.updateCount;
                    if(reE.updateCount>0){
                        stringPrepare += "<tr class='updateColor'>" +
                            "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + "</td>" +

                            valueStakeRiel2D +
                            valueStakeDollar2D +
                            valueStakeBath2D +
                            valueStakeRiel3D +
                            valueStakeDollar3D +
                            valueStakeBath3D +
                            valueLossRiel2D +
                            valueLossDollar2D +
                            valueLossBath2D +
                            valueLossRiel3D +
                            valueLossDollar3D +
                            valueLossBath3D +

                            "</tr>";
                    }else{
                    stringPrepare += "<tr>" +
                        "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + "</td>" +

                        valueStakeRiel2D +
                        valueStakeDollar2D +
                        valueStakeBath2D +
                        valueStakeRiel3D +
                        valueStakeDollar3D +
                        valueStakeBath3D +
                        valueLossRiel2D +
                        valueLossDollar2D +
                        valueLossBath2D +
                        valueLossRiel3D +
                        valueLossDollar3D +
                        valueLossBath3D +

                        "</tr>";
                    }
                    totalPerAgentRiel2D = totalPerAgentRiel2D + reE.totalRiel2D;
                    totalPerAgentDollar2D = totalPerAgentDollar2D + reE.totalDollar2D;
                    totalPerAgentBath2D = totalPerAgentBath2D + reE.totalBath2D;
                    totalPerAgentRiel3D = totalPerAgentRiel3D + reE.totalRiel3D;
                    totalPerAgentDollar3D = totalPerAgentDollar3D + reE.totalDollar3D;
                    totalPerAgentBath3D = totalPerAgentBath3D + reE.totalBath3D;

                    lossPerAgentRiel2D = lossPerAgentRiel2D + reE.lossRiel2D;
                    lossPerAgentDollar2D = lossPerAgentDollar2D + reE.lossDollar2D;
                    lossPerAgentBath2D = lossPerAgentBath2D + reE.lossBath2D;
                    lossPerAgentRiel3D = lossPerAgentRiel3D + reE.lossRiel3D;
                    lossPerAgentDollar3D = lossPerAgentDollar3D + reE.lossDollar3D;
                    lossPerAgentBath3D = lossPerAgentBath3D + reE.lossBath3D;

                })

                var footerStakeRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRiel2D + "</font></th>" : "";
                var footerStakeDollar2D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollar2D + "</font></th>" : "";
                var footerStakeBath2D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBath2D + "</font></th>" : "";
                var footerStakeRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRiel3D + "</font></th>" : "";
                var footerStakeDollar3D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollar3D + "</font></th>" : "";
                var footerStakeBath3D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBath3D + "</font></th>" : "";
                var footerLossRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red'>" + lossPerAgentRiel2D + "</font></th>" : "";
                var footerLossDollar2D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollar2D + "</font></th>" : "";
                var footerLossBath2D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBath2D + "</font></th>" : "";
                var footerLossRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentRiel3D + "</font></th>" : "";
                var footerLossDollar3D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollar3D + "</font></th>" : "";
                var footerLossBath3D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBath3D + "</font></th>" : "";


                grandTotalRiel2D += totalPerAgentRiel2D;
                grandTotalRiel3D += totalPerAgentRiel3D;

                grandTotalDollar2D += totalPerAgentDollar2D;
                grandTotalDollar3D += totalPerAgentDollar3D;

                grandTotalBath2D += totalPerAgentBath2D;
                grandTotalBath3D += totalPerAgentBath3D;


                //Win
                grandTotalWinRiel2D += lossPerAgentRiel2D;
                grandTotalWinRiel3D += lossPerAgentRiel3D;

                grandTotalWinDollar2D += lossPerAgentDollar2D;
                grandTotalWinDollar3D += lossPerAgentDollar3D;

                grandTotalWinBath2D += lossPerAgentBath2D;
                grandTotalWinBath3D += lossPerAgentBath3D;


                stringPrepare += "<tr class='sumFooter'>" +
                    "<th style='border: solid 1px;' align='center';><font size='1'>TTL</font></th>" +
                    footerStakeRiel2D +
                    footerStakeDollar2D +
                    footerStakeBath2D +
                    footerStakeRiel3D +
                    footerStakeDollar3D +
                    footerStakeBath3D +
                    footerLossRiel2D +
                    footerLossDollar2D +
                    footerLossBath2D +
                    footerLossRiel3D +
                    footerLossDollar3D +
                    footerLossBath3D +
                    "</tr>" + "</table>";
            }

            if (resultN.length != 0) {
                stringPrepare += "</td>";
            }

            if (resultT.length != 0) {
                var totalPerAgentRiel2D = 0;
                var totalPerAgentDollar2D = 0;
                var totalPerAgentBath2D = 0;
                var totalPerAgentRiel3D = 0;
                var totalPerAgentDollar3D = 0;
                var totalPerAgentBath3D = 0;

                var lossPerAgentRiel2D = 0;
                var lossPerAgentDollar2D = 0;
                var lossPerAgentBath2D = 0;
                var lossPerAgentRiel3D = 0;
                var lossPerAgentDollar3D = 0;
                var lossPerAgentBath3D = 0;


                stringPrepare +=
                    "<table class='table table-report' style='border-collapse: collapse !important;'><caption><b>" +
                    "<span align='left'><font size='2'>Date : " + moment(self.date).format('DD-MM-YYYY') +
                    "</font></b></caption>" +
                    "<tr><th style='border: solid 1px'  colspan='" + firstRow + "' align='center'><b>" + agentName + "(Thai)</b></th></tr>" +
                    "<tr><th rowspan='3' style='border: solid 1px' align='center'>No.</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'>Turnover</th><th style='border: solid 1px' colspan='" + secondRow + "' align='center'> Loss</th></tr>" +
                    "<tr><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>2D</th><th style='border: solid 1px' colspan='" + thirdRow + "' align='center'>3D</th></tr>" +
                    "<tr>" +

                    labelStakeRiel2D +
                    labelStakeDollar2D +
                    labelStakeBath2D +
                    labelStakeRiel3D +
                    labelStakeDollar3D +
                    labelStakeBath3D +
                    labelLossRiel2D +
                    labelLossDollar2D +
                    labelLossBath2D +
                    labelLossRiel3D +
                    labelLossDollar3D +
                    labelLossBath3D +
                    "</tr>";


                resultT.forEach(function (reE) {
                    var valueStakeRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalRiel2D + "</b></font></td>" : "";
                    var valueStakeDollar2D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalDollar2D + "</b></font></td>" : "";
                    var valueStakeBath2D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalBath2D + "</b></font></td>" : "";
                    var valueStakeRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalRiel3D + "</b></font></td>" : "";
                    var valueStakeDollar3D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalDollar3D + "</b></font></td>" : "";
                    var valueStakeBath3D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font size='2'><b>" + reE.totalBath3D + "</b></font></td>" : "";
                    var valueLossRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossRiel2D + "</font></td>" : "";
                    var valueLossDollar2D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossDollar2D + "</font></td>" : "";
                    var valueLossBath2D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossBath2D + "</font></td>" : "";
                    var valueLossRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossRiel3D + "</font></td>" : "";
                    var valueLossDollar3D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossDollar3D + "</font></td>" : "";
                    var valueLossBath3D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><font color='red' size='2'>" + reE.lossBath3D + "</font></td>" : "";


                    updateCountFinal+=reE.updateCount;
                    if(reE.updateCount>0) {
                        stringPrepare += "<tr class='updateColor'>" +
                            "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + "</td>" +

                            valueStakeRiel2D +
                            valueStakeDollar2D +
                            valueStakeBath2D +
                            valueStakeRiel3D +
                            valueStakeDollar3D +
                            valueStakeBath3D +
                            valueLossRiel2D +
                            valueLossDollar2D +
                            valueLossBath2D +
                            valueLossRiel3D +
                            valueLossDollar3D +
                            valueLossBath3D +

                            "</tr>";
                    }else{
                        stringPrepare += "<tr>" +
                            "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + reE._id.page + "</td>" +

                            valueStakeRiel2D +
                            valueStakeDollar2D +
                            valueStakeBath2D +
                            valueStakeRiel3D +
                            valueStakeDollar3D +
                            valueStakeBath3D +
                            valueLossRiel2D +
                            valueLossDollar2D +
                            valueLossBath2D +
                            valueLossRiel3D +
                            valueLossDollar3D +
                            valueLossBath3D +

                            "</tr>";
                    }

                    totalPerAgentRiel2D = totalPerAgentRiel2D + reE.totalRiel2D;
                    totalPerAgentDollar2D = totalPerAgentDollar2D + reE.totalDollar2D;
                    totalPerAgentBath2D = totalPerAgentBath2D + reE.totalBath2D;
                    totalPerAgentRiel3D = totalPerAgentRiel3D + reE.totalRiel3D;
                    totalPerAgentDollar3D = totalPerAgentDollar3D + reE.totalDollar3D;
                    totalPerAgentBath3D = totalPerAgentBath3D + reE.totalBath3D;

                    lossPerAgentRiel2D = lossPerAgentRiel2D + reE.lossRiel2D;
                    lossPerAgentDollar2D = lossPerAgentDollar2D + reE.lossDollar2D;
                    lossPerAgentBath2D = lossPerAgentBath2D + reE.lossBath2D;
                    lossPerAgentRiel3D = lossPerAgentRiel3D + reE.lossRiel3D;
                    lossPerAgentDollar3D = lossPerAgentDollar3D + reE.lossDollar3D;
                    lossPerAgentBath3D = lossPerAgentBath3D + reE.lossBath3D;

                })


                var footerStakeRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRiel2D + "</font></th>" : "";
                var footerStakeDollar2D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollar2D + "</font></th>" : "";
                var footerStakeBath2D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBath2D + "</font></th>" : "";
                var footerStakeRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentRiel3D + "</font></th>" : "";
                var footerStakeDollar3D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentDollar3D + "</font></th>" : "";
                var footerStakeBath3D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><font size='2'>" + totalPerAgentBath3D + "</font></th>" : "";
                var footerLossRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red'>" + lossPerAgentRiel2D + "</font></th>" : "";
                var footerLossDollar2D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollar2D + "</font></th>" : "";
                var footerLossBath2D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBath2D + "</font></th>" : "";
                var footerLossRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentRiel3D + "</font></th>" : "";
                var footerLossDollar3D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentDollar3D + "</font></th>" : "";
                var footerLossBath3D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><font color='red' size='2'>" + lossPerAgentBath3D + "</font></th>" : "";


                grandTotalRiel2D += totalPerAgentRiel2D;
                grandTotalRiel3D += totalPerAgentRiel3D;

                grandTotalDollar2D += totalPerAgentDollar2D;
                grandTotalDollar3D += totalPerAgentDollar3D;

                grandTotalBath2D += totalPerAgentBath2D;
                grandTotalBath3D += totalPerAgentBath3D;

                //Win
                grandTotalWinRiel2D += lossPerAgentRiel2D;
                grandTotalWinRiel3D += lossPerAgentRiel3D;

                grandTotalWinDollar2D += lossPerAgentDollar2D;
                grandTotalWinDollar3D += lossPerAgentDollar3D;

                grandTotalWinBath2D += lossPerAgentBath2D;
                grandTotalWinBath3D += lossPerAgentBath3D;

                stringPrepare += "<tr class='sumFooter'>" +
                    "<th style='border: solid 1px;' align='center'; ><font size='1'>TTL</font></th>" +
                    footerStakeRiel2D +
                    footerStakeDollar2D +
                    footerStakeBath2D +
                    footerStakeRiel3D +
                    footerStakeDollar3D +
                    footerStakeBath3D +
                    footerLossRiel2D +
                    footerLossDollar2D +
                    footerLossBath2D +
                    footerLossRiel3D +
                    footerLossDollar3D +
                    footerLossBath3D;
            }

            stringPrepare += "</tr></table>"

            if (resultE.length != 0 || resultN.length != 0 || resultT.length != 0) {
                var selectorLocation={};
                selectorLocation._id=agentInfo.locationId;
                selectorLocation['detail.date'] = {$lte: new Date(self.date)};

                var location =Meteor.call('getLocationForReport',selectorLocation);

                var netTotalRiel2D = grandTotalRiel2D * location.add * location.offValue2D / 100;
                var netTotalRiel3D = grandTotalRiel3D * location.add * location.offValue3D / 100;

                var netTotalDollar2D = grandTotalDollar2D  * location.offValue2D / 100;
                var netTotalDollar3D = grandTotalDollar3D  * location.offValue3D / 100;

                var netTotalBath2D = grandTotalBath2D * location.offValue2D / 100;
                var netTotalBath3D = grandTotalBath3D  * location.offValue3D / 100;

                //Win

                var netTotalWinRiel2D = grandTotalWinRiel2D * location.win2D * location.add;
                var netTotalWinRiel3D = grandTotalWinRiel3D * location.win3D * location.add;

                var netTotalWinDollar2D = grandTotalWinDollar2D * location.win2D ;
                var netTotalWinDollar3D = grandTotalWinDollar3D* location.win3D ;

                var netTotalWinBath2D = grandTotalWinBath2D * location.win2D ;
                var netTotalWinBath3D = grandTotalWinBath3D * location.win3D ;

                //Profit
                var grandProfitRiel = netTotalRiel2D + netTotalRiel3D-netTotalWinRiel2D-netTotalWinRiel3D;
                var netProfitRiel = grandProfitRiel * location.share / 100;

                var grandProfitDollar = netTotalDollar2D + netTotalDollar3D-netTotalWinDollar2D-netTotalWinDollar3D;
                var netProfitDollar = grandProfitDollar * location.share / 100;

                var grandProfitBath = netTotalBath2D + netTotalBath3D-netTotalWinBath2D-netTotalWinBath3D;
                var netProfitBath = grandProfitBath * location.share / 100;

                var calculateRiel = "";
                var calculateDollar = "";
                var calculateBath = "";


                if (self.currencyId.indexOf("KHR") > -1) {
                    calculateRiel =
                        "<table class='table table-report' style='border-collapse: collapse !important;'>" +
                        "<tr><th>2D Riel</th><th><font size='2'>" + formatNumberToSeperate(grandTotalRiel2D * location.add) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalRiel2D) + "</font></th></tr>" +
                        "<tr><th>3D Riel</th><th><font size='2'>" + formatNumberToSeperate(grandTotalRiel3D * location.add) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalRiel3D) + "</font></th></tr>" +
                        "<tr><th>2D Pay</th><td><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinRiel2D * location.add) + "</font></td><td><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinRiel2D) + "</font></td></tr>" +
                        "<tr><th  style='border-bottom: solid 1px'>3D Pay</b></th><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinRiel3D * location.add) + "</font></td><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinRiel3D) + "</font></td></tr>" +
                        "<tr><td><b></b></td><td></td><td></td></tr>" +

                        "<tr><th>Total Riel</th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" + formatNumberToSeperate(grandProfitRiel) + "</font></b></th></tr>" +
                        "<tr><th><b>"+location.share+"%<b></th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" + formatNumberToSeperate(netProfitRiel) + "</font></b></th></tr>" +

                        "</table>";
                }

                if (self.currencyId.indexOf("USD") > -1) {
                    calculateDollar =
                        "<table class='table table-report' style='border-collapse: collapse !important;'>" +
                        "<tr><th>2D Dollar</th><th><font size='2'>" + formatNumberToSeperate(grandTotalDollar2D) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalDollar2D) + "</font></th></tr>" +
                        "<tr><th>3D Dollar</th><th><font size='2'>" + formatNumberToSeperate(grandTotalDollar3D) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalDollar3D) + "</font></th></tr>" +
                        "<tr><th>2D Pay</th><td><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinDollar2D)+ "</font></td><td><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinDollar2D) + "</font></td></tr>" +
                        "<tr><th  style='border-bottom: solid 1px'>3D Pay</b></th><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinDollar3D) + "</font></td><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinDollar3D) + "</font></td></tr>" +
                        "<tr><td><b></b></td><td></td><td></td></tr>" +

                        "<tr><th>Total Dollar</th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" + formatNumberToSeperate(grandProfitDollar) + "</font></b></th></tr>" +
                        "<tr><th>"+location.share+"%</th><td></td><th style='border-bottom: solid 1px'><b><font size='2'>" + formatNumberToSeperate(netProfitDollar) + "</font></b></th></tr>" +
                        "</table>";
                }

                if (self.currencyId.indexOf("THB") > -1) {
                    calculateBath =
                        "<table class='table table-report' style='border-collapse: collapse !important;'>" +
                        "<tr><th>2D Bath</th><th><font size='2'>" + formatNumberToSeperate(grandTotalBath2D) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalBath2D) + "</font></th></tr>" +
                        "<tr><th>3D Bath</th><th><font size='2'>" + formatNumberToSeperate(grandTotalBath3D) + "</font></th><th><font size='2'>" + formatNumberToSeperate(netTotalBath3D) + "</font></th></tr>" +
                        "<tr><th>2D Pay</th><td><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinBath2D) + "</font></td><td><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinBath2D) + "</font></td></tr>" +
                        "<tr><th  style='border-bottom: solid 1px'>3D Pay</b></th><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(grandTotalWinBath3D) + "</font></td><td  style='border-bottom: solid 1px'><font color='red' size='2'>" + formatNumberToSeperate(netTotalWinBath3D) + "</font></td></tr>" +
                        "<tr><td><b></b></td><td></td><td></td></tr>" +

                        "<tr><th>Total Bath</th><td></td><th style='border-bottom: solid 1px'><font size='2'><b>" + formatNumberToSeperate(grandProfitBath) + "</b></font></th></tr>" +
                        "<tr><th><b>"+location.share+"%</b></th><td></td><th style='border-bottom: solid 1px'><font size='2'><b>" + formatNumberToSeperate(netProfitBath) + "</b></font></th></tr>" +
                        "</table>";
                }

                var updateCountFinalLabel=updateCountFinal==0 ? "" : "Updated :";

                stringPrepare += "<div class='col-md-12'>" +
                    "<table class='table table-report' style='border: 0px'><tr><td>" +
                    "<table class='table' style='border-collapse: collapse !important;'>" +
                    "<tr><th colspan='3'><font size='2'>"+ updateCountFinalLabel+ "  "+moment(self.date).format('DD-MM-YYYY')+"</font></th></tr>"+
                    "<tr><th style='border: solid 1px'  rowspan='2' class='sumFooterYellow'>2D</th><th style='border: solid 1px'  class='sumFooterYellow'>OFF 0.0%</th><th style='border: solid 1px' align='center'>" + location.offValue2D + "</th></tr>" +
                    "<tr><th style='border: solid 1px'  class='sumFooterYellow'>Win(*1)</th><th style='border: solid 1px' align='center'>" + location.win2D + "</th></tr>" +

                    "<tr><th style='border: solid 1px'  rowspan='2'  class='sumFooter'>3D</th><th style='border: solid 1px'  class='sumFooter'>OFF 0.0%</th><th style='border: solid 1px' align='center'>" + location.offValue3D + "</th></tr>" +
                    "<tr><th style='border: solid 1px'  class='sumFooter'>Win(*1)</th><th style='border: solid 1px' align='center'>" + location.win3D + "</th></tr>" +
                    "<tr><th style='border: solid 1px'  class='sumFooter' >Add</th><th style='border: solid 1px' align='center'>00=</th><th style='border: solid 1px' align='center'>" + location.add + "</th></tr>" +
                    "</table></td>" +
                    "<td>" + calculateRiel + "</td><td>" + calculateDollar + "</td><td>" + calculateBath + "</td></tr></table></div><footer></footer>";
            }

        })


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