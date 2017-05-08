/***** Before */
Lottery.Collection.BetDetail.before.insert(function (userId, doc) {
    var prefix = doc.agentId;
    doc._id = idGenerator.genWithPrefix(Lottery.Collection.BetDetail, prefix, 30);
    return doc;
});

