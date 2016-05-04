

Lottery.Collection.MapAgent.before.insert(function (userId, doc) {
    doc._id = idGenerator.genWithPrefix(Lottery.Collection.MapAgent, "", 6);
    var detail = [];
    _.each(doc.detail, function (obj) {
        if (!_.isNull(obj)) {
            var agentId = obj.agent.split('|');
            var agent = Lottery.Collection.Agent.findOne({_id: agentId[0].replace(/\s+/g, '')}, {
                fields: {
                    name: 1
                }
            });
            obj.agentDoc = agent;
            detail.push(obj);
        }
    });
    doc.detail = detail;
});
Lottery.Collection.MapAgent.before.update(function (userId, doc, fieldNames, modifier, options) {

    modifier.$set = modifier.$set || {};
    var detail = [];
    _.each(modifier.$set.detail, function (obj) {
        if (!_.isNull(obj)) {
            var agentId = obj.agent.split('|');
            var agent = Lottery.Collection.Agent.findOne({_id: agentId[0].replace(/\s+/g, '')}, {
                fields: {
                    name: 1
                }
            });
            obj.agentDoc = agent;
            detail.push(obj);
        }
    });
    modifier.$set.detail = detail;

});
