/***** Before */
Lottery.Collection.Result.before.insert(function (userId, doc) {
    var reId = idGenerator.genWithPrefix(Lottery.Collection.Result, "", 10);
    var notDefault = 1;
    notDefault = doc.notDefault;
    if (notDefault != 1) {
        doc._id = reId;
    }
});

