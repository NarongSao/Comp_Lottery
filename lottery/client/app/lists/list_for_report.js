// List for report
Lottery.ListForReport = {
    branch: function () {
        var list = [];
        list.push({label: "(Select All)", value: ""});
        Cpanel.Collection.Branch.find()
            .forEach(function (obj) {
                list.push({label: obj.enName, value: obj._id});
            });

        return list;
    },
    agent: function(){
        var list=[];
        list.push({label: "(Select One)",value: ""});
        Lottery.Collection.Agent.find()
            .forEach(function(obj){
                list.push({label: obj.name,value: obj._id});
            })
        return list;
    },
    agentListEndOfProcess: function(){
        var list=[];
        list.push({label: "All",value: "All"});
        Lottery.Collection.Agent.find()
            .forEach(function(obj){
                list.push({label: obj.name,value: obj._id});
            })
        return list;
    },
    agentListTransfer: function(){
        var list=[];
        list.push({label: "Owner",value: "Owner"});

        Lottery.Collection.MapAgent.find()
            .forEach(function(obj){
                list.push({label: obj.mainAgent,value: obj._id});
            })
        return list;
    },
    rankList: function () {
        var list=[];
        list.push({label: "No Rank",value: "noRank"});
        Lottery.Collection.Rank.find()
            .forEach(function (obj) {
                list.push({label: "KHR: ("+obj.minKHR+" , "+obj.maxKHR +") | USD: ("+obj.minUSD+" , "+obj.maxUSD+") | THB: ("+obj.minTHB+" , "+obj.maxTHB+")"   ,value: obj._id});
            })
        return list;
    }
};
