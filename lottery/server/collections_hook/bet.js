/***** Before */
Lottery.Collection.Bet.before.insert(function (userId, doc) {
    var prefix = doc.agentId;
    var items = [];
    doc._id = idGenerator.genWithPrefix(Lottery.Collection.Bet, prefix, 10);

    var agentDetail = Lottery.Collection.Agent.findOne({_id: doc.agentId}, {fields: {name: 1, gender: 1}})

    doc._agent = agentDetail;

    _.each(doc.items, function (obj, key) {
        var data = {};

        data.agentId = doc.agentId;


        data.page = doc.page;
        data.line = doc.line;
        data.betDetailDate = doc.betDate;

        data.number = obj.number;

        data.amount = obj.amount;
        data.currencyId = obj.currencyId;

        data.post = obj.post;
        data.time = doc.time;

        data.branchId = doc.branchId;

        data._id = idGenerator.genWithPrefix(Lottery.Collection.BetDetail, prefix, 30);
        var betDetailId = Meteor.call('lottery_betDetailInsert', data);

        obj.betDetailId = betDetailId;
        items.push(obj);

    });
    doc.items = items;

});
Lottery.Collection.Bet.before.update(function (userId, doc, fieldNames, modifier, options) {
    var items = [];
    _.each(modifier.$set.items, function (obj, key) {
        if (obj != null) {
            var data = {};
            var prefix = modifier.$set.agentId;
            data.agentId = modifier.$set.agentId;
            data.page = modifier.$set.page;
            data.line = modifier.$set.line;
            data.betDetailDate = modifier.$set.betDate;
            data.time = modifier.$set.time;

            data.number = obj.number;

            data.amount = obj.amount;

            data.post = obj.post;
            data.currencyId = obj.currencyId;
            data.branchId = modifier.$set.branchId;

            Lottery.Collection.BetDetail.remove(obj.betDetailId);
            data._id = idGenerator.genWithPrefix(Lottery.Collection.BetDetail, prefix, 30);
            var betDetailId = Meteor.call('lottery_betDetailInsert', data);

            obj.betDetailId = betDetailId;
            items.push(obj);
        }
    });
    modifier.$set.items = items;
});

