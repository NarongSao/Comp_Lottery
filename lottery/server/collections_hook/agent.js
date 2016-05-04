/***** Before */
Lottery.Collection.Agent.before.insert(function (userId, doc) {
    var prefix = doc.branchId + '-';
    doc._id = idGenerator.genWithPrefix(Lottery.Collection.Agent, prefix, 6);
    return doc;
});
Lottery.Collection.Agent.before.update(function (userId, doc, fieldNames, modifier, options) {
});
