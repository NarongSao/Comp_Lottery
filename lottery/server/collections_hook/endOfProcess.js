/***** Before */
Lottery.Collection.EndOfProcess.before.insert(function (userId, doc) {
    var prefix = doc.branchId + '-';
    doc._id = idGenerator.genWithPrefix(Lottery.Collection.EndOfProcess, prefix, 10);

    if(doc.agentId=="All"){
        var selector={};
        selector.closeDate=doc.closeDate;
        selector.time=doc.time;
        var endOfProcessBefore=Lottery.Collection.EndOfProcess.find(selector).fetch();
        endOfProcessBefore.forEach(function(obj){
            Lottery.Collection.EndOfProcess.remove(obj._id);
            Lottery.Collection.Loss.remove({endOfProcessId: obj._id});
        })
    }
    return doc;
});

Lottery.Collection.EndOfProcess.after.insert(function (userId, doc) {

    if (doc.agentId == "All") {
        var agentList = Lottery.Collection.Agent.find({}, {fields: {_id: 1}}).fetch();
    } else {
        var agentList = [];
        agentList.push({_id: doc.agentId});
    }

    if (agentList.length != 0) {
        agentList.forEach(function (obj) {
            var selector = {};
            selector.branchId = doc.branchId;
            selector.date = doc.closeDate;
            selector.time = doc.time;
            selector.endOfProcessId = doc._id;
            selector.agentId = obj._id;

            Meteor.call('lottery_endOfProcess', selector);
        })
    }
});

