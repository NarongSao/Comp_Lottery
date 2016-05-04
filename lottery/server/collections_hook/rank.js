/***** Before */
Lottery.Collection.Rank.before.insert(function (userId, doc) {

    doc._id = idGenerator.genWithPrefix(Lottery.Collection.Rank, "", 6);
    return doc;
});

Lottery.Collection.Rank.before.update(function (userId, doc, fieldNames, modifier, options) {


});
